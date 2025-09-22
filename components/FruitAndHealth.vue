<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-poppins">
          Hoa quả và sức khỏe
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Khám phá những lợi ích tuyệt vời của hoa quả đối với sức khỏe của bạn
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
        <!-- Left Side - Enhanced Fruits List -->
        <div class="space-y-6">
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-xl border border-gray-100">
            <!-- Header with icon -->
            <div class="flex items-center mb-6">
              <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-800">Danh sách hoa quả</h3>
                <p class="text-sm text-gray-500">{{ fruits.length }} loại hoa quả tươi ngon</p>
              </div>
            </div>

            <!-- Enhanced scrollable list -->
            <div class="relative">
              <!-- Gradient fade at top -->
              <div class="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none rounded-t-xl"></div>
              
              <!-- Scrollable container -->
              <div class="max-h-96 overflow-y-auto space-y-2 pr-3 enhanced-scrollbar">
                <div v-for="(fruit, index) in fruits" :key="fruit.id" 
                     class="group relative flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
                     :class="selectedFruit.id === fruit.id 
                       ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 shadow-lg' 
                       : 'bg-white/80 hover:bg-white border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-lg'"
                     @click="selectFruit(fruit)"
                     :style="{ animationDelay: `${index * 0.1}s` }">
                  
                  <!-- Fruit image with enhanced styling -->
                  <div class="relative flex-shrink-0">
                    <div class="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg ring-2 ring-white group-hover:ring-green-200 transition-all duration-300"
                         :class="selectedFruit.id === fruit.id ? 'ring-green-400 scale-110' : ''">
                      <img :src="fruit.image" :alt="fruit.name" 
                           class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                           @error="handleImageError" />
                    </div>
                    <!-- Selection indicator -->
                    <div v-if="selectedFruit.id === fruit.id" 
                         class="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Fruit info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h4 class="text-base font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">
                          {{ fruit.name }}
                        </h4>
                        <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ fruit.shortDescription }}</p>
                        
                        <!-- Health rating with enhanced design -->
                        <div class="flex items-center space-x-2">
                          <div class="flex space-x-1">
                            <div v-for="i in 5" :key="i" 
                                 class="w-2 h-2 rounded-full transition-all duration-200"
                                 :class="i <= fruit.healthRating 
                                   ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-sm' 
                                   : 'bg-gray-200'">
                            </div>
                          </div>
                          <span class="text-xs font-medium text-gray-500">{{ fruit.healthRating }}/5</span>
                        </div>
                      </div>
                      
                      <!-- Nutrition info badge -->
                      <div class="ml-2 text-right">
                        <div class="text-xs font-bold text-green-600">{{ fruit.calories }} cal</div>
                        <div class="text-xs text-gray-500">{{ fruit.vitaminC }}mg C</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Hover arrow indicator -->
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Gradient fade at bottom -->
              <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none rounded-b-xl"></div>
            </div>
            
            <!-- Footer stats -->
            <div class="mt-6 pt-4 border-t border-gray-100">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">Tổng cộng</span>
                <span class="font-semibold text-gray-700">{{ fruits.length }} loại hoa quả</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Center - 3D Visual Display -->
        <div class="relative">
          <!-- Central Circle with Selected Fruit -->
          <div class="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto">
            <!-- Main circle background -->
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <div class="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div class="text-center">
                  <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full overflow-hidden bg-white shadow-lg mb-2 sm:mb-4">
                    <img :src="selectedFruit.image" :alt="selectedFruit.name" 
                         class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                         @error="handleImageError" />
                  </div>
                  <h3 class="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1">{{ selectedFruit.name }}</h3>
                  <p class="text-xs sm:text-sm font-medium text-gray-600">{{ selectedFruit.origin }}</p>
                </div>
              </div>
            </div>
            
            <!-- Rotating measuring tape animation - reduced on mobile -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 border-2 sm:border-4 border-dashed border-yellow-400 rounded-full opacity-20 sm:opacity-30"
                   :class="isMobile ? 'animate-spin-slower' : 'animate-spin-slow'"></div>
            </div>
            
            <!-- 3D Floating fruits with enhanced positioning -->
            <div v-for="(fruit, index) in floatingFruits" :key="fruit.id"
                 class="absolute cursor-pointer transform-gpu touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                 :style="getEnhanced3DPosition(index)"
                 :class="[
                   `animation-delay-${index}`,
                   isMobile ? 'animate-float-gentle' : 'animate-float-orbit'
                 ]"
                 @click="selectFruit(fruit)"
                 @touchstart.passive="true">
              
              <!-- 3D Fruit container with depth -->
              <div class="relative group">
                <!-- Shadow beneath fruit - reduced on mobile -->
                <div class="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 md:w-10 lg:w-12 h-1.5 sm:h-2 md:h-3 lg:h-4 bg-black/15 sm:bg-black/20 rounded-full blur-sm opacity-40 sm:opacity-60"></div>
                
                <!-- Main fruit sphere with 3D effect -->
                <div class="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-3d-float border-2 border-white/80 transform-gpu transition-all duration-300"
                     :class="[
                       selectedFruit.id === fruit.id ? 'ring-2 sm:ring-4 ring-green-400 scale-105 sm:scale-110 -translate-y-0.5 sm:-translate-y-1' : '',
                       isMobile ? 'hover:scale-105 active:scale-95' : 'group-hover:scale-125 group-hover:-translate-y-2'
                     ]">
                  
                  <!-- Inner glow -->
                  <div class="absolute inset-1 rounded-full bg-gradient-to-br from-white/60 to-transparent"></div>
                  
                  <!-- Fruit image -->
                  <div class="absolute inset-2 sm:inset-3 rounded-full overflow-hidden">
                    <img :src="fruit.image" :alt="fruit.name" 
                         class="w-full h-full object-cover transform-gpu transition-transform duration-300"
                         :class="isMobile ? 'group-hover:rotate-6' : 'group-hover:rotate-12'"
                         @error="handleImageError" />
                  </div>
                  
                  <!-- Shine effect -->
                  <div class="absolute inset-2 sm:inset-3 rounded-full bg-gradient-to-tr from-white/50 via-transparent to-transparent pointer-events-none"></div>
                  
                  <!-- Selection indicator with 3D effect -->
                  <div v-if="selectedFruit.id === fruit.id" 
                       class="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-2 md:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-3d-small transform-gpu"
                       :class="isMobile ? 'animate-pulse' : 'animate-bounce-3d'">
                    <svg class="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                
                <!-- Floating fruit name - hidden on mobile to reduce clutter -->
                <div class="hidden sm:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-2 py-1 rounded-full shadow-sm">
                  {{ fruit.name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Health Information -->
        <div class="relative">
          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 relative overflow-hidden">
            <!-- Quote mark -->
            <div class="absolute top-4 left-4 text-6xl text-green-200 font-serif">"</div>
            
            <div class="relative z-10 pt-8">
              <!-- Selected Fruit Info -->
              <div class="mb-6">
                <h4 class="text-xl font-bold text-gray-800 mb-3">{{ selectedFruit.name }}</h4>
                
                <!-- Nutritional Info -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div class="bg-white/50 rounded-lg p-3 text-center">
                    <div class="text-lg font-bold text-green-600">{{ selectedFruit.calories }}</div>
                    <div class="text-xs text-gray-600">Calories/100g</div>
                  </div>
                  <div class="bg-white/50 rounded-lg p-3 text-center">
                    <div class="text-lg font-bold text-blue-600">{{ selectedFruit.vitaminC }}</div>
                    <div class="text-xs text-gray-600">Vitamin C (mg)</div>
                  </div>
                </div>
              </div>

              <!-- Health Benefits -->
              <div class="mb-6">
                <h5 class="text-sm font-semibold text-gray-800 mb-2">Lợi ích sức khỏe:</h5>
                <ul class="space-y-1">
                  <li v-for="(benefit, index) in selectedFruit.healthBenefits.slice(0, 3)" :key="index" 
                      class="flex items-start space-x-2">
                    <div class="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span class="text-sm text-gray-700">{{ benefit }}</span>
                  </li>
                </ul>
              </div>

              <p class="text-gray-700 leading-relaxed text-sm">
                {{ selectedFruit.detailedDescription.substring(0, 150) }}...
              </p>
              
              <!-- Decorative dots -->
              <div class="flex space-x-2 mt-4">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <div class="w-2 h-2 bg-green-300 rounded-full"></div>
                <div class="w-2 h-2 bg-green-200 rounded-full"></div>
              </div>
            </div>
            
            <!-- Background decoration -->
            <div class="absolute bottom-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 transform translate-x-16 translate-y-16"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Fruits data with detailed information
const fruits = [
  {
    id: 1,
    name: 'Táo đỏ',
    shortDescription: 'Giàu chất xơ và vitamin C',
    image: '/images/fruits/apple.png',
    origin: 'Mỹ, New Zealand',
    healthRating: 5,
    calories: 52,
    vitaminC: 4.6,
    healthBenefits: [
      'Giảm cholesterol xấu trong máu',
      'Hỗ trợ tiêu hóa và giảm cân',
      'Tăng cường hệ miễn dịch',
      'Chống oxy hóa, làm chậm quá trình lão hóa'
    ],
    detailedDescription: 'Táo đỏ là một trong những loại hoa quả phổ biến nhất thế giới. Chứa nhiều chất xơ, vitamin C và các chất chống oxy hóa mạnh. Ăn táo thường xuyên giúp giảm nguy cơ mắc bệnh tim mạch và tiểu đường.'
  },
  {
    id: 2,
    name: 'Kiwi',
    shortDescription: 'Siêu thực phẩm giàu vitamin C',
    image: '/images/fruits/kiwi.png',
    origin: 'New Zealand, Canada',
    healthRating: 5,
    calories: 61,
    vitaminC: 92.7,
    healthBenefits: [
      'Chứa vitamin C gấp 2 lần cam',
      'Hỗ trợ hệ miễn dịch mạnh mẽ',
      'Giúp tiêu hóa tốt nhờ enzyme actinidin',
      'Chống viêm và bảo vệ tim mạch'
    ],
    detailedDescription: 'Kiwi được mệnh danh là "vua vitamin C" với hàm lượng vitamin C cao gấp đôi cam. Đây là siêu thực phẩm lý tưởng cho phụ nữ, giúp làm đẹp da và tăng cường sức khỏe tổng thể.'
  },
  {
    id: 3,
    name: 'Nho tím',
    shortDescription: 'Chống oxy hóa mạnh mẽ',
    image: '/images/fruits/grape.png',
    origin: 'Mỹ, Chile',
    healthRating: 4,
    calories: 62,
    vitaminC: 10.8,
    healthBenefits: [
      'Chứa resveratrol chống lão hóa',
      'Hỗ trợ giảm cân hiệu quả',
      'Bảo vệ tim mạch và não bộ',
      'Chống viêm và tăng cường miễn dịch'
    ],
    detailedDescription: 'Nho tím chứa resveratrol - một chất chống oxy hóa mạnh mẽ. Được coi là siêu thực phẩm tốt nhất cho việc giảm cân và chống lão hóa, đặc biệt tốt cho sức khỏe tim mạch.'
  },
  {
    id: 4,
    name: 'Dâu tây',
    shortDescription: 'Ngọt ngào và giàu chất chống oxy hóa',
    image: '/images/fruits/strawberry.png',
    origin: 'Mỹ, Mexico',
    healthRating: 4,
    calories: 32,
    vitaminC: 58.8,
    healthBenefits: [
      'Giàu anthocyanin chống oxy hóa',
      'Hỗ trợ làm đẹp da tự nhiên',
      'Tăng cường trí nhớ',
      'Giảm viêm và bảo vệ mắt'
    ],
    detailedDescription: 'Dâu tây không chỉ ngon mà còn rất tốt cho sức khỏe. Chứa nhiều vitamin C, folate và các chất chống oxy hóa giúp làm đẹp da và tăng cường sức khỏe não bộ.'
  },
  {
    id: 5,
    name: 'Cam navel',
    shortDescription: 'Nguồn vitamin C tự nhiên',
    image: '/images/fruits/orange.png',
    origin: 'Mỹ, Úc',
    healthRating: 4,
    calories: 47,
    vitaminC: 53.2,
    healthBenefits: [
      'Tăng cường hệ miễn dịch',
      'Hỗ trợ hấp thụ sắt',
      'Giảm cholesterol',
      'Bảo vệ da khỏi tia UV'
    ],
    detailedDescription: 'Cam navel là nguồn vitamin C tự nhiên tuyệt vời. Ngoài ra còn chứa folate, kali và các flavonoid có tác dụng chống viêm và bảo vệ tim mạch.'
  },
  {
    id: 6,
    name: 'Chuối',
    shortDescription: 'Giàu kali và năng lượng',
    image: '/images/fruits/banana.png',
    origin: 'Ecuador, Philippines',
    healthRating: 4,
    calories: 89,
    vitaminC: 8.7,
    healthBenefits: [
      'Cung cấp năng lượng tức thì',
      'Giàu kali tốt cho tim',
      'Hỗ trợ tiêu hóa',
      'Cải thiện tâm trạng'
    ],
    detailedDescription: 'Chuối là nguồn năng lượng tự nhiên tuyệt vời, giàu kali, vitamin B6 và chất xơ. Đặc biệt tốt cho vận động viên và những người cần năng lượng nhanh chóng.'
  },
  {
    id: 7,
    name: 'Xoài',
    shortDescription: 'Vua của các loại trái cây',
    image: '/images/fruits/mango.png',
    origin: 'Mexico, Peru',
    healthRating: 5,
    calories: 60,
    vitaminC: 36.4,
    healthBenefits: [
      'Giàu vitamin A và C',
      'Hỗ trợ tiêu hóa',
      'Tăng cường miễn dịch',
      'Bảo vệ mắt và da'
    ],
    detailedDescription: 'Xoài được mệnh danh là "vua của các loại trái cây" nhờ hương vị ngọt ngào và giá trị dinh dưỡng cao. Chứa nhiều vitamin A, C và các enzyme tiêu hóa tự nhiên.'
  },
  {
    id: 8,
    name: 'Bơ',
    shortDescription: 'Siêu thực phẩm giàu chất béo tốt',
    image: '/images/fruits/avocado.png',
    origin: 'Mexico, Peru',
    healthRating: 5,
    calories: 160,
    vitaminC: 10,
    healthBenefits: [
      'Giàu chất béo không bão hòa',
      'Hỗ trợ hấp thụ vitamin',
      'Tốt cho tim mạch',
      'Giúp kiểm soát cân nặng'
    ],
    detailedDescription: 'Bơ là siêu thực phẩm giàu chất béo tốt, giúp hấp thụ vitamin tan trong chất béo. Mặc dù có nhiều calories nhưng rất tốt cho sức khỏe tim mạch và não bộ.'
  }
]

// Selected fruit for display
const selectedFruit = ref(fruits[0])

// Floating fruits (first 6 fruits for the circle)
const floatingFruits = computed(() => fruits.slice(0, 6))

// Reactive mobile detection
const isMobile = ref(false)
const isTablet = ref(false)

// Function to select a fruit
const selectFruit = (fruit) => {
  selectedFruit.value = fruit
}

// Enhanced 3D positioning function - responsive and stable
const getEnhanced3DPosition = (index) => {
  const angle = (index * 60) * (Math.PI / 180) // 60 degrees apart
  
  let radius, centerX, centerY, fruitSize
  
  if (isMobile.value) {
    radius = 85 // Smaller, more stable radius for mobile
    centerX = 112 // Half of container width (224px)
    centerY = 112 // Half of container height (224px)
    fruitSize = 20 // Half of fruit size (40px)
  } else if (isTablet.value) {
    radius = 110 // Medium radius for tablet
    centerX = 128 // Half of container width (256px)
    centerY = 128 // Half of container height (256px)
    fruitSize = 24 // Half of fruit size (48px)
  } else {
    radius = 140 // Full radius for desktop
    centerX = 144 // Half of container width (288px)
    centerY = 144 // Half of container height (288px)
    fruitSize = 32 // Half of fruit size (64px)
  }
  
  // Reduced randomness for mobile stability
  const offsetX = Math.sin(index) * (isMobile.value ? 2 : 8)
  const offsetY = Math.cos(index) * (isMobile.value ? 3 : 12)
  
  const x = centerX + radius * Math.cos(angle) - fruitSize + offsetX
  const y = centerY + radius * Math.sin(angle) - fruitSize + offsetY
  
  return {
    left: `${Math.round(x)}px`,
    top: `${Math.round(y)}px`,
    animationDelay: `${index * (isMobile.value ? 0.5 : 1)}s`,
    transform: isMobile.value 
      ? `translateZ(0)` // No 3D transform on mobile for stability
      : `translateZ(${Math.sin(index) * 20}px)`
  }
}

// Check screen size on mount and resize
const checkScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 640
    isTablet.value = window.innerWidth >= 640 && window.innerWidth < 1024
  }
}

