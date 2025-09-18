-- Create movies table
CREATE TABLE IF NOT EXISTS public.movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  industry TEXT NOT NULL CHECK (industry IN ('Bollywood', 'Hollywood')),
  genre TEXT NOT NULL,
  duration TEXT NOT NULL,
  poster_url TEXT,
  trailer_url TEXT,
  description TEXT,
  rating DECIMAL(2,1) NOT NULL DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create screenings table
CREATE TABLE IF NOT EXISTS public.screenings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  auditorium TEXT NOT NULL,
  seat_map JSONB NOT NULL DEFAULT '{}',
  prices JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tickets table
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  screening_id UUID NOT NULL REFERENCES public.screenings(id) ON DELETE CASCADE,
  seats TEXT[] NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'booked' CHECK (status IN ('booked', 'cancelled', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Create policies for movies (public read access)
CREATE POLICY "Movies are viewable by everyone" 
ON public.movies 
FOR SELECT 
USING (true);

-- Create policies for screenings (public read access)
CREATE POLICY "Screenings are viewable by everyone" 
ON public.screenings 
FOR SELECT 
USING (true);

-- Create policies for tickets (users can only see their own tickets)
CREATE POLICY "Users can view their own tickets" 
ON public.tickets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tickets" 
ON public.tickets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tickets" 
ON public.tickets 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_movies_updated_at
  BEFORE UPDATE ON public.movies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_screenings_updated_at
  BEFORE UPDATE ON public.screenings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample movies data
INSERT INTO public.movies (id, title, industry, genre, duration, description, rating, poster_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Blockbuster Hero', 'Bollywood', 'Action', '2h 45m', 'An epic action-packed adventure that will keep you on the edge of your seat.', 4.8, '/src/assets/movie-bollywood-1.jpg'),
('550e8400-e29b-41d4-a716-446655440002', 'Shadow Guardian', 'Hollywood', 'Superhero', '2h 20m', 'A dark and gritty superhero tale that explores the depths of human nature.', 4.6, '/src/assets/movie-hollywood-1.jpg'),
('550e8400-e29b-41d4-a716-446655440003', 'Love Story', 'Bollywood', 'Romance', '2h 35m', 'A beautiful romantic journey that transcends time and tradition.', 4.7, '/src/assets/movie-bollywood-2.jpg'),
('550e8400-e29b-41d4-a716-446655440004', 'Future Worlds', 'Hollywood', 'Sci-Fi', '2h 15m', 'Sci-fi thriller set in distant future with stunning visual effects.', 4.5, '/src/assets/movie-hollywood-2.jpg');