<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-poppins">
          Ưu đãi đặc biệt
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Những ưu đãi hấp dẫn nhất dành cho bạn
        </p>
      </div>

      <!-- Offers Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Orange Fruit Offer -->
        <div class="relative overflow-hidden rounded-2xl min-h-[412px] group cursor-pointer">
          <!-- Background Image -->
          <div class="absolute inset-0">
            <img 
              src="/images/products/orange-australia.jpg" 
              alt="Orange Fruit"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/40"></div>
          </div>
          
          <!-- Content - Always visible -->
          <div class="relative z-10 p-8 h-full flex flex-col justify-between text-white">
            <div>
              <h3 class="text-2xl font-bold mb-2">Orange Fruit</h3>
            </div>
            <div>
              <div class="text-3xl font-bold mb-4">€180.00</div>
              <NuxtLink to="/fruits" class="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-primary-green transition-colors inline-block">
                SHOP NOW →
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Column - 2 cards stacked -->
        <div class="grid grid-rows-2 gap-6">
          <!-- Up to 70% Off -->
          <div class="relative overflow-hidden rounded-2xl min-h-[200px] group cursor-pointer">
            <!-- Background Image -->
            <div class="absolute inset-0">
              <img 
                src="/images/products/mango-thailand.png" 
                alt="Up to 70% Off"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/40"></div>
            </div>
            
            <!-- Content - Always visible, centered -->
            <div class="relative z-10 p-6 h-full flex flex-col justify-center text-center text-white">
              <h3 class="text-2xl font-bold mb-4">Up to 70% Off</h3>
              <NuxtLink to="/fruits" class="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors mx-auto inline-block">
                SHOP NOW →
              </NuxtLink>
            </div>
          </div>

          <!-- Sale 50% Off -->
          <div class="relative overflow-hidden rounded-2xl min-h-[200px] group cursor-pointer">
            <!-- Background Image -->
            <div class="absolute inset-0">
              <img 
                src="/images/products/grapes-japan.webp" 
                alt="Sale 50% Off"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/40"></div>
            </div>
            
            <!-- Content - Always visible, centered -->
            <div class="relative z-10 p-6 h-full flex flex-col justify-center text-center text-white">
              <h3 class="text-2xl font-bold mb-3">Sale 50% Off</h3>
              <NuxtLink to="/fruits" class="border-2 border-white text-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-primary-green transition-colors mx-auto text-sm inline-block">
                SHOP NOW →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Super Offer section with promotional cards

// Handle image error
const handleImageError = (event) => {
  // Replace with a gradient background if image fails to load
  event.target.style.display = 'none'
  event.target.parentElement.style.background = 'linear-gradient(135deg, #7AC74F 0%, #4ade80 100%)'
}
</script>

<style scoped>
/* Additional hover effects */
.group:hover .absolute.top-4.right-4 {
  transform: rotate(10deg) scale(1.1);
  transition: transform 0.3s ease;
}
</style>
