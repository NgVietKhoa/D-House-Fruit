<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
    <!-- User Info -->
    <div class="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-200">
      <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
        {{ getInitials(user?.fullName) }}
      </div>
      <div>
        <h3 class="font-semibold text-gray-900 text-sm md:text-base">{{ user?.fullName || 'Người dùng' }}</h3>
        <p class="text-xs md:text-sm text-gray-600 truncate">{{ user?.email }}</p>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="space-y-2">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-colors duration-200 min-h-[44px] touch-manipulation"
        :class="isActive(item.path) 
          ? 'bg-green-50 text-green-700 border-l-4 border-green-500' 
          : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'"
      >
        <component :is="item.icon" class="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
        <span class="truncate">{{ item.label }}</span>
        <span v-if="item.badge" class="ml-auto">
          <span class="inline-flex items-center px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex-shrink-0">
            {{ item.badge }}
          </span>
        </span>
      </NuxtLink>
    </nav>

    <!-- Order Stats -->
    <div class="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
      <h4 class="text-xs md:text-sm font-medium text-gray-900 mb-2 md:mb-3">Thống kê đơn hàng</h4>
      <div class="space-y-2">
        <div class="flex justify-between text-xs md:text-sm">
          <span class="text-gray-600">Tổng đơn hàng:</span>
          <span class="font-medium text-gray-900">{{ orderStats.total }}</span>
        </div>
        <div class="flex justify-between text-xs md:text-sm">
          <span class="text-gray-600">Đã giao:</span>
          <span class="font-medium text-green-600">{{ orderStats.delivered }}</span>
        </div>
        <div class="flex justify-between text-xs md:text-sm">
          <span class="text-gray-600">Đang giao:</span>
          <span class="font-medium text-blue-600">{{ orderStats.shipping }}</span>
        </div>
        <div class="flex justify-between text-xs md:text-sm">
          <span class="text-gray-600">Đang xử lý:</span>
          <span class="font-medium text-yellow-600">{{ orderStats.processing }}</span>
        </div>
      </div>
    </div>

    <!-- Logout Button -->
    <div class="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
      <button
        @click="handleLogout"
        :disabled="isLoading"
        class="w-full flex items-center justify-center space-x-2 px-3 md:px-4 py-2 md:py-2.5 bg-red-50 text-red-700 rounded-lg text-xs md:text-sm font-medium hover:bg-red-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
      >
        <ArrowRightOnRectangleIcon class="w-4 h-4 md:w-5 md:h-5" />
        <span>{{ isLoading ? 'Đang đăng xuất...' : 'Đăng xuất' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useOrders } from '~/composables/useOrders'
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon,
  HeartIcon,
  BellIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const { user, logout, isLoading, getInitials } = useAuth()
const { orderStats } = useOrders()

const menuItems = computed(() => [
  {
    path: '/profile',
    label: 'Thông tin cá nhân',
    icon: UserIcon
  },
  {
    path: '/orders',
    label: 'Đơn hàng của tôi',
    icon: ShoppingBagIcon,
    badge: orderStats.value.processing > 0 ? orderStats.value.processing : null
  },
  {
    path: '/profile/addresses',
    label: 'Sổ địa chỉ',
    icon: MapPinIcon
  },
  {
    path: '/profile/payment',
    label: 'Phương thức thanh toán',
    icon: CreditCardIcon
  },
  {
    path: '/profile/favorites',
    label: 'Sản phẩm yêu thích',
    icon: HeartIcon
  },
  {
    path: '/profile/notifications',
    label: 'Thông báo',
    icon: BellIcon
  }
])

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const handleLogout = async () => {
  const result = await logout()
  if (result.success) {
    await router.push('/')
  }
}
</script>

<style scoped>
/* Custom styles for active state */
.router-link-active {
  @apply bg-green-50 text-green-700;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .sidebar-mobile {
    @apply fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 p-4 z-50;
  }
  
  .sidebar-mobile nav {
    @apply flex space-x-1 space-y-0 overflow-x-auto;
  }
  
  .sidebar-mobile nav a {
    @apply flex-col items-center text-xs px-2 py-2 min-w-0 flex-shrink-0;
  }
  
  .sidebar-mobile nav a span:last-child {
    @apply mt-1 truncate max-w-12;
  }
}
</style>
