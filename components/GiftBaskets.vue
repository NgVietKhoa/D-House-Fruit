<template>
  <section class="py-16 bg-gradient-to-br from-cream to-light-cream">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 font-poppins">
            Giỏ quà tặng cao cấp
          </h2>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Những giỏ quà được thiết kế tinh tế, kết hợp hài hòa các loại hoa quả nhập khẩu cao cấp. 
            Hoàn hảo cho mọi dịp đặc biệt: sinh nhật, kỷ niệm, thăm hỏi, hay làm quà tặng doanh nghiệp.
          </p>

          <!-- Features -->
          <div class="space-y-4 mb-8">
            <div class="flex items-center space-x-3">
              <div class="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                <CheckIcon class="w-4 h-4 text-white" />
              </div>
              <span class="text-gray-700">Thiết kế sang trọng, đóng gói cẩn thận</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                <CheckIcon class="w-4 h-4 text-white" />
              </div>
              <span class="text-gray-700">Hoa quả tươi ngon, chọn lọc kỹ càng</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                <CheckIcon class="w-4 h-4 text-white" />
              </div>
              <span class="text-gray-700">Giao hàng nhanh chóng, bảo quản lạnh</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                <CheckIcon class="w-4 h-4 text-white" />
              </div>
              <span class="text-gray-700">Thiệp chúc mừng miễn phí theo yêu cầu</span>
            </div>
          </div>

          <NuxtLink to="/gift-baskets" class="btn-secondary">
            Đặt giỏ quà ngay
          </NuxtLink>
        </div>

        <!-- Gift Basket Showcase -->
        <div class="relative">
          <div class="grid grid-cols-2 gap-4">
            <!-- Large basket -->
            <div v-if="featuredBaskets[0]" class="col-span-2 card p-6">
              <div class="aspect-video rounded-xl overflow-hidden mb-4">
                <img 
                  :src="getGiftBasketImage(featuredBaskets[0])" 
                  :alt="featuredBaskets[0].name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ featuredBaskets[0].name }}</h3>
              <p class="text-gray-600 text-sm mb-3">{{ featuredBaskets[0].description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-primary-green">{{ formatPrice(featuredBaskets[0].price) }}đ</span>
                <NuxtLink to="/gift-baskets" class="btn-primary text-sm py-2 px-4">Đặt ngay</NuxtLink>
              </div>
            </div>

            <!-- Small baskets -->
            <div v-for="basket in featuredBaskets.slice(1, 3)" :key="basket.id" class="card p-4">
              <div class="aspect-square rounded-lg overflow-hidden mb-3">
                <img 
                  :src="getGiftBasketImage(basket)" 
                  :alt="basket.name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <h4 class="font-semibold text-gray-800 text-sm mb-1">{{ basket.name }}</h4>
              <p class="text-gray-600 text-xs mb-2">{{ basket.serves }}</p>
              <span class="text-primary-green font-bold">{{ formatPrice(basket.price) }}đ</span>
            </div>
          </div>

          <!-- Floating decoration -->
          <div class="absolute -top-6 -right-6 w-20 h-20 bg-primary-green rounded-full flex items-center justify-center shadow-lg">
            <HeartIcon class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckIcon, GiftIcon, HeartIcon } from '@heroicons/vue/24/outline'

// Use gift baskets composable
const { getFeaturedGiftBaskets, formatPrice } = useGiftBaskets()

// Get featured gift baskets
const featuredBaskets = computed(() => getFeaturedGiftBaskets(3))

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

// Handle image error
const handleImageError = (event) => {
  // Fallback to a default gift basket design
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = `
    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div class="text-center p-4">
        <div class="w-16 h-16 mx-auto mb-2 rounded-full bg-primary-green flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
          </svg>
        </div>
        <p class="text-sm text-gray-600">Giỏ quà</p>
      </div>
    </div>
  `
}
</script>