// Initialize screen size detection
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkScreenSize)
  }
})

// Function to handle image error - replace with placeholder
const handleImageError = (event) => {
  const img = event.target
  const fruitName = img.alt
  
  // Create a simple colored placeholder based on fruit name
  const colors = {
    'Táo đỏ': '#ef4444',
    'Kiwi': '#22c55e', 
    'Nho tím': '#8b5cf6',
    'Dâu tây': '#f97316',
    'Cam navel': '#f59e0b',
    'Chuối': '#eab308',
    'Xoài': '#f59e0b',
    'Bơ': '#16a34a'
  }
  
  const color = colors[fruitName] || '#6b7280'
  
  // Create SVG placeholder
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="${color}" opacity="0.2"/>
      <text x="50" y="55" text-anchor="middle" font-family="Arial" font-size="12" fill="${color}" font-weight="bold">
        ${fruitName}
      </text>
    </svg>
  `
  
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  img.src = url
}
</script>

<style scoped>
/* Enhanced Custom Scrollbar */
.enhanced-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.enhanced-scrollbar::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
  border-radius: 12px;
  margin: 8px 0;
}

.enhanced-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #059669);
  border-radius: 12px;
  border: 2px solid #f8fafc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.enhanced-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #047857);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.enhanced-scrollbar::-webkit-scrollbar-thumb:active {
  background: linear-gradient(to bottom, #047857, #065f46);
}

/* Enhanced 3D Perspective and Transforms */
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.transform-gpu {
  transform: translateZ(0);
  will-change: transform;
}

/* 3D Shadow Effects */
.shadow-3d {
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 5px 15px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.8),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.shadow-3d-float {
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.9),
    inset 0 -2px 4px rgba(0, 0, 0, 0.05);
}

.shadow-3d-small {
  box-shadow: 
    0 5px 15px rgba(0, 0, 0, 0.25),
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
}

.text-shadow-3d {
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(255, 255, 255, 0.8);
}

/* 3D Rotation and Float Animations */
@keyframes rotate-3d {
  0% { transform: rotateY(0deg) rotateX(5deg); }
  50% { transform: rotateY(180deg) rotateX(-5deg); }
  100% { transform: rotateY(360deg) rotateX(5deg); }
}

@keyframes float-3d {
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
  }
  25% { 
    transform: translateY(-10px) rotateX(5deg) rotateY(90deg); 
  }
  50% { 
    transform: translateY(-5px) rotateX(0deg) rotateY(180deg); 
  }
  75% { 
    transform: translateY(-15px) rotateX(-5deg) rotateY(270deg); 
  }
}

@keyframes float-orbit {
  0%, 100% { 
    transform: translateY(0px) translateZ(10px) rotateY(0deg); 
  }
  25% { 
    transform: translateY(-8px) translateZ(20px) rotateY(5deg); 
  }
  50% { 
    transform: translateY(-15px) translateZ(10px) rotateY(0deg); 
  }
  75% { 
    transform: translateY(-8px) translateZ(20px) rotateY(-5deg); 
  }
}

@keyframes bounce-3d {
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) scale(1); 
  }
  50% { 
    transform: translateY(-10px) rotateX(15deg) scale(1.1); 
  }
}

@keyframes orbit-slow {
  from { transform: rotate(0deg) translateZ(0); }
  to { transform: rotate(360deg) translateZ(0); }
}

@keyframes orbit-reverse {
  from { transform: rotate(360deg) translateZ(0); }
  to { transform: rotate(0deg) translateZ(0); }
}

@keyframes pulse-shadow {
  0%, 100% { 
    opacity: 0.3; 
    transform: translateX(-50%) scale(1); 
  }
  50% { 
    opacity: 0.6; 
    transform: translateX(-50%) scale(1.2); 
  }
}

@keyframes ping-slow {
  0% { 
    transform: scale(1); 
    opacity: 1; 
  }
  75%, 100% { 
    transform: scale(1.5); 
    opacity: 0; 
  }
}

@keyframes float-particle {
  0%, 100% { 
    opacity: 0.3;
    transform: translateY(0px) translateX(0px) scale(1); 
  }
  50% { 
    opacity: 1;
    transform: translateY(-20px) translateX(10px) scale(1.5); 
  }
}

@keyframes pulse-hologram {
  0%, 100% { 
    opacity: 0.2;
    transform: scale(1); 
  }
  50% { 
    opacity: 0.4;
    transform: scale(1.02); 
  }
}

/* Gradient Conic for outer ring */
.bg-gradient-conic {
  background: conic-gradient(from 0deg, #bbf7d0, #6ee7b7, #34d399, #10b981, #059669, #047857, #bbf7d0);
}

/* Mobile-optimized gentle animations */
@keyframes float-gentle {
  0%, 100% { 
    transform: translateY(0px) translateZ(0); 
  }
  50% { 
    transform: translateY(-5px) translateZ(0); 
  }
}

@keyframes spin-slower {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Animation Classes */
.animate-rotate-3d {
  animation: rotate-3d 30s linear infinite;
}

.animate-float-3d {
  animation: float-3d 8s ease-in-out infinite;
}

.animate-float-orbit {
  animation: float-orbit 6s ease-in-out infinite;
}

.animate-float-gentle {
  animation: float-gentle 4s ease-in-out infinite;
}

.animate-bounce-3d {
  animation: bounce-3d 2s ease-in-out infinite;
}

.animate-orbit-slow {
  animation: orbit-slow 25s linear infinite;
}

.animate-spin-slower {
  animation: spin-slower 40s linear infinite;
}

.animate-orbit-reverse {
  animation: orbit-reverse 20s linear infinite;
}

.animate-pulse-shadow {
  animation: pulse-shadow 3s ease-in-out infinite;
}

.animate-ping-slow {
  animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-float-particle {
  animation: float-particle 4s ease-in-out infinite;
}

.animate-pulse-hologram {
  animation: pulse-hologram 4s ease-in-out infinite;
}

/* Hover Effects with 3D transforms */
.hover\:rotateY-15:hover {
  transform: rotateY(15deg);
}

/* Touch-friendly interactions */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  .transform-gpu {
    transform: translateZ(0);
    will-change: auto;
  }
  
  /* Reduce motion for better performance */
  @media (prefers-reduced-motion: reduce) {
    .animate-float-orbit,
    .animate-float-gentle,
    .animate-spin-slow,
    .animate-spin-slower {
      animation: none;
    }
  }
  
  /* Ensure minimum touch targets */
  .min-h-\[44px\] {
    min-height: 44px;
  }
  
  .min-w-\[44px\] {
    min-width: 44px;
  }
}

/* Performance optimizations */
.will-change-transform {
  will-change: transform;
}

.backface-hidden {
  backface-visibility: hidden;
}

/* Smooth font rendering */
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>