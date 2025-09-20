<template>
  <div class="min-h-screen">
    <!-- Hero Section with Quick Contact -->
    <section class="bg-gradient-to-br from-primary-green via-green-600 to-green-700 text-white py-20 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div class="absolute top-32 right-20 w-20 h-20 bg-primary-orange rounded-full"></div>
        <div class="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <h1 class="text-4xl lg:text-6xl font-bold mb-6 font-poppins leading-tight">
            Hỗ trợ <span class="text-primary-orange">24/7</span><br>
            cho khách hàng
          </h1>
          <p class="text-xl lg:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
            Gọi hotline, chat Zalo hoặc Facebook để được tư vấn miễn phí
          </p>
        </div>

        <!-- Quick Contact Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <!-- Hotline -->
          <a href="tel:+84963152236" class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Gọi ngay</h3>
            <p class="text-green-100 mb-2">Hotline 24/7</p>
            <p class="text-2xl font-bold text-primary-orange">096 315 2236</p>
          </a>

          <!-- Zalo -->
          <a href="https://zalo.me/0963152236" class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <img src="/images/logo/zalo.png" alt="Zalo" class="w-16 h-16 object-contain" />
            </div>
            <h3 class="text-xl font-bold mb-2">Chat Zalo</h3>
            <p class="text-green-100 mb-2">Phản hồi nhanh nhất</p>
            <p class="text-lg font-semibold text-blue-300">096 315 2236</p>
          </a>

          <!-- Facebook -->
          <a href="https://www.facebook.com/dhousefruit" class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <img src="/images/logo/facebook.png" alt="Facebook" class="w-16 h-16 object-contain" />
            </div>
            <h3 class="text-xl font-bold mb-2">Facebook</h3>
            <p class="text-green-100 mb-2">Chat Messenger</p>
            <p class="text-lg font-semibold text-blue-300">D'House Fruit</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Smart Contact Form -->
          <div class="bg-gradient-to-br from-cream to-light-cream rounded-3xl p-8">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-gray-800 mb-4 font-poppins">
                Đặt hàng & Tư vấn nhanh
              </h2>
              <p class="text-gray-600">
                Điền thông tin bên dưới, chúng tôi sẽ gọi lại trong 15 phút
              </p>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Priority Contact Method -->
              <div class="bg-white rounded-2xl p-6 border-2 border-primary-orange/20">
                <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <ClockIcon class="w-5 h-5 text-primary-orange mr-2" />
                  Liên hệ ưu tiên
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input 
                      v-model="form.name"
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                      placeholder="Nhập họ và tên"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input 
                      v-model="form.phone"
                      type="tel" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                      placeholder="Để chúng tôi gọi lại"
                    >
                  </div>
                </div>
              </div>

              <!-- Service Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  Bạn cần hỗ trợ gì? *
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="form.service === 'order' ? 'border-primary-orange bg-orange-50' : 'border-gray-200'">
                    <input v-model="form.service" type="radio" value="order" class="sr-only">
                    <ShoppingCartIcon class="w-6 h-6 text-primary-orange mr-3" />
                    <div>
                      <div class="font-semibold">Đặt hàng ngay</div>
                      <div class="text-sm text-gray-600">Mua trái cây, giỏ quà</div>
                    </div>
                  </label>
                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="form.service === 'consult' ? 'border-primary-green bg-green-50' : 'border-gray-200'">
                    <input v-model="form.service" type="radio" value="consult" class="sr-only">
                    <ChatBubbleLeftRightIcon class="w-6 h-6 text-primary-green mr-3" />
                    <div>
                      <div class="font-semibold">Tư vấn sản phẩm</div>
                      <div class="text-sm text-gray-600">Chọn trái cây phù hợp</div>
                    </div>
                  </label>
                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="form.service === 'gift' ? 'border-primary-orange bg-orange-50' : 'border-gray-200'">
                    <input v-model="form.service" type="radio" value="gift" class="sr-only">
                    <GiftIcon class="w-6 h-6 text-primary-orange mr-3" />
                    <div>
                      <div class="font-semibold">Thiết kế giỏ quà</div>
                      <div class="text-sm text-gray-600">Quà tặng cá nhân hóa</div>
                    </div>
                  </label>
                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="form.service === 'support' ? 'border-primary-green bg-green-50' : 'border-gray-200'">
                    <input v-model="form.service" type="radio" value="support" class="sr-only">
                    <QuestionMarkCircleIcon class="w-6 h-6 text-primary-green mr-3" />
                    <div>
                      <div class="font-semibold">Hỗ trợ khác</div>
                      <div class="text-sm text-gray-600">Khiếu nại, đổi trả</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung chi tiết (tùy chọn)
                </label>
                <textarea 
                  v-model="form.message"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="Ví dụ: Tôi muốn đặt giỏ quà tặng sinh nhật cho 10 người, ngân sách 500k/giỏ..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="w-full bg-gradient-to-r from-primary-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                <PhoneIcon class="w-5 h-5 inline mr-2" />
                Gửi yêu cầu - Gọi lại trong 15 phút
              </button>
              
              <p class="text-center text-sm text-gray-600">
                Hoặc gọi ngay: <a href="tel:+84963152236" class="text-primary-orange font-semibold hover:underline">096 315 2236</a>
              </p>
            </form>
          </div>

          <!-- Professional Contact Info -->
          <div class="space-y-8">
            <!-- Business Hours & Commitment -->
            <div class="bg-gradient-to-br from-primary-green to-green-600 text-white rounded-3xl p-8">
              <h2 class="text-2xl font-bold mb-6 font-poppins">
                Cam kết dịch vụ
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex items-center space-x-3">
                  <ClockIcon class="w-8 h-8 text-green-200" />
                  <div>
                    <div class="font-semibold">Phản hồi trong 15 phút</div>
                    <div class="text-green-200 text-sm">Trong giờ hành chính</div>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <TruckIcon class="w-8 h-8 text-green-200" />
                  <div>
                    <div class="font-semibold">Giao hàng trong ngày</div>
                    <div class="text-green-200 text-sm">Nội thành TP.HCM</div>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <ShieldCheckIcon class="w-8 h-8 text-green-200" />
                  <div>
                    <div class="font-semibold">Đảm bảo chất lượng</div>
                    <div class="text-green-200 text-sm">Hoàn tiền 100%</div>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <HeartIcon class="w-8 h-8 text-green-200" />
                  <div>
                    <div class="font-semibold">Tư vấn miễn phí</div>
                    <div class="text-green-200 text-sm">Chọn sản phẩm phù hợp</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Methods -->
            <div class="space-y-6">
              <h3 class="text-2xl font-bold text-gray-800 font-poppins">
                Liên hệ trực tiếp
              </h3>
              
              <!-- Phone Priority -->
              <div class="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-primary-orange">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center">
                      <PhoneIcon class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800">Hotline 24/7</h4>
                      <p class="text-2xl font-bold text-primary-orange">096 315 2236</p>
                      <p class="text-sm text-gray-600">Hỗ trợ tất cả các mạng</p>
                    </div>
                  </div>
                  <a href="tel:+84963152236" class="bg-primary-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Gọi ngay
                  </a>
                </div>
              </div>

              <!-- Store Location -->
              <div class="bg-white rounded-2xl p-6 shadow-lg">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPinIcon class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-800 mb-2">Cửa hàng chính</h4>
                    <p class="text-gray-600 mb-3">
                      Số 100 - Tổ 26 - Đông Anh<br>
                      Hà Nội, Việt Nam
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span class="font-medium">Thứ 2 - Thứ 6:</span> 8:00 - 20:00
                      </div>
                      <div>
                        <span class="font-medium">Thứ 7 - CN:</span> 8:00 - 18:00
                      </div>
                    </div>
                  </div>
                  <a href="https://maps.google.com/search/Số+100+-+Tổ+26+-+Đông+Anh+-+Hà+Nội" target="_blank" class="bg-primary-green hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Chỉ đường
                  </a>
                </div>
              </div>

              <!-- Email Support -->
              <div class="bg-white rounded-2xl p-6 shadow-lg">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center">
                    <EnvelopeIcon class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-800">Email hỗ trợ</h4>
                    <div class="space-y-1">
                      <p>
                        <span class="text-sm text-gray-600">Liên hệ chính:</span>
                        <a href="mailto:dhousefruit2025@gmail.com" class="text-primary-green hover:underline ml-2">dhousefruit2025@gmail.com</a>
                      </p>
                      <p class="text-sm text-gray-600 mt-2">
                        Phản hồi trong 2-4 giờ làm việc
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-poppins">
            Câu hỏi thường gặp
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Những thông tin hữu ích giúp bạn hiểu rõ hơn về dịch vụ của chúng tôi
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <QuestionMarkCircleIcon class="w-6 h-6 text-primary-orange mr-2" />
              Làm sao để đặt hàng?
            </h3>
            <p class="text-gray-600">
              Gọi hotline 096 315 2236, chat Zalo hoặc Facebook D'House Fruit, hoặc điền form trên trang này. 
              Chúng tôi sẽ tư vấn và xác nhận đơn hàng trong 15 phút.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <TruckIcon class="w-6 h-6 text-primary-green mr-2" />
              Thời gian giao hàng?
            </h3>
            <p class="text-gray-600">
              Nội thành TP.HCM: 2-4 giờ. Các tỉnh thành khác: 1-2 ngày. 
              Giao hàng miễn phí cho đơn từ 500k.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <ShieldCheckIcon class="w-6 h-6 text-primary-orange mr-2" />
              Chính sách đổi trả?
            </h3>
            <p class="text-gray-600">
              Hoàn tiền 100% nếu sản phẩm không đúng chất lượng cam kết. 
              Đổi trả trong 24h kể từ khi nhận hàng.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <GiftIcon class="w-6 h-6 text-primary-green mr-2" />
              Có thiết kế giỏ quà theo yêu cầu?
            </h3>
            <p class="text-gray-600">
              Có! Chúng tôi thiết kế giỏ quà cá nhân hóa theo ngân sách và sở thích. 
              Liên hệ để được tư vấn miễn phí.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  PhoneIcon, 
  MapPinIcon, 
  EnvelopeIcon, 
  ClockIcon,
  ShoppingCartIcon,
  GiftIcon,
  QuestionMarkCircleIcon,
  TruckIcon,
  ShieldCheckIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'

