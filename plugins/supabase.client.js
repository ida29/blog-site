export default defineNuxtPlugin(async () => {
  // SSG時はSupabaseクライアントを初期化しない
  if (process.server && !process.env.NITRO_PRESET) {
    return {
      provide: {
        supabase: null
      }
    }
  }

  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl
  const supabaseAnonKey = config.public.supabaseAnonKey
  
  // 環境変数が設定されていない場合はnullを返す（SSG対応）
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === '' || supabaseAnonKey === '') {
    console.warn('Supabase環境変数が設定されていません。認証機能は無効化されます。')
    return {
      provide: {
        supabase: null
      }
    }
  }
  
  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    return {
      provide: {
        supabase
      }
    }
  } catch (error) {
    console.warn('Supabaseクライアントの初期化に失敗しました:', error)
    return {
      provide: {
        supabase: null
      }
    }
  }
})