<template>
  <div>
    <!-- SEO Meta Tags -->
    <Head>
      <title>Đăng ký - D'House Fruit</title>
      <meta name="description" content="Tạo tài khoản D'House Fruit để mua sắm hoa quả nhập khẩu cao cấp và nhận ưu đãi đặc biệt" />
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
            Đăng ký tài khoản
          </h2>
          <p class="text-gray-600">
            Tạo tài khoản để trải nghiệm dịch vụ hoa quả nhập khẩu cao cấp
          </p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
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
            <!-- Full Name Field -->
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  v-model="formData.fullName"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="Nhập họ và tên của bạn"
                  :disabled="isLoading"
                />
              </div>
            </div>

            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-500">*</span>
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

            <!-- Phone Field -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  v-model="formData.phone"
                  type="tel"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                  :disabled="isLoading"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu <span class="text-red-500">*</span>
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
                  placeholder="Tạo mật khẩu (tối thiểu 6 ký tự)"
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
              <!-- Password strength indicator -->
              <div class="mt-2">
                <div class="flex space-x-1">
                  <div 
                    v-for="i in 4" 
                    :key="i"
                    class="h-1 flex-1 rounded"
                    :class="getPasswordStrengthColor(i)"
                  ></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  {{ getPasswordStrengthText() }}
                </p>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="Nhập lại mật khẩu"
                  :disabled="isLoading"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <!-- Password match indicator -->
              <div v-if="formData.confirmPassword" class="mt-1">
                <p v-if="formData.password === formData.confirmPassword" class="text-xs text-green-600 flex items-center">
                  <CheckCircleIcon class="w-3 h-3 mr-1" />
                  Mật khẩu khớp
                </p>
                <p v-else class="text-xs text-red-600 flex items-center">
                  <ExclamationTriangleIcon class="w-3 h-3 mr-1" />
                  Mật khẩu không khớp
                </p>
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start">
              <input
                id="agreeTerms"
                v-model="formData.agreeTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded mt-1"
              />
              <label for="agreeTerms" class="ml-2 block text-sm text-gray-700">
                Tôi đồng ý với 
                <a href="#" class="text-primary-green hover:text-green-600 font-medium">Điều khoản dịch vụ</a>
                và 
                <a href="#" class="text-primary-green hover:text-green-600 font-medium">Chính sách bảo mật</a>
                của D'House Fruit
              </label>
            </div>

            <!-- Newsletter Subscription -->
            <div class="flex items-center">
              <input
                id="newsletter"
                v-model="formData.newsletter"
                type="checkbox"
                class="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
              />
              <label for="newsletter" class="ml-2 block text-sm text-gray-700">
                Đăng ký nhận thông tin khuyến mãi và sản phẩm mới
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </span>
              {{ isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản' }}
            </button>
          </div>

          <!-- Login Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Đã có tài khoản?
              <NuxtLink to="/login" class="text-primary-green hover:text-green-600 font-medium">
                Đăng nhập ngay
              </NuxtLink>
            </p>
          </div>
        </form>

        <!-- Social Register -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Hoặc đăng ký bằng</span>
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
  UserIcon,
  EnvelopeIcon, 
  PhoneIcon,
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
const { register, isLoading, isAuthenticated } = useAuth()

// Toast composable
const { success, error } = useToast()

// Redirect if already authenticated
if (isAuthenticated.value) {
  await navigateTo('/')
}

// Form data
const formData = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
  newsletter: true
})

// UI state
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Form validation
const isFormValid = computed(() => {
  return formData.fullName && 
         formData.email && 
         formData.phone && 
         formData.password && 
         formData.confirmPassword &&
         formData.password === formData.confirmPassword &&
         formData.password.length >= 6 &&
         formData.agreeTerms
})

// Password strength calculation
const passwordStrength = computed(() => {
  const password = formData.password
  if (!password) return 0
  
  let strength = 0
  if (password.length >= 6) strength++
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return Math.min(strength, 4)
})

const getPasswordStrengthColor = (index) => {
  if (passwordStrength.value >= index) {
    if (passwordStrength.value <= 1) return 'bg-red-400'
    if (passwordStrength.value <= 2) return 'bg-yellow-400'
    if (passwordStrength.value <= 3) return 'bg-blue-400'
    return 'bg-green-400'
  }
  return 'bg-gray-200'
}

const getPasswordStrengthText = () => {
  if (!formData.password) return ''
  if (passwordStrength.value <= 1) return 'Mật khẩu yếu'
  if (passwordStrength.value <= 2) return 'Mật khẩu trung bình'
  if (passwordStrength.value <= 3) return 'Mật khẩu mạnh'
  return 'Mật khẩu rất mạnh'
}

// Form submission
const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  // Validation
  if (!isFormValid.value) {
    errorMessage.value = 'Vui lòng kiểm tra lại thông tin'
    return
  }
  
  if (formData.password !== formData.confirmPassword) {
    errorMessage.value = 'Mật khẩu xác nhận không khớp'
    return
  }
  
  if (formData.password.length < 6) {
    errorMessage.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    return
  }
  
  // Phone validation (basic)
  const phoneRegex = /^[0-9]{10,11}$/
  if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
    errorMessage.value = 'Số điện thoại không hợp lệ'
    return
  }
  
  try {
    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      newsletter: formData.newsletter
    })
    
    if (result.success) {
      success('Đăng ký thành công! Đang chuyển hướng...')
      
      // Redirect after success
      setTimeout(() => {
        const redirect = useRoute().query.redirect || '/'
        navigateTo(redirect)
      }, 1500)
    } else {
      error(result.message || 'Đăng ký thất bại')
    }
  } catch (err) {
    console.error('Register error:', err)
    error('Có lỗi xảy ra, vui lòng thử lại')
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
