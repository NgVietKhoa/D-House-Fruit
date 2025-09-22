<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Error State: No ID -->
    <div v-if="!basketId" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Lỗi tham số</h1>
        <p class="text-gray-600 mb-8">Không tìm thấy ID giỏ quà tặng.</p>
        <NuxtLink to="/giftBaskets" class="btn-primary">
          Quay lại danh sách giỏ quà
        </NuxtLink>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="basketId && !giftBasket" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Không tìm thấy giỏ quà</h1>
        <p class="text-gray-600 mb-8">Giỏ quà tặng bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <NuxtLink to="/giftBaskets" class="btn-primary">
          Quay lại danh sách giỏ quà
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="!giftBasket" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-orange mx-auto mb-4"></div>
        <p class="text-gray-600">Đang tải thông tin giỏ quà...</p>
      </div>
    </div>

    <!-- Gift Basket Detail -->
    <div v-else>
      <!-- Breadcrumb -->
      <nav class="bg-white border-b">
        <div class="container mx-auto px-4 py-4">
          <Breadcrumb 
            :items="[
              { text: 'Trang chủ', href: '/' },
              { text: 'Giỏ quà tặng', href: '/giftBaskets' },
              { text: giftBasket.name }
            ]"
            theme="light"
          />
        </div>
      </nav>

      <!-- Gift Basket Main Section -->
      <section class="py-8 lg:py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <!-- Gift Basket Images -->
            <div class="space-y-4">
              <!-- Main Image -->
              <div class="aspect-square rounded-2xl overflow-hidden" :class="giftBasket.colorClass">
                <img 
                  :src="getGiftBasketImage(giftBasket)" 
                  :alt="giftBasket.name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Gift Basket Info -->
            <div class="space-y-6">
              <!-- Badge -->
              <div v-if="giftBasket.badge">
                <span 
                  class="inline-block px-3 py-1 text-sm font-semibold rounded-full text-white"
                  :class="getBadgeColor(giftBasket.badge)"
                >
                  {{ giftBasket.badge }}
                </span>
              </div>

              <!-- Title -->
              <div>
                <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-2 font-poppins">
                  {{ giftBasket.name }}
                </h1>
                <p class="text-lg text-gray-600">{{ giftBasket.description }}</p>
              </div>

              <!-- Price -->
              <div class="bg-white rounded-xl p-6 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <span class="text-3xl font-bold text-primary-green">
                      {{ formatPrice(giftBasket.price) }}đ
                    </span>
                    <span v-if="giftBasket.originalPrice" class="text-lg text-gray-500 line-through">
                      {{ formatPrice(giftBasket.originalPrice) }}đ
                    </span>
                  </div>
                  <div v-if="giftBasket.originalPrice" class="text-sm text-red-500 font-semibold bg-red-50 px-2 py-1 rounded">
                    -{{ getDiscountPercent(giftBasket.price, giftBasket.originalPrice) }}%
                  </div>
                </div>

                <!-- Gift Basket Details -->
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Danh mục:</span>
                    <span class="font-medium">{{ giftBasket.category }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Phục vụ:</span>
                    <span class="font-medium">{{ giftBasket.serves }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Giao hàng:</span>
                    <span class="font-medium">{{ giftBasket.delivery_time }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Đánh giá:</span>
                    <div class="flex items-center">
                      <span class="font-medium">{{ giftBasket.rating }}</span>
                      <StarIcon class="w-4 h-4 text-yellow-400 ml-1" />
                      <span class="text-gray-500 ml-1">({{ giftBasket.reviews_count }})</span>
                    </div>
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
                        'bg-green-500': getStockStatus(giftBasket) === 'in-stock',
                        'bg-yellow-500': getStockStatus(giftBasket) === 'low-stock',
                        'bg-red-500': getStockStatus(giftBasket) === 'out-of-stock'
                      }"
                    ></div>
                    <span 
                      class="text-sm font-medium"
                      :class="{
                        'text-green-600': getStockStatus(giftBasket) === 'in-stock',
                        'text-yellow-600': getStockStatus(giftBasket) === 'low-stock',
                        'text-red-600': getStockStatus(giftBasket) === 'out-of-stock'
                      }"
                    >
                      {{ getStockStatusText(giftBasket) }}
                    </span>
                  </div>
                </div>
                <div v-if="giftBasket.stock > 0" class="text-sm text-gray-600">
                  Còn lại {{ giftBasket.stock }} giỏ quà
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
                    :class="isInStock(giftBasket) 
                      ? 'bg-primary-orange hover:bg-orange-600 text-white font-semibold rounded-lg' 
                      : 'bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed'"
                    :disabled="!isInStock(giftBasket)"
                  >
                    <ShoppingCartIcon class="w-5 h-5 inline mr-1" />
                    {{ isInStock(giftBasket) 
                      ? `Thêm vào giỏ - ${formatPrice((giftBasket.salePrice || giftBasket.price) * quantity)}`
                      : 'Hết hàng'
                    }}
                  </button>
                  <button 
                    @click="buyNow"
                    class="flex-1 font-semibold text-sm py-4 px-4 rounded-lg transition-colors"
                    :class="isInStock(giftBasket) 
                      ? 'bg-primary-green hover:bg-green-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                    :disabled="!isInStock(giftBasket)"
                  >
                    {{ isInStock(giftBasket) ? 'Đặt ngay' : 'Hết hàng' }}
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

      <!-- Gift Basket Details Tabs -->
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
              <!-- Fruits Tab -->
              <div v-if="activeTab === 'fruits'" class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Hoa quả trong giỏ</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    v-for="fruit in giftBasket.included_fruits" 
                    :key="fruit.name"
                    class="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div class="flex items-center">
                      <div class="w-3 h-3 bg-primary-green rounded-full mr-3"></div>
                      <span class="font-medium text-gray-800">{{ fruit.name }}</span>
                    </div>
                    <span class="text-sm text-gray-600 font-medium">{{ fruit.quantity }}</span>
                  </div>
                </div>
              </div>

              <!-- Features Tab -->
              <div v-if="activeTab === 'features'" class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Đặc điểm nổi bật</h3>
                <ul class="space-y-3">
                  <li v-for="feature in giftBasket.features" :key="feature" class="flex items-start">
                    <CheckCircleIcon class="w-5 h-5 text-primary-green mt-0.5 mr-3 flex-shrink-0" />
                    <span class="text-gray-600">{{ feature }}</span>
                  </li>
                </ul>

                <div class="mt-8">
                  <h4 class="text-lg font-semibold text-gray-800 mb-3">Dịp phù hợp</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="occasion in giftBasket.occasions" 
                      :key="occasion"
                      class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {{ occasion }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Packaging Tab -->
              <div v-if="activeTab === 'packaging'" class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Thông tin đóng gói</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div class="flex items-start">
                      <GiftIcon class="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 class="font-semibold text-green-800 mb-2">Loại hộp</h4>
                        <p class="text-green-700">{{ giftBasket.packaging.type }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div class="flex items-start">
                      <SwatchIcon class="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 class="font-semibold text-green-800 mb-2">Màu sắc</h4>
                        <p class="text-green-700">{{ giftBasket.packaging.color }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div class="flex items-start">
                      <SparklesIcon class="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 class="font-semibold text-green-800 mb-2">Ruy băng</h4>
                        <p class="text-green-700">{{ giftBasket.packaging.ribbon }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div class="flex items-start">
                      <DocumentTextIcon class="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 class="font-semibold text-green-800 mb-2">Thiệp chúc mừng</h4>
                        <p class="text-green-700">{{ giftBasket.packaging.card }}</p>
                      </div>
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
                  <span class="text-2xl font-bold text-gray-800">{{ giftBasket.rating }}</span>
                  <span class="text-gray-600 ml-2">({{ giftBasket.reviews_count }} đánh giá)</span>
                </div>
              </div>
              
              <!-- Rating Breakdown -->
              <div class="max-w-md mx-auto mb-8">
                <div v-for="(rating, index) in basketRatingBreakdown" :key="index" class="flex items-center mb-2">
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
                v-for="review in basketReviews" 
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

      <!-- Related Gift Baskets -->
      <section v-if="relatedBaskets.length > 0" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-12 font-poppins">
            Giỏ quà liên quan
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GiftBasketCard 
              v-for="relatedBasket in relatedBaskets" 
              :key="relatedBasket.id"
              :gift-basket="relatedBasket"
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
  StarIcon,
  GiftIcon,
  SwatchIcon,
  SparklesIcon,
  DocumentTextIcon,
  HandThumbUpIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'

// Get route params
const route = useRoute()
const basketId = route.params.id

// Use gift baskets composable
const { 
  getGiftBasketById, 
  getRecommendedBaskets, 
  formatPrice, 
  getDiscountPercent, 
  getBadgeColor,
  isInStock,
  getStockStatus
} = useGiftBaskets()

// Use cart composable
const { addToCart: addItemToCart } = useCart()

// Use toast composable
const { success } = useToast()

// Get gift basket data
const giftBasket = computed(() => {
  if (!basketId) return null
  const foundBasket = getGiftBasketById(basketId)
  return foundBasket || null
})

// Get related gift baskets
const relatedBaskets = computed(() => {
  if (!giftBasket.value) return []
  return getRecommendedBaskets(basketId, 3)
})

// Reactive data
const quantity = ref(1)
const activeTab = ref('fruits')

// Tab configuration
const tabs = [
  { id: 'fruits', label: 'Hoa quả' },
  { id: 'features', label: 'Đặc điểm' },
  { id: 'packaging', label: 'Đóng gói' }
]

// Fake reviews data for gift baskets
const basketReviews = ref([
  {
    id: 1,
    name: 'Nguyễn Văn Đức',
    avatar: 'D',
    rating: 5,
    date: '18/03/2024',
    comment: 'Giỏ quà rất đẹp và chất lượng! Hoa quả tươi ngon, đóng gói sang trọng. Rất phù hợp làm quà tặng.',
    helpful: 18
  },
  {
    id: 2,
    name: 'Trần Thị Linh',
    avatar: 'L',
    rating: 5,
    date: '16/03/2024',
    comment: 'Mua làm quà sinh nhật, người nhận rất thích. Hoa quả đa dạng, tươi ngon. Sẽ mua lại!',
    helpful: 12
  },
  {
    id: 3,
    name: 'Lê Minh Hoàng',
    avatar: 'H',
    rating: 4,
    date: '14/03/2024',
    comment: 'Giỏ quà đẹp, hoa quả ngon. Chỉ có điều giá hơi cao một chút, nhưng chất lượng xứng đáng.',
    helpful: 8
  },
  {
    id: 4,
    name: 'Phạm Thị Mai',
    avatar: 'M',
    rating: 5,
    date: '12/03/2024',
    comment: 'Tuyệt vời! Giỏ quà được thiết kế rất tinh tế, hoa quả tươi và ngon. Dịch vụ giao hàng nhanh.',
    helpful: 15
  }
])

// Rating breakdown data for gift baskets
const basketRatingBreakdown = ref([
  { stars: 5, count: 78, percentage: 87 },
  { stars: 4, count: 9, percentage: 10 },
  { stars: 3, count: 2, percentage: 2 },
  { stars: 2, count: 1, percentage: 1 },
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

const getStockStatusText = (basket) => {
  const status = getStockStatus(basket)
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

// Cart methods
const addToCart = () => {
  if (!giftBasket.value || !isInStock(giftBasket.value)) return
  
  addItemToCart({
    id: giftBasket.value.id,
    type: 'giftBasket',
    quantity: quantity.value
  })
  
  // Show success toast
  success(`Đã thêm ${quantity.value} ${giftBasket.value.name} vào giỏ hàng!`)
}

const buyNow = () => {
  if (!giftBasket.value || !isInStock(giftBasket.value)) return
  
  addItemToCart({
    id: giftBasket.value.id,
    type: 'giftBasket',
    quantity: quantity.value
  })
  
  // Navigate to cart
  navigateTo('/cart')
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
    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
      <div class="text-center p-8">
        <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-primary-orange flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
          </svg>
        </div>
        <p class="text-lg text-gray-600 font-medium">${giftBasket.value ? giftBasket.value.name : 'Giỏ quà tặng'}</p>
      </div>
    </div>
  `
}

// SEO
useHead({
  title: computed(() => giftBasket.value ? `${giftBasket.value.name} - D'House Fruit` : 'Giỏ quà tặng - D\'House Fruit'),
  meta: [
    { 
      name: 'description', 
      content: computed(() => giftBasket.value ? giftBasket.value.description : 'Giỏ quà tặng hoa quả nhập khẩu cao cấp tại D\'House Fruit')
    }
  ]
})
</script>

<style scoped>
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