const form = ref({
  name: '',
  phone: '',
  service: '',
  message: ''
})

const submitForm = () => {
  if (!form.value.service) {
    alert('Vui lòng chọn loại hỗ trợ bạn cần!')
    return
  }
  
  // Handle form submission
  alert(`Cảm ơn ${form.value.name}! Chúng tôi sẽ gọi lại số ${form.value.phone} trong 15 phút để hỗ trợ về "${getServiceName(form.value.service)}".`)
  
  // Reset form
  form.value = {
    name: '',
    phone: '',
    service: '',
    message: ''
  }
}

const getServiceName = (service) => {
  const services = {
    order: 'Đặt hàng ngay',
    consult: 'Tư vấn sản phẩm',
    gift: 'Thiết kế giỏ quà',
    support: 'Hỗ trợ khác'
  }
  return services[service] || service
}

// SEO
useHead({
  title: 'Liên hệ - D\'House Fruit | Hotline 096 315 2236 - Hỗ trợ 24/7',
  meta: [
    { 
      name: 'description', 
      content: 'Liên hệ D\'House Fruit - Hotline 096 315 2236, Zalo, Facebook. Tư vấn miễn phí trái cây nhập khẩu và giỏ quà tặng. Phản hồi trong 15 phút, giao hàng trong ngày.' 
    },
    { name: 'keywords', content: 'liên hệ D\'House Fruit, hotline 096 315 2236, đặt hàng trái cây, tư vấn giỏ quà tặng, Hà Nội' },
    { property: 'og:title', content: 'Liên hệ D\'House Fruit - Hotline 096 315 2236' },
    { property: 'og:description', content: 'Hỗ trợ 24/7, tư vấn miễn phí, phản hồi trong 15 phút. Đặt hàng trái cây nhập khẩu và giỏ quà tặng cao cấp.' }
  ]
})
</script>
