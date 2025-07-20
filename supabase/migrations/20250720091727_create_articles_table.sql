-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE
    ON articles FOR EACH ROW EXECUTE PROCEDURE 
    update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read published articles
CREATE POLICY "Public articles are viewable by everyone" 
  ON articles FOR SELECT 
  USING (status = 'published');

-- Policy: Authenticated users can create articles
CREATE POLICY "Authenticated users can create articles" 
  ON articles FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Policy: Authenticated users can update any articles (since no author_id exists)
CREATE POLICY "Authenticated users can update articles" 
  ON articles FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

-- Policy: Authenticated users can delete any articles (since no author_id exists)
CREATE POLICY "Authenticated users can delete articles" 
  ON articles FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- Create indexes for performance
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at);
-- CREATE INDEX idx_articles_author_id ON articles(author_id); -- author_id doesn't exist
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);