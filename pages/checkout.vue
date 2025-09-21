<template>
  <div>
    <!-- Page Header -->
    <div class="bg-gradient-to-br from-primary-green via-green-600 to-green-700 text-white">
      <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div class="flex items-center space-x-3 md:space-x-4">
          <div class="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold">
            <ShoppingBagIcon class="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold">Thanh toán</h1>
            <p class="text-green-100 mt-1 text-sm md:text-base">Hoàn tất đơn hàng của bạn</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <div v-if="!isEmpty" class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <!-- Left Column - Checkout Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Delivery Information -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Thông tin giao hàng</h2>
              <button
                v-if="user && savedAddresses.length > 0"
                @click="showAddressModal = true"
                class="text-sm text-primary-green hover:text-green-700 transition-colors"
              >
                Chọn từ sổ địa chỉ
              </button>
            </div>
            
            <form class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="checkoutForm.fullName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="checkoutForm.phone"
                    type="tel"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                    placeholder="0987654321"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ giao hàng <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="checkoutForm.address"
                  rows="3"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none text-base md:text-sm"
                  placeholder="Nhập địa chỉ giao hàng đầy đủ"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú đơn hàng
                </label>
                <textarea
                  v-model="checkoutForm.notes"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none text-base md:text-sm"
                  placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                ></textarea>
              </div>
            </form>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
            
            <div class="space-y-3">
              <!-- COD -->
              <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  v-model="checkoutForm.paymentMethod"
                  type="radio"
                  value="cod"
                  class="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <div class="ml-3 flex items-center space-x-3">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <BanknotesIcon class="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Thanh toán khi nhận hàng (COD)</div>
                    <div class="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</div>
                  </div>
                </div>
              </label>

              <!-- Bank Transfer -->
              <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  v-model="checkoutForm.paymentMethod"
                  type="radio"
                  value="bank_transfer"
                  class="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <div class="ml-3 flex items-center space-x-3">
                  <div class="w-8 h-8 bg-white border border-gray-200 rounded-md flex items-center justify-center p-1">
                    <img src="/images/pay/mbbank.png" alt="MBBank" class="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Chuyển khoản ngân hàng</div>
                    <div class="text-sm text-gray-600">MBBank - 0123456789</div>
                  </div>
                </div>
              </label>

              <!-- Digital Wallets -->
              <label
                v-for="wallet in availableWallets"
                :key="wallet.id"
                class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  v-model="checkoutForm.paymentMethod"
                  type="radio"
                  :value="wallet.value"
                  class="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <div class="ml-3 flex items-center space-x-3">
                  <div class="w-8 h-8 bg-white border border-gray-200 rounded-md flex items-center justify-center p-1">
                    <img :src="wallet.logo" :alt="wallet.name" class="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ wallet.name }}</div>
                    <div class="text-sm text-gray-600">{{ wallet.description }}</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 sticky top-4">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
            
            <!-- Cart Items -->
            <div class="space-y-3 mb-4">
              <div
                v-for="item in cartItemsWithDetails"
                :key="`${item.type}-${item.id}`"
                class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <img
                  :src="(item.data && item.data.image) || '/images/placeholder.jpg'"
                  :alt="(item.data && item.data.name) || 'Sản phẩm'"
                  class="w-12 h-12 object-cover rounded-md"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-gray-900 text-sm truncate">
                    {{ (item.data && item.data.name) || 'Sản phẩm không xác định' }}
                  </h4>
                  <p class="text-xs text-gray-600">Số lượng: {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-medium text-gray-900">
                  {{ formatPrice(item.subtotal || 0) }}
                </div>
              </div>
            </div>

            <!-- Order Totals -->
            <div class="border-t border-gray-200 pt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Tạm tính:</span>
                <span class="font-medium">{{ formatPrice(cartTotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Phí giao hàng:</span>
                <span class="font-medium">{{ formatPrice(shippingFee) }}</span>
              </div>
              <div v-if="discount > 0" class="flex justify-between text-sm text-green-600">
                <span>Giảm giá:</span>
                <span class="font-medium">-{{ formatPrice(discount) }}</span>
              </div>
              <div class="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Tổng cộng:</span>
                <span>{{ formatPrice(finalTotal) }}</span>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              @click="handlePlaceOrder"
              :disabled="isLoading || !isFormValid"
              class="w-full mt-6 px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-h-[44px] touch-manipulation"
            >
              {{ isLoading ? 'Đang xử lý...' : `Đặt hàng - ${formatPrice(finalTotal)}` }}
            </button>

            <!-- Security Note -->
            <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex items-start space-x-2">
                <ShieldCheckIcon class="w-5 h-5 text-blue-600 mt-0.5" />
                <div class="text-sm text-blue-800">
                  <p class="font-medium mb-1">Thanh toán an toàn</p>
                  <p>Thông tin của bạn được bảo mật và mã hóa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-12">
        <ShoppingBagIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Giỏ hàng trống</h3>
        <p class="text-gray-600 mb-6">Thêm sản phẩm vào giỏ hàng để tiến hành thanh toán</p>
        <NuxtLink
          to="/fruits"
          class="inline-flex items-center px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Mua sắm ngay
        </NuxtLink>
      </div>
    </div>

    <!-- Address Selection Modal -->
    <div
      v-if="showAddressModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="showAddressModal = false"
    >
      <div
        class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-4 md:p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Chọn địa chỉ giao hàng</h3>
            <button
              @click="showAddressModal = false"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>

          <div class="space-y-3">
            <div
              v-for="address in savedAddresses"
              :key="address.id"
              class="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              @click="selectAddress(address)"
            >
              <div class="flex items-start justify-between">
                <div>
                  <div class="font-medium text-gray-900">{{ address.label }}</div>
                  <div class="text-sm text-gray-600 mt-1">
                    <div>{{ address.fullName }} - {{ address.phone }}</div>
                    <div>{{ address.address }}</div>
                    <div>{{ address.ward }}, {{ address.district }}, {{ address.city }}</div>
                  </div>
                </div>
                <span
                  v-if="address.isDefault"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  Mặc định
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast messages are handled by ToastContainer in layout -->
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'
import { useOrders } from '~/composables/useOrders'
import { useToast } from '~/composables/useToast'
import { 
  ShoppingBagIcon, 
  BanknotesIcon,
  ShieldCheckIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Meta tags
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Thanh toán - D\'House Fruit',
  meta: [
    { name: 'description', content: 'Thanh toán đơn hàng tại D\'House Fruit' }
  ]
})

const router = useRouter()
const { user } = useAuth()
const { 
  cartItems, 
  cartItemsWithDetails, 
  cartTotal, 
  isEmpty, 
  clearCart 
} = useCart()
const { createOrder } = useOrders()
const { success, error, loading } = useToast()

// State
const isLoading = ref(false)
const showAddressModal = ref(false)

// Form data
const checkoutForm = reactive({
  fullName: '',
  phone: '',
  address: '',
  notes: '',
  paymentMethod: 'cod'
})

// Remove old message state - using toast system now

// Mock saved addresses
const savedAddresses = ref([
  {
    id: 1,
    label: 'Nhà riêng',
    fullName: 'Nguyễn Văn A',
    phone: '0987654321',
    address: '123 Nguyễn Huệ',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    isDefault: true
  }
])

// Available payment methods
const availableWallets = [
  {
    id: 1,
    name: 'MoMo',
    value: 'momo',
    description: 'Thanh toán qua ví MoMo',
    logo: '/images/pay/momo.webp'
  },
  {
    id: 2,
    name: 'ZaloPay',
    value: 'zalopay',
    description: 'Thanh toán qua ví ZaloPay',
    logo: '/images/pay/zalopay.webp'
  },
  {
    id: 3,
    name: 'VNPay',
    value: 'vnpay',
    description: 'Thanh toán qua VNPay',
    logo: '/images/pay/vnpay.webp'
  }
]

// Computed
const shippingFee = computed(() => {
  return cartTotal.value >= 500000 ? 0 : 30000 // Free shipping over 500k
})

const discount = computed(() => {
  return 0 // Can add discount logic here
})

const finalTotal = computed(() => {
  return cartTotal.value + shippingFee.value - discount.value
})

const isFormValid = computed(() => {
  return checkoutForm.fullName && 
         checkoutForm.phone && 
         checkoutForm.address && 
         checkoutForm.paymentMethod
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

// Remove old showMessage function - using toast system now

const selectAddress = (address) => {
  checkoutForm.fullName = address.fullName
  checkoutForm.phone = address.phone
  checkoutForm.address = `${address.address}, ${address.ward}, ${address.district}, ${address.city}`
  showAddressModal.value = false
}

const handlePlaceOrder = async () => {
  if (!isFormValid.value) {
    error('Vui lòng điền đầy đủ thông tin')
    return
  }

  isLoading.value = true

  try {
    // Create order
    const orderData = {
      items: cartItems.value,
      customerInfo: {
        fullName: checkoutForm.fullName,
        phone: checkoutForm.phone,
        address: checkoutForm.address,
        notes: checkoutForm.notes
      },
      paymentMethod: checkoutForm.paymentMethod,
      subtotal: cartTotal.value,
      shippingFee: shippingFee.value,
      discount: discount.value,
      total: finalTotal.value
    }

    const result = await createOrder(orderData)
    
    if (result.success) {
      // Clear cart
      clearCart()
      
      success('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại D\'House Fruit')
      
      // Redirect to order confirmation
      setTimeout(() => {
        router.push(`/orders`)
      }, 2000)
    } else {
      error(result.message || 'Có lỗi xảy ra khi đặt hàng')
    }
  } catch (err) {
    error('Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

// Initialize form with user data
onMounted(() => {
  if (user.value) {
    checkoutForm.fullName = user.value.fullName || ''
    checkoutForm.phone = user.value.phone || ''
    
    // Use default address if available
    const defaultAddress = savedAddresses.value.find(addr => addr.isDefault)
    if (defaultAddress) {
      checkoutForm.address = `${defaultAddress.address}, ${defaultAddress.ward}, ${defaultAddress.district}, ${defaultAddress.city}`
    }
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
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  .sticky {
    position: static;
  }
}
</style>
