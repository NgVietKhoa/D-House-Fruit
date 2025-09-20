import { useProducts } from '~/composables/useProducts'
import { useGiftBaskets } from '~/composables/useGiftBaskets'

class ChatBotService {
  constructor() {
    this.responses = {
      // Greetings
      greetings: [
        'Xin chào! Tôi có thể giúp gì cho bạn?',
        'Chào bạn! Bạn cần tư vấn về sản phẩm nào?',
        'Hello! Tôi sẵn sàng hỗ trợ bạn.'
      ],

      // Product inquiries
      products: {
        bestsellers: `Sản phẩm bán chạy nhất của chúng tôi:

🍇 **Nho mẫu đơn Nhật Bản** - 850,000đ
🍒 **Cherry Mỹ** - 1,200,000đ  
🥝 **Kiwi New Zealand** - 320,000đ
🍎 **Táo Envy New Zealand** - 450,000đ

Tất cả đều là hoa quả nhập khẩu cao cấp, tươi ngon và an toàn. Bạn quan tâm loại nào?`,

        imported: `Chúng tôi chuyên cung cấp hoa quả nhập khẩu từ:

🇯🇵 **Nhật Bản**: Nho mẫu đơn, Dâu tây Amaou
🇺🇸 **Mỹ**: Cherry, Cam Navel  
🇳🇿 **New Zealand**: Kiwi, Táo Envy
🇦🇺 **Úc**: Cam Navel, Nho đỏ
🇰🇷 **Hàn Quốc**: Lê Hàn Quốc
🇹🇭 **Thái Lan**: Xoài Nam Dok Mai

Tất cả đều có chứng nhận chất lượng và xuất xứ rõ ràng.`,

        seasonal: `Hoa quả theo mùa hiện tại:

🌸 **Mùa xuân**: Dâu tây, Cherry
☀️ **Mùa hè**: Xoài, Nho, Kiwi  
🍂 **Mùa thu**: Táo, Lê, Cam
❄️ **Mùa đông**: Cam, Quýt nhập khẩu

Bạn muốn tìm hiểu về loại nào cụ thể?`
      },

      // Gift baskets
      giftBaskets: {
        types: `Giỏ quà tặng của D'House:

🎁 **Premium Gift** (1,500,000đ) - Hoa quả cao cấp nhất
🎁 **Standard Gift** (800,000đ) - Phù hợp mọi dịp
🎁 **Basic Gift** (500,000đ) - Gọn nhẹ, tinh tế
🎁 **Corporate Gift** (1,200,000đ) - Dành cho doanh nghiệp
🎁 **Tết Gift** (900,000đ) - Đặc biệt cho Tết
🎁 **Birthday Gift** (600,000đ) - Sinh nhật ý nghĩa

Tất cả đều được đóng gói đẹp mắt với thiệp chúc mừng.`,

        occasions: `Giỏ quà phù hợp theo dịp:

🎂 **Sinh nhật**: Birthday Gift, Standard Gift
🏢 **Khai trương**: Corporate Gift, Premium Gift  
🏥 **Thăm hỏi**: Basic Gift, Standard Gift
🎊 **Tết Nguyên Đán**: Tết Gift, Premium Gift
💼 **Doanh nghiệp**: Corporate Gift
❤️ **Tặng người thân**: Premium Gift, Standard Gift

Bạn cần tặng cho dịp gì?`,

        customization: `Chúng tôi có thể tùy chỉnh giỏ quà theo yêu cầu:

✅ Chọn loại hoa quả theo sở thích
✅ Thay đổi màu sắc hộp quà
✅ Thiết kế thiệp chúc mừng riêng
✅ Thêm sản phẩm kèm theo
✅ Đóng gói theo chủ đề

Liên hệ hotline 1900-1234 để tư vấn chi tiết!`
      },

      // Ordering process
      ordering: {
        howTo: `Cách đặt hàng tại D'House:

1️⃣ **Chọn sản phẩm** trên website
2️⃣ **Thêm vào giỏ hàng** và chọn số lượng  
3️⃣ **Điền thông tin** giao hàng
4️⃣ **Chọn phương thức** thanh toán
5️⃣ **Xác nhận đơn hàng** và nhận mã đơn

Hoặc gọi hotline **1900-1234** để đặt hàng trực tiếp!`,

        payment: `Phương thức thanh toán:

💳 **Thẻ tín dụng/ghi nợ** (Visa, Mastercard)
🏧 **Chuyển khoản ngân hàng**
📱 **Ví điện tử** (MoMo, ZaloPay, VNPay)
💵 **Thanh toán khi nhận hàng** (COD)

Tất cả đều an toàn và bảo mật 100%.`,

        tracking: `Theo dõi đơn hàng:

📧 Bạn sẽ nhận **email xác nhận** sau khi đặt hàng
📱 **SMS thông báo** khi hàng được giao
🔍 **Tra cứu online** bằng mã đơn hàng
📞 **Hotline 1900-1234** hỗ trợ 24/7

Thời gian giao hàng: 2-4 giờ nội thành, 1-2 ngày ngoại thành.`
      },

      // Delivery and policies
      delivery: {
        areas: `Khu vực giao hàng:

🏙️ **Nội thành TPHCM**: 2-4 giờ
🏘️ **Ngoại thành TPHCM**: 4-8 giờ  
🚚 **Các tỉnh lân cận**: 1-2 ngày
✈️ **Toàn quốc**: 2-3 ngày

Miễn phí giao hàng đơn từ 500,000đ nội thành!`,

        fees: `Phí giao hàng:

🆓 **Miễn phí**: Đơn từ 500,000đ (nội thành)
💰 **30,000đ**: Đơn dưới 500,000đ (nội thành)  
💰 **50,000đ**: Ngoại thành TPHCM
💰 **80,000đ**: Các tỉnh lân cận
💰 **120,000đ**: Toàn quốc

Giao hàng nhanh trong 2-4 giờ!`,

        freshness: `Cam kết chất lượng:

✅ **Hoa quả tươi 100%** - Nhập về hàng ngày
✅ **Bảo quản lạnh** trong suốt quá trình vận chuyển  
✅ **Đóng gói cẩn thận** chống va đập
✅ **Kiểm tra chất lượng** trước khi giao
✅ **Đổi trả miễn phí** nếu không hài lòng

Chúng tôi cam kết 100% hài lòng!`
      },

      // Contact and support
      contact: {
        info: `Thông tin liên hệ D'House Fruit:

📞 **Hotline**: 1900-1234 (24/7)
📧 **Email**: support@dhousefruit.com
🏢 **Địa chỉ**: 123 Nguyễn Văn Cừ, Q.5, TPHCM
🌐 **Website**: www.dhousefruit.com
📱 **Facebook**: D'House Fruit Official

Chúng tôi luôn sẵn sàng hỗ trợ bạn!`,

        hours: `Giờ làm việc:

🕐 **Thứ 2 - Thứ 6**: 8:00 - 22:00
🕐 **Thứ 7 - Chủ nhật**: 8:00 - 21:00
📞 **Hotline**: 24/7
🚚 **Giao hàng**: 8:00 - 21:00 hàng ngày

Đặt hàng online bất cứ lúc nào!`
      },

      // Default responses
      default: [
        'Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về sản phẩm, giỏ quà, đặt hàng, hoặc giao hàng không?',
        'Xin lỗi, tôi cần thêm thông tin để hỗ trợ bạn tốt hơn. Bạn quan tâm về vấn đề gì?',
        'Tôi có thể giúp bạn về: sản phẩm hoa quả, giỏ quà tặng, cách đặt hàng, và chính sách giao hàng. Bạn muốn hỏi về gì?'
      ],

      // Error responses
      error: [
        'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ hotline: 1900-1234.',
        'Hệ thống đang bận, vui lòng thử lại sau ít phút hoặc gọi 1900-1234 để được hỗ trợ ngay.',
      ]
    }

    this.keywords = {
      greetings: ['xin chào', 'chào', 'hello', 'hi', 'hey'],
      products: ['sản phẩm', 'hoa quả', 'trái cây', 'fruit'],
      bestsellers: ['bán chạy', 'phổ biến', 'nổi tiếng', 'bestseller', 'hot'],
      imported: ['nhập khẩu', 'ngoại', 'import', 'nhật', 'mỹ', 'úc', 'new zealand'],
      seasonal: ['mùa', 'season', 'theo mùa'],
      giftBaskets: ['giỏ quà', 'gift', 'quà tặng', 'basket'],
      giftTypes: ['loại giỏ', 'có những', 'types'],
      occasions: ['dịp', 'occasion', 'tết', 'sinh nhật', 'khai trương'],
      customization: ['tùy chỉnh', 'custom', 'riêng', 'theo yêu cầu'],
      ordering: ['đặt hàng', 'order', 'mua', 'làm sao'],
      payment: ['thanh toán', 'payment', 'trả tiền', 'phương thức'],
      tracking: ['theo dõi', 'track', 'kiểm tra', 'mã đơn'],
      delivery: ['giao hàng', 'delivery', 'ship', 'vận chuyển'],
      areas: ['khu vực', 'area', 'giao đâu', 'phạm vi'],
      fees: ['phí', 'fee', 'giá ship', 'chi phí'],
      freshness: ['tươi', 'fresh', 'chất lượng', 'quality'],
      contact: ['liên hệ', 'contact', 'thông tin', 'địa chỉ'],
      hours: ['giờ', 'time', 'mở cửa', 'làm việc']
    }
  }

