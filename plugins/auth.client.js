export default defineNuxtPlugin(() => {
  const { initAuth } = useAuth()
  
  // クライアントサイドでのみ認証状態を初期化
  initAuth()
})