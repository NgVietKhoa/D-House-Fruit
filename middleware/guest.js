export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()
  
  // If user is already authenticated, redirect to home page
  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})
