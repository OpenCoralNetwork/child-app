import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Facility = {
  id: string;
  name: string;
  type: 'nursery' | 'sick-child' | 'clinic';
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  description?: string;
  rating: number;
  images: string[];
  category: string;
  stock: number;
  featured: boolean;
};

export type Child = {
  id: string;
  user_id: string;
  name: string;
  birthday: string;
  allergies?: string[];
  medical_notes?: string;
};

export type Reservation = {
  id: string;
  facility_id: string;
  child_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
};