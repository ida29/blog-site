import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // 環境変数の取得とフォールバック
  const supabaseUrl = config.public.supabaseUrl || process.env.SUPABASE_URL
  const supabaseAnonKey = config.public.supabaseAnonKey || process.env.SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase環境変数が設定されていません')
    console.error('SUPABASE_URL:', supabaseUrl)
    console.error('SUPABASE_ANON_KEY:', supabaseAnonKey ? '設定済み' : '未設定')
    throw new Error('Supabase環境変数が設定されていません')
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  return {
    provide: {
      supabase
    }
  }
})