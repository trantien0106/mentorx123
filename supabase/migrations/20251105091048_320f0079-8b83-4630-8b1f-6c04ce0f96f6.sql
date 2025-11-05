-- Create storage bucket for mentor application documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('mentor-documents', 'mentor-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create mentor_applications table
CREATE TABLE IF NOT EXISTS public.mentor_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  expertise TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  bio TEXT NOT NULL,
  linkedin_url TEXT,
  education TEXT NOT NULL,
  certifications TEXT,
  cv_url TEXT,
  id_document_url TEXT,
  certificate_urls TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mentor_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for mentor applications
CREATE POLICY "Users can view their own applications"
ON public.mentor_applications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
ON public.mentor_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their pending applications"
ON public.mentor_applications
FOR UPDATE
USING (auth.uid() = user_id AND status = 'pending');

-- Storage policies for mentor documents
CREATE POLICY "Users can upload their own documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'mentor-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'mentor-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own documents"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'mentor-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own documents"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'mentor-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add trigger for updated_at
CREATE TRIGGER update_mentor_applications_updated_at
BEFORE UPDATE ON public.mentor_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();