-- Create mentee_quiz_responses table
CREATE TABLE IF NOT EXISTS public.mentee_quiz_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_status TEXT NOT NULL CHECK (current_status IN ('student', 'professional', 'job_seeker', 'entrepreneur', 'other')),
  education_level TEXT NOT NULL CHECK (education_level IN ('high_school', 'undergraduate', 'graduate', 'postgraduate', 'other')),
  field_of_interest TEXT[] NOT NULL,
  learning_goals TEXT[] NOT NULL,
  preferred_learning_style TEXT NOT NULL CHECK (preferred_learning_style IN ('visual', 'auditory', 'reading', 'kinesthetic', 'mixed')),
  availability TEXT NOT NULL CHECK (availability IN ('weekday_morning', 'weekday_afternoon', 'weekday_evening', 'weekend', 'flexible')),
  experience_level TEXT NOT NULL CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  preferred_session_format TEXT NOT NULL CHECK (preferred_session_format IN ('one_on_one', 'group', 'both')),
  budget_range TEXT NOT NULL CHECK (budget_range IN ('under_500k', '500k_1m', '1m_2m', 'above_2m', 'flexible')),
  specific_topics TEXT,
  additional_info TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.mentee_quiz_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own quiz responses"
ON public.mentee_quiz_responses
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quiz responses"
ON public.mentee_quiz_responses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz responses"
ON public.mentee_quiz_responses
FOR UPDATE
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_mentee_quiz_responses_updated_at
BEFORE UPDATE ON public.mentee_quiz_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();