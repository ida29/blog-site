<template>
  <header class="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            yidaのtechブログ
          </NuxtLink>
        </div>
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200">
            ホーム
          </NuxtLink>
          <NuxtLink to="/articles" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200">
            記事一覧
          </NuxtLink>
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
            :title="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
          >
            <svg v-if="!isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </button>
          <NuxtLink v-if="canPostArticle" to="/articles/new" class="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200">
            記事を投稿
          </NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/login" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200">
            ログイン
          </NuxtLink>
          <button v-else @click="handleLogout" class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition duration-200">
            ログアウト
          </button>
        </div>
        <div class="md:hidden flex items-center space-x-2">
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
            :title="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
          >
            <svg v-if="!isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </button>
          <button @click="toggleMenu" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="showMenu" class="md:hidden mt-4 space-y-2 border-t dark:border-gray-700 pt-4">
        <NuxtLink to="/" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">ホーム</NuxtLink>
        <NuxtLink to="/articles" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">記事一覧</NuxtLink>
        <NuxtLink v-if="canPostArticle" to="/articles/new" class="block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600">記事を投稿</NuxtLink>
        <NuxtLink v-if="!isAuthenticated" to="/login" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">ログイン</NuxtLink>
        <button v-else @click="handleLogout" class="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 py-2">ログアウト</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
const showMenu = ref(false)
const { isDark, toggleTheme } = useTheme()
const { isAuthenticated, canPostArticle, logout } = useAuth()
const router = useRouter()

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const handleLogout = async () => {
  logout()
  await router.push('/')
  showMenu.value = false
}
</script>