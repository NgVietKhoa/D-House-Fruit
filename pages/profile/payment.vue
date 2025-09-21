<template>
  <div>
    <!-- Page Header -->
    <div class="bg-gradient-to-br from-primary-green via-green-600 to-green-700 text-white">
      <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div class="flex items-center space-x-3 md:space-x-4">
          <div class="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold">
            <CreditCardIcon class="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold">Phương thức thanh toán</h1>
            <p class="text-green-100 mt-1 text-sm md:text-base">Quản lý thẻ và phương thức thanh toán</p>
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

        <!-- Payment Content -->
        <div class="lg:col-span-3">
          <!-- Add New Payment Method Button -->
          <div class="mb-6">
            <button
              @click="showAddForm = true"
              class="inline-flex items-center px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors min-h-[44px] touch-manipulation"
            >
              <PlusIcon class="w-5 h-5 mr-2" />
              Thêm phương thức thanh toán
            </button>
          </div>

          <!-- Payment Methods List -->
          <div class="space-y-4">
            <!-- Credit/Debit Cards -->
            <div
              v-for="card in creditCards"
              :key="card.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6"
            >
              <div class="flex flex-col md:flex-row md:items-center justify-between">
                <div class="flex items-center space-x-4">
                  <!-- Card Icon -->
                  <div class="w-12 h-8 bg-white border border-gray-200 rounded-md flex items-center justify-center p-1">
                    <img 
                      src="/images/pay/visa.webp" 
                      alt="Visa"
                      class="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div>
                    <div class="flex items-center space-x-2 mb-1">
                      <h3 class="font-semibold text-gray-900">{{ card.type }} •••• {{ card.lastFour }}</h3>
                      <span
                        v-if="card.isDefault"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        Mặc định
                      </span>
                    </div>
                    <div class="text-sm text-gray-600">
                      <div>{{ card.holderName }}</div>
                      <div>Hết hạn: {{ card.expiryMonth }}/{{ card.expiryYear }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2 mt-4 md:mt-0">
                  <button
                    @click="editCard(card)"
                    class="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors min-h-[44px] touch-manipulation"
                  >
                    Sửa
                  </button>
                  <button
                    v-if="!card.isDefault"
                    @click="setDefaultCard(card.id)"
                    class="px-3 py-1.5 text-sm bg-primary-green text-white rounded-md hover:bg-green-700 transition-colors min-h-[44px] touch-manipulation"
                  >
                    Đặt mặc định
                  </button>
                  <button
                    @click="deleteCard(card.id)"
                    class="px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors min-h-[44px] touch-manipulation"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>

            <!-- Digital Wallets -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Ví điện tử</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="wallet in digitalWallets"
                  :key="wallet.id"
                  class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-white border border-gray-200 p-1">
                      <img 
                        :src="wallet.logo" 
                        :alt="wallet.name"
                        class="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div class="font-medium text-gray-900">{{ wallet.name }}</div>
                      <div class="text-sm text-gray-600">{{ wallet.account }}</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                        wallet.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      ]"
                    >
                      {{ wallet.connected ? 'Đã liên kết' : 'Chưa liên kết' }}
                    </span>
                    <button
                      @click="toggleWallet(wallet.id)"
                      :class="[
                        'px-3 py-1.5 text-sm rounded-md transition-colors min-h-[44px] touch-manipulation',
                        wallet.connected 
                          ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                          : 'bg-primary-green text-white hover:bg-green-700'
                      ]"
                    >
                      {{ wallet.connected ? 'Hủy liên kết' : 'Liên kết' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bank Transfer -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Chuyển khoản ngân hàng</h3>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-start space-x-3">
                  <div class="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-1 mt-1">
                    <img 
                      src="/images/pay/mbbank.png" 
                      alt="MBBank"
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-blue-900 mb-2">Thông tin chuyển khoản MBBank</h4>
                    <div class="text-sm text-blue-800 space-y-1">
                      <div><strong>Ngân hàng:</strong> Ngân hàng Quân đội (MBBank)</div>
                      <div><strong>Số tài khoản:</strong> 0123456789</div>
                      <div><strong>Chủ tài khoản:</strong> CÔNG TY D'HOUSE FRUIT</div>
                      <div><strong>Chi nhánh:</strong> Hồ Chí Minh</div>
                      <div><strong>Nội dung:</strong> [Mã đơn hàng] + [Số điện thoại]</div>
                    </div>
                    <div class="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p class="text-xs text-yellow-800">
                        <strong>Lưu ý:</strong> Vui lòng ghi đúng nội dung chuyển khoản để đơn hàng được xử lý nhanh chóng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cash on Delivery -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BanknotesIcon class="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</h3>
                    <p class="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <input
                    id="cod-enabled"
                    v-model="codEnabled"
                    type="checkbox"
                    class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label for="cod-enabled" class="ml-2 text-sm text-gray-700">Kích hoạt</label>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="creditCards.length === 0" class="text-center py-12">
              <CreditCardIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">Chưa có phương thức thanh toán</h3>
              <p class="text-gray-600 mb-6">Thêm thẻ tín dụng hoặc thẻ ghi nợ để thanh toán nhanh chóng</p>
              <button
                @click="showAddForm = true"
                class="inline-flex items-center px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusIcon class="w-5 h-5 mr-2" />
                Thêm thẻ đầu tiên
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Card Modal -->
    <div
      v-if="showAddForm || editingCard"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeForm"
    >
      <div
        class="bg-white rounded-lg max-w-md w-full"
        @click.stop
      >
        <div class="p-4 md:p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg md:text-xl font-semibold text-gray-900">
              {{ editingCard ? 'Chỉnh sửa thẻ' : 'Thêm thẻ mới' }}
            </h3>
            <button
              @click="closeForm"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>

          <form @submit.prevent="saveCard" class="space-y-4">
            <!-- Card Number -->
            <div>
              <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-2">
                Số thẻ <span class="text-red-500">*</span>
              </label>
              <input
                id="cardNumber"
                v-model="cardForm.cardNumber"
                type="text"
                required
                maxlength="19"
                @input="formatCardNumber"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <!-- Holder Name -->
            <div>
              <label for="holderName" class="block text-sm font-medium text-gray-700 mb-2">
                Tên chủ thẻ <span class="text-red-500">*</span>
              </label>
              <input
                id="holderName"
                v-model="cardForm.holderName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                placeholder="NGUYEN VAN A"
              />
            </div>

            <!-- Expiry & CVV -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="expiry" class="block text-sm font-medium text-gray-700 mb-2">
                  MM/YY <span class="text-red-500">*</span>
                </label>
                <input
                  id="expiry"
                  v-model="cardForm.expiry"
                  type="text"
                  required
                  maxlength="5"
                  @input="formatExpiry"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                  placeholder="12/25"
                />
              </div>
              <div>
                <label for="cvv" class="block text-sm font-medium text-gray-700 mb-2">
                  CVV <span class="text-red-500">*</span>
                </label>
                <input
                  id="cvv"
                  v-model="cardForm.cvv"
                  type="text"
                  required
                  maxlength="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base md:text-sm"
                  placeholder="123"
                />
              </div>
            </div>

            <!-- Default Card -->
            <div class="flex items-center">
              <input
                id="isDefault"
                v-model="cardForm.isDefault"
                type="checkbox"
                class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label for="isDefault" class="ml-2 text-sm text-gray-700">
                Đặt làm thẻ mặc định
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
                {{ isLoading ? 'Đang lưu...' : (editingCard ? 'Cập nhật' : 'Thêm thẻ') }}
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
  CreditCardIcon, 
  PlusIcon, 
  XMarkIcon,
  BanknotesIcon,
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
  title: 'Phương thức thanh toán - D\'House Fruit',
  meta: [
    { name: 'description', content: 'Quản lý phương thức thanh toán tại D\'House Fruit' }
  ]
})

