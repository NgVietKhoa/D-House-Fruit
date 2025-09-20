<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo and Description -->
        <div class="md:col-span-2 text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start space-x-3 mb-4">
            <!-- Logo Image -->
            <img src="/images/logoDHouseFruit.png" alt="D'House Fruit Logo" class="w-10 h-10 object-contain" @error="onImageError">
            
            <!-- Temporary Logo Placeholder - Remove when logo is working -->
            <!-- <div class="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-lg">D</span>
            </div> -->
            
            <div>
              <h3 class="text-xl font-bold font-poppins">D'House Fruit</h3>
              <p class="text-sm text-gray-300">Premium Imported Fruits</p>
            </div>
          </div>
          <p class="text-gray-300 mb-4 leading-relaxed">
            Chuyên cung cấp hoa quả nhập khẩu cao cấp và giỏ quà tặng sang trọng. 
            Mang hương vị thế giới - Trao gửi tình thân.
          </p>
        </div>

        <!-- Contact Info -->
        <div class="text-center md:text-left">
          <h4 class="text-lg font-semibold mb-4 font-poppins">Liên hệ</h4>
          <div class="space-y-3 text-gray-300">
            <div class="flex items-center justify-center md:justify-start space-x-2">
              <PhoneIcon class="w-5 h-5 text-primary-green" />
              <span>+84 096 315 2236</span>
            </div>
            <div class="flex items-center justify-center md:justify-start space-x-2">
              <EnvelopeIcon class="w-5 h-5 text-primary-green" />
              <span>dhousefruit2025@gmail.com</span>
            </div>
            <div class="flex items-start justify-center md:justify-start space-x-2">
              <MapPinIcon class="w-5 h-5 text-primary-green mt-1" />
              <span>Số 100 - Tổ 26 - Đông Anh - Hà Nội</span>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="text-center md:text-left">
          <h4 class="text-lg font-semibold mb-4 font-poppins">Liên kết nhanh</h4>
          <div class="space-y-2">
            <NuxtLink to="/fruits" class="block text-gray-300 hover:text-primary-green transition-colors">
              Hoa quả nhập khẩu
            </NuxtLink>
            <NuxtLink to="/gift-baskets" class="block text-gray-300 hover:text-primary-green transition-colors">
              Giỏ quà tặng
            </NuxtLink>
            <NuxtLink to="/about" class="block text-gray-300 hover:text-primary-green transition-colors">
              Giới thiệu
            </NuxtLink>
            <NuxtLink to="/contact" class="block text-gray-300 hover:text-primary-green transition-colors">
              Liên hệ
            </NuxtLink>
          </div>
          
          <!-- Social Contact -->
          <div class="mt-6">
            <h5 class="font-semibold mb-2">Kết nối với chúng tôi</h5>
            <div class="flex justify-center md:justify-start space-x-6">
              <a href="https://www.facebook.com/dhousefruit" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition-opacity flex items-center space-x-2">
                <img src="/images/logo/facebook.png" alt="Facebook" class="w-6 h-6 object-contain" />
                <span class="text-gray-300 hover:text-white transition-colors">Facebook</span>
              </a>
              <a href="https://zalo.me/0963152236" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition-opacity flex items-center space-x-2">
                <img src="/images/logo/zalo.png" alt="Zalo" class="w-6 h-6 object-contain" />
                <span class="text-gray-300 hover:text-white transition-colors">Zalo</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 D'House Fruit. All rights reserved. | Thiết kế bởi D'House Team</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/vue/24/outline'

// Handle image error
const onImageError = (event) => {
  console.error('Logo image failed to load:', event.target.src)
  // Optionally show fallback
  event.target.style.display = 'none'
}
</script>
