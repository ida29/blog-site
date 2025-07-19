export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const { refreshUser } = useAuth()
    await refreshUser()
  }
})