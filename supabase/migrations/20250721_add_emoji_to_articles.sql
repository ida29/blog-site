-- Add emoji column to articles table
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS emoji TEXT DEFAULT '📝';