-- ============================================================================
-- Blog Site Database Schema for Supabase
-- ============================================================================

-- Enable Row Level Security (RLS)
alter table if exists public.articles enable row level security;

-- Articles Table
-- ============================================================================
create table if not exists public.articles (
  id bigserial primary key,
  title text not null,
  excerpt text,
  content text not null,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone,
  
  -- Add constraints
  constraint title_length check (char_length(title) >= 1 and char_length(title) <= 200),
  constraint excerpt_length check (char_length(excerpt) <= 500),
  constraint content_length check (char_length(content) >= 1)
);

-- Create indexes for better performance
-- ============================================================================
create index if not exists articles_status_idx on public.articles (status);
create index if not exists articles_created_at_idx on public.articles (created_at desc);
create index if not exists articles_published_at_idx on public.articles (published_at desc);
create index if not exists articles_tags_idx on public.articles using gin (tags);

-- Create updated_at trigger function
-- ============================================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  
  -- Auto-set published_at when status changes to published
  if new.status = 'published' and old.status != 'published' then
    new.published_at = timezone('utc'::text, now());
  end if;
  
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
-- ============================================================================
drop trigger if exists articles_updated_at on public.articles;
create trigger articles_updated_at
  before update on public.articles
  for each row
  execute function public.handle_updated_at();

-- Row Level Security Policies
-- ============================================================================
-- Allow all operations for now (可以後で認証を追加)
create policy "Articles are publicly readable" on public.articles
  for select using (true);

create policy "Articles are publicly writable" on public.articles
  for insert with check (true);

create policy "Articles are publicly updatable" on public.articles
  for update using (true);

create policy "Articles are publicly deletable" on public.articles
  for delete using (true);

-- Sample data (optional)
-- ============================================================================
insert into public.articles (title, excerpt, content, tags, status, published_at)
values 
  (
    'Nuxt.jsとSupabaseで始めるモダンWeb開発',
    'Nuxt.js 3とSupabaseを組み合わせて、リアルタイムなWebアプリケーションを構築する方法を紹介します。',
    '# Nuxt.jsとSupabaseで始めるモダンWeb開発

## はじめに

Nuxt.js 3とSupabaseを組み合わせることで、モダンで高性能なWebアプリケーションを簡単に構築できます。

## 主な機能

- リアルタイムデータベース
- 認証システム
- ファイルストレージ
- APIの自動生成

## まとめ

SupabaseはFirebaseの優れた代替品として、オープンソースで透明性の高いバックエンドサービスを提供します。',
    ARRAY['Nuxt.js', 'Supabase', 'Vue.js', 'Web開発'],
    'published',
    timezone('utc'::text, now())
  ),
  (
    'TailwindCSSでレスポンシブデザイン',
    'TailwindCSSを使って効率的にレスポンシブなWebサイトを作成する方法を解説します。',
    '# TailwindCSSでレスポンシブデザイン

## ユーティリティファーストの設計

TailwindCSSはユーティリティファーストのCSSフレームワークです。

## レスポンシブブレイクポイント

- `sm:` - 640px以上
- `md:` - 768px以上  
- `lg:` - 1024px以上
- `xl:` - 1280px以上

## まとめ

TailwindCSSを使うことで、保守性が高く一貫したデザインシステムを構築できます。',
    ARRAY['TailwindCSS', 'CSS', 'レスポンシブ', 'デザイン'],
    'published',
    timezone('utc'::text, now())
  ),
  (
    'GitHub Pagesで静的サイトを公開する方法',
    'GitHub Actionsを使ってNuxt.jsアプリケーションを自動でGitHub Pagesにデプロイする手順を説明します。',
    '# GitHub Pagesで静的サイトを公開する方法

## GitHub Actionsの設定

まず、`.github/workflows/deploy.yml`ファイルを作成します。

## 設定のポイント

1. Node.jsのバージョン指定
2. 依存関係のインストール
3. 静的サイト生成
4. GitHub Pagesへのデプロイ

## まとめ

GitHub Actionsを使うことで、コードをプッシュするだけで自動デプロイが可能になります。',
    ARRAY['GitHub Pages', 'CI/CD', 'デプロイ', 'Nuxt.js'],
    'published',
    timezone('utc'::text, now())
  )
on conflict do nothing;