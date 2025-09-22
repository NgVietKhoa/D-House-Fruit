<template>
  <div class="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50">
    <!-- Support Buttons Container -->
    <div class="flex flex-col items-end space-y-2 sm:space-y-3">
      <!-- Hotline Button -->
      <div class="relative group">
        <a
          href="tel:+84963152236"
          class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] w-[44px] h-[44px] sm:w-[48px] sm:h-[48px]"
          aria-label="Gọi hotline"
          @mouseenter="showTooltip = 'hotline'"
          @mouseleave="showTooltip = null"
        >
          <!-- Phone Icon -->
          <svg class="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>
        
        <!-- Hotline Tooltip - Hidden on mobile -->
        <div 
          v-if="showTooltip === 'hotline'"
          class="hidden md:block absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          Gọi hotline: 096 315 2236
          <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
        </div>
      </div>

      <!-- Zalo Button -->
      <div class="relative group">
        <a
          href="https://zalo.me/0963152236"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] w-[44px] h-[44px] sm:w-[48px] sm:h-[48px]"
          aria-label="Chat Zalo"
          @mouseenter="showTooltip = 'zalo'"
          @mouseleave="showTooltip = null"
        >
          <!-- Zalo Icon -->
          <img 
            src="/images/logo/zalo.png" 
            alt="Zalo" 
            class="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
          />
        </a>
        
        <!-- Zalo Tooltip - Hidden on mobile -->
        <div 
          v-if="showTooltip === 'zalo'"
          class="hidden md:block absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          Chat qua Zalo
          <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
        </div>
      </div>

      <!-- ChatBot Button -->
      <div class="relative group">
        <button
          v-if="!isChatOpen"
          @click="toggleChat"
          class="bg-primary-green hover:bg-green-600 active:bg-green-700 text-white p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] w-[44px] h-[44px] sm:w-[48px] sm:h-[48px]"
          aria-label="Mở chat hỗ trợ"
          @mouseenter="showTooltip = 'chat'"
          @mouseleave="showTooltip = null"
        >
          <!-- Headset/Support Icon -->
          <svg class="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
          </svg>
        </button>
        
        <!-- Chat Tooltip - Hidden on mobile -->
        <div 
          v-if="showTooltip === 'chat' && !isChatOpen"
          class="hidden md:block absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          Chat với tư vấn viên
          <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
        </div>
      </div>
    </div>

    <!-- Chat Window -->
    <div
      v-if="isChatOpen"
      class="absolute bottom-0 right-0 bg-white rounded-lg shadow-2xl w-80 sm:w-96 h-[400px] sm:h-[500px] md:h-[500px] flex flex-col border border-gray-200 mt-2 sm:mt-3 max-w-[calc(100vw-1rem)] max-h-[calc(100vh-5rem)]"
    >
      <!-- Chat Header -->
      <div class="bg-primary-green text-white p-3 sm:p-4 rounded-t-lg flex items-center justify-between">
        <div class="flex items-center space-x-2 sm:space-x-3">
          <div class="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg class="w-3 h-3 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-sm sm:text-base">D'House Support</h3>
            <p class="text-xs opacity-90">{{ isTyping ? 'Đang trả lời...' : 'Trực tuyến' }}</p>
          </div>
        </div>
        <button
          @click="toggleChat"
          class="text-white hover:text-gray-200 active:text-gray-300 transition-colors p-1 min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex items-center justify-center"
          aria-label="Đóng chat"
        >
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Chat Messages -->
      <div ref="messagesContainer" class="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2 sm:space-y-3 bg-gray-50">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
            'flex',
            message.isUser ? 'justify-end' : 'justify-start'
          ]"
        >
          <div
            :class="[
              'max-w-[240px] sm:max-w-xs p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm',
              message.isUser
                ? 'bg-primary-green text-white rounded-br-none'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
            ]"
          >
            <p class="whitespace-pre-wrap">{{ message.text }}</p>
            <p class="text-xs mt-1 opacity-70">{{ formatTime(message.timestamp) }}</p>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 shadow-sm">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div v-if="showQuickActions" class="px-3 sm:px-4 py-2 border-t border-gray-200">
        <div class="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            v-for="action in quickActions"
            :key="action.id"
            @click="selectQuickAction(action)"
            class="text-xs bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 px-2.5 sm:px-3 py-1 rounded-full transition-colors min-h-[32px]"
          >
            {{ action.text }}
          </button>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-3 sm:p-4 border-t border-gray-200">
        <div class="flex space-x-2">
          <input
            v-model="currentMessage"
            @keypress.enter="sendMessage"
            type="text"
            placeholder="Nhập tin nhắn..."
            class="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent min-h-[44px]"
            :disabled="isTyping"
          >
          <button
            @click="sendMessage"
            :disabled="!currentMessage.trim() || isTyping"
            class="bg-primary-green hover:bg-green-600 active:bg-green-700 disabled:bg-gray-300 text-white p-2.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex items-center justify-center"
            aria-label="Gửi tin nhắn"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Chat Notification (if exists) -->
    <ChatBotNotification v-if="!isChatOpen" />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useChatBot } from '~/composables/useChatBot'

const isChatOpen = ref(false)
const currentMessage = ref('')
const messagesContainer = ref(null)
const showTooltip = ref(null)

const {
  messages,
  isTyping,
  sendUserMessage,
  getWelcomeMessage,
  quickActions
} = useChatBot()

const showQuickActions = computed(() => {
  return messages.value.length <= 2 && !isTyping.value
})

const toggleChat = async () => {
  isChatOpen.value = !isChatOpen.value
  
  if (isChatOpen.value && messages.value.length === 0) {
    // Send welcome message when first opening
    await getWelcomeMessage()
  }
  
  if (isChatOpen.value) {
    await nextTick()
    scrollToBottom()
  }
}

const sendMessage = async () => {
  if (!currentMessage.value.trim() || isTyping.value) return
  
  const message = currentMessage.value.trim()
  currentMessage.value = ''
  
  await sendUserMessage(message)
  await nextTick()
  scrollToBottom()
}

const selectQuickAction = async (action) => {
  await sendUserMessage(action.text)
  await nextTick()
  scrollToBottom()
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Auto scroll when new messages arrive
watch(() => messages.value.length, async () => {
  await nextTick()
  scrollToBottom()
})
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Tooltip animations */
.group:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.tooltip {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  /* Ensure buttons are touch-friendly */
  .group a,
  .group button {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box;
  }
  
  /* Perfect icon centering on mobile */
  .group a svg,
  .group a img,
  .group button svg,
  button svg,
  button img {
    margin: 0 auto;
    display: block;
    position: relative;
    top: 0;
    left: 0;
    transform: none;
  }
  
  /* Ensure all buttons have perfect centering */
  button,
  a {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box;
  }
  
  /* Improve chat window positioning on small screens */
  .absolute.bottom-0.right-0 {
    position: fixed;
    bottom: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
    width: auto !important;
  }
  
  /* Prevent zoom on input focus */
  input[type="text"] {
    font-size: 16px;
  }
  
  /* Additional centering for perfect alignment */
  .group a,
  .group button {
    padding: 0 !important;
    width: 44px !important;
    height: 44px !important;
  }
  
  /* Icon positioning override */
  .group a svg,
  .group a img,
  .group button svg {
    width: 20px !important;
    height: 20px !important;
  }
}

/* Prevent text selection on buttons */
button, a {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Smooth transitions for better UX */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
