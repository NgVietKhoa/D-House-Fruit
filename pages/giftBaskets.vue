<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="relative bg-gradient-to-r from-primary-green via-green-500 to-green-600 text-white py-20 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div class="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div class="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
      </div>
      

      <div class="container mx-auto px-4 text-center relative z-10">
        <!-- Breadcrumb -->
        <Breadcrumb 
          :items="[
            { text: 'Trang chủ', href: '/' },
            { text: 'Giỏ quà tặng' }
          ]"
          theme="green"
        />

        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl lg:text-6xl font-bold mb-6 font-poppins leading-tight">
            Giỏ quà tặng cao cấp
          </h1>
          <p class="text-xl lg:text-2xl text-green-100 mb-8 leading-relaxed">
            Những giỏ quà được thiết kế tinh tế, hoàn hảo cho mọi dịp đặc biệt
          </p>
          
          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">15+</div>
              <div class="text-green-100 text-sm">Mẫu giỏ quà</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">5</div>
              <div class="text-green-100 text-sm">Phân khúc</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">100%</div>
              <div class="text-green-100 text-sm">Tùy chỉnh</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">2H</div>
              <div class="text-green-100 text-sm">Giao nhanh</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave Bottom -->
      <div class="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="relative block w-full h-16">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="fill-gray-50"></path>
        </svg>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Sidebar Filters -->
          <div class="lg:col-span-1">
            <FilterSidebar type="gift-baskets" @filter-change="handleFilterChange" />
          </div>

          <!-- Gift Baskets Area -->
          <div class="lg:col-span-3">
            <!-- Toolbar -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <!-- Search -->
                <div class="flex-1 max-w-md">
                  <div class="relative">
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm giỏ quà..." 
                      v-model="searchQuery"
                      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    >
                    <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <!-- Results Info -->
                <div class="text-sm text-gray-600">
                  Hiển thị {{ Math.min(currentPage * itemsPerPage, filteredBaskets.length) }} trong {{ filteredBaskets.length }} kết quả
                </div>

                <!-- View Options -->
                <div class="flex items-center space-x-4">
                  <!-- Sort -->
                  <select 
                    v-model="sortBy"
                    class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green"
                  >
                    <option value="default">Sắp xếp mặc định</option>
                    <option value="popularity">Phổ biến</option>
                    <option value="price-asc">Giá: Thấp đến cao</option>
                    <option value="price-desc">Giá: Cao đến thấp</option>
                    <option value="name">Tên A-Z</option>
                  </select>

                  <!-- View Toggle -->
                  <div class="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      @click="viewMode = 'grid'"
                      :class="viewMode === 'grid' ? 'bg-primary-green text-white' : 'bg-white text-gray-600'"
                      class="p-2 hover:bg-primary-green hover:text-white transition-colors"
                    >
                      <Squares2X2Icon class="w-5 h-5" />
                    </button>
                    <button 
                      @click="viewMode = 'list'"
                      :class="viewMode === 'list' ? 'bg-primary-green text-white' : 'bg-white text-gray-600'"
                      class="p-2 hover:bg-primary-green hover:text-white transition-colors"
                    >
                      <ListBulletIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Gift Baskets Grid/List -->
            <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <GiftBasketCard 
                v-for="basket in paginatedBaskets" 
                :key="basket.id"
                :gift-basket="basket"
              />
            </div>

            <!-- Gift Baskets List View -->
            <div v-else class="space-y-4">
              <div v-for="basket in paginatedBaskets" :key="basket.id" 
                   class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center space-x-6">
                <!-- Basket Image -->
                <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    :src="getGiftBasketImage(basket)" 
                    :alt="basket.name"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                </div>

                <!-- Basket Info -->
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ basket.name }}</h3>
                  <p class="text-gray-600 text-sm mb-3">{{ basket.description }}</p>
                  <div class="flex items-center space-x-4 mb-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-xl font-bold text-primary-green">
                        {{ formatPrice(basket.price) }}đ
                      </span>
                      <span v-if="basket.originalPrice" class="text-sm text-gray-500 line-through">
                        {{ formatPrice(basket.originalPrice) }}đ
                      </span>
                    </div>
                    <div v-if="basket.badge" class="px-2 py-1 text-xs font-semibold rounded-full text-white"
                         :class="getBadgeColor(basket.badge)">
                      {{ basket.badge }}
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">
                    Phục vụ: {{ basket.serves }} • Giao hàng: {{ basket.delivery_time }}
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col space-y-2">
                  <NuxtLink :to="`/gift-baskets/${basket.id}`" class="btn-secondary text-center text-sm py-2 px-4">
                    Xem chi tiết
                  </NuxtLink>
                  <button class="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-lg text-sm transition-colors">
                    Đặt giỏ quà
                  </button>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-8 flex justify-center">
              <nav class="flex items-center space-x-2">
                <button 
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                
                <button 
                  v-for="page in visiblePages" 
                  :key="page"
                  @click="currentPage = page"
                  :class="page === currentPage ? 'bg-primary-green text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  class="px-3 py-2 text-sm font-medium border border-gray-300 rounded-md"
                >
                  {{ page }}
                </button>
                
                <button 
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Custom Gift Section -->
    <section class="py-16 bg-gradient-to-br from-cream to-light-cream">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 font-poppins">
          Thiết kế giỏ quà theo yêu cầu
        </h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Bạn có thể tùy chỉnh giỏ quà theo sở thích và ngân sách của mình. 
          Chúng tôi sẽ tư vấn và thiết kế giỏ quà hoàn hảo nhất cho bạn.
        </p>
        <NuxtLink to="/contact" class="btn-primary">
          Liên hệ tư vấn
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  MagnifyingGlassIcon, 
  Squares2X2Icon, 
  ListBulletIcon 
} from '@heroicons/vue/24/outline'

