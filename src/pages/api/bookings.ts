import type { APIRoute } from 'astro';
import availabilityConfig from '../../config/availability.json';

interface Env {
  knapgemaakt_bookings: D1Database;
  N8N_BOOKING_WEBHOOK?: string;
}

interface BookingRequest {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_company?: string;
  user_industry?: string;
  user_website?: string;
  start_time: string;
  end_time: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    if (!body.user_name || !body.user_email || !body.user_phone || !body.start_time || !body.end_time) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.user_email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate dates
    const startTime = new Date(body.start_time);
    const endTime = new Date(body.end_time);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (startTime >= endTime) {
      return new Response(JSON.stringify({ error: 'End time must be after start time' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if booking meets minimum advance booking requirement
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + availabilityConfig.minAdvanceBooking * 60000);
    if (startTime < minBookingTime) {
      return new Response(JSON.stringify({
        error: `Bookings must be made at least ${Math.floor(availabilityConfig.minAdvanceBooking / 60)} hours in advance`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if booking is not too far in advance
    const maxBookingDate = new Date(now.getTime() + availabilityConfig.maxAdvanceBooking * 24 * 60 * 60000);
    if (startTime > maxBookingDate) {
      return new Response(JSON.stringify({
        error: `Bookings can only be made up to ${availabilityConfig.maxAdvanceBooking} days in advance`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = (locals.runtime.env as Env).knapgemaakt_bookings;

    // Check for conflicts with existing bookings
    console.log('[Bookings API] Checking booking conflicts for:', {
      requestedStart: startTime.toISOString(),
      requestedEnd: endTime.toISOString()
    });

    const conflicts = await db.prepare(`
      SELECT id, start_time, end_time FROM bookings
      WHERE status = 'confirmed'
      AND datetime(start_time) < datetime(?)
      AND datetime(end_time) > datetime(?)
    `).bind(endTime.toISOString(), startTime.toISOString()).all();

    console.log('[Bookings API] Booking conflicts query results:', {
      count: conflicts.results.length,
      conflicts: conflicts.results
    });

    if (conflicts.results.length > 0) {
      return new Response(JSON.stringify({
        error: 'This time slot is no longer available. Please select another time.'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check for conflicts with blocked times
    console.log('[Bookings API] Checking blocked times conflicts for:', {
      requestedStart: startTime.toISOString(),
      requestedEnd: endTime.toISOString()
    });

    const blockedConflicts = await db.prepare(`
      SELECT id, start_time, end_time FROM blocked_times
      WHERE datetime(start_time) < datetime(?)
      AND datetime(end_time) > datetime(?)
    `).bind(endTime.toISOString(), startTime.toISOString()).all();

    console.log('[Bookings API] Blocked times query results:', {
      count: blockedConflicts.results.length,
      conflicts: blockedConflicts.results
    });

    if (blockedConflicts.results.length > 0) {
      return new Response(JSON.stringify({
        error: 'This time slot was just blocked. Please select another time.'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create booking (use Web Crypto API available in Cloudflare Workers)
    const bookingId = crypto.randomUUID();

    await db.prepare(`
      INSERT INTO bookings (
        id, user_name, user_email, user_phone, user_company, user_industry, user_website,
        start_time, end_time, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).bind(
      bookingId,
      body.user_name,
      body.user_email,
      body.user_phone,
      body.user_company || null,
      body.user_industry || null,
      body.user_website || null,
      startTime.toISOString(),
      endTime.toISOString()
    ).run();

    // Trigger n8n webhook (must await to ensure it completes before worker terminates)
    const webhookUrl = (locals.runtime.env as Env).N8N_BOOKING_WEBHOOK;
    console.log('[Bookings API] Webhook URL:', webhookUrl ? 'found' : 'NOT FOUND');

    if (webhookUrl) {
      console.log('[Bookings API] Triggering webhook for booking:', bookingId);
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            booking_id: bookingId,
            user_name: body.user_name,
            user_email: body.user_email,
            user_phone: body.user_phone,
            user_company: body.user_company,
            user_industry: body.user_industry,
            user_website: body.user_website,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            created_at: new Date().toISOString()
          })
        });
        console.log('[Bookings API] Webhook triggered successfully, status:', webhookResponse.status);
      } catch (err) {
        console.error('[Bookings API] Failed to trigger n8n webhook:', err);
        // Don't fail the booking if webhook fails
      }
    } else {
      console.warn('[Bookings API] N8N_BOOKING_WEBHOOK environment variable not set - skipping webhook');
    }

    return new Response(JSON.stringify({
      success: true,
      booking_id: bookingId,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      message: 'Booking confirmed! You will receive a confirmation email shortly.'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async ({ url, locals }) => {
  const bookingId = url.searchParams.get('id');

  if (!bookingId) {
    return new Response(JSON.stringify({ error: 'Booking ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const db = (locals.runtime.env as Env).knapgemaakt_bookings;
    const booking = await db.prepare(
      'SELECT * FROM bookings WHERE id = ?'
    ).bind(bookingId).first();

    if (!booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(booking), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
