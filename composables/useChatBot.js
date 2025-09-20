import { ref, readonly, watch } from 'vue'
import { chatBotService } from '~/services/chatBotService'

const messages = ref([])
const isTyping = ref(false)

export const useChatBot = () => {
  const quickActions = ref([
    { id: 1, text: 'Sản phẩm nào bán chạy nhất?' },
    { id: 2, text: 'Giỏ quà tặng có những loại nào?' },
    { id: 3, text: 'Làm sao để đặt hàng?' },
    { id: 4, text: 'Chính sách giao hàng?' }
  ])

  const addMessage = (text, isUser = false) => {
    const message = {
      id: Date.now() + Math.random(),
      text,
      isUser,
      timestamp: new Date()
    }
    messages.value.push(message)
    return message
  }

  const sendUserMessage = async (text) => {
    // Add user message
    addMessage(text, true)
    
    // Show typing indicator
    isTyping.value = true
    
    try {
      // Get bot response
      const response = await chatBotService.getResponse(text)
      
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
      
      // Add bot response
      addMessage(response)
    } catch (error) {
      console.error('ChatBot error:', error)
      addMessage('Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ hotline: 1900-1234.')
    } finally {
      isTyping.value = false
    }
  }

  const getWelcomeMessage = async () => {
    isTyping.value = true
    
    // Simulate initial loading
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const welcomeText = `Xin chào! 👋 Tôi là trợ lý ảo của D'House Fruit.

Tôi có thể giúp bạn:
• Tìm hiểu về sản phẩm hoa quả nhập khẩu
• Tư vấn giỏ quà tặng phù hợp
• Hướng dẫn đặt hàng và thanh toán
• Thông tin giao hàng và chính sách

Bạn cần hỗ trợ gì hôm nay? 😊`

    addMessage(welcomeText)
    isTyping.value = false
  }

  const clearMessages = () => {
    messages.value = []
  }

  return {
    messages: readonly(messages),
    isTyping: readonly(isTyping),
    quickActions: readonly(quickActions),
    sendUserMessage,
    getWelcomeMessage,
    clearMessages,
    addMessage
  }
}
