<template>
  <div>
    <!-- Page Header -->
    <div class="bg-gradient-to-br from-primary-green via-green-600 to-green-700 text-white">
      <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div class="flex items-center space-x-3 md:space-x-4">
          <div class="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold">
            {{ getInitials(user?.fullName) }}
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold">Thông tin cá nhân</h1>
            <p class="text-green-100 mt-1 text-sm md:text-base">Quản lý thông tin tài khoản của bạn</p>
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

        <!-- Profile Content -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <!-- Profile Header -->
            <div class="p-4 md:p-6 border-b border-gray-200">
              <h2 class="text-lg md:text-xl font-semibold text-gray-900">Thông tin cá nhân</h2>
              <p class="text-xs md:text-sm text-gray-600 mt-1">Cập nhật thông tin cá nhân và liên hệ của bạn</p>
            </div>

            <!-- Profile Form -->
            <form @submit.prevent="handleUpdateProfile" class="p-4 md:p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Full Name -->
                <div>
                  <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    v-model="profileForm.fullName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm touch-manipulation"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="profileForm.email"
                    type="email"
                    required
                    disabled
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    placeholder="email@example.com"
                  />
                  <p class="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
                </div>

                <!-- Phone -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    v-model="profileForm.phone"
                    type="tel"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm touch-manipulation"
                    placeholder="0987654321"
                  />
                </div>

                <!-- Date of Birth -->
                <div>
                  <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    id="dateOfBirth"
                    v-model="profileForm.dateOfBirth"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm touch-manipulation"
                  />
                </div>

                <!-- Gender -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                  <div class="flex space-x-4">
                    <label class="flex items-center">
                      <input
                        v-model="profileForm.gender"
                        type="radio"
                        value="male"
                        class="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span class="ml-2 text-sm text-gray-700">Nam</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="profileForm.gender"
                        type="radio"
                        value="female"
                        class="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span class="ml-2 text-sm text-gray-700">Nữ</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="profileForm.gender"
                        type="radio"
                        value="other"
                        class="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span class="ml-2 text-sm text-gray-700">Khác</span>
                    </label>
                  </div>
                </div>

                <!-- Address -->
                <div class="md:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <textarea
                    id="address"
                    v-model="profileForm.address"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none text-base md:text-sm touch-manipulation"
                    placeholder="Nhập địa chỉ của bạn"
                  ></textarea>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  @click="resetForm"
                  class="w-full md:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px] touch-manipulation"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full md:w-auto px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] touch-manipulation"
                >
                  {{ isLoading ? 'Đang lưu...' : 'Lưu thay đổi' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Change Password Section -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
            <div class="p-4 md:p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Đổi mật khẩu</h3>
              <p class="text-sm text-gray-600 mt-1">Cập nhật mật khẩu để bảo mật tài khoản</p>
            </div>

            <form @submit.prevent="handleChangePassword" class="p-4 md:p-6">
              <div class="space-y-6">
                <!-- Current Password -->
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu hiện tại <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="currentPassword"
                    v-model="passwordForm.currentPassword"
                    type="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm touch-manipulation"
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </div>

                <!-- New Password -->
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu mới <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="newPassword"
                    v-model="passwordForm.newPassword"
                    type="password"
                    required
                    minlength="6"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm touch-manipulation"
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  />
                </div>

                <!-- Confirm New Password -->
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                    Xác nhận mật khẩu mới <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm touch-manipulation"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <p v-if="passwordMismatch" class="text-sm text-red-600 mt-1">
                    Mật khẩu xác nhận không khớp
                  </p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  @click="resetPasswordForm"
                  class="w-full md:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px] touch-manipulation"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  :disabled="isLoading || passwordMismatch"
                  class="w-full md:w-auto px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] touch-manipulation"
                >
                  {{ isLoading ? 'Đang cập nhật...' : 'Đổi mật khẩu' }}
                </button>
              </div>
            </form>
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid'
import ProfileSidebar from '~/components/ProfileSidebar.vue'

// Meta tags
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

useHead({
  title: 'Thông tin cá nhân - D\'House Fruit',
  meta: [
    { name: 'description', content: 'Quản lý thông tin cá nhân và cài đặt tài khoản tại D\'House Fruit' }
  ]
})

const { user, updateProfile, isLoading, getInitials } = useAuth()

// Profile form
const profileForm = reactive({
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: ''
})

// Password form
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Message state
const message = reactive({
  show: false,
  type: 'success',
  text: ''
})

// Computed
const passwordMismatch = computed(() => {
  return passwordForm.newPassword && passwordForm.confirmPassword && 
         passwordForm.newPassword !== passwordForm.confirmPassword
})

// Initialize form with user data
const initializeForm = () => {
  if (user.value) {
    profileForm.fullName = user.value.fullName || ''
    profileForm.email = user.value.email || ''
    profileForm.phone = user.value.phone || ''
    profileForm.dateOfBirth = user.value.dateOfBirth || ''
    profileForm.gender = user.value.gender || ''
    profileForm.address = user.value.address || ''
  }
}

// Methods
const showMessage = (type, text) => {
  message.show = true
  message.type = type
  message.text = text
  
  setTimeout(() => {
    message.show = false
  }, 5000)
}

const handleUpdateProfile = async () => {
  try {
    const result = await updateProfile({
      fullName: profileForm.fullName,
      phone: profileForm.phone,
      dateOfBirth: profileForm.dateOfBirth,
      gender: profileForm.gender,
      address: profileForm.address
    })
    
    if (result.success) {
      showMessage('success', 'Cập nhật thông tin thành công!')
    } else {
      showMessage('error', result.message || 'Có lỗi xảy ra khi cập nhật thông tin')
    }
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  }
}

const handleChangePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    showMessage('error', 'Mật khẩu xác nhận không khớp')
    return
  }
  
  try {
    // Mock password change API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showMessage('success', 'Đổi mật khẩu thành công!')
    resetPasswordForm()
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra khi đổi mật khẩu')
  }
}

const resetForm = () => {
  initializeForm()
}

const resetPasswordForm = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

// Watchers
watch(user, (newUser) => {
  if (newUser) {
    initializeForm()
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  initializeForm()
})
</script>

<style scoped>
/* Custom styles for form elements */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* Animation for messages */
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
  
  .p-6 {
    padding: 1rem;
  }
  
  .space-x-4 {
    gap: 0.5rem;
  }
}
</style>
