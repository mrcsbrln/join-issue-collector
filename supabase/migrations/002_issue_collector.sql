-- Extend status constraint to include 'triage'
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_status_check;

ALTER TABLE public.tasks
  ADD CONSTRAINT tasks_status_check
    CHECK (status IN ('triage', 'todo', 'in-progress', 'awaiting-feedback', 'done'));

-- Change default status to 'triage'
ALTER TABLE public.tasks ALTER COLUMN status SET DEFAULT 'triage';

-- Add creator fields
ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS creator_email text,
  ADD COLUMN IF NOT EXISTS creator_type text
    CHECK (creator_type IN ('internal', 'external'));
