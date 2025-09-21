<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-poppins">
          Sản phẩm bán chạy
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Những sản phẩm được yêu thích nhất tại D'House Fruit
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          v-for="tab in filterTabs" 
          :key="tab.id"
          @click="activeFilter = tab.id"
          class="px-6 py-3 rounded-full font-medium transition-all duration-300"
          :class="activeFilter === tab.id 
            ? 'bg-primary-green text-white shadow-lg' 
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
        >
          <!-- Product Image -->
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-cream to-light-cream overflow-hidden">
              <img 
                :src="product.image || '/images/products/placeholder.webp'" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                @error="handleImageError"
              />
            </div>
            
            <!-- Sale Badge -->
            <div v-if="product.sale" class="absolute top-3 left-3">
              <span class="bg-primary-green text-white text-xs font-bold px-2 py-1 rounded">
                Sale
              </span>
            </div>

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
              <NuxtLink :to="`/products/${product.id}`" 
                        class="bg-white text-primary-green px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Xem chi tiết
              </NuxtLink>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
            
            <!-- Price -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2">
                <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">
                  {{ formatPrice(product.originalPrice) }}đ
                </span>
                <span class="text-lg font-bold text-primary-green">
                  {{ formatPrice(product.price) }}đ
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-between">
              <button 
                @click="handleAddToCart(product)"
                class="flex-1 bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors mr-2"
              >
                <ShoppingCartIcon class="w-4 h-4 inline mr-1" />
                Thêm vào giỏ
              </button>
              <button 
                @click="handleAddToFavorites(product)"
                class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Thêm vào yêu thích"
              >
                <HeartIcon class="w-5 h-5" />
              </button>
              <button 
                @click="handleCompare(product)"
                class="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                title="So sánh sản phẩm"
              >
                <ArrowsRightLeftIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <NuxtLink to="/fruits" class="btn-primary">
          Xem tất cả sản phẩm
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ShoppingCartIcon, HeartIcon, ArrowsRightLeftIcon } from '@heroicons/vue/24/outline'

// Use composables
const { allProducts, formatPrice } = useProducts()
const { addToCart } = useCart()
const { success } = useToast()

// Filter tabs - focused on fruits only
const filterTabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'imported', label: 'Hoa quả nhập khẩu' },
  { id: 'premium', label: 'Hoa quả cao cấp' },
  { id: 'seasonal', label: 'Hoa quả theo mùa' },
  { id: 'gift', label: 'Giỏ quà tặng' }
]

// Active filter
const activeFilter = ref('all')

// Sample best seller products - fruits only
const bestSellerProducts = computed(() => [
  {
    id: 1,
    name: 'Nho mẫu đơn Nhật Bản',
    price: '1200000',
    originalPrice: '1500000',
    image: '/images/products/grapes-japan.webp',
    category: 'premium',
    sale: true
  },
  {
    id: 2,
    name: 'Cherry Mỹ Washington',
    price: '890000',
    originalPrice: null,
    image: '/images/products/cherry-usa.png',
    category: 'imported',
    sale: false
  },
  {
    id: 3,
    name: 'Kiwi Zespri New Zealand',
    price: '450000',
    originalPrice: '520000',
    image: '/images/products/kiwi-nz.png',
    category: 'imported',
    sale: true
  },
  {
    id: 4,
    name: 'Táo Envy New Zealand',
    price: '680000',
    originalPrice: null,
    image: '/images/products/apple-envy.png',
    category: 'premium',
    sale: false
  },
  {
    id: 5,
    name: 'Cam Navel Úc',
    price: '320000',
    originalPrice: '380000',
    image: '/images/products/orange-australia.jpg',
    category: 'seasonal',
    sale: true
  },
  {
    id: 6,
    name: 'Lê Hàn Quốc',
    price: '550000',
    originalPrice: null,
    image: '/images/products/pear-korea.webp',
    category: 'premium',
    sale: false
  },
  {
    id: 7,
    name: 'Dâu tây Amaou Nhật Bản',
    price: '1800000',
    originalPrice: null,
    image: '/images/products/strawberry-japan.jpg',
    category: 'premium',
    sale: false
  },
  {
    id: 8,
    name: 'Xoài Nam Dok Mai Thái Lan',
    price: '280000',
    originalPrice: '320000',
    image: '/images/products/mango-thailand.png',
    category: 'seasonal',
    sale: true
  }
])

// Filtered products based on active filter
const filteredProducts = computed(() => {
  if (activeFilter.value === 'all') {
    return bestSellerProducts.value.slice(0, 8)
  }
  return bestSellerProducts.value.filter(product => product.category === activeFilter.value).slice(0, 8)
})

// Action handlers
const handleAddToCart = (product) => {
  addToCart({
    id: product.id,
    type: 'product',
    quantity: 1
  })
  success(`Đã thêm "${product.name}" vào giỏ hàng`)
}

const handleAddToFavorites = (product) => {
  // TODO: Implement favorites functionality
  success(`Đã thêm "${product.name}" vào danh sách yêu thích`)
}

const handleCompare = (product) => {
  // TODO: Implement compare functionality
  success(`Đã thêm "${product.name}" vào danh sách so sánh`)
}

// Handle image error
const handleImageError = (event) => {
  // Replace with a CSS-based placeholder
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = `
    <div class="w-full h-full bg-gradient-to-br from-primary-green to-green-400 flex items-center justify-center">
      <div class="text-white text-center">
        <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
          </svg>
        </div>
        <p class="text-xs font-medium">Hình ảnh</p>
      </div>
    </div>
  `
}
</script>

<style scoped>
/* Custom styles for better visual */
</style>
