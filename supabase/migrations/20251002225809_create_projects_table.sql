/*
  # Create projects submission table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key) - Unique identifier for each project
      - `project_name` (text) - Name of the project
      - `project_description` (text) - Detailed description of the project
      - `image_url` (text) - URL to project image/screenshot
      - `demo_link` (text) - Link to video demo (Google Drive or other)
      - `github_link` (text) - GitHub repository link
      - `event_type` (text) - Type of event: 'hackathon', 'daily', or 'weekly'
      - `created_at` (timestamptz) - Timestamp when project was submitted
      - `updated_at` (timestamptz) - Timestamp when project was last updated

  2. Security
    - Enable RLS on `projects` table
    - Add policy for anyone to read projects (public viewing)
    - Add policy for anyone to insert projects (public submission)

  3. Notes
    - This is a public submission platform where anyone can submit and view projects
    - No authentication required for submission or viewing
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name text NOT NULL,
  project_description text NOT NULL,
  image_url text NOT NULL,
  demo_link text NOT NULL,
  github_link text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('hackathon', 'daily', 'weekly')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit projects"
  ON projects FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create index for faster filtering by event type
CREATE INDEX IF NOT EXISTS idx_projects_event_type ON projects(event_type);

-- Create index for sorting by creation date
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);