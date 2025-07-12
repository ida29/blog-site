export const useTheme = () => {
  const isDark = ref(false)

  // テーマを初期化
  const initTheme = () => {
    if (process.client) {
      // 初期化時にまず既存のクラスをチェック
      const hasExistingDarkClass = document.documentElement.classList.contains('dark')
      
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      } else if (hasExistingDarkClass) {
        // 既にdarkクラスがある場合はdarkモードとして設定
        isDark.value = true
        localStorage.setItem('theme', 'dark')
      } else {
        // システムの設定を確認
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDark.value = prefersDark
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light')
      }
      
      applyTheme()
      
      // システムの色設定変更を監視
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e) => {
        if (!localStorage.getItem('theme')) {
          isDark.value = e.matches
          applyTheme()
        }
      }
      mediaQuery.addEventListener('change', handleChange)
    }
  }

  // テーマを適用
  const applyTheme = () => {
    if (process.client) {
      const htmlElement = document.documentElement
      if (isDark.value) {
        htmlElement.classList.add('dark')
      } else {
        htmlElement.classList.remove('dark')
      }
    }
  }

  // テーマを切り替え
  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (process.client) {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
    applyTheme()
  }

  // テーマを監視
  watch(isDark, () => {
    applyTheme()
  }, { immediate: false })

  return {
    isDark: readonly(isDark),
    initTheme,
    toggleTheme
  }
}