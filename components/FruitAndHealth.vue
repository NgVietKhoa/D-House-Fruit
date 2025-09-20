<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-poppins">
          Hoa quả và sức khỏe
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Khám phá những lợi ích tuyệt vời của hoa quả đối với sức khỏe của bạn
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <!-- Left Side - Health Benefits List -->
        <div class="space-y-8">
          <div v-for="benefit in healthBenefits" :key="benefit.id" 
               class="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
               @click="activeBenefit = benefit.id">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 rounded-full flex items-center justify-center"
                   :class="activeBenefit === benefit.id ? 'bg-primary-green' : 'bg-gray-100'">
                <span class="text-2xl">{{ benefit.emoji }}</span>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ benefit.title }}</h3>
              <p class="text-sm text-gray-600">{{ benefit.description }}</p>
            </div>
          </div>
        </div>

        <!-- Center - Main Visual -->
        <div class="relative">
          <!-- Central Circle with Fruits -->
          <div class="relative w-80 h-80 mx-auto">
            <!-- Main circle background -->
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <div class="w-64 h-64 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div class="text-center">
                  <div class="text-6xl mb-4">🍎🥝🍓</div>
                  <p class="text-sm font-medium text-gray-600">Hoa quả tươi ngon</p>
                </div>
              </div>
            </div>
            
            <!-- Measuring tape animation -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-96 h-96 border-4 border-dashed border-yellow-400 rounded-full animate-spin-slow opacity-30"></div>
            </div>
            
            <!-- Floating fruits -->
            <div class="absolute top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span class="text-xl">🍎</span>
              </div>
            </div>
            <div class="absolute bottom-4 right-8 animate-bounce" style="animation-delay: 0.5s">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-xl">🥝</span>
              </div>
            </div>
            <div class="absolute top-1/2 left-4 transform -translate-y-1/2 animate-bounce" style="animation-delay: 1s">
              <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <span class="text-xl">🍓</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Health Quote -->
        <div class="relative">
          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 relative overflow-hidden">
            <!-- Quote mark -->
            <div class="absolute top-4 left-4 text-6xl text-green-200 font-serif">"</div>
            
            <div class="relative z-10 pt-8">
              <p class="text-gray-700 leading-relaxed mb-6 text-lg">
                Bạn đã nghe nói về Superfoods, nhưng... Superfruits? Không phải mọi loại hoa quả đều đủ tiêu chuẩn. 
                Những loại được coi là "siêu" bởi các nhà khoa học dinh dưỡng được đóng gói với chất chống oxy hóa, 
                chất xơ, vitamin và khoáng chất, cùng các chất dinh dưỡng khác có thể giúp bạn sống lâu hơn, 
                trông đẹp hơn và thậm chí ngăn ngừa bệnh tật.
              </p>
              
              <!-- Decorative dots -->
              <div class="flex space-x-2 mb-4">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <div class="w-2 h-2 bg-green-300 rounded-full"></div>
                <div class="w-2 h-2 bg-green-200 rounded-full"></div>
              </div>
            </div>
            
            <!-- Background decoration -->
            <div class="absolute bottom-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 transform translate-x-16 translate-y-16"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Health benefits data
const healthBenefits = [
  {
    id: 1,
    title: 'Nho tím',
    description: 'Siêu thực phẩm tốt nhất cho việc giảm cân',
    emoji: '🍇'
  },
  {
    id: 2,
    title: 'Kiwi - Canada',
    description: 'Siêu thực phẩm lành mạnh nhất của Mỹ dành cho phụ nữ',
    emoji: '🥝'
  },
  {
    id: 3,
    title: 'Táo đỏ',
    description: '3 công thức sinh tố ngon giúp bạn giảm cân',
    emoji: '🍎'
  }
]

// Active benefit for highlighting
const activeBenefit = ref(1)

// Auto-rotate active benefit
onMounted(() => {
  setInterval(() => {
    activeBenefit.value = activeBenefit.value === 3 ? 1 : activeBenefit.value + 1
  }, 3000)
})
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Bounce animation with different delays */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0,-30px,0);
  }
  70% {
    transform: translate3d(0,-15px,0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
