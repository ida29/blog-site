export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl
  const supabaseAnonKey = config.public.supabaseAnonKey
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase設定が不完全です。SUPABASE_URLとSUPABASE_ANON_KEYを.envファイルに設定してください。')
  }
  
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  return {
    provide: {
      supabase
    }
  }
})