<template>
  <header class="sticky top-0 z-50">
    <!-- Top Bar -->
    <div class="bg-gray-800 text-white py-2">
      <div class="container mx-auto px-4">
        <!-- Desktop Version -->
        <div class="hidden lg:flex items-center justify-between text-sm">
          <!-- Contact Info -->
          <div class="flex items-center space-x-6">
            <div class="flex items-center">
              <EnvelopeIcon class="w-4 h-4 mr-2" />
              <span>dhousefruit2025@gmail.com</span>
            </div>
            <div class="flex items-center">
              <MapPinIcon class="w-4 h-4 mr-2" />
              <span>Số 100 - Tổ 26 - Đông Anh - Hà Nội</span>
            </div>
          </div>
          
          <!-- Service Info -->
          <div class="flex items-center space-x-6 text-sm">
            <div class="text-primary-green font-semibold">
              Giao hàng 2-4h
            </div>
            <div class="text-primary-green font-semibold">
              Miễn phí từ 500k
            </div>
            <div class="text-primary-green font-semibold">
              Hoa quả A+
            </div>
          </div>
        </div>

        <!-- Mobile Version -->
        <div class="lg:hidden flex items-center justify-between text-xs">
          <!-- Contact Info - Mobile -->
          <div class="flex items-center">
            <PhoneIcon class="w-3 h-3 mr-1 text-primary-green" />
            <a href="tel:+84963152236" class="text-primary-green font-semibold hover:text-green-300">
              096 315 2236
            </a>
          </div>
          
          <!-- Service Info - Mobile -->
          <div class="flex items-center space-x-3 text-xs">
            <div class="text-primary-green font-medium">
              Giao 2-4h
            </div>
            <div class="text-primary-green font-medium">
              Miễn phí 500k+
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2 md:space-x-3">
              <!-- Logo Image -->
              <img src="/images/logoDHouseFruit.png" alt="D'House Fruit Logo" class="w-10 h-10 md:w-12 md:h-12 object-contain" @error="onImageError">
              
              <div>
                <h1 class="text-lg md:text-2xl font-bold text-gray-800 font-poppins">D'House Fruit</h1>
                <p class="text-xs md:text-sm text-gray-600 hidden sm:block">Premium Imported Fruits</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Search Bar -->
          <div class="hidden md:flex flex-1 max-w-2xl mx-8">
            <div class="relative w-full">
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                v-model="searchQuery"
                @keyup.enter="handleSearch"
              >
              <button 
                @click="handleSearch"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-green text-white p-2 rounded-md hover:bg-green-600 transition-colors"
              >
                <MagnifyingGlassIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Right Side - Contact & Cart -->
          <div class="flex items-center space-x-3 md:space-x-6">
            <!-- Contact Info - Desktop -->
            <div class="hidden lg:flex items-center space-x-4">
              <div class="flex items-center text-gray-600">
                <PhoneIcon class="w-5 h-5 mr-2 text-primary-green" />
                <div>
                  <div class="text-sm font-semibold text-gray-800">+84 096 315 2236</div>
                  <div class="text-xs text-gray-500">24/7 Support</div>
                </div>
              </div>
            </div>

            <!-- Mobile Search Button -->
            <button 
              @click="toggleMobileSearch"
              class="md:hidden p-2 text-gray-700 hover:text-primary-green transition-colors"
            >
              <MagnifyingGlassIcon class="w-5 h-5" />
            </button>

            <!-- User Menu / Auth -->
            <div v-if="isAuthenticated" class="relative">
              <button 
                @click="toggleUserMenu"
                class="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-green transition-colors"
              >
                <div class="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {{ getInitials(userDisplayName) }}
                </div>
                <span class="hidden md:block text-sm font-medium">{{ userDisplayName }}</span>
                <ChevronDownIcon class="w-4 h-4" />
              </button>
              
              <!-- User Dropdown Menu -->
              <div 
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <div class="px-4 py-2 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">{{ userDisplayName }}</p>
                  <p class="text-xs text-gray-500">{{ user.email }}</p>
                </div>
                <NuxtLink 
                  to="/profile" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  @click="userMenuOpen = false"
                >
                  <UserIcon class="w-4 h-4 inline mr-2" />
                  Thông tin cá nhân
                </NuxtLink>
                <NuxtLink 
                  to="/orders" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  @click="userMenuOpen = false"
                >
                  <ClipboardDocumentListIcon class="w-4 h-4 inline mr-2" />
                  Đơn hàng của tôi
                </NuxtLink>
                <button 
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <ArrowRightOnRectangleIcon class="w-4 h-4 inline mr-2" />
                  Đăng xuất
                </button>
              </div>
            </div>
            
            <!-- Login/Register Buttons -->
            <div v-else class="hidden md:flex items-center space-x-2">
              <NuxtLink 
                to="/login"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-green transition-colors"
              >
                Đăng nhập
              </NuxtLink>
              <NuxtLink 
                to="/register"
                class="px-4 py-2 text-sm font-medium bg-primary-green text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Đăng ký
              </NuxtLink>
            </div>

            <!-- Cart -->
            <NuxtLink to="/cart" class="relative p-2 text-gray-700 hover:text-primary-green transition-colors">
              <ShoppingCartIcon class="w-5 h-5 md:w-6 md:h-6" />
              <span 
                v-if="cartItemsCount > 0"
                class="absolute -top-1 -right-1 bg-primary-orange text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs font-semibold"
              >
                {{ cartItemsCount > 99 ? '99+' : cartItemsCount }}
              </span>
            </NuxtLink>

            <!-- Mobile Menu Toggle -->
            <button 
              @click="toggleMobileMenu"
              class="md:hidden p-2 text-gray-700 hover:text-primary-green transition-colors"
            >
              <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
              <XMarkIcon v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Search Modal -->
    <div 
      v-if="mobileSearchOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
      @click="closeMobileSearch"
    >
      <div class="bg-white p-4 m-4 rounded-lg shadow-lg" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Tìm kiếm sản phẩm</h3>
          <button 
            @click="closeMobileSearch"
            class="p-1 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        
        <div class="relative">
          <input 
            ref="mobileSearchInput"
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent text-base"
            v-model="mobileSearchQuery"
            @keyup.enter="handleMobileSearch"
          >
          <button 
            @click="handleMobileSearch"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-green text-white p-2 rounded-md hover:bg-green-600 transition-colors"
          >
            <MagnifyingGlassIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <div class="bg-gradient-to-r from-primary-green via-green-500 to-green-600 text-white">
      <div class="container mx-auto px-4">
        <div class="py-3">
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-white hover:text-green-200 font-medium transition-colors">
              Trang chủ
            </NuxtLink>
            <NuxtLink to="/fruits" class="text-white hover:text-green-200 font-medium transition-colors">
              Hoa quả
            </NuxtLink>
            <NuxtLink to="/giftBaskets" class="text-white hover:text-green-200 font-medium transition-colors">
              Giỏ quà tặng
            </NuxtLink>
            <NuxtLink to="/about" class="text-white hover:text-green-200 font-medium transition-colors">
              Giới thiệu
            </NuxtLink>
            <NuxtLink to="/contact" class="text-white hover:text-green-200 font-medium transition-colors">
              Liên hệ
            </NuxtLink>
          </nav>
        </div>

        <!-- Mobile Navigation -->
        <nav v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 border-t border-green-400">
          <div class="flex flex-col space-y-4 pt-4">
            <NuxtLink to="/" class="text-white hover:text-green-200 font-medium transition-colors">
              Trang chủ
            </NuxtLink>
            <NuxtLink to="/fruits" class="text-white hover:text-green-200 font-medium transition-colors">
              Hoa quả
            </NuxtLink>
            <NuxtLink to="/gift-baskets" class="text-white hover:text-green-200 font-medium transition-colors">
              Giỏ quà tặng
            </NuxtLink>
            <NuxtLink to="/about" class="text-white hover:text-green-200 font-medium transition-colors">
              Giới thiệu
            </NuxtLink>
            <NuxtLink to="/contact" class="text-white hover:text-green-200 font-medium transition-colors">
              Liên hệ
            </NuxtLink>
            
            <!-- Mobile Auth Section -->
            <div class="border-t border-green-400 pt-4 mt-4">
              <div v-if="isAuthenticated" class="space-y-3">
                <div class="flex items-center space-x-3 text-white">
                  <div class="w-8 h-8 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {{ getInitials(userDisplayName) }}
                  </div>
                  <span class="font-medium">{{ userDisplayName }}</span>
                </div>
                <NuxtLink to="/profile" class="block text-white hover:text-green-200 font-medium transition-colors">
                  Thông tin cá nhân
                </NuxtLink>
                <NuxtLink to="/orders" class="block text-white hover:text-green-200 font-medium transition-colors">
                  Đơn hàng của tôi
                </NuxtLink>
                <button 
                  @click="handleLogout"
                  class="block w-full text-left text-red-200 hover:text-red-100 font-medium transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
              <div v-else class="space-y-3">
                <NuxtLink to="/login" class="block text-white hover:text-green-200 font-medium transition-colors">
                  Đăng nhập
                </NuxtLink>
                <NuxtLink to="/register" class="block bg-white text-primary-green px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors text-center">
                  Đăng ký
                </NuxtLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { 
  ShoppingCartIcon, 
  Bars3Icon, 
  XMarkIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  PhoneIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'
import { useCart } from '~/composables/useCart'
import { useAuth } from '~/composables/useAuth'

const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)
const mobileSearchOpen = ref(false)
const searchQuery = ref('')
const mobileSearchQuery = ref('')
const mobileSearchInput = ref(null)

