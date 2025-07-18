export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  
  // 環境変数の取得とフォールバック
  const supabaseUrl = config.public.supabaseUrl || process.env.SUPABASE_URL
  const supabaseAnonKey = config.public.supabaseAnonKey || process.env.SUPABASE_ANON_KEY
  
  console.log('Supabase設定確認:')
  console.log('URL:', supabaseUrl ? '設定済み' : '未設定')
  console.log('Key:', supabaseAnonKey ? '設定済み' : '未設定')
  
  // 環境変数が設定されていない場合はnullを返してフォールバック処理に委ねる
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase環境変数が設定されていません。ローカルストレージフォールバックを使用します。')
    return {
      provide: {
        supabase: null
      }
    }
  }
  
  try {
    // Supabaseモジュールを動的にインポート
    const { createClient } = await import('@supabase/supabase-js').catch(() => {
      console.warn('@supabase/supabase-jsモジュールが見つかりません。ローカルストレージフォールバックを使用します。')
      return { createClient: null }
    })
    
    if (!createClient) {
      return {
        provide: {
          supabase: null
        }
      }
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('Supabaseクライアント初期化成功')
    
    return {
      provide: {
        supabase
      }
    }
  } catch (error) {
    console.error('Supabaseクライアント初期化エラー:', error)
    return {
      provide: {
        supabase: null
      }
    }
  }
})