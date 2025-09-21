<template>
  <div>
    <!-- Page Header -->
    <div class="bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold">Đơn hàng của tôi</h1>
            <p class="text-green-100 mt-1">Theo dõi và quản lý các đơn hàng của bạn</p>
          </div>
          <div class="hidden md:flex items-center space-x-6 text-sm">
            <div class="text-center">
              <div class="text-2xl font-bold">{{ orderStats.total }}</div>
              <div class="text-green-100">Tổng đơn</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold">{{ orderStats.delivered }}</div>
              <div class="text-green-100">Đã giao</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold">{{ orderStats.processing }}</div>
              <div class="text-green-100">Đang xử lý</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <ProfileSidebar />
        </div>

        <!-- Orders Content -->
        <div class="lg:col-span-3">
          <!-- Filter Tabs -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  v-for="tab in filterTabs"
                  :key="tab.key"
                  @click="activeFilter = tab.key"
                  :class="[
                    'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeFilter === tab.key
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  {{ tab.label }}
                  <span
                    v-if="tab.count > 0"
                    :class="[
                      'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      activeFilter === tab.key
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-900'
                    ]"
                  >
                    {{ tab.count }}
                  </span>
                </button>
              </nav>
            </div>
          </div>

          <!-- Orders List -->
          <div class="space-y-6">
            <div
              v-for="order in filteredOrders"
              :key="order.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <!-- Order Header -->
              <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div class="flex flex-col md:flex-row md:items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div>
                      <h3 class="font-semibold text-gray-900">Đơn hàng {{ order.id }}</h3>
                      <p class="text-sm text-gray-600">{{ formatDate(order.orderDate) }}</p>
                    </div>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatusColor(order.status)
                      ]"
                    >
                      {{ getStatusText(order.status) }}
                    </span>
                  </div>
                  <div class="mt-2 md:mt-0 flex items-center space-x-4">
                    <div class="text-right">
                      <div class="font-semibold text-gray-900">{{ formatPrice(order.total) }}</div>
                      <div class="text-sm text-gray-600">{{ order.items.length }} sản phẩm</div>
                    </div>
                    <div class="flex space-x-2">
                      <button
                        @click="toggleOrderDetails(order.id)"
                        class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        {{ expandedOrders.includes(order.id) ? 'Thu gọn' : 'Chi tiết' }}
                      </button>
                      <button
                        v-if="canCancelOrder(order)"
                        @click="handleCancelOrder(order.id)"
                        class="px-3 py-1 text-sm bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                      >
                        Hủy đơn
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order Details (Expandable) -->
              <div v-if="expandedOrders.includes(order.id)" class="px-6 py-4">
                <!-- Order Items -->
                <div class="space-y-4 mb-6">
                  <h4 class="font-medium text-gray-900">Sản phẩm đã đặt:</h4>
                  <div
                    v-for="item in getOrderWithDetails(order).items"
                    :key="`${item.id}-${item.type}`"
                    class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      :src="item.data?.image || '/images/placeholder.jpg'"
                      :alt="item.data?.name"
                      class="w-16 h-16 object-cover rounded-lg"
                    />
                    <div class="flex-1">
                      <h5 class="font-medium text-gray-900">{{ item.data?.name }}</h5>
                      <p class="text-sm text-gray-600">
                        {{ formatPrice(item.price) }} × {{ item.quantity }}
                      </p>
                    </div>
                    <div class="text-right">
                      <div class="font-medium text-gray-900">{{ formatPrice(item.subtotal) }}</div>
                    </div>
                  </div>
                </div>

                <!-- Order Summary -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Shipping Address -->
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3">Địa chỉ giao hàng:</h4>
                    <div class="text-sm text-gray-600 space-y-1">
                      <div class="font-medium">{{ order.shippingAddress.fullName }}</div>
                      <div>{{ order.shippingAddress.phone }}</div>
                      <div>{{ order.shippingAddress.address }}</div>
                      <div>{{ order.shippingAddress.ward }}, {{ order.shippingAddress.district }}</div>
                      <div>{{ order.shippingAddress.city }}</div>
                    </div>
                  </div>

                  <!-- Order Summary -->
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3">Tổng kết đơn hàng:</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Tạm tính:</span>
                        <span>{{ formatPrice(order.subtotal) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Phí vận chuyển:</span>
                        <span>{{ order.shippingCost > 0 ? formatPrice(order.shippingCost) : 'Miễn phí' }}</span>
                      </div>
                      <div class="flex justify-between font-medium text-base pt-2 border-t border-gray-200">
                        <span>Tổng cộng:</span>
                        <span class="text-green-600">{{ formatPrice(order.total) }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Payment Method & Notes -->
                <div class="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-medium text-gray-900 mb-2">Phương thức thanh toán:</h4>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ getPaymentMethodText(order.paymentMethod) }}
                    </span>
                  </div>
                  <div v-if="order.notes">
                    <h4 class="font-medium text-gray-900 mb-2">Ghi chú:</h4>
                    <p class="text-sm text-gray-600">{{ order.notes }}</p>
                  </div>
                </div>

                <!-- Order Timeline -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <h4 class="font-medium text-gray-900 mb-4">Trạng thái đơn hàng:</h4>
                  <div class="relative">
                    <div class="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                    <div class="space-y-6">
                      <div class="relative flex items-start">
                        <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckIcon class="w-4 h-4 text-white" />
                        </div>
                        <div class="ml-4">
                          <p class="text-sm font-medium text-gray-900">Đơn hàng đã được tạo</p>
                          <p class="text-xs text-gray-500">{{ formatDate(order.orderDate) }}</p>
                        </div>
                      </div>
                      
                      <div v-if="order.status !== 'cancelled'" class="relative flex items-start">
                        <div :class="[
                          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                          ['confirmed', 'shipping', 'delivered'].includes(order.status) 
                            ? 'bg-green-500' : 'bg-gray-300'
                        ]">
                          <CheckIcon v-if="['confirmed', 'shipping', 'delivered'].includes(order.status)" class="w-4 h-4 text-white" />
                          <div v-else class="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div class="ml-4">
                          <p class="text-sm font-medium text-gray-900">Đơn hàng đã được xác nhận</p>
                          <p class="text-xs text-gray-500">
                            {{ ['confirmed', 'shipping', 'delivered'].includes(order.status) ? 'Đã hoàn thành' : 'Đang chờ xử lý' }}
                          </p>
                        </div>
                      </div>

                      <div v-if="order.status !== 'cancelled'" class="relative flex items-start">
                        <div :class="[
                          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                          ['shipping', 'delivered'].includes(order.status) 
                            ? 'bg-green-500' : 'bg-gray-300'
                        ]">
                          <CheckIcon v-if="['shipping', 'delivered'].includes(order.status)" class="w-4 h-4 text-white" />
                          <div v-else class="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div class="ml-4">
                          <p class="text-sm font-medium text-gray-900">Đang giao hàng</p>
                          <p class="text-xs text-gray-500">
                            {{ ['shipping', 'delivered'].includes(order.status) ? 'Đang trên đường giao' : 'Chưa bắt đầu' }}
                          </p>
                        </div>
                      </div>

                      <div v-if="order.status !== 'cancelled'" class="relative flex items-start">
                        <div :class="[
                          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                          order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
                        ]">
                          <CheckIcon v-if="order.status === 'delivered'" class="w-4 h-4 text-white" />
                          <div v-else class="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div class="ml-4">
                          <p class="text-sm font-medium text-gray-900">Giao hàng thành công</p>
                          <p class="text-xs text-gray-500">
                            {{ order.deliveryDate ? formatDate(order.deliveryDate) : 'Chưa giao hàng' }}
                          </p>
                        </div>
                      </div>

                      <div v-if="order.status === 'cancelled'" class="relative flex items-start">
                        <div class="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <XMarkIcon class="w-4 h-4 text-white" />
                        </div>
                        <div class="ml-4">
                          <p class="text-sm font-medium text-gray-900">Đơn hàng đã bị hủy</p>
                          <p class="text-xs text-gray-500">{{ formatDate(order.cancelDate) }}</p>
                          <p v-if="order.cancelReason" class="text-xs text-gray-500 mt-1">
                            Lý do: {{ order.cancelReason }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredOrders.length === 0" class="text-center py-12">
              <ShoppingBagIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
              <p class="text-gray-600 mb-6">
                {{ activeFilter === 'all' ? 'Bạn chưa có đơn hàng nào.' : `Không có đơn hàng ${getFilterLabel(activeFilter)}.` }}
              </p>
              <NuxtLink
                to="/products"
                class="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Mua sắm ngay
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Order Modal -->
    <div
      v-if="showCancelModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="showCancelModal = false"
    >
      <div
        class="bg-white rounded-lg max-w-md w-full p-6"
        @click.stop
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Hủy đơn hàng</h3>
        <p class="text-gray-600 mb-4">Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
        
        <div class="mb-4">
          <label for="cancelReason" class="block text-sm font-medium text-gray-700 mb-2">
            Lý do hủy đơn (tùy chọn):
          </label>
          <textarea
            id="cancelReason"
            v-model="cancelReason"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
            placeholder="Nhập lý do hủy đơn hàng..."
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            @click="showCancelModal = false"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
          <button
            @click="confirmCancelOrder"
            :disabled="isLoading"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ isLoading ? 'Đang hủy...' : 'Xác nhận hủy' }}
          </button>
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
import { useOrders } from '~/composables/useOrders'
import { 
  CheckIcon, 
  XMarkIcon, 
  ShoppingBagIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'
import ProfileSidebar from '~/components/ProfileSidebar.vue'

// Meta tags
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

useHead({
  title: 'Đơn hàng của tôi - D\'House Fruit',
  meta: [
    { name: 'description', content: 'Theo dõi và quản lý các đơn hàng tại D\'House Fruit' }
  ]
})

const {
  ordersWithDetails,
  orderStats,
  isLoading,
  cancelOrder,
  getStatusText,
  getStatusColor,
  formatPrice,
  formatDate,
  canCancelOrder
} = useOrders()

// State
const activeFilter = ref('all')
const expandedOrders = ref([])
const showCancelModal = ref(false)
const cancelOrderId = ref('')
const cancelReason = ref('')

// Message state
const message = reactive({
  show: false,
  type: 'success',
  text: ''
})

// Computed
const filterTabs = computed(() => [
  { 
    key: 'all', 
    label: 'Tất cả', 
    count: orderStats.value.total 
  },
  { 
    key: 'processing', 
    label: 'Đang xử lý', 
    count: orderStats.value.processing 
  },
  { 
    key: 'shipping', 
    label: 'Đang giao hàng', 
    count: orderStats.value.shipping 
  },
  { 
    key: 'delivered', 
    label: 'Đã giao hàng', 
    count: orderStats.value.delivered 
  },
  { 
    key: 'cancelled', 
    label: 'Đã hủy', 
    count: orderStats.value.cancelled 
  }
])

const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') {
    return ordersWithDetails.value
  }
  return ordersWithDetails.value.filter(order => order.status === activeFilter.value)
})

