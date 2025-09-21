<template>
  <div>
    <!-- SEO Meta Tags -->
    <Head>
      <title>Giỏ hàng - D'House Fruit</title>
      <meta name="description" content="Giỏ hàng của bạn tại D'House Fruit - Hoa quả nhập khẩu cao cấp và giỏ quà tặng" />
    </Head>

    <!-- Breadcrumb -->
    <Breadcrumb 
      :items="[
        { text: 'Trang chủ', href: '/' },
        { text: 'Giỏ hàng' }
      ]"
      theme="light"
    />

    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Giỏ hàng của bạn</h1>
        <p class="text-gray-600">
          <span v-if="!isEmpty">{{ cartItemsCount }} sản phẩm trong giỏ hàng</span>
          <span v-else>Giỏ hàng trống</span>
        </p>
      </div>

      <!-- Empty Cart -->
      <div v-if="isEmpty" class="text-center py-16">
        <div class="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCartIcon class="w-16 h-16 text-gray-400" />
        </div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Giỏ hàng trống</h2>
        <p class="text-gray-600 mb-8">Hãy thêm một số sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <div class="space-x-4">
          <NuxtLink 
            to="/fruits" 
            class="inline-flex items-center px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <span>Mua hoa quả</span>
          </NuxtLink>
          <NuxtLink 
            to="/giftBaskets" 
            class="inline-flex items-center px-6 py-3 bg-primary-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <span>Mua giỏ quà</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <!-- Cart Header -->
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-800">Sản phẩm đã chọn</h2>
            </div>

            <!-- Cart Items List -->
            <div class="divide-y divide-gray-200">
              <div 
                v-for="item in cartItemsWithDetails" 
                :key="`${item.type}-${item.id}`"
                class="p-6 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center space-x-4">
                  <!-- Product Image -->
                  <div class="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative">
                    <img 
                      v-if="item.data && item.data.image"
                      :src="item.data.image" 
                      :alt="item.data.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                    <div 
                      v-if="!item.data || !item.data.image" 
                      class="w-full h-full flex items-center justify-center"
                    >
                      <div 
                        class="w-12 h-12 rounded-full flex items-center justify-center"
                        :class="(item.data && item.data.colorClass) || 'bg-primary-green'"
                      >
                        <GiftIcon v-if="item.type === 'giftBasket'" class="w-6 h-6 text-white" />
                        <span v-else class="text-white font-bold text-sm">
                          {{ (item.data && item.data.name) ? item.data.name.charAt(0) : '?' }}
                        </span>
                      </div>
                    </div>
                    <!-- Fallback for broken images -->
                    <div 
                      class="absolute inset-0 w-full h-full items-center justify-center hidden"
                      style="background-color: #f3f4f6;"
                    >
                      <div 
                        class="w-12 h-12 rounded-full flex items-center justify-center"
                        :class="(item.data && item.data.colorClass) || 'bg-primary-green'"
                      >
                        <GiftIcon v-if="item.type === 'giftBasket'" class="w-6 h-6 text-white" />
                        <span v-else class="text-white font-bold text-sm">
                          {{ (item.data && item.data.name) ? item.data.name.charAt(0) : '?' }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Product Info -->
                  <div class="flex-grow">
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="font-semibold text-gray-800">{{ item.data.name }}</h3>
                        <p class="text-sm text-gray-600 mt-1">
                          <span v-if="item.type === 'product'">{{ item.data.origin }}</span>
                          <span v-else>{{ item.data.category }}</span>
                        </p>
                        <div class="flex items-center mt-2">
                          <span class="text-lg font-bold text-primary-green">
                            {{ formatPrice(item.data.salePrice || item.data.price) }}
                          </span>
                          <span v-if="item.data.salePrice" class="ml-2 text-sm text-gray-500 line-through">
                            {{ formatPrice(item.data.price) }}
                          </span>
                        </div>
                      </div>

                      <!-- Remove Button -->
                      <button
                        @click="removeFromCart(item.id, item.type)"
                        class="text-gray-400 hover:text-red-500 transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <XMarkIcon class="w-5 h-5" />
                      </button>
                    </div>

                    <!-- Quantity Controls -->
                    <div class="flex items-center justify-between mt-4">
                      <div class="flex items-center border border-gray-300 rounded-lg">
                        <button
                          @click="updateQuantity(item.id, item.type, item.quantity - 1)"
                          class="p-2 hover:bg-gray-100 transition-colors"
                          :disabled="item.quantity <= 1"
                        >
                          <MinusIcon class="w-4 h-4" />
                        </button>
                        <span class="px-4 py-2 font-semibold">{{ item.quantity }}</span>
                        <button
                          @click="updateQuantity(item.id, item.type, item.quantity + 1)"
                          class="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <PlusIcon class="w-4 h-4" />
                        </button>
                      </div>

                      <!-- Subtotal -->
                      <div class="text-right">
                        <span class="text-lg font-bold text-gray-800">
                          {{ formatPrice(item.subtotal) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cart Actions -->
            <div class="p-6 border-t border-gray-200 bg-gray-50">
              <div class="flex items-center justify-between">
                <button
                  @click="clearCart"
                  class="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Xóa tất cả
                </button>
                <NuxtLink 
                  to="/fruits"
                  class="text-primary-green hover:text-green-600 font-medium transition-colors"
                >
                  ← Tiếp tục mua sắm
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
            <!-- Summary Header -->
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-800">Tóm tắt đơn hàng</h2>
            </div>

            <!-- Summary Content -->
            <div class="p-6 space-y-4">
              <!-- Subtotal -->
              <div class="flex justify-between">
                <span class="text-gray-600">Tạm tính ({{ cartItemsCount }} sản phẩm)</span>
                <span class="font-semibold">{{ formatPrice(cartTotal) }}</span>
              </div>

              <!-- Shipping -->
              <div class="flex justify-between">
                <span class="text-gray-600">Phí vận chuyển</span>
                <span class="font-semibold">
                  <span v-if="getShippingCost() === 0" class="text-green-600">Miễn phí</span>
                  <span v-else>{{ formatPrice(getShippingCost()) }}</span>
                </span>
              </div>

              <!-- Free shipping notice -->
              <div v-if="getShippingCost() > 0" class="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <InformationCircleIcon class="w-4 h-4 inline mr-1" />
                Mua thêm {{ formatPrice(500000 - cartTotal) }} để được miễn phí vận chuyển
              </div>

              <!-- Divider -->
              <hr class="border-gray-200">

              <!-- Total -->
              <div class="flex justify-between text-lg font-bold">
                <span>Tổng cộng</span>
                <span class="text-primary-green">{{ formatPrice(getFinalTotal()) }}</span>
              </div>

              <!-- Checkout Button -->
              <button
                class="w-full bg-primary-green text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                @click="proceedToCheckout"
              >
                Tiến hành thanh toán
              </button>

              <!-- Payment Methods -->
              <div class="text-center text-sm text-gray-600 mt-4">
                <p class="mb-2">Chúng tôi chấp nhận</p>
                <div class="flex justify-center space-x-2">
                  <div class="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                  <div class="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                  <div class="w-8 h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center">ATM</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="mt-6 bg-gradient-to-r from-primary-green to-green-600 rounded-lg p-6 text-white">
            <h3 class="font-semibold mb-3">Cần hỗ trợ?</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <PhoneIcon class="w-4 h-4 mr-2" />
                <a href="tel:1900123456" class="hover:underline">1900 123 456</a>
              </div>
              <div class="flex items-center">
                <EnvelopeIcon class="w-4 h-4 mr-2" />
                <a href="mailto:support@dhousefruit.com" class="hover:underline">support@dhousefruit.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ShoppingCartIcon, 
  XMarkIcon, 
  MinusIcon, 
  PlusIcon, 
  GiftIcon,
  InformationCircleIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline'
import { useCart } from '~/composables/useCart'

// Cart composable
const {
  cartItemsWithDetails,
  cartItemsCount,
  cartTotal,
  isEmpty,
  removeFromCart,
  updateQuantity,
  clearCart,
  formatPrice,
  getShippingCost,
  getFinalTotal
} = useCart()

// Methods
const handleImageError = (event) => {
  // Hide the broken image and show fallback
  event.target.style.display = 'none'
  // Find the parent container and show the fallback div
  const container = event.target.closest('.w-20.h-20')
  if (container) {
    const fallback = container.querySelector('div:last-child')
    if (fallback) {
      fallback.style.display = 'flex'
    }
  }
}

const proceedToCheckout = () => {
  // Test với trang đơn giản trước
  navigateTo('/checkout')
}
</script>
