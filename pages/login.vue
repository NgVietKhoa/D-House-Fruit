<template>
  <div>
    <!-- SEO Meta Tags -->
    <Head>
      <title>Đăng nhập - D'House Fruit</title>
      <meta name="description" content="Đăng nhập vào tài khoản D'House Fruit để mua sắm hoa quả nhập khẩu cao cấp" />
    </Head>

    <div class="min-h-screen bg-gradient-to-br from-cream via-light-cream to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <NuxtLink to="/" class="inline-flex items-center space-x-2 mb-6">
            <img src="/images/logoDHouseFruit.png" alt="D'House Fruit Logo" class="w-12 h-12 object-contain">
            <div>
              <h1 class="text-2xl font-bold text-gray-800 font-poppins">D'House Fruit</h1>
              <p class="text-sm text-gray-600">Premium Imported Fruits</p>
            </div>
          </NuxtLink>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Đăng nhập
          </h2>
          <p class="text-gray-600">
            Chào mừng bạn trở lại! Vui lòng đăng nhập vào tài khoản của bạn.
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <ExclamationTriangleIcon class="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
              <p class="text-red-700 text-sm">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex">
              <CheckCircleIcon class="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
              <p class="text-green-700 text-sm">{{ successMessage }}</p>
            </div>
          </div>

          <div class="space-y-4">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="Nhập email của bạn"
                  :disabled="isLoading"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="Nhập mật khẩu"
                  :disabled="isLoading"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="formData.rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="text-primary-green hover:text-green-600 font-medium">
                  Quên mật khẩu?
                </a>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </span>
              {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
            </button>
          </div>

          <!-- Demo Accounts -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 class="text-sm font-medium text-blue-800 mb-2">Tài khoản demo:</h3>
            <div class="text-xs text-blue-700 space-y-1">
              <p><strong>Admin:</strong> admin@dhousefruit.com / 123456</p>
              <p><strong>User:</strong> user@example.com / 123456</p>
            </div>
          </div>

          <!-- Register Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Chưa có tài khoản?
              <NuxtLink to="/register" class="text-primary-green hover:text-green-600 font-medium">
                Đăng ký ngay
              </NuxtLink>
            </p>
          </div>
        </form>

        <!-- Social Login -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Hoặc đăng nhập bằng</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="ml-2">Google</span>
            </button>

            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="ml-2">Facebook</span>
            </button>
          </div>
        </div>

        <!-- Back to Home -->
        <div class="text-center">
          <NuxtLink 
            to="/" 
            class="inline-flex items-center text-sm text-gray-600 hover:text-primary-green transition-colors"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-1" />
            Quay về trang chủ
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'

// Auth composable
const { login, isLoading, isAuthenticated } = useAuth()

// Toast composable
const { success, error } = useToast()

// Redirect if already authenticated
if (isAuthenticated.value) {
  await navigateTo('/')
}

// Form data
const formData = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// UI state
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Form submission
const handleLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  // Basic validation
  if (!formData.email || !formData.password) {
    errorMessage.value = 'Vui lòng nhập đầy đủ thông tin'
    return
  }
  
  try {
    const result = await login({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe
    })
    
    if (result.success) {
      success('Đăng nhập thành công!')
      
      // Redirect after success
      setTimeout(() => {
        const redirect = useRoute().query.redirect || '/'
        navigateTo(redirect)
      }, 1000)
    } else {
      error(result.message || 'Đăng nhập thất bại')
    }
  } catch (err) {
    console.error('Login error:', err)
    error('Có lỗi xảy ra, vui lòng thử lại')
  }
}

// Auto-fill demo account
const fillDemoAccount = (type = 'admin') => {
  if (type === 'admin') {
    formData.email = 'admin@dhousefruit.com'
    formData.password = '123456'
  } else {
    formData.email = 'user@example.com'
    formData.password = '123456'
  }
}

// SEO
definePageMeta({
  layout: false,
  middleware: 'guest'
})
</script>

<style scoped>
/* Custom styles for form elements */
input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
