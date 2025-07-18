<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// サンプルデータの初期化
const { initSampleArticles } = useInitSampleData()

onMounted(() => {
  // アプリケーション起動時にサンプルデータを初期化
  initSampleArticles()
})
</script>
