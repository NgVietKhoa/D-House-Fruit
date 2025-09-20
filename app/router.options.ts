import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  // Tùy chỉnh router options ở đây
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  
  // Custom route matching
  routes: (_routes) => [
    // Thêm custom routes nếu cần
    ..._routes,
  ]
}
