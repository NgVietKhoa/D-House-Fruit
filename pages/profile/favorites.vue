<template>
  <div>
    <!-- Page Header -->
    <div class="bg-gradient-to-br from-primary-green via-green-600 to-green-700 text-white">
      <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div class="flex items-center space-x-3 md:space-x-4">
          <div class="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold">
            <HeartIcon class="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold">Sản phẩm yêu thích</h1>
            <p class="text-green-100 mt-1 text-sm md:text-base">Danh sách trái cây bạn đã lưu</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <ProfileSidebar />
        </div>

        <!-- Favorites Content -->
        <div class="lg:col-span-3">
          <!-- Filter and Sort -->
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">
                {{ favorites.length }} sản phẩm yêu thích
              </span>
              <button
                v-if="favorites.length > 0"
                @click="clearAllFavorites"
                class="text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Xóa tất cả
              </button>
            </div>
            
            <div class="flex items-center space-x-2">
              <label for="sortBy" class="text-sm text-gray-600">Sắp xếp:</label>
              <select
                id="sortBy"
                v-model="sortBy"
                class="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="price_asc">Giá thấp đến cao</option>
                <option value="price_desc">Giá cao đến thấp</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>
          </div>

          <!-- Favorites Grid -->
          <div v-if="sortedFavorites.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="item in sortedFavorites"
              :key="item.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <!-- Product Image -->
              <div class="relative">
                <img
                  :src="item.product.image || '/images/placeholder.jpg'"
                  :alt="item.product.name"
                  class="w-full h-48 object-cover"
                />
                
                <!-- Remove from Favorites -->
                <button
                  @click="removeFavorite(item.id)"
                  class="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                >
                  <HeartIcon class="w-5 h-5 fill-current" />
                </button>

                <!-- Badge -->
                <div
                  v-if="item.product.badge"
                  :class="[
                    'absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium text-white',
                    getBadgeColor(item.product.badge)
                  ]"
                >
                  {{ item.product.badge }}
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {{ item.product.name }}
                </h3>
                
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                  {{ item.product.description }}
                </p>

                <!-- Price -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-2">
                    <span class="text-lg font-bold text-primary-green">
                      {{ formatPrice(item.product.price) }}
                    </span>
                    <span
                      v-if="item.product.originalPrice"
                      class="text-sm text-gray-500 line-through"
                    >
                      {{ formatPrice(item.product.originalPrice) }}
                    </span>
                  </div>
                  
                  <!-- Rating -->
                  <div class="flex items-center space-x-1">
                    <StarIcon class="w-4 h-4 text-yellow-400 fill-current" />
                    <span class="text-sm text-gray-600">{{ item.product.rating }}</span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex space-x-2">
                  <NuxtLink
                    :to="`/products/${item.product.id}`"
                    class="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-center rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Xem chi tiết
                  </NuxtLink>
                  <button
                    @click="addToCart(item.product)"
                    :disabled="!isInStock(item.product)"
                    class="flex-1 px-3 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium min-h-[44px] touch-manipulation"
                  >
                    {{ isInStock(item.product) ? 'Thêm vào giỏ' : 'Hết hàng' }}
                  </button>
                </div>

                <!-- Added Date -->
                <div class="mt-3 pt-3 border-t border-gray-100">
                  <span class="text-xs text-gray-500">
                    Đã lưu: {{ formatDate(item.addedAt) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <HeartIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">Chưa có sản phẩm yêu thích</h3>
            <p class="text-gray-600 mb-6">
              Khám phá và lưu những trái cây tươi ngon mà bạn yêu thích
            </p>
            <NuxtLink
              to="/fruits"
              class="inline-flex items-center px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Khám phá sản phẩm
            </NuxtLink>
          </div>
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
import { useAuth } from '~/composables/useAuth'
import { useProducts } from '~/composables/useProducts'
import { useCart } from '~/composables/useCart'
import { 
  HeartIcon, 
  StarIcon,
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
  title: 'Sản phẩm yêu thích - D\'House Fruit',
  meta: [
    { name: 'description', content: 'Danh sách sản phẩm yêu thích tại D\'House Fruit' }
  ]
})

const { user } = useAuth()
const { getProductById, getBadgeColor, isInStock } = useProducts()
const { addToCart: addProductToCart } = useCart()

// State
const favorites = ref([])
const sortBy = ref('newest')
const isLoading = ref(false)

// Message state
const message = reactive({
  show: false,
  type: 'success',
  text: ''
})

// Computed
const sortedFavorites = computed(() => {
  const sorted = [...favorites.value]
  
  switch (sortBy.value) {
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt))
    case 'price_asc':
      return sorted.sort((a, b) => parseInt(a.product.price) - parseInt(b.product.price))
    case 'price_desc':
      return sorted.sort((a, b) => parseInt(b.product.price) - parseInt(a.product.price))
    case 'name':
      return sorted.sort((a, b) => a.product.name.localeCompare(b.product.name))
    default: // newest
      return sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
  }
})

// Mock favorites data
const mockFavorites = [
  {
    id: 1,
    productId: 1,
    userId: 2,
    addedAt: '2024-03-20T10:30:00Z'
  },
  {
    id: 2,
    productId: 7,
    userId: 2,
    addedAt: '2024-03-18T15:20:00Z'
  },
  {
    id: 3,
    productId: 3,
    userId: 2,
    addedAt: '2024-03-15T09:45:00Z'
  }
]

// Methods
const showMessage = (type, text) => {
  message.show = true
  message.type = type
  message.text = text
  
  setTimeout(() => {
    message.show = false
  }, 5000)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const loadFavorites = () => {
  // Load favorites with product details
  favorites.value = mockFavorites.map(fav => {
    const product = getProductById(fav.productId)
    return {
      ...fav,
      product
    }
  }).filter(fav => fav.product) // Remove favorites for deleted products
}

const removeFavorite = async (favoriteId) => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = favorites.value.findIndex(fav => fav.id === favoriteId)
    if (index > -1) {
      favorites.value.splice(index, 1)
      showMessage('success', 'Đã xóa khỏi danh sách yêu thích!')
    }
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const clearAllFavorites = async () => {
  if (!confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm yêu thích?')) return
  
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    favorites.value = []
    showMessage('success', 'Đã xóa tất cả sản phẩm yêu thích!')
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const addToCart = async (product) => {
  try {
    addProductToCart({
      id: product.id,
      type: 'product',
      quantity: 1
    })
    
    showMessage('success', `Đã thêm ${product.name} vào giỏ hàng!`)
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra khi thêm vào giỏ hàng')
  }
}

// Lifecycle
onMounted(() => {
  loadFavorites()
})
</script>

<style scoped>
/* Custom styles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  .grid {
    gap: 1rem;
  }
}
</style>
