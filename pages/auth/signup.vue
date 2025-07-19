<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          新規アカウント作成
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          または
          <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            既存のアカウントでログイン
          </NuxtLink>
        </p>
      </div>
      
      <div v-if="successMessage" class="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md p-4">
        <div class="text-green-800 dark:text-green-200 text-sm">
          {{ successMessage }}
        </div>
      </div>

      <form v-if="!successMessage" class="mt-8 space-y-6" @submit.prevent="handleSignup">
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
            autocomplete="new-password"
            required
            class="relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 focus:z-10 sm:text-sm"
            placeholder="パスワード（6文字以上）"
          />
        </div>
        <div>
          <label for="confirmPassword" class="sr-only">パスワード確認</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            name="confirmPassword"
            type="password"
            autocomplete="new-password"
            required
            class="relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 focus:z-10 sm:text-sm"
            placeholder="パスワード確認"
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
            <span v-if="loading">アカウント作成中...</span>
            <span v-else>アカウントを作成</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const { signUp } = useAuth()

const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleSignup = async () => {
  loading.value = true
  errorMessage.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'パスワードが一致しません。'
    loading.value = false
    return
  }

  if (form.value.password.length < 6) {
    errorMessage.value = 'パスワードは6文字以上で入力してください。'
    loading.value = false
    return
  }

  try {
    const { data, error } = await signUp(form.value.email, form.value.password)
    
    if (error) {
      if (error.message.includes('already registered')) {
        errorMessage.value = 'このメールアドレスは既に登録されています。'
      } else {
        errorMessage.value = 'アカウント作成に失敗しました。入力内容を確認してください。'
      }
    } else {
      successMessage.value = 'アカウントが作成されました！確認メールを送信しましたので、メールを確認してアカウントを有効化してください。'
    }
  } catch (error) {
    errorMessage.value = 'アカウント作成中にエラーが発生しました。'
  } finally {
    loading.value = false
  }
}
</script>