<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div>
        <h2 class="text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          ログイン
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          管理者アカウントでログインしてください
        </p>
      </div>
      
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              メールアドレス
            </label>
            <input
              id="email"
              v-model="credentials.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@example.com"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              パスワード
            </label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div v-if="error" class="text-red-600 dark:text-red-400 text-sm text-center">
          {{ error }}
        </div>
        
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              ログイン中...
            </span>
            <span v-else>ログイン</span>
          </button>
        </div>
        
        <div class="text-sm text-center text-gray-600 dark:text-gray-400">
          <p>デモ用認証情報:</p>
          <p>メール: admin@example.com</p>
          <p>パスワード: admin123</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const { login } = useAuth()

const credentials = ref({
  email: '',
  password: ''
})

const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true
  
  try {
    const result = await login(credentials.value.email, credentials.value.password)
    
    if (result.success) {
      // ログイン成功後、前のページまたはホームページにリダイレクト
      const redirectTo = router.currentRoute.value.query.redirect || '/'
      await router.push(redirectTo)
    } else {
      error.value = result.error
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'ログインに失敗しました。もう一度お試しください。'
  } finally {
    isLoading.value = false
  }
}

useHead({
  title: 'ログイン - yidaのtechブログ',
  meta: [
    { name: 'description', content: '管理者ログインページ' }
  ]
})
</script>