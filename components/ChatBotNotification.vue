<template>
  <div
    v-if="showNotification"
    class="fixed bottom-20 right-4 z-40 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs transform transition-all duration-500"
    :class="showNotification ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
  >
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 21l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"></path>
          </svg>
        </div>
      </div>
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-900">Trợ lý ảo D'House</p>
        <p class="text-xs text-gray-600 mt-1">Tôi có thể giúp bạn tìm sản phẩm và tư vấn đặt hàng! 😊</p>
      </div>
      <button
        @click="hideNotification"
        class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    
    <!-- Arrow pointing to chat button -->
    <div class="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showNotification = ref(false)

const hideNotification = () => {
  showNotification.value = false
  // Save to localStorage so it doesn't show again
  localStorage.setItem('chatbot-notification-dismissed', 'true')
}

onMounted(() => {
  // Check if user has already dismissed the notification
  const dismissed = localStorage.getItem('chatbot-notification-dismissed')
  
  if (!dismissed) {
    // Show notification after 3 seconds
    setTimeout(() => {
      showNotification.value = true
      
      // Auto hide after 8 seconds
      setTimeout(() => {
        if (showNotification.value) {
          hideNotification()
        }
      }, 8000)
    }, 3000)
  }
})
</script>