  async getResponse(userMessage) {
    const message = userMessage.toLowerCase().trim()
    
    // Check for greetings
    if (this.containsKeywords(message, this.keywords.greetings)) {
      return this.getRandomResponse(this.responses.greetings)
    }

    // Check for specific product names
    if (message.includes('nho') || message.includes('grape')) {
      return `🍇 **Nho mẫu đơn Nhật Bản** - 850,000đ

Đặc điểm:
• Xuất xứ: Nhật Bản
• Vị ngọt thanh, hạt to, vỏ mỏng
• Giàu vitamin C và chất chống oxy hóa
• Bảo quản: 7-10 ngày trong tủ lạnh

Bạn có muốn xem thêm sản phẩm khác không?`
    }

    if (message.includes('cherry') || message.includes('anh đào')) {
      return `🍒 **Cherry Mỹ** - 1,200,000đ

Đặc điểm:
• Xuất xứ: Washington, Mỹ
• Vị ngọt đậm đà, thịt chắc
• Giàu anthocyanin, chống lão hóa
• Bảo quản: 5-7 ngày trong tủ lạnh

Đây là sản phẩm cao cấp nhất của chúng tôi!`
    }

    if (message.includes('kiwi')) {
      return `🥝 **Kiwi New Zealand** - 320,000đ

Đặc điểm:
• Xuất xứ: New Zealand
• Giàu vitamin C gấp 2 lần cam
• Hỗ trợ tiêu hóa và miễn dịch
• Bảo quản: 10-14 ngày

Kiwi là lựa chọn tuyệt vời cho sức khỏe!`
    }

    // Product related queries
    if (this.containsKeywords(message, this.keywords.products)) {
      if (this.containsKeywords(message, this.keywords.bestsellers)) {
        return this.responses.products.bestsellers
      }
      if (this.containsKeywords(message, this.keywords.imported)) {
        return this.responses.products.imported
      }
      if (this.containsKeywords(message, this.keywords.seasonal)) {
        return this.responses.products.seasonal
      }
      return this.responses.products.bestsellers // Default to bestsellers
    }

    // Gift basket queries
    if (this.containsKeywords(message, this.keywords.giftBaskets)) {
      if (this.containsKeywords(message, this.keywords.giftTypes)) {
        return this.responses.giftBaskets.types
      }
      if (this.containsKeywords(message, this.keywords.occasions)) {
        return this.responses.giftBaskets.occasions
      }
      if (this.containsKeywords(message, this.keywords.customization)) {
        return this.responses.giftBaskets.customization
      }
      return this.responses.giftBaskets.types // Default to types
    }

    // Ordering queries
    if (this.containsKeywords(message, this.keywords.ordering)) {
      if (this.containsKeywords(message, this.keywords.payment)) {
        return this.responses.ordering.payment
      }
      if (this.containsKeywords(message, this.keywords.tracking)) {
        return this.responses.ordering.tracking
      }
      return this.responses.ordering.howTo
    }

    // Payment specific
    if (this.containsKeywords(message, this.keywords.payment)) {
      return this.responses.ordering.payment
    }

    // Delivery queries
    if (this.containsKeywords(message, this.keywords.delivery)) {
      if (this.containsKeywords(message, this.keywords.areas)) {
        return this.responses.delivery.areas
      }
      if (this.containsKeywords(message, this.keywords.fees)) {
        return this.responses.delivery.fees
      }
      if (this.containsKeywords(message, this.keywords.freshness)) {
        return this.responses.delivery.freshness
      }
      return this.responses.delivery.areas // Default to areas
    }

    // Contact queries
    if (this.containsKeywords(message, this.keywords.contact)) {
      if (this.containsKeywords(message, this.keywords.hours)) {
        return this.responses.contact.hours
      }
      return this.responses.contact.info
    }

    // Default response
    return this.getRandomResponse(this.responses.default)
  }

  containsKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword))
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Get product recommendations
  async getProductRecommendations() {
    const { getFeaturedProducts } = useProducts()
    const products = getFeaturedProducts(3)
    
    let response = 'Sản phẩm đề xuất cho bạn:\n\n'
    products.forEach(product => {
      response += `🍎 **${product.name}** - ${product.price.toLocaleString('vi-VN')}đ\n`
      response += `   ${product.description}\n\n`
    })
    
    return response
  }

  // Get gift basket recommendations
  async getGiftBasketRecommendations() {
    const { getFeaturedGiftBaskets } = useGiftBaskets()
    const baskets = getFeaturedGiftBaskets(3)
    
    let response = 'Giỏ quà đề xuất:\n\n'
    baskets.forEach(basket => {
      response += `🎁 **${basket.name}** - ${basket.price.toLocaleString('vi-VN')}đ\n`
      response += `   ${basket.description}\n\n`
    })
    
    return response
  }
}

export const chatBotService = new ChatBotService()
