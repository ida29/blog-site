-- Create article reactions table
CREATE TABLE IF NOT EXISTS article_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT, -- For anonymous users
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('love', 'like', 'laugh', 'think', 'fire')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraints separately to handle NULL values properly
CREATE UNIQUE INDEX idx_article_reactions_user ON article_reactions(article_id, user_id, reaction_type) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX idx_article_reactions_session ON article_reactions(article_id, session_id, reaction_type) WHERE session_id IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE article_reactions ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view reactions
CREATE POLICY "Reactions are viewable by everyone" 
  ON article_reactions FOR SELECT 
  USING (true);

-- Policy: Anyone can create reactions
CREATE POLICY "Anyone can create reactions" 
  ON article_reactions FOR INSERT 
  WITH CHECK (true);

-- Policy: Users can delete their own reactions
CREATE POLICY "Users can delete their own reactions" 
  ON article_reactions FOR DELETE 
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL)
  );

-- Create indexes
CREATE INDEX idx_article_reactions_article_id ON article_reactions(article_id);
CREATE INDEX idx_article_reactions_user_id ON article_reactions(user_id);
CREATE INDEX idx_article_reactions_session_id ON article_reactions(session_id);

-- Create a view for reaction counts
CREATE OR REPLACE VIEW article_reaction_counts AS
SELECT 
  article_id,
  reaction_type,
  COUNT(*) as count
FROM article_reactions
GROUP BY article_id, reaction_type;