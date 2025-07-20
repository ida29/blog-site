-- Baseline migration for existing schema
-- This migration handles tables that may have been created manually

-- Mark previous migrations as executed if they were done manually
DO $$
BEGIN
    -- Check if articles table already exists
    IF EXISTS (SELECT 1 FROM information_schema.tables 
               WHERE table_schema = 'public' 
               AND table_name = 'articles') THEN
        
        -- Mark the create_articles_table migration as already executed
        -- Skip marking as executed since table structure differs
        -- INSERT INTO supabase_migrations.schema_migrations (version, statements, name)
        -- VALUES (
        --     '20250720091727',
        --     ARRAY['-- Manually created'],
        --     'create_articles_table'
        -- )
        -- ON CONFLICT (version) DO NOTHING;
        
        -- Ensure all required columns exist
        -- Add any missing columns here
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_schema = 'public' 
                       AND table_name = 'articles' 
                       AND column_name = 'tags') THEN
            ALTER TABLE articles ADD COLUMN tags TEXT[] DEFAULT '{}';
        END IF;
        
        -- Ensure RLS is enabled
        ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
        
        -- Create policies if they don't exist
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE tablename = 'articles' 
            AND policyname = 'Public articles are viewable by everyone'
        ) THEN
            CREATE POLICY "Public articles are viewable by everyone" 
            ON articles FOR SELECT 
            USING (status = 'published');
        END IF;
        
        -- Create indexes if they don't exist
        CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
        CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
        CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
        
    END IF;
    
    -- Check if article_reactions table already exists
    IF EXISTS (SELECT 1 FROM information_schema.tables 
               WHERE table_schema = 'public' 
               AND table_name = 'article_reactions') THEN
        
        -- Mark the create_article_reactions_table migration as already executed
        INSERT INTO supabase_migrations.schema_migrations (version, statements, name)
        VALUES (
            '20250720091803',
            ARRAY['-- Manually created'],
            'create_article_reactions_table'
        )
        ON CONFLICT (version) DO NOTHING;
        
    END IF;
END$$;

-- Log this baseline migration
COMMENT ON SCHEMA public IS 'Baseline migration executed on production database';