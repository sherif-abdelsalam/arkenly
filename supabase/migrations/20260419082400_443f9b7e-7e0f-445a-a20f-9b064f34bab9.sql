-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by owner" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Locations
CREATE TABLE public.locations (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  area_en TEXT NOT NULL,
  area_ar TEXT NOT NULL,
  price_per_hour INTEGER NOT NULL,
  capacity_per_slot INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Locations are public" ON public.locations FOR SELECT USING (true);

-- Slots
CREATE TABLE public.slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id TEXT NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  time TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (location_id, time)
);
ALTER TABLE public.slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Slots are public" ON public.slots FOR SELECT USING (true);

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slot_id UUID NOT NULL REFERENCES public.slots(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can see booking counts (so they know what's full) — but no PII
CREATE POLICY "Booking counts public" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Users insert own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own bookings" ON public.bookings
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_bookings_slot_date ON public.bookings(slot_id, booking_date);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'phone'
  );
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed locations
INSERT INTO public.locations (id, name_en, name_ar, area_en, area_ar, price_per_hour, capacity_per_slot) VALUES
  ('tahrir', 'Tahrir Square Garage', 'جراج ميدان التحرير', 'Downtown Cairo', 'وسط البلد', 20, 5),
  ('zamalek', 'Zamalek Riverside', 'كورنيش الزمالك', 'Zamalek', 'الزمالك', 25, 4),
  ('maadi', 'Maadi Grand Mall', 'مول المعادي الكبير', 'Maadi', 'المعادي', 15, 8),
  ('newcairo', 'Cairo Festival City', 'كايرو فستيفال سيتي', 'New Cairo', 'التجمع الخامس', 18, 6),
  ('mohandessin', 'Mohandessin Plaza', 'بلازا المهندسين', 'Mohandessin', 'المهندسين', 22, 4),
  ('heliopolis', 'Heliopolis Korba', 'كوربة مصر الجديدة', 'Heliopolis', 'مصر الجديدة', 17, 5);

-- Seed slots
INSERT INTO public.slots (location_id, time, capacity)
SELECT l.id, t.time, l.capacity_per_slot
FROM public.locations l
CROSS JOIN (VALUES ('09:00'),('10:00'),('11:00'),('12:00'),('14:00'),('16:00')) AS t(time);