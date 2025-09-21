<template>
  <div>
    <!-- Page Header -->
    <div class="bg-gradient-to-br from-primary-green via-green-600 to-green-700 text-white">
      <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div class="flex items-center space-x-3 md:space-x-4">
          <div class="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold">
            <BellIcon class="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold">Thông báo</h1>
            <p class="text-green-100 mt-1 text-sm md:text-base">Quản lý thông báo và cài đặt</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <ProfileSidebar />
        </div>

        <!-- Notifications Content -->
        <div class="lg:col-span-3">
          <!-- Notification Settings -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Cài đặt thông báo</h3>
            
            <div class="space-y-4">
              <!-- Email Notifications -->
              <div class="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 class="font-medium text-gray-900">Thông báo qua Email</h4>
                  <p class="text-sm text-gray-600">Nhận thông báo về đơn hàng và khuyến mãi qua email</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="settings.emailNotifications"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <!-- SMS Notifications -->
              <div class="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 class="font-medium text-gray-900">Thông báo qua SMS</h4>
                  <p class="text-sm text-gray-600">Nhận tin nhắn về trạng thái đơn hàng</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="settings.smsNotifications"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <!-- Push Notifications -->
              <div class="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 class="font-medium text-gray-900">Thông báo đẩy</h4>
                  <p class="text-sm text-gray-600">Nhận thông báo trên trình duyệt</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="settings.pushNotifications"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <!-- Marketing Notifications -->
              <div class="flex items-center justify-between py-3">
                <div>
                  <h4 class="font-medium text-gray-900">Thông báo khuyến mãi</h4>
                  <p class="text-sm text-gray-600">Nhận thông tin về ưu đãi và sản phẩm mới</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="settings.marketingNotifications"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>

            <!-- Save Settings Button -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <button
                @click="saveSettings"
                :disabled="isLoading"
                class="px-6 py-2.5 bg-primary-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] touch-manipulation"
              >
                {{ isLoading ? 'Đang lưu...' : 'Lưu cài đặt' }}
              </button>
            </div>
          </div>

          <!-- Notifications List -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <!-- Header -->
            <div class="p-4 md:p-6 border-b border-gray-200">
              <div class="flex flex-col md:flex-row md:items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 mb-2 md:mb-0">Thông báo gần đây</h3>
                <div class="flex items-center space-x-2">
                  <button
                    v-if="unreadCount > 0"
                    @click="markAllAsRead"
                    class="text-sm text-primary-green hover:text-green-700 transition-colors"
                  >
                    Đánh dấu tất cả đã đọc
                  </button>
                  <button
                    v-if="notifications.length > 0"
                    @click="clearAllNotifications"
                    class="text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>
            </div>

            <!-- Notifications -->
            <div class="divide-y divide-gray-200">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                :class="[
                  'p-4 md:p-6 hover:bg-gray-50 transition-colors cursor-pointer',
                  !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                ]"
                @click="markAsRead(notification.id)"
              >
                <div class="flex items-start space-x-4">
                  <!-- Icon -->
                  <div
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                      getNotificationIconBg(notification.type)
                    ]"
                  >
                    <component
                      :is="getNotificationIcon(notification.type)"
                      class="w-5 h-5 text-white"
                    />
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h4
                          :class="[
                            'font-medium mb-1',
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          ]"
                        >
                          {{ notification.title }}
                        </h4>
                        <p class="text-sm text-gray-600 mb-2">
                          {{ notification.message }}
                        </p>
                        <div class="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{{ formatDate(notification.createdAt) }}</span>
                          <span
                            :class="[
                              'px-2 py-1 rounded-full text-xs font-medium',
                              getNotificationTypeBadge(notification.type)
                            ]"
                          >
                            {{ getNotificationTypeText(notification.type) }}
                          </span>
                        </div>
                      </div>

                      <!-- Unread indicator -->
                      <div
                        v-if="!notification.read"
                        class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"
                      ></div>
                    </div>

                    <!-- Action Button -->
                    <div
                      v-if="notification.actionUrl"
                      class="mt-3"
                    >
                      <NuxtLink
                        :to="notification.actionUrl"
                        class="inline-flex items-center px-3 py-1.5 bg-primary-green text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        @click.stop
                      >
                        {{ notification.actionText || 'Xem chi tiết' }}
                      </NuxtLink>
                    </div>
                  </div>

                  <!-- Delete Button -->
                  <button
                    @click.stop="deleteNotification(notification.id)"
                    class="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <XMarkIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="notifications.length === 0" class="text-center py-12">
              <BellIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">Chưa có thông báo</h3>
              <p class="text-gray-600">
                Các thông báo về đơn hàng và khuyến mãi sẽ xuất hiện ở đây
              </p>
            </div>

            <!-- Load More -->
            <div
              v-if="notifications.length > 0 && hasMore"
              class="p-4 md:p-6 border-t border-gray-200 text-center"
            >
              <button
                @click="loadMore"
                :disabled="isLoading"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ isLoading ? 'Đang tải...' : 'Tải thêm' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div
      v-if="message.show"
      :class="[
        'fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300',
        message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]"
    >
      <div class="flex items-center space-x-2">
        <CheckCircleIcon v-if="message.type === 'success'" class="w-5 h-5" />
        <ExclamationCircleIcon v-else class="w-5 h-5" />
        <span>{{ message.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { 
  BellIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ShoppingBagIcon,
  GiftIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import ProfileSidebar from '~/components/ProfileSidebar.vue'

// Meta tags
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

useHead({
  title: 'Thông báo - D\'House Fruit',
  meta: [
    { name: 'description', content: 'Quản lý thông báo tại D\'House Fruit' }
  ]
})

const { user } = useAuth()

// State
const notifications = ref([])
const isLoading = ref(false)
const hasMore = ref(true)

// Settings
const settings = reactive({
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: false,
  marketingNotifications: true
})

// Message state
const message = reactive({
  show: false,
  type: 'success',
  text: ''
})

// Computed
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'order',
    title: 'Đơn hàng đã được giao thành công',
    message: 'Đơn hàng ORD-2024-001 đã được giao đến địa chỉ của bạn lúc 14:30 hôm nay.',
    read: false,
    createdAt: '2024-03-22T14:30:00Z',
    actionUrl: '/orders',
    actionText: 'Xem đơn hàng'
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Khuyến mãi đặc biệt - Giảm 20%',
    message: 'Giảm giá 20% cho tất cả sản phẩm nho Nhật Bản. Áp dụng từ hôm nay đến hết tuần.',
    read: false,
    createdAt: '2024-03-22T09:00:00Z',
    actionUrl: '/fruits?category=nho',
    actionText: 'Mua ngay'
  },
  {
    id: 3,
    type: 'order',
    title: 'Đơn hàng đang được chuẩn bị',
    message: 'Đơn hàng ORD-2024-002 đang được chuẩn bị và sẽ được giao trong 2-4 giờ tới.',
    read: true,
    createdAt: '2024-03-21T16:20:00Z',
    actionUrl: '/orders',
    actionText: 'Theo dõi đơn hàng'
  },
  {
    id: 4,
    type: 'system',
    title: 'Cập nhật chính sách bảo mật',
    message: 'Chúng tôi đã cập nhật chính sách bảo mật để bảo vệ thông tin của bạn tốt hơn.',
    read: true,
    createdAt: '2024-03-20T10:00:00Z',
    actionUrl: '/privacy-policy',
    actionText: 'Đọc thêm'
  },
  {
    id: 5,
    type: 'warning',
    title: 'Sản phẩm trong giỏ hàng sắp hết',
    message: 'Nho mẫu đơn Nhật Bản trong giỏ hàng của bạn chỉ còn 3 sản phẩm. Đặt hàng ngay để không bỏ lỡ!',
    read: true,
    createdAt: '2024-03-19T15:45:00Z',
    actionUrl: '/cart',
    actionText: 'Xem giỏ hàng'
  }
]

// Methods
const showMessage = (type, text) => {
  message.show = true
  message.type = type
  message.text = text
  
  setTimeout(() => {
    message.show = false
  }, 5000)
}

const formatDate = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return 'Vừa xong'
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`
  } else if (diffInHours < 48) {
    return 'Hôm qua'
  } else {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }
}

const getNotificationIcon = (type) => {
  const icons = {
    order: ShoppingBagIcon,
    promotion: GiftIcon,
    warning: ExclamationTriangleIcon,
    system: InformationCircleIcon
  }
  return icons[type] || BellIcon
}

const getNotificationIconBg = (type) => {
  const colors = {
    order: 'bg-blue-500',
    promotion: 'bg-green-500',
    warning: 'bg-yellow-500',
    system: 'bg-gray-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getNotificationTypeBadge = (type) => {
  const badges = {
    order: 'bg-blue-100 text-blue-800',
    promotion: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    system: 'bg-gray-100 text-gray-800'
  }
  return badges[type] || 'bg-gray-100 text-gray-800'
}

const getNotificationTypeText = (type) => {
  const texts = {
    order: 'Đơn hàng',
    promotion: 'Khuyến mãi',
    warning: 'Cảnh báo',
    system: 'Hệ thống'
  }
  return texts[type] || 'Thông báo'
}

const saveSettings = async () => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showMessage('success', 'Lưu cài đặt thành công!')
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const markAsRead = async (notificationId) => {
  const notification = notifications.value.find(n => n.id === notificationId)
  if (notification && !notification.read) {
    notification.read = true
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 200))
    } catch (error) {
      // Revert on error
      notification.read = false
    }
  }
}

const markAllAsRead = async () => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    notifications.value.forEach(n => n.read = true)
    showMessage('success', 'Đã đánh dấu tất cả thông báo đã đọc!')
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const deleteNotification = async (notificationId) => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = notifications.value.findIndex(n => n.id === notificationId)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const clearAllNotifications = async () => {
  if (!confirm('Bạn có chắc chắn muốn xóa tất cả thông báo?')) return
  
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    notifications.value = []
    showMessage('success', 'Đã xóa tất cả thông báo!')
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const loadMore = async () => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock: no more notifications to load
    hasMore.value = false
    showMessage('success', 'Không có thông báo nào khác!')
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Load mock data
  notifications.value = [...mockNotifications]
})
</script>

<style scoped>
/* Custom styles */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Toggle switch styles */
.peer:checked + div {
  background-color: #16a34a;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