// Methods
const showMessage = (type, text) => {
  message.show = true
  message.type = type
  message.text = text
  
  setTimeout(() => {
    message.show = false
  }, 5000)
}

const toggleOrderDetails = (orderId) => {
  const index = expandedOrders.value.indexOf(orderId)
  if (index > -1) {
    expandedOrders.value.splice(index, 1)
  } else {
    expandedOrders.value.push(orderId)
  }
}

const getOrderWithDetails = (order) => {
  return ordersWithDetails.value.find(o => o.id === order.id) || order
}

const getPaymentMethodText = (method) => {
  const methods = {
    'cod': 'Thanh toán khi nhận hàng',
    'bank_transfer': 'Chuyển khoản ngân hàng',
    'credit_card': 'Thẻ tín dụng',
    'e_wallet': 'Ví điện tử'
  }
  return methods[method] || method
}

const getFilterLabel = (filter) => {
  const labels = {
    'processing': 'đang xử lý',
    'shipping': 'đang giao hàng',
    'delivered': 'đã giao hàng',
    'cancelled': 'đã hủy'
  }
  return labels[filter] || filter
}

const handleCancelOrder = (orderId) => {
  cancelOrderId.value = orderId
  showCancelModal.value = true
}

const confirmCancelOrder = async () => {
  try {
    const result = await cancelOrder(cancelOrderId.value, cancelReason.value)
    
    if (result.success) {
      showMessage('success', 'Hủy đơn hàng thành công!')
      showCancelModal.value = false
      cancelReason.value = ''
      cancelOrderId.value = ''
    } else {
      showMessage('error', result.message || 'Có lỗi xảy ra khi hủy đơn hàng')
    }
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  }
}

// Lifecycle
onMounted(() => {
  // Auto-expand first order if exists
  if (ordersWithDetails.value.length > 0) {
    expandedOrders.value.push(ordersWithDetails.value[0].id)
  }
})
</script>

<style scoped>
/* Custom styles */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .container {
    @apply px-2;
  }
  
  .grid {
    @apply gap-4;
  }
  
  .px-6 {
    @apply px-4;
  }
  
  .py-8 {
    @apply py-4;
  }
  
  .space-x-8 {
    @apply space-x-4;
  }
  
  .space-x-6 {
    @apply space-x-3;
  }
}

/* Timeline styles */
.timeline-item {
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 32px;
  bottom: -24px;
  width: 2px;
  background-color: #e5e7eb;
}

.timeline-item:last-child::before {
  display: none;
}
</style>
