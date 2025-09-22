<template>
  <section class="relative overflow-hidden mobile-container">
    <!-- Banner Slider -->
    <div class="hero-banner relative h-[280px] sm:h-[380px] md:h-[450px] lg:h-[580px] rounded-[10px] overflow-hidden">
      <!-- Banner Images -->
      <div class="absolute inset-0">
        <div 
          v-for="(banner, index) in banners" 
          :key="index"
          :class="['absolute inset-0 transition-opacity duration-1000', 
                   currentSlide === index ? 'opacity-100' : 'opacity-0']"
        >
          <img 
            :src="banner.image" 
            :alt="banner.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button 
        @click="previousSlide"
        @touchstart.passive="true"
        class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 text-white p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm touch-target"
        aria-label="Previous banner"
      >
        <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button 
        @click="nextSlide"
        @touchstart.passive="true"
        class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 text-white p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm touch-target"
        aria-label="Next banner"
      >
        <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <!-- Dots Indicator -->
      <div class="dots-container absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
        <button
          v-for="(banner, index) in banners"
          :key="index"
          @click="currentSlide = index"
          @touchstart.passive="true"
          class="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 touch-target flex items-center justify-center"
          :aria-label="`Go to banner ${index + 1}`"
        >
          <span :class="['w-2 h-2 sm:w-3 sm:h-3 rounded-full', currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50']"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive data
const currentSlide = ref(0)
let autoSlideInterval = null

// Banner data
const banners = ref([
  {
    image: '/images/banner/banner1.png',
    title: 'Banner 1'
  },
  {
    image: '/images/banner/banner2.png',
    title: 'Banner 2'
  },
  {
    image: '/images/banner/banner3.png',
    title: 'Banner 3'
  }
])

// Methods
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % banners.value.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? banners.value.length - 1 : currentSlide.value - 1
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

const handleImageError = (event) => {
  // Fallback to a gradient background if image fails to load
  event.target.style.display = 'none'
  event.target.parentElement.style.background = 'linear-gradient(135deg, #7AC74F 0%, #4ade80 100%)'
}

// Lifecycle
onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>
