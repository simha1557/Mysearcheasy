-- Enable PostGIS extension for geolocation
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create enum types
CREATE TYPE user_role AS ENUM ('parent', 'business');
CREATE TYPE program_category AS ENUM ('sports', 'arts', 'fun');
CREATE TYPE schedule_type AS ENUM ('after-school', 'weekend', 'camp');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

-- Create profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role user_role NOT NULL DEFAULT 'parent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create programs table
CREATE TABLE programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES profiles(user_id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category program_category NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  age_group TEXT NOT NULL,
  schedule_type schedule_type NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id TEXT NOT NULL REFERENCES profiles(user_id),
  program_id UUID NOT NULL REFERENCES programs(id),
  payment_status payment_status NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(parent_id, program_id)
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id TEXT NOT NULL REFERENCES profiles(user_id),
  program_id UUID NOT NULL REFERENCES programs(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(parent_id, program_id)
);

-- Create indexes for better performance
CREATE INDEX idx_programs_category ON programs(category);
CREATE INDEX idx_programs_business_id ON programs(business_id);
CREATE INDEX idx_enrollments_parent_id ON enrollments(parent_id);
CREATE INDEX idx_enrollments_program_id ON enrollments(program_id);
CREATE INDEX idx_reviews_program_id ON reviews(program_id);

-- Create RPC function for nearby programs
CREATE OR REPLACE FUNCTION nearby_programs(
  lat DECIMAL,
  lng DECIMAL,
  radius_km DECIMAL DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  category TEXT,
  price DECIMAL,
  age_group TEXT,
  schedule_type TEXT,
  location TEXT,
  distance_km DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.description,
    p.category::TEXT,
    p.price,
    p.age_group,
    p.schedule_type::TEXT,
    p.location,
    ROUND(
      ST_Distance(
        ST_Point(lng, lat)::geography,
        ST_Point(p.longitude, p.latitude)::geography
      ) / 1000, 2
    ) AS distance_km
  FROM programs p
  WHERE p.latitude IS NOT NULL 
    AND p.longitude IS NOT NULL
    AND ST_DWithin(
      ST_Point(lng, lat)::geography,
      ST_Point(p.longitude, p.latitude)::geography,
      radius_km * 1000
    )
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: Users can read all profiles but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Programs: Everyone can read, only business owners can modify their own
CREATE POLICY "Programs are viewable by everyone" ON programs
  FOR SELECT USING (true);

CREATE POLICY "Business users can insert programs" ON programs
  FOR INSERT WITH CHECK (auth.uid()::text = business_id);

CREATE POLICY "Business users can update own programs" ON programs
  FOR UPDATE USING (auth.uid()::text = business_id);

CREATE POLICY "Business users can delete own programs" ON programs
  FOR DELETE USING (auth.uid()::text = business_id);

-- Enrollments: Users can see their own enrollments
CREATE POLICY "Users can view own enrollments" ON enrollments
  FOR SELECT USING (auth.uid()::text = parent_id);

CREATE POLICY "Users can create own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid()::text = parent_id);

-- Reviews: Everyone can read, users can create/update their own
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid()::text = parent_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid()::text = parent_id);
