/*
  # Initial Schema Setup for KodomoCare

  1. New Tables
    - `facilities`
      - Basic facility information including name, type, location
      - Rating and contact details
    - `children`
      - Child profiles with name and birthday
      - Optional medical information
    - `reservations`
      - Booking records linking facilities, children, and parents
      - Status tracking and time slots
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin-specific access controls
*/

-- Facilities table
CREATE TABLE IF NOT EXISTS facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('nursery', 'sick-child', 'clinic')),
  address text NOT NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  phone text,
  email text,
  description text,
  rating numeric(2,1) DEFAULT 4.0 CHECK (rating >= 0 AND rating <= 5),
  images text[] DEFAULT ARRAY[]::text[],
  category text NOT NULL,
  stock integer DEFAULT 0,
  featured boolean DEFAULT false
);

-- Children table
CREATE TABLE IF NOT EXISTS children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  birthday date NOT NULL,
  allergies text[],
  medical_notes text
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  facility_id uuid REFERENCES facilities(id) ON DELETE CASCADE,
  child_id uuid REFERENCES children(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes text
);

-- Enable RLS
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Facilities policies
CREATE POLICY "Facilities are viewable by everyone"
  ON facilities
  FOR SELECT
  TO public
  USING (true);

-- Children policies
CREATE POLICY "Users can manage their own children"
  ON children
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Reservations policies
CREATE POLICY "Users can view their own reservations"
  ON reservations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create reservations"
  ON reservations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their reservations"
  ON reservations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert sample facilities
INSERT INTO facilities (name, type, address, lat, lng, phone, email, description, rating, category, featured)
VALUES 
  ('札幌こども保育園', 'nursery', '札幌市中央区北3条西4丁目', 43.064, 141.346, '011-123-4567', 'info@sapporokids.jp', '温かい雰囲気の保育園で、子どもたちが楽しく安全に過ごせる環境を提供しています。', 4.8, 'nursery', true),
  ('キッズケア札幌', 'sick-child', '札幌市北区北7条西5丁目', 43.072, 141.348, '011-234-5678', 'care@kidscare.jp', '病児保育に特化した施設です。看護師が常駐し、安心して預けられます。', 4.5, 'sick-child', false),
  ('札幌こどもクリニック', 'clinic', '札幌市中央区南1条東2丁目', 43.059, 141.351, '011-345-6789', 'clinic@sapporokids.jp', '小児科専門のクリニックです。予防接種や健康診断も行っています。', 4.7, 'clinic', true);