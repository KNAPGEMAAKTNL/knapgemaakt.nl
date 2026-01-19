import type { APIRoute } from 'astro';
import availabilityConfig from '../../config/availability.json';

interface Env {
  knapgemaakt_bookings: D1Database;
}

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const dateParam = url.searchParams.get('date');

    if (!dateParam) {
      return new Response(JSON.stringify({ error: 'Date parameter required (YYYY-MM-DD)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const requestedDate = new Date(dateParam);
    if (isNaN(requestedDate.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get database binding from runtime
    const db = (locals.runtime.env as Env).knapgemaakt_bookings;

    // Get day of week (0 = Monday, 6 = Sunday)
    const dayOfWeek = (requestedDate.getDay() + 6) % 7;
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayName = dayNames[dayOfWeek] as keyof typeof availabilityConfig.businessHours;

    // Check if this day is enabled
    const dayConfig = availabilityConfig.businessHours[dayName];
    if (!dayConfig.enabled) {
      return new Response(JSON.stringify({
        date: dateParam,
        slots: [],
        message: 'No availability on this day'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if date is in the past
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + availabilityConfig.minAdvanceBooking * 60000);
    if (requestedDate < minBookingTime) {
      return new Response(JSON.stringify({
        date: dateParam,
        slots: [],
        message: 'Cannot book in the past or too soon'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if date is too far in the future
    const maxBookingDate = new Date(now.getTime() + availabilityConfig.maxAdvanceBooking * 24 * 60 * 60000);
    if (requestedDate > maxBookingDate) {
      return new Response(JSON.stringify({
        date: dateParam,
        slots: [],
        message: 'Cannot book that far in advance'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate time slots based on business hours
    const slots = generateTimeSlots(
      requestedDate,
      dayConfig.start,
      dayConfig.end,
      availabilityConfig.slotDuration
    );

    // Get booked slots
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedSlots = await db.prepare(
      'SELECT start_time, end_time FROM bookings WHERE status = ? AND start_time >= ? AND start_time < ?'
    ).bind('confirmed', startOfDay.toISOString(), endOfDay.toISOString()).all();

    // Get blocked times
    const blockedSlots = await db.prepare(
      'SELECT start_time, end_time FROM blocked_times WHERE start_time >= ? AND start_time < ?'
    ).bind(startOfDay.toISOString(), endOfDay.toISOString()).all();

    // Filter out booked and blocked slots
    const availableSlots = slots.filter(slot => {
      const slotStart = slot.start;
      const slotEnd = slot.end;

      // Check if slot overlaps with any booking
      const isBooked = bookedSlots.results.some((booking: any) => {
        const bookingStart = new Date(booking.start_time).getTime();
        const bookingEnd = new Date(booking.end_time).getTime();
        return (slotStart < bookingEnd && slotEnd > bookingStart);
      });

      // Check if slot overlaps with any blocked time
      const isBlocked = blockedSlots.results.some((blocked: any) => {
        const blockedStart = new Date(blocked.start_time).getTime();
        const blockedEnd = new Date(blocked.end_time).getTime();
        return (slotStart < blockedEnd && slotEnd > blockedStart);
      });

      return !isBooked && !isBlocked;
    });

    return new Response(JSON.stringify({
      date: dateParam,
      slots: availableSlots.map(slot => ({
        start: new Date(slot.start).toISOString(),
        end: new Date(slot.end).toISOString(),
        display: formatTimeSlot(new Date(slot.start))
      }))
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching availability:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function generateTimeSlots(date: Date, startTime: string, endTime: string, duration: number) {
  const slots = [];
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const slotStart = new Date(date);
  slotStart.setHours(startHour, startMinute, 0, 0);

  const slotEnd = new Date(date);
  slotEnd.setHours(endHour, endMinute, 0, 0);

  let current = slotStart.getTime();
  const end = slotEnd.getTime();

  while (current + (duration * 60000) <= end) {
    slots.push({
      start: current,
      end: current + (duration * 60000)
    });
    current += duration * 60000;
  }

  return slots;
}

function formatTimeSlot(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