const { user } = useAuth()

// State
const creditCards = ref([])
const digitalWallets = ref([])
const showAddForm = ref(false)
const editingCard = ref(null)
const isLoading = ref(false)
const codEnabled = ref(true)

// Form data
const cardForm = reactive({
  cardNumber: '',
  holderName: '',
  expiry: '',
  cvv: '',
  isDefault: false
})

// Message state
const message = reactive({
  show: false,
  type: 'success',
  text: ''
})

// Mock data
const mockCards = [
  {
    id: 1,
    type: 'Visa',
    lastFour: '1234',
    holderName: 'NGUYEN VAN A',
    expiryMonth: '12',
    expiryYear: '25',
    isDefault: true
  }
]

const mockWallets = [
  {
    id: 1,
    name: 'MoMo',
    account: '0987654321',
    connected: true,
    logo: '/images/pay/momo.webp'
  },
  {
    id: 2,
    name: 'ZaloPay',
    account: '0987654321',
    connected: false,
    logo: '/images/pay/zalopay.webp'
  },
  {
    id: 3,
    name: 'VNPay',
    account: 'Chưa liên kết',
    connected: false,
    logo: '/images/pay/vnpay.webp'
  },
  {
    id: 4,
    name: 'PayPal',
    account: 'Chưa liên kết',
    connected: false,
    logo: '/images/pay/paypal.png'
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
  cardForm.cardNumber = ''
  cardForm.holderName = user.value?.fullName?.toUpperCase() || ''
  cardForm.expiry = ''
  cardForm.cvv = ''
  cardForm.isDefault = creditCards.value.length === 0
}

const closeForm = () => {
  showAddForm.value = false
  editingCard.value = null
  resetForm()
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
  cardForm.cardNumber = formattedValue
}

const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  cardForm.expiry = value
}

