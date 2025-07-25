import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState<User | null>('auth.user', () => null)
  const isAdmin = useState<boolean>('auth.isAdmin', () => false)

  const signUp = async (email: string, password: string) => {
    try {
      if (!$supabase) {
        throw new Error('認証サービスが利用できません')
      }
      
      const { data, error } = await $supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('サインアップエラー:', error)
      return { data: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      if (!$supabase) {
        throw new Error('認証サービスが利用できません')
      }
      
      const { data, error } = await $supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      user.value = data.user
      await refreshUser()
      return { data, error: null }
    } catch (error) {
      console.error('ログインエラー:', error)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      if ($supabase) {
        const { error } = await $supabase.auth.signOut()
        if (error) throw error
      }
      user.value = null
      isAdmin.value = false
      await navigateTo('/')
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  const refreshUser = async () => {
    try {
      if (!$supabase) {
        user.value = null
        isAdmin.value = false
        return
      }
      
      const { data: { user: currentUser } } = await $supabase.auth.getUser()
      user.value = currentUser
      
      if (currentUser) {
        isAdmin.value = currentUser.app_metadata?.role === 'admin' || 
                       currentUser.user_metadata?.role === 'admin' ||
                       false
      } else {
        isAdmin.value = false
      }
    } catch (error) {
      console.error('ユーザー情報取得エラー:', error)
      user.value = null
      isAdmin.value = false
    }
  }

  const initAuthListener = () => {
    if (!$supabase) return

    $supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await refreshUser()
      } else if (event === 'SIGNED_OUT') {
        user.value = null
        isAdmin.value = false
      }
    })
  }

  const isAuthenticated = computed(() => !!user.value)
  const canPostArticle = computed(() => isAuthenticated.value)

  return {
    user: readonly(user),
    isAdmin: readonly(isAdmin),
    isAuthenticated,
    canPostArticle,
    signUp,
    signIn,
    signOut,
    refreshUser,
    initAuthListener
  }
}