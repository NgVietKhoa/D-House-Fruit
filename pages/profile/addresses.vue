<template>
  <div>
    <!-- Page Header -->
    <div class="bg-gradient-to-br from-primary-green via-green-600 to-green-700 text-white">
      <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div class="flex items-center space-x-3 md:space-x-4">
          <div class="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold">
            <MapPinIcon class="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold">Sổ địa chỉ</h1>
            <p class="text-green-100 mt-1 text-sm md:text-base">Quản lý địa chỉ giao hàng của bạn</p>
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

        <!-- Addresses Content -->
        <div class="lg:col-span-3">
          <!-- Add New Address Button -->
          <div class="mb-6">
            <button
              @click="showAddForm = true"
              class="inline-flex items-center px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors min-h-[44px] touch-manipulation"
            >
              <PlusIcon class="w-5 h-5 mr-2" />
              Thêm địa chỉ mới
            </button>
          </div>

          <!-- Addresses List -->
          <div class="space-y-4">
            <div
              v-for="address in addresses"
              :key="address.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6"
            >
              <div class="flex flex-col md:flex-row md:items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-2">
                    <h3 class="font-semibold text-gray-900">{{ address.label }}</h3>
                    <span
                      v-if="address.isDefault"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      Mặc định
                    </span>
                  </div>
                  <div class="text-sm text-gray-600 space-y-1">
                    <div class="font-medium">{{ address.fullName }}</div>
                    <div>{{ address.phone }}</div>
                    <div>{{ address.address }}</div>
                    <div>{{ address.ward }}, {{ address.district }}, {{ address.city }}</div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2 mt-4 md:mt-0">
                  <button
                    @click="editAddress(address)"
                    class="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors min-h-[44px] touch-manipulation"
                  >
                    Sửa
                  </button>
                  <button
                    v-if="!address.isDefault"
                    @click="setDefaultAddress(address.id)"
                    class="px-3 py-1.5 text-sm bg-primary-green text-white rounded-md hover:bg-green-700 transition-colors min-h-[44px] touch-manipulation"
                  >
                    Đặt mặc định
                  </button>
                  <button
                    v-if="!address.isDefault"
                    @click="deleteAddress(address.id)"
                    class="px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors min-h-[44px] touch-manipulation"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="addresses.length === 0" class="text-center py-12">
              <MapPinIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">Chưa có địa chỉ nào</h3>
              <p class="text-gray-600 mb-6">Thêm địa chỉ giao hàng để đặt hàng nhanh chóng hơn</p>
              <button
                @click="showAddForm = true"
                class="inline-flex items-center px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusIcon class="w-5 h-5 mr-2" />
                Thêm địa chỉ đầu tiên
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Address Modal -->
    <div
      v-if="showAddForm || editingAddress"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeForm"
    >
      <div
        class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-4 md:p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg md:text-xl font-semibold text-gray-900">
              {{ editingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới' }}
            </h3>
            <button
              @click="closeForm"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>

          <form @submit.prevent="saveAddress" class="space-y-4">
            <!-- Label -->
            <div>
              <label for="label" class="block text-sm font-medium text-gray-700 mb-2">
                Nhãn địa chỉ <span class="text-red-500">*</span>
              </label>
              <input
                id="label"
                v-model="addressForm.label"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                placeholder="Ví dụ: Nhà riêng, Công ty..."
              />
            </div>

            <!-- Full Name -->
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên <span class="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                v-model="addressForm.fullName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                placeholder="Nhập họ và tên người nhận"
              />
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại <span class="text-red-500">*</span>
              </label>
              <input
                id="phone"
                v-model="addressForm.phone"
                type="tel"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                placeholder="0987654321"
              />
            </div>

            <!-- Address -->
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ <span class="text-red-500">*</span>
              </label>
              <input
                id="address"
                v-model="addressForm.address"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                placeholder="Số nhà, tên đường..."
              />
            </div>

            <!-- Location -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700 mb-2">
                  Tỉnh/Thành phố <span class="text-red-500">*</span>
                </label>
                <select
                  id="city"
                  v-model="addressForm.city"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                >
                  <option value="">Chọn tỉnh/thành</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>
              
              <div>
                <label for="district" class="block text-sm font-medium text-gray-700 mb-2">
                  Quận/Huyện <span class="text-red-500">*</span>
                </label>
                <select
                  id="district"
                  v-model="addressForm.district"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                >
                  <option value="">Chọn quận/huyện</option>
                  <option value="Quận 1">Quận 1</option>
                  <option value="Quận 3">Quận 3</option>
                  <option value="Quận 7">Quận 7</option>
                </select>
              </div>
              
              <div>
                <label for="ward" class="block text-sm font-medium text-gray-700 mb-2">
                  Phường/Xã <span class="text-red-500">*</span>
                </label>
                <select
                  id="ward"
                  v-model="addressForm.ward"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                >
                  <option value="">Chọn phường/xã</option>
                  <option value="Phường Bến Nghé">Phường Bến Nghé</option>
                  <option value="Phường 7">Phường 7</option>
                  <option value="Phường Tân Thuận Đông">Phường Tân Thuận Đông</option>
                </select>
              </div>
            </div>

            <!-- Default Address -->
            <div class="flex items-center">
              <input
                id="isDefault"
                v-model="addressForm.isDefault"
                type="checkbox"
                class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label for="isDefault" class="ml-2 text-sm text-gray-700">
                Đặt làm địa chỉ mặc định
              </label>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 pt-6">
              <button
                type="button"
                @click="closeForm"
                class="w-full md:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px] touch-manipulation"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full md:w-auto px-6 py-2.5 bg-primary-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] touch-manipulation"
              >
                {{ isLoading ? 'Đang lưu...' : (editingAddress ? 'Cập nhật' : 'Thêm địa chỉ') }}
              </button>
            </div>
          </form>
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
import { ref, reactive, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { 
  MapPinIcon, 
  PlusIcon, 
  XMarkIcon,
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
  title: 'Sổ địa chỉ - D\'House Fruit',
  meta: [
    { name: 'description', content: 'Quản lý địa chỉ giao hàng tại D\'House Fruit' }
  ]
})

const { user } = useAuth()

// State
const addresses = ref([])
const showAddForm = ref(false)
const editingAddress = ref(null)
const isLoading = ref(false)

// Form data
const addressForm = reactive({
  label: '',
  fullName: '',
  phone: '',
  address: '',
  city: '',
  district: '',
  ward: '',
  isDefault: false
})

// Message state
const message = reactive({
  show: false,
  type: 'success',
  text: ''
})

// Mock addresses data
const mockAddresses = [
  {
    id: 1,
    label: 'Nhà riêng',
    fullName: 'Nguyễn Văn A',
    phone: '0987654321',
    address: '123 Nguyễn Huệ',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    isDefault: true
  },
  {
    id: 2,
    label: 'Công ty',
    fullName: 'Nguyễn Văn A',
    phone: '0987654321',
    address: '456 Lê Lợi',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 3',
    ward: 'Phường 7',
    isDefault: false
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

const resetForm = () => {
  addressForm.label = ''
  addressForm.fullName = user.value?.fullName || ''
  addressForm.phone = user.value?.phone || ''
  addressForm.address = ''
  addressForm.city = ''
  addressForm.district = ''
  addressForm.ward = ''
  addressForm.isDefault = addresses.value.length === 0
}

const closeForm = () => {
  showAddForm.value = false
  editingAddress.value = null
  resetForm()
}

const editAddress = (address) => {
  editingAddress.value = address
  Object.assign(addressForm, address)
  showAddForm.value = true
}

const saveAddress = async () => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingAddress.value) {
      // Update existing address
      const index = addresses.value.findIndex(addr => addr.id === editingAddress.value.id)
      if (index > -1) {
        addresses.value[index] = { ...addressForm, id: editingAddress.value.id }
      }
      showMessage('success', 'Cập nhật địa chỉ thành công!')
    } else {
      // Add new address
      const newAddress = {
        ...addressForm,
        id: Date.now()
      }
      addresses.value.push(newAddress)
      showMessage('success', 'Thêm địa chỉ thành công!')
    }
    
    // Set as default if checked
    if (addressForm.isDefault) {
      addresses.value.forEach(addr => {
        addr.isDefault = addr.id === (editingAddress.value?.id || addresses.value[addresses.value.length - 1].id)
      })
    }
    
    closeForm()
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const setDefaultAddress = async (addressId) => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addresses.value.forEach(addr => {
      addr.isDefault = addr.id === addressId
    })
    
    showMessage('success', 'Đã đặt làm địa chỉ mặc định!')
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const deleteAddress = async (addressId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) return
  
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = addresses.value.findIndex(addr => addr.id === addressId)
    if (index > -1) {
      addresses.value.splice(index, 1)
    }
    
    showMessage('success', 'Xóa địa chỉ thành công!')
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Load mock data
  addresses.value = [...mockAddresses]
  resetForm()
})
</script>

<style scoped>
/* Custom styles */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