// Cart integration
const { cartItemsCount } = useCart()

// Auth integration
const { 
  isAuthenticated, 
  user, 
  userDisplayName, 
  logout, 
  getInitials 
} = useAuth()

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const toggleMobileSearch = () => {
  mobileSearchOpen.value = !mobileSearchOpen.value
  if (mobileSearchOpen.value) {
    // Focus on input after modal opens
    nextTick(() => {
      if (mobileSearchInput.value) {
        mobileSearchInput.value.focus()
      }
    })
  }
}

const closeMobileSearch = () => {
  mobileSearchOpen.value = false
  mobileSearchQuery.value = ''
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to search results page
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

const handleMobileSearch = () => {
  if (mobileSearchQuery.value.trim()) {
    // Navigate to search results page
    navigateTo(`/search?q=${encodeURIComponent(mobileSearchQuery.value)}`)
    closeMobileSearch()
  }
}

const handleLogout = async () => {
  userMenuOpen.value = false
  await logout()
}

// Close menus when route changes
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
  userMenuOpen.value = false
  mobileSearchOpen.value = false
})

// Close user menu when clicking outside
if (process.client) {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.relative') && userMenuOpen.value) {
      userMenuOpen.value = false
    }
  })
}

// Handle image error
const onImageError = (event) => {
  console.error('Logo image failed to load:', event.target.src)
  // Optionally show fallback
  event.target.style.display = 'none'
}
</script>
