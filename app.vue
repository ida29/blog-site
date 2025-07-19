<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// サンプルデータの初期化
const { initSampleArticles } = useInitSampleData()
const { refreshUser, initAuthListener } = useAuth()

onMounted(async () => {
  // アプリケーション起動時にサンプルデータを初期化
  initSampleArticles()
  
  // 認証状態を復元
  await refreshUser()
  
  // 認証状態変更のリスナーを初期化
  initAuthListener()
})
</script>
