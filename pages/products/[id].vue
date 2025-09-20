<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="!product" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-green mx-auto mb-4"></div>
        <p class="text-gray-600">Đang tải thông tin sản phẩm...</p>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="product === null" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h1>
        <p class="text-gray-600 mb-8">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <NuxtLink to="/fruits" class="btn-primary">
          Quay lại danh sách sản phẩm
        </NuxtLink>
      </div>
    </div>

    <!-- Product Detail -->
    <div v-else>
      <!-- Breadcrumb -->
      <nav class="bg-white border-b">
        <div class="container mx-auto px-4 py-4">
          <Breadcrumb 
            :items="[
              { text: 'Trang chủ', href: '/' },
              { text: 'Hoa quả', href: '/fruits' },
              { text: product.name }
            ]"
            theme="light"
          />
        </div>
      </nav>

      <!-- Product Main Section -->
      <section class="py-8 lg:py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <!-- Product Images -->
            <div class="space-y-4">
              <!-- Main Image -->
              <div class="aspect-square bg-gradient-to-br from-cream to-light-cream rounded-2xl overflow-hidden">
                <img 
                  :src="product.image" 
                  :alt="product.name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Product Info -->
            <div class="space-y-6">
              <!-- Badge -->
              <div v-if="product.badge">
                <span 
                  class="inline-block px-3 py-1 text-sm font-semibold rounded-full text-white"
                  :class="getBadgeColor(product.badge)"
                >
                  {{ product.badge }}
                </span>
              </div>

              <!-- Title -->
              <div>
                <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-2 font-poppins">
                  {{ product.name }}
                </h1>
                <p class="text-lg text-gray-600">{{ product.description }}</p>
              </div>

              <!-- Price -->
              <div class="bg-white rounded-xl p-6 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <span class="text-3xl font-bold text-primary-green">
                      {{ formatPrice(product.price) }}đ
                    </span>
                    <span v-if="product.originalPrice" class="text-lg text-gray-500 line-through">
                      {{ formatPrice(product.originalPrice) }}đ
                    </span>
                  </div>
                  <div v-if="product.originalPrice" class="text-sm text-red-500 font-semibold bg-red-50 px-2 py-1 rounded">
                    -{{ getDiscountPercent(product.price, product.originalPrice) }}%
                  </div>
                </div>

                <!-- Product Details -->
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Xuất xứ:</span>
                    <span class="font-medium">{{ product.origin }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Trọng lượng:</span>
                    <span class="font-medium">{{ product.weight }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Hạn sử dụng:</span>
                    <span class="font-medium">{{ product.shelf_life }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Danh mục:</span>
                    <span class="font-medium">{{ product.category }}</span>
                  </div>
                </div>
              </div>

              <!-- Stock Status -->
              <div class="bg-white rounded-xl p-6 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-gray-700 font-medium">Tình trạng kho:</span>
                  <div class="flex items-center">
                    <div 
                      class="w-3 h-3 rounded-full mr-2"
                      :class="{
                        'bg-green-500': getStockStatus(product) === 'in-stock',
                        'bg-yellow-500': getStockStatus(product) === 'low-stock',
                        'bg-red-500': getStockStatus(product) === 'out-of-stock'
                      }"
                    ></div>
                    <span 
                      class="text-sm font-medium"
                      :class="{
                        'text-green-600': getStockStatus(product) === 'in-stock',
                        'text-yellow-600': getStockStatus(product) === 'low-stock',
                        'text-red-600': getStockStatus(product) === 'out-of-stock'
                      }"
                    >
                      {{ getStockStatusText(product) }}
                    </span>
                  </div>
                </div>
                <div v-if="product.stock > 0" class="text-sm text-gray-600">
                  Còn lại {{ product.stock }} sản phẩm
                </div>
              </div>

              <!-- Quantity & Add to Cart -->
              <div class="bg-white rounded-xl p-6 border border-gray-200">
                <div class="flex items-center space-x-4 mb-4">
                  <label class="text-gray-700 font-medium">Số lượng:</label>
                  <div class="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      @click="decreaseQuantity"
                      class="px-3 py-2 text-gray-600 hover:text-primary-green"
                      :disabled="quantity <= 1"
                    >
                      <MinusIcon class="w-4 h-4" />
                    </button>
                    <input 
                      v-model="quantity" 
                      type="number" 
                      min="1" 
                      class="w-16 text-center border-0 focus:ring-0"
                    >
                    <button 
                      @click="increaseQuantity"
                      class="px-3 py-2 text-gray-600 hover:text-primary-green"
                    >
                      <PlusIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div class="flex space-x-3">
                  <button 
                    @click="addToCart"
                    class="flex-1 text-sm py-4 transition-colors"
                    :class="isInStock(product) 
                      ? 'bg-primary-green hover:bg-green-600 text-white font-semibold rounded-lg' 
                      : 'bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed'"
                    :disabled="!isInStock(product)"
                  >
                    <ShoppingCartIcon class="w-5 h-5 inline mr-1" />
                    {{ isInStock(product) 
                      ? `Thêm vào giỏ - ${formatPrice((product.salePrice || product.price) * quantity)}`
                      : 'Hết hàng'
                    }}
                  </button>
                  <button 
                    @click="buyNow"
                    class="flex-1 font-semibold text-sm py-4 px-4 rounded-lg transition-colors"
                    :class="isInStock(product) 
                      ? 'bg-primary-orange hover:bg-orange-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                    :disabled="!isInStock(product)"
                  >
                    {{ isInStock(product) ? 'Mua ngay' : 'Hết hàng' }}
                  </button>
                </div>
              </div>

              <!-- Contact Info -->
              <div class="bg-gradient-to-r from-slate-100 to-slate-200 border border-green-200 rounded-xl p-6">
                <h3 class="font-semibold mb-2 text-slate-800">Cần tư vấn?</h3>
                <p class="text-slate-600 text-sm mb-3">Liên hệ ngay với chúng tôi để được hỗ trợ tốt nhất</p>
                <div class="flex items-center space-x-4">
                  <a href="tel:0123456789" class="flex items-center text-slate-700 hover:text-primary-green transition-colors">
                    <PhoneIcon class="w-4 h-4 mr-1" />
                    0963 152 236
                  </a>
                  <a href="mailto:info@dhousefruit.com" class="flex items-center text-slate-700 hover:text-primary-green transition-colors">
                    <EnvelopeIcon class="w-4 h-4 mr-1" />
                    dhousefruit2025@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Details Tabs -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <!-- Tab Navigation -->
            <div class="flex border-b border-gray-200 mb-8">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                class="px-6 py-3 font-medium text-sm border-b-2 transition-colors"
                :class="activeTab === tab.id 
                  ? 'border-primary-green text-primary-green' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Tab Content -->
            <div class="space-y-6">
              <!-- Description Tab -->
              <div v-if="activeTab === 'description'" class="prose max-w-none">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Mô tả chi tiết</h3>
                <p class="text-gray-600 leading-relaxed mb-6">{{ product.detailed_description }}</p>
                
                <h4 class="text-lg font-semibold text-gray-800 mb-3">Lợi ích sức khỏe</h4>
                <ul class="space-y-2">
                  <li v-for="benefit in product.benefits" :key="benefit" class="flex items-start">
                    <CheckCircleIcon class="w-5 h-5 text-primary-green mt-0.5 mr-2 flex-shrink-0" />
                    <span class="text-gray-600">{{ benefit }}</span>
                  </li>
                </ul>
              </div>

              <!-- Nutrition Tab -->
              <div v-if="activeTab === 'nutrition'" class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Thông tin dinh dưỡng</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="bg-gray-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-primary-green">{{ product.nutrition.calories }}</div>
                    <div class="text-sm text-gray-600">Calories</div>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-primary-green">{{ product.nutrition.vitamin_c }}</div>
                    <div class="text-sm text-gray-600">Vitamin C</div>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-primary-green">{{ product.nutrition.fiber }}</div>
                    <div class="text-sm text-gray-600">Chất xơ</div>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-primary-green">{{ product.nutrition.sugar }}</div>
                    <div class="text-sm text-gray-600">Đường</div>
                  </div>
                </div>
              </div>

              <!-- Storage Tab -->
              <div v-if="activeTab === 'storage'" class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Hướng dẫn bảo quản</h3>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div class="flex items-start">
                    <InformationCircleIcon class="w-6 h-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 class="font-semibold text-blue-800 mb-2">Cách bảo quản tốt nhất</h4>
                      <p class="text-blue-700">{{ product.storage }}</p>
                    </div>
                  </div>
                </div>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div class="flex items-start">
                    <ClockIcon class="w-6 h-6 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 class="font-semibold text-yellow-800 mb-2">Thời gian sử dụng</h4>
                      <p class="text-yellow-700">{{ product.shelf_life }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Customer Reviews -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-3xl font-bold text-gray-800 mb-4 font-poppins">
                Đánh giá từ khách hàng
              </h2>
              <div class="flex items-center justify-center space-x-4 mb-6">
                <div class="flex items-center">
                  <div class="flex space-x-1 mr-2">
                    <StarIcon v-for="i in 5" :key="i" class="w-6 h-6 text-yellow-400 fill-current" />
                  </div>
                  <span class="text-2xl font-bold text-gray-800">{{ product.rating }}</span>
                  <span class="text-gray-600 ml-2">({{ product.reviews_count }} đánh giá)</span>
                </div>
              </div>
              
              <!-- Rating Breakdown -->
              <div class="max-w-md mx-auto mb-8">
                <div v-for="(rating, index) in ratingBreakdown" :key="index" class="flex items-center mb-2">
                  <span class="text-sm text-gray-600 w-8">{{ 5 - index }}★</span>
                  <div class="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      :style="{ width: rating.percentage + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600 w-12">{{ rating.count }}</span>
                </div>
              </div>
            </div>

            <!-- Reviews List -->
            <div class="space-y-6">
              <div 
                v-for="review in productReviews" 
                :key="review.id"
                class="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div class="flex items-start space-x-4">
                  <!-- Avatar -->
                  <div class="w-12 h-12 bg-gradient-to-br from-primary-green to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-semibold text-lg">{{ review.avatar }}</span>
                  </div>
                  
                  <!-- Review Content -->
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <div>
                        <h4 class="font-semibold text-gray-800">{{ review.name }}</h4>
                        <p class="text-sm text-gray-500">{{ review.date }}</p>
                      </div>
                      <div class="flex items-center">
                        <div class="flex space-x-1 mr-2">
                          <StarIcon 
                            v-for="i in 5" 
                            :key="i" 
                            class="w-4 h-4"
                            :class="i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                          />
                        </div>
                        <span class="text-sm font-medium text-gray-700">{{ review.rating }}/5</span>
                      </div>
                    </div>
                    
                    <p class="text-gray-700 leading-relaxed mb-3">{{ review.comment }}</p>
                    
                    <!-- Review Images -->
                    <div v-if="review.images" class="flex space-x-2 mb-3">
                      <div 
                        v-for="(image, imgIndex) in review.images" 
                        :key="imgIndex"
                        class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden"
                      >
                        <img :src="image" :alt="`Review image ${imgIndex + 1}`" class="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    <!-- Helpful Actions -->
                    <div class="flex items-center space-x-4 text-sm">
                      <button class="flex items-center text-gray-500 hover:text-primary-green transition-colors">
                        <HandThumbUpIcon class="w-4 h-4 mr-1" />
                        Hữu ích ({{ review.helpful }})
                      </button>
                      <button class="text-gray-500 hover:text-primary-green transition-colors">
                        Trả lời
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Load More Reviews -->
            <div class="text-center mt-8">
              <button class="bg-white border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Xem thêm đánh giá
              </button>
            </div>

            <!-- Write Review -->
            <div class="mt-12 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Viết đánh giá của bạn</h3>
              <p class="text-gray-600 mb-6">Chia sẻ trải nghiệm của bạn để giúp khách hàng khác đưa ra quyết định tốt hơn</p>
              <button class="bg-primary-green hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                <PencilSquareIcon class="w-5 h-5 inline mr-2" />
                Viết đánh giá
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section v-if="relatedProducts.length > 0" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-12 font-poppins">
            Sản phẩm liên quan
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              v-for="relatedProduct in relatedProducts" 
              :key="relatedProduct.id"
              :product="relatedProduct"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { 
  ShoppingCartIcon, 
  MinusIcon, 
  PlusIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ClockIcon,
  StarIcon,
  HandThumbUpIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'

// Get route params
const route = useRoute()
const productId = route.params.id

// Use products composable
const { getProductById, getRelatedProducts, formatPrice, getDiscountPercent, isInStock, getStockStatus } = useProducts()

// Use cart composable
const { addToCart: addItemToCart } = useCart()

// Use toast composable
const { success } = useToast()

// Get product data
const product = computed(() => {
  const foundProduct = getProductById(productId)
  return foundProduct || null
})

// Get related products
const relatedProducts = computed(() => {
  if (!product.value) return []
  return getRelatedProducts(productId, product.value.category)
})

// Reactive data
const quantity = ref(1)
const activeTab = ref('description')

// Tab configuration
const tabs = [
  { id: 'description', label: 'Mô tả' },
  { id: 'nutrition', label: 'Dinh dưỡng' },
  { id: 'storage', label: 'Bảo quản' }
]

// Fake reviews data
const productReviews = ref([
  {
    id: 1,
    name: 'Nguyễn Thị Hoa',
    avatar: 'H',
    rating: 5,
    date: '15/03/2024',
    comment: 'Nho rất ngon, ngọt thanh và tươi. Đóng gói cẩn thận, giao hàng nhanh. Sẽ mua lại lần sau!',
    helpful: 12,
    images: ['/images/reviews/review1.jpg']
  },
  {
    id: 2,
    name: 'Trần Văn Nam',
    avatar: 'N',
    rating: 5,
    date: '12/03/2024',
    comment: 'Chất lượng tuyệt vời! Nho mẫu đơn Nhật Bản thật sự xứng đáng với giá tiền. Hạt to, vỏ mỏng, thịt chắc và rất ngọt.',
    helpful: 8,
    images: null
  },
  {
    id: 3,
    name: 'Lê Thị Mai',
    avatar: 'M',
    rating: 4,
    date: '10/03/2024',
    comment: 'Nho ngon nhưng giá hơi cao. Tuy nhiên chất lượng rất tốt, đáng để thử một lần.',
    helpful: 5,
    images: ['/images/reviews/review2.jpg', '/images/reviews/review3.jpg']
  },
  {
    id: 4,
    name: 'Phạm Minh Tuấn',
    avatar: 'T',
    rating: 5,
    date: '08/03/2024',
    comment: 'Lần đầu mua nho Nhật ở đây, không thất vọng! Vị ngọt tự nhiên, không bị chua. Shop đóng gói rất kỹ.',
    helpful: 15,
    images: null
  },
  {
    id: 5,
    name: 'Hoàng Thị Lan',
    avatar: 'L',
    rating: 5,
    date: '05/03/2024',
    comment: 'Mua làm quà tặng, người nhận rất hài lòng. Nho tươi, ngọt và có mùi thơm đặc trưng. Sẽ giới thiệu cho bạn bè.',
    helpful: 9,
    images: ['/images/reviews/review4.jpg']
  }
])

// Rating breakdown data
const ratingBreakdown = ref([
  { stars: 5, count: 142, percentage: 91 },
  { stars: 4, count: 12, percentage: 8 },
  { stars: 3, count: 2, percentage: 1 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 0, percentage: 0 }
])

// Methods
const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const getBadgeColor = (badge) => {
  const colors = {
    'Bán chạy': 'bg-red-500',
    'Mới về': 'bg-blue-500',
    'Giảm giá': 'bg-green-500',
    'Khuyến mãi': 'bg-purple-500',
    'Premium': 'bg-yellow-500',
    'Cao cấp': 'bg-pink-500'
  }
  return colors[badge] || 'bg-gray-500'
}

// Cart methods
const addToCart = () => {
  if (!product.value || !isInStock(product.value)) return
  
  addItemToCart({
    id: product.value.id,
    type: 'product',
    quantity: quantity.value
  })
  
  // Show success toast
  success(`Đã thêm ${quantity.value} ${product.value.name} vào giỏ hàng!`)
}

const buyNow = () => {
  if (!product.value || !isInStock(product.value)) return
  
  addItemToCart({
    id: product.value.id,
    type: 'product',
    quantity: quantity.value
  })
  
  // Navigate to cart
  navigateTo('/cart')
}

const getStockStatusText = (product) => {
  const status = getStockStatus(product)
  switch (status) {
    case 'in-stock':
      return 'Còn hàng'
    case 'low-stock':
      return 'Sắp hết hàng'
    case 'out-of-stock':
      return 'Hết hàng'
    default:
      return 'Không xác định'
  }
}

// Handle image error
const handleImageError = (event) => {
  // Fallback to a default product design
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = `
    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div class="text-center p-8">
        <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-primary-green flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
          </svg>
        </div>
        <p class="text-lg text-gray-600 font-medium">${product.value ? product.value.name : 'Sản phẩm'}</p>
      </div>
    </div>
  `
}

// SEO
useHead({
  title: computed(() => product.value ? `${product.value.name} - D'House Fruit` : 'Sản phẩm - D\'House Fruit'),
  meta: [
    { 
      name: 'description', 
      content: computed(() => product.value ? product.value.description : 'Sản phẩm hoa quả nhập khẩu cao cấp tại D\'House Fruit')
    }
  ]
})

// Handle 404
if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Không tìm thấy sản phẩm'
  })
}
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose h3,
.prose h4 {
  color: #374151;
}

.prose p {
  color: #6B7280;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
