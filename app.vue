<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// サンプルデータの初期化
const { initSampleArticles } = useInitSampleData()
// 認証状態の初期化
const { refreshUser } = useAuth()

onMounted(async () => {
  // アプリケーション起動時にサンプルデータを初期化
  initSampleArticles()
  // 認証状態を初期化
  await refreshUser()
})
</script>