// Use gift baskets composable
const { allGiftBaskets, formatPrice, getBadgeColor, searchGiftBaskets } = useGiftBaskets()

// Reactive data
const searchQuery = ref('')
const viewMode = ref('grid')
const sortBy = ref('default')
const currentPage = ref(1)
const itemsPerPage = ref(12)
const filters = ref({
  categories: [],
  priceRange: { min: 500000, max: 5000000 }
})

// Computed properties
const filteredBaskets = computed(() => {
  let baskets = [...allGiftBaskets.value]
  
  // Apply search
  if (searchQuery.value) {
    baskets = searchGiftBaskets(searchQuery.value)
  }
  
  // Apply category filter
  if (filters.value.categories.length > 0) {
    baskets = baskets.filter(basket => 
      filters.value.categories.includes(basket.category?.toLowerCase())
    )
  }
  
  // Apply price filter
  baskets = baskets.filter(basket => {
    const price = parseInt(basket.price)
    return price >= filters.value.priceRange.min && price <= filters.value.priceRange.max
  })
  
  // Apply sorting
  switch (sortBy.value) {
    case 'popularity':
      baskets.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case 'price-asc':
      baskets.sort((a, b) => parseInt(a.price) - parseInt(b.price))
      break
    case 'price-desc':
      baskets.sort((a, b) => parseInt(b.price) - parseInt(a.price))
      break
    case 'name':
      baskets.sort((a, b) => a.name.localeCompare(b.name))
      break
  }
  
  return baskets
})

const totalPages = computed(() => {
  return Math.ceil(filteredBaskets.value.length / itemsPerPage.value)
})

const paginatedBaskets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredBaskets.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Methods
const handleFilterChange = (newFilters) => {
  filters.value = newFilters
  currentPage.value = 1 // Reset to first page when filters change
}

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
    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
      <div class="text-center p-2">
        <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-primary-green flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
          </svg>
        </div>
        <p class="text-xs text-gray-600">Giỏ quà</p>
      </div>
    </div>
  `
}

// Watch for search changes
watch(searchQuery, () => {
  currentPage.value = 1
})

watch(sortBy, () => {
  currentPage.value = 1
})

// SEO
useHead({
  title: 'Giỏ quà tặng cao cấp - D\'House Fruit',
  meta: [
    { name: 'description', content: 'Giỏ quà tặng hoa quả nhập khẩu cao cấp, thiết kế sang trọng. Hoàn hảo cho mọi dịp đặc biệt, giao hàng tận nơi.' }
  ]
})
</script>
