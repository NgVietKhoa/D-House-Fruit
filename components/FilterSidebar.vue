<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
    <!-- Categories Filter -->
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Danh mục</h3>
      <div class="space-y-3">
        <label v-for="category in categories" :key="category.id" 
               class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
          <input 
            type="checkbox" 
            :value="category.id"
            v-model="selectedCategories"
            @change="updateFilters"
            class="w-4 h-4 text-primary-green border-gray-300 rounded focus:ring-primary-green"
          >
          <span class="ml-3 text-gray-700">{{ category.name }}</span>
          <span class="ml-auto text-xs text-gray-500">({{ category.count }})</span>
        </label>
      </div>
    </div>

    <!-- Price Filter -->
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Lọc theo giá</h3>
      
      <!-- Price Range Slider -->
      <div class="mb-4">
        <div class="flex items-center space-x-4 mb-3">
          <div class="flex-1">
            <input 
              type="range" 
              :min="priceRange.min" 
              :max="priceRange.max"
              v-model="selectedPriceRange.min"
              @input="updateFilters"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer slider-thumb slider-track"
            >
          </div>
        </div>
        
        <div class="flex items-center space-x-4 mb-4">
          <div class="flex-1">
            <input 
              type="range" 
              :min="priceRange.min" 
              :max="priceRange.max"
              v-model="selectedPriceRange.max"
              @input="updateFilters"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer slider-thumb slider-track"
            >
          </div>
        </div>

        <!-- Price Display -->
        <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>{{ formatPrice(selectedPriceRange.min) }}đ</span>
          <span>-</span>
          <span>{{ formatPrice(selectedPriceRange.max) }}đ</span>
        </div>

        <!-- Filter Button -->
        <button 
          @click="applyPriceFilter"
          class="w-full bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
        >
          <span class="mr-2">LỌC</span>
          <ArrowRightIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Trending Items -->
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Sản phẩm xu hướng</h3>
      <div class="space-y-4">
        <div v-for="item in trendingItems" :key="item.id" 
             class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
          <!-- Product Image -->
          <div class="w-12 h-12 bg-gradient-to-br from-cream to-light-cream rounded-lg overflow-hidden flex-shrink-0">
            <img 
              :src="item.image || '/images/products/placeholder.webp'" 
              :alt="item.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>
          
          <!-- Product Info -->
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-medium text-gray-800 truncate">{{ item.name }}</h4>
            <div class="flex items-center space-x-2 mt-1">
              <span v-if="item.originalPrice" class="text-xs text-gray-400 line-through">
                {{ formatPrice(item.originalPrice) }}đ
              </span>
              <span class="text-sm font-semibold text-primary-green">
                {{ formatPrice(item.price) }}đ
              </span>
            </div>
            
            <!-- Rating -->
            <div class="flex items-center mt-1">
              <div class="flex items-center">
                <StarIcon v-for="star in 5" :key="star"
                         :class="star <= item.rating ? 'text-yellow-400' : 'text-gray-300'"
                         class="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View More Button -->
      <button class="w-full mt-4 text-primary-green hover:text-green-600 text-sm font-medium flex items-center justify-center">
        XEM THÊM
        <ArrowRightIcon class="w-4 h-4 ml-1" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightIcon, StarIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  type: {
    type: String,
    default: 'products' // 'products' or 'gift-baskets'
  }
})

const emit = defineEmits(['filter-change'])

// Use appropriate composable based on type
const { formatPrice } = props.type === 'gift-baskets' ? useGiftBaskets() : useProducts()

// Filter state
const selectedCategories = ref([])
const selectedPriceRange = ref({
  min: 0,
  max: 2000000
})

