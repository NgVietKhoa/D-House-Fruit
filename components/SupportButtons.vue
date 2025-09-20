<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Support Buttons Container -->
    <div class="flex flex-col items-end space-y-3">
      <!-- Hotline Button -->
      <div class="relative group">
        <a
          href="tel:+84963152236"
          class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Gọi hotline"
          @mouseenter="showTooltip = 'hotline'"
          @mouseleave="showTooltip = null"
        >
          <!-- Phone Icon -->
          <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>
        
        <!-- Hotline Tooltip -->
        <div 
          v-if="showTooltip === 'hotline'"
          class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
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
          class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Chat Zalo"
          @mouseenter="showTooltip = 'zalo'"
          @mouseleave="showTooltip = null"
        >
          <!-- Zalo Icon -->
          <img 
            src="/images/logo/zalo.png" 
            alt="Zalo" 
            class="w-7 h-7 object-contain"
          />
        </a>
        
        <!-- Zalo Tooltip -->
        <div 
          v-if="showTooltip === 'zalo'"
          class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
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
          class="bg-primary-green hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Mở chat hỗ trợ"
          @mouseenter="showTooltip = 'chat'"
          @mouseleave="showTooltip = null"
        >
          <!-- Headset/Support Icon -->
          <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
          </svg>
        </button>
        
        <!-- Chat Tooltip -->
        <div 
          v-if="showTooltip === 'chat' && !isChatOpen"
          class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          Chat với tư vấn viên
          <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
        </div>
      </div>
    </div>

    <!-- Chat Window -->
    <div
      v-if="isChatOpen"
      class="absolute bottom-0 right-0 bg-white rounded-lg shadow-2xl w-96 h-[500px] flex flex-col border border-gray-200 mt-3"
    >
      <!-- Chat Header -->
      <div class="bg-primary-green text-white p-4 rounded-t-lg flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold">D'House Support</h3>
            <p class="text-xs opacity-90">{{ isTyping ? 'Đang trả lời...' : 'Trực tuyến' }}</p>
          </div>
        </div>
        <button
          @click="toggleChat"
          class="text-white hover:text-gray-200 transition-colors"
          aria-label="Đóng chat"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Chat Messages -->
      <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
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
              'max-w-xs p-3 rounded-lg text-sm',
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
      <div v-if="showQuickActions" class="px-4 py-2 border-t border-gray-200">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="action in quickActions"
            :key="action.id"
            @click="selectQuickAction(action)"
            class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
          >
            {{ action.text }}
          </button>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex space-x-2">
          <input
            v-model="currentMessage"
            @keypress.enter="sendMessage"
            type="text"
            placeholder="Nhập tin nhắn..."
            class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
            :disabled="isTyping"
          >
          <button
            @click="sendMessage"
            :disabled="!currentMessage.trim() || isTyping"
            class="bg-primary-green hover:bg-green-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
            aria-label="Gửi tin nhắn"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
</style>
