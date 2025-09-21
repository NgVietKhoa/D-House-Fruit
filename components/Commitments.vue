<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-poppins">
          Cam kết chất lượng
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Chúng tôi cam kết mang đến cho bạn những sản phẩm tốt nhất 
          với dịch vụ hoàn hảo nhất
        </p>
      </div>

      <!-- Commitments Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Commitment 1 -->
        <div class="text-center group">
          <div class="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <ShieldCheckIcon class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4 font-poppins">
            Trái cây chính ngạch
          </h3>
          <p class="text-gray-600 leading-relaxed">
            100% hoa quả nhập khẩu chính ngạch từ các vùng đất nổi tiếng thế giới. 
            Có đầy đủ giấy tờ xuất xứ và chứng nhận chất lượng.
          </p>
        </div>

        <!-- Commitment 2 -->
        <div class="text-center group">
          <div class="w-20 h-20 bg-primary-orange rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <BeakerIcon class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4 font-poppins">
            Chất lượng kiểm định
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Mỗi sản phẩm đều được kiểm tra kỹ lưỡng về chất lượng, độ tươi ngon 
            và an toàn thực phẩm trước khi đến tay khách hàng.
          </p>
        </div>

        <!-- Commitment 3 -->
        <div class="text-center group">
          <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <ArrowPathIcon class="w-10 h-10 text-white" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4 font-poppins">
            Đổi trả trong 24h
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Nếu không hài lòng về chất lượng sản phẩm, bạn có thể đổi trả 
            trong vòng 24 giờ kể từ khi nhận hàng.
          </p>
        </div>
      </div>

      <!-- Additional Features -->
      <div class="mt-16 bg-gradient-to-r from-cream to-light-cream rounded-2xl p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex items-center space-x-3">
            <TruckIcon class="w-8 h-8 text-primary-green" />
            <div>
              <h4 class="font-semibold text-gray-800">Giao hàng nhanh</h4>
              <p class="text-sm text-gray-600">Trong ngày tại Hà Nội</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <CreditCardIcon class="w-8 h-8 text-primary-green" />
            <div>
              <h4 class="font-semibold text-gray-800">Thanh toán linh hoạt</h4>
              <p class="text-sm text-gray-600">COD, chuyển khoản, thẻ</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <PhoneIcon class="w-8 h-8 text-primary-green" />
            <div>
              <h4 class="font-semibold text-gray-800">Hỗ trợ 24/7</h4>
              <p class="text-sm text-gray-600">Hotline: 0963 152 236</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <GiftIcon class="w-8 h-8 text-primary-green" />
            <div>
              <h4 class="font-semibold text-gray-800">Đóng gói sang trọng</h4>
              <p class="text-sm text-gray-600">Miễn phí thiệp chúc mừng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { 
  ShieldCheckIcon, 
  BeakerIcon, 
  ArrowPathIcon, 
  TruckIcon, 
  CreditCardIcon, 
  PhoneIcon, 
  GiftIcon 
} from '@heroicons/vue/24/outline'
</script>
