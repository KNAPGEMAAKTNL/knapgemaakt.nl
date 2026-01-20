-- Drop unused availability_rules table
-- The application uses src/config/availability.json instead of this database table
-- Run this with: npx wrangler d1 execute knapgemaakt-bookings --remote --file=./migrations/0004_drop_availability_rules.sql

DROP TABLE IF EXISTS availability_rules;