const editCard = (card) => {
  editingCard.value = card
  cardForm.cardNumber = `•••• •••• •••• ${card.lastFour}`
  cardForm.holderName = card.holderName
  cardForm.expiry = `${card.expiryMonth}/${card.expiryYear}`
  cardForm.cvv = '***'
  cardForm.isDefault = card.isDefault
  showAddForm.value = true
}

const saveCard = async () => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingCard.value) {
      // Update existing card
      const index = creditCards.value.findIndex(card => card.id === editingCard.value.id)
      if (index > -1) {
        const [month, year] = cardForm.expiry.split('/')
        creditCards.value[index] = {
          ...editingCard.value,
          holderName: cardForm.holderName,
          expiryMonth: month,
          expiryYear: year,
          isDefault: cardForm.isDefault
        }
      }
      showMessage('success', 'Cập nhật thẻ thành công!')
    } else {
      // Add new card
      const [month, year] = cardForm.expiry.split('/')
      const newCard = {
        id: Date.now(),
        type: 'Visa', // Detect from card number in real app
        lastFour: cardForm.cardNumber.slice(-4),
        holderName: cardForm.holderName,
        expiryMonth: month,
        expiryYear: year,
        isDefault: cardForm.isDefault
      }
      creditCards.value.push(newCard)
      showMessage('success', 'Thêm thẻ thành công!')
    }
    
    // Set as default if checked
    if (cardForm.isDefault) {
      creditCards.value.forEach(card => {
        card.isDefault = card.id === (editingCard.value?.id || creditCards.value[creditCards.value.length - 1].id)
      })
    }
    
    closeForm()
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const setDefaultCard = async (cardId) => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    creditCards.value.forEach(card => {
      card.isDefault = card.id === cardId
    })
    
    showMessage('success', 'Đã đặt làm thẻ mặc định!')
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const deleteCard = async (cardId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa thẻ này?')) return
  
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = creditCards.value.findIndex(card => card.id === cardId)
    if (index > -1) {
      creditCards.value.splice(index, 1)
    }
    
    showMessage('success', 'Xóa thẻ thành công!')
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

const toggleWallet = async (walletId) => {
  isLoading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const wallet = digitalWallets.value.find(w => w.id === walletId)
    if (wallet) {
      wallet.connected = !wallet.connected
      if (wallet.connected) {
        if (wallet.name === 'PayPal') {
          wallet.account = 'user@example.com'
        } else {
          wallet.account = '0987654321'
        }
        showMessage('success', `Liên kết ${wallet.name} thành công!`)
      } else {
        wallet.account = 'Chưa liên kết'
        showMessage('success', `Hủy liên kết ${wallet.name} thành công!`)
      }
    }
  } catch (error) {
    showMessage('error', 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Load mock data
  creditCards.value = [...mockCards]
  digitalWallets.value = [...mockWallets]
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
