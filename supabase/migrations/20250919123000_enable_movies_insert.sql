-- Allow authenticated users to insert into movies
CREATE POLICY IF NOT EXISTS "Authenticated users can insert movies"
ON public.movies
FOR INSERT
TO authenticated
WITH CHECK (true);


