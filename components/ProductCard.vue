<template>
  <div class="card overflow-hidden group">
    <!-- Product Image -->
    <NuxtLink :to="`/products/${product.id}`" class="block relative overflow-hidden">
      <div class="aspect-square bg-gradient-to-br from-cream to-light-cream overflow-hidden">
        <!-- Product Image -->
        <img 
          :src="product.image || '/images/products/placeholder.webp'" 
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          @error="handleImageError"
        />
      </div>
      
      <!-- Badge -->
      <div v-if="product.badge" class="absolute top-3 left-3">
        <span 
          class="px-2 py-1 text-xs font-semibold rounded-full text-white"
          :class="getBadgeColor(product.badge)"
        >
          {{ product.badge }}
        </span>
      </div>

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <span class="bg-white text-primary-green px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          Xem chi tiết
        </span>
      </div>
    </NuxtLink>

    <!-- Product Info -->
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-2 font-poppins">
        {{ product.name }}
      </h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ product.description }}
      </p>
      
      <!-- Price -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-xl font-bold text-primary-green">
            {{ formatPrice(product.price) }}đ
          </span>
          <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
            {{ formatPrice(product.originalPrice) }}đ
          </span>
        </div>
        <div v-if="product.originalPrice" class="text-xs text-red-500 font-semibold">
          -{{ getDiscountPercent(product.price, product.originalPrice) }}%
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button 
        @click="addToCart"
        class="w-full btn-primary text-center transition-all duration-200"
        :disabled="!isInStock || isAdding"
        :class="{ 
          'opacity-50 cursor-not-allowed': !isInStock,
          'opacity-75 scale-95': isAdding
        }"
      >
        <ShoppingCartIcon class="w-5 h-5 inline mr-2" />
        {{ isAdding ? 'Đang thêm...' : (isInStock ? 'Thêm vào giỏ' : 'Hết hàng') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCart } from '~/composables/useCart'
import { useToast } from '~/composables/useToast'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Cart integration
const { addToCart: addItemToCart } = useCart()

// Toast integration
const { success } = useToast()

// Computed properties
const isInStock = computed(() => {
  return props.product.stock > 0
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const getDiscountPercent = (currentPrice, originalPrice) => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

const getBadgeColor = (badge) => {
  const colors = {
    'Bán chạy': 'bg-red-500',
    'Mới về': 'bg-blue-500',
    'Giảm giá': 'bg-green-500',
    'Khuyến mãi': 'bg-purple-500',
    'Premium': 'bg-yellow-500'
  }
  return colors[badge] || 'bg-gray-500'
}

// Cart methods
const isAdding = ref(false)
const addToCart = async () => {
  if (!isInStock.value || isAdding.value) return
  
  isAdding.value = true
  
  try {
    addItemToCart({
      id: props.product.id,
      type: 'product',
      quantity: 1
    })
    
    // Show success toast
    success(`Đã thêm ${props.product.name} vào giỏ hàng!`)
  } finally {
    // Reset flag after a short delay
    setTimeout(() => {
      isAdding.value = false
    }, 500)
  }
}

const handleImageError = (event) => {
  // Replace with a CSS-based placeholder
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = `
    <div class="w-full h-full bg-gradient-to-br from-primary-green to-green-400 flex items-center justify-center">
      <div class="text-white text-center">
        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
          </svg>
        </div>
        <p class="text-sm font-medium">Hình ảnh sản phẩm</p>
      </div>
    </div>
  `
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
</style>