// Categories based on type
const categories = computed(() => {
  if (props.type === 'gift-baskets') {
    return [
      { id: 'premium', name: 'Giỏ quà Premium', count: 5 },
      { id: 'standard', name: 'Giỏ quà Standard', count: 8 },
      { id: 'basic', name: 'Giỏ quà Basic', count: 12 },
      { id: 'corporate', name: 'Giỏ quà Doanh nghiệp', count: 3 },
      { id: 'seasonal', name: 'Giỏ quà theo mùa', count: 6 }
    ]
  } else {
    return [
      { id: 'japan', name: 'Hoa quả Nhật Bản', count: 3 },
      { id: 'usa', name: 'Hoa quả Mỹ', count: 2 },
      { id: 'newzealand', name: 'Hoa quả New Zealand', count: 1 },
      { id: 'australia', name: 'Hoa quả Úc', count: 1 },
      { id: 'korea', name: 'Hoa quả Hàn Quốc', count: 1 },
      { id: 'thailand', name: 'Hoa quả Thái Lan', count: 1 },
      { id: 'apples-pears', name: 'Táo & Lê', count: 3 },
      { id: 'citrus', name: 'Cam & Chanh', count: 2 },
      { id: 'berries', name: 'Dâu tây & Berry', count: 2 },
      { id: 'tropical', name: 'Hoa quả nhiệt đới', count: 3 },
      { id: 'exotic', name: 'Hoa quả exotic', count: 2 },
      { id: 'seasonal', name: 'Hoa quả theo mùa', count: 5 }
    ]
  }
})

// Price range
const priceRange = computed(() => {
  if (props.type === 'gift-baskets') {
    return { min: 500000, max: 5000000 }
  } else {
    return { min: 50000, max: 2000000 }
  }
})

// Trending items based on type
const trendingItems = computed(() => {
  if (props.type === 'gift-baskets') {
    return [
      {
        id: 1,
        name: 'Giỏ quà Premium',
        price: '2500000',
        originalPrice: null,
        image: '/images/giftBaskets/gift-premium.jpg',
        rating: 5
      },
      {
        id: 2,
        name: 'Giỏ quà Tết',
        price: '1800000',
        originalPrice: '2200000',
        image: '/images/giftBaskets/gift-tet.jpg',
        rating: 4
      },
      {
        id: 3,
        name: 'Giỏ quà Standard',
        price: '1200000',
        originalPrice: '1400000',
        image: '/images/giftBaskets/gift-standard.webp',
        rating: 4
      }
    ]
  } else {
    return [
      {
        id: 1,
        name: 'Xoài Nam Dok Mai',
        price: '280000',
        originalPrice: '320000',
        image: '/images/products/mango-thailand.png',
        rating: 4
      },
      {
        id: 2,
        name: 'Nho mẫu đơn Nhật Bản',
        price: '1200000',
        originalPrice: '1500000',
        image: '/images/products/grapes-japan.webp',
        rating: 5
      },
      {
        id: 3,
        name: 'Kiwi Zespri',
        price: '450000',
        originalPrice: '520000',
        image: '/images/products/kiwi-nz.png',
        rating: 4
      },
      {
        id: 4,
        name: 'Dâu tây Amaou',
        price: '1800000',
        originalPrice: null,
        image: '/images/products/strawberry-japan.jpg',
        rating: 5
      },
      {
        id: 5,
        name: 'Cherry Mỹ',
        price: '890000',
        originalPrice: null,
        image: '/images/products/cherry-usa.png',
        rating: 4
      }
    ]
  }
})

// Methods
const updateFilters = () => {
  emit('filter-change', {
    categories: selectedCategories.value,
    priceRange: selectedPriceRange.value
  })
}

const applyPriceFilter = () => {
  updateFilters()
}

// Handle image error
const handleImageError = (event) => {
  // Replace with a CSS-based placeholder
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = `
    <div class="w-full h-full bg-gradient-to-br from-primary-green to-green-400 flex items-center justify-center rounded-lg">
      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
      </svg>
    </div>
  `
}

// Initialize price range
onMounted(() => {
  selectedPriceRange.value = {
    min: priceRange.value.min,
    max: priceRange.value.max
  }
})
</script>

<style scoped>
/* Custom slider styles */
.slider-track {
  background: #22C55E !important;
  height: 8px;
}

.slider-track::-webkit-slider-runnable-track {
  background: #22C55E;
  height: 8px;
  border-radius: 4px;
}

.slider-track::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #22C55E;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  margin-top: -6px; /* Căn giữa thumb với track */
}

.slider-track::-moz-range-track {
  background: #22C55E;
  height: 8px;
  border-radius: 4px;
  border: none;
}

.slider-track::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #22C55E;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  border: none;
}

/* Focus states */
.slider-track:focus {
  outline: none;
}

.slider-track:focus::-webkit-slider-runnable-track {
  background: #22C55E;
}
</style>
