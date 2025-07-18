export const useAuth = () => {
  const user = useState('auth.user', () => null)
  
  // 初期化時にローカルストレージから認証状態を復元
  const initAuth = () => {
    if (process.client) {
      const storedUser = localStorage.getItem('authUser')
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch (error) {
          console.error('Failed to parse stored user:', error)
          localStorage.removeItem('authUser')
        }
      }
    }
  }
  
  // ログイン（デモ用の簡易実装）
  const login = async (email, password) => {
    // 実際の実装ではサーバーサイドで認証を行う
    // デモ用に特定の認証情報のみ受け付ける
    if (email === 'admin@example.com' && password === 'admin123') {
      const userData = {
        id: 1,
        email: email,
        name: '管理者',
        role: 'admin',
        loggedInAt: new Date().toISOString()
      }
      
      user.value = userData
      if (process.client) {
        localStorage.setItem('authUser', JSON.stringify(userData))
      }
      
      return { success: true, user: userData }
    } else {
      return { 
        success: false, 
        error: 'メールアドレスまたはパスワードが正しくありません' 
      }
    }
  }
  
  // ログアウト
  const logout = () => {
    user.value = null
    if (process.client) {
      localStorage.removeItem('authUser')
    }
  }
  
  // 認証状態のチェック
  const isAuthenticated = computed(() => !!user.value)
  
  // 管理者権限のチェック
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  // 記事投稿権限のチェック
  const canPostArticle = computed(() => isAuthenticated.value && isAdmin.value)
  
  return {
    user: readonly(user),
    initAuth,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    canPostArticle
  }
}