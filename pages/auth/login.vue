<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          アカウントにログイン
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          または
          <NuxtLink to="/auth/signup" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            新しいアカウントを作成
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="sr-only">メールアドレス</label>
          <input
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 focus:z-10 sm:text-sm"
            placeholder="メールアドレス"
          />
        </div>
        <div>
          <label for="password" class="sr-only">パスワード</label>
          <input
            id="password"
            v-model="form.password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 focus:z-10 sm:text-sm"
            placeholder="パスワード"
          />
        </div>

        <div v-if="errorMessage" class="text-red-600 dark:text-red-400 text-sm">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900"
          >
            <span v-if="loading">ログイン中...</span>
            <span v-else>ログイン</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const { signIn } = useAuth()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { data, error } = await signIn(form.value.email, form.value.password)
    
    if (error) {
      errorMessage.value = 'ログインに失敗しました。メールアドレスとパスワードを確認してください。'
    } else {
      await router.push('/')
    }
  } catch (error) {
    errorMessage.value = 'ログイン中にエラーが発生しました。'
  } finally {
    loading.value = false
  }
}
</script>