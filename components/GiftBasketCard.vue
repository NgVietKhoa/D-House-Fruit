<template>
  <div class="card overflow-hidden group">
    <!-- Gift Basket Image -->
    <NuxtLink :to="`/gift-baskets/${giftBasket.id}`" class="block relative overflow-hidden">
      <div class="aspect-square bg-gradient-to-br from-cream to-light-cream flex items-center justify-center overflow-hidden">
        <!-- Gift basket image -->
        <img 
          :src="getGiftBasketImage(giftBasket)" 
          :alt="giftBasket.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          @error="handleImageError"
        />
      </div>
      
      <!-- Badge -->
      <div v-if="giftBasket.badge" class="absolute top-3 left-3">
        <span 
          class="px-2 py-1 text-xs font-semibold rounded-full text-white"
          :class="getBadgeColor(giftBasket.badge)"
        >
          {{ giftBasket.badge }}
        </span>
      </div>

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <span class="bg-white text-primary-green px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          Xem chi tiết
        </span>
      </div>
    </NuxtLink>

    <!-- Gift Basket Info -->
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-2 font-poppins">
        {{ giftBasket.name }}
      </h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ giftBasket.description }}
      </p>
      
      <!-- Features -->
      <ul class="text-sm text-gray-600 mb-4 space-y-1">
        <li v-for="feature in giftBasket.features.slice(0, 2)" :key="feature" class="flex items-center">
          <CheckIcon class="w-4 h-4 text-primary-green mr-2 flex-shrink-0" />
          <span class="truncate">{{ feature }}</span>
        </li>
        <li v-if="giftBasket.features.length > 2" class="text-xs text-gray-500">
          +{{ giftBasket.features.length - 2 }} tính năng khác
        </li>
      </ul>
      
      <!-- Price -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-xl font-bold text-primary-green">
            {{ formatPrice(giftBasket.price) }}đ
          </span>
          <span v-if="giftBasket.originalPrice" class="text-sm text-gray-500 line-through">
            {{ formatPrice(giftBasket.originalPrice) }}đ
          </span>
        </div>
        <div v-if="giftBasket.originalPrice" class="text-xs text-red-500 font-semibold">
          -{{ getDiscountPercent(giftBasket.price, giftBasket.originalPrice) }}%
        </div>
      </div>

      <!-- Additional Info -->
      <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div class="flex items-center">
          <UsersIcon class="w-4 h-4 mr-1" />
          {{ giftBasket.serves }}
        </div>
        <div class="flex items-center">
          <StarIcon class="w-4 h-4 mr-1 text-yellow-400" />
          {{ giftBasket.rating }} ({{ giftBasket.reviews_count }})
        </div>
      </div>

      <!-- Order Button -->
      <button 
        @click="addToCart"
        class="w-full btn-secondary text-center transition-all duration-200"
        :disabled="!isInStock || isAdding"
        :class="{ 
          'opacity-50 cursor-not-allowed': !isInStock,
          'opacity-75 scale-95': isAdding
        }"
      >
        <GiftIcon class="w-5 h-5 inline mr-2" />
        {{ isAdding ? 'Đang thêm...' : (isInStock ? 'Thêm vào giỏ' : 'Hết hàng') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { GiftIcon, CheckIcon, UsersIcon, StarIcon } from '@heroicons/vue/24/outline'
import { useCart } from '~/composables/useCart'
import { useGiftBaskets } from '~/composables/useGiftBaskets'
import { useToast } from '~/composables/useToast'

const props = defineProps({
  giftBasket: {
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
  return props.giftBasket.stock > 0
})

// Use gift baskets composable for utility functions
const { formatPrice, getDiscountPercent, getBadgeColor } = useGiftBaskets()

// Get gift basket image based on category or type
const getGiftBasketImage = (basket) => {
  const imageMap = {
    'Premium': '/images/giftBaskets/gift-premium.jpg',
    'Standard': '/images/giftBaskets/gift-standard.webp',
    'Basic': '/images/giftBaskets/gift-basic.webp',
    'Corporate': '/images/giftBaskets/gift-corporate.jpg',
    'Seasonal': '/images/giftBaskets/gift-tet.jpg',
    'Birthday': '/images/giftBaskets/gift-birthday.jpg'
  }
  
  // Try to match by category first, then by name containing keywords, then default
  if (imageMap[basket.category]) {
    return imageMap[basket.category]
  }
  
  // Check by name keywords
  if (basket.name.includes('Tết')) {
    return '/images/giftBaskets/gift-tet.jpg'
  }
  if (basket.name.includes('Sinh nhật')) {
    return '/images/giftBaskets/gift-birthday.jpg'
  }
  
  return '/images/giftBaskets/gift-standard.webp'
}

// Cart methods
const isAdding = ref(false)
const addToCart = async () => {
  if (!isInStock.value || isAdding.value) return
  
  isAdding.value = true
  
  try {
    addItemToCart({
      id: props.giftBasket.id,
      type: 'giftBasket',
      quantity: 1
    })
    
    // Show success toast
    success(`Đã thêm ${props.giftBasket.name} vào giỏ hàng!`)
  } finally {
    // Reset flag after a short delay
    setTimeout(() => {
      isAdding.value = false
    }, 500)
  }
}

// Handle image error
const handleImageError = (event) => {
  // Fallback to a default gift basket design
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = `
    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div class="text-center p-8">
        <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-primary-green flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
          </svg>
        </div>
        <p class="text-sm text-gray-600">${props.giftBasket.name}</p>
      </div>
    </div>
  `
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
