// Mock data for gift baskets - will be replaced with API calls later
export const giftBasketsData = [
  {
    id: 1,
    name: 'Giỏ quà Premium',
    price: '2500000',
    originalPrice: null,
    image: '/images/giftBaskets/gift-premium.jpg',
    description: 'Giỏ quà cao cấp nhất với 8-10 loại hoa quả nhập khẩu tuyển chọn',
    badge: 'Bán chạy',
    category: 'Premium',
    type: 'luxury',
    size: 'large',
    serves: '8-10 người',
    delivery_time: 'Trong ngày',
    colorClass: 'bg-gradient-to-br from-primary-green to-green-600',
    features: [
      '8-10 loại hoa quả cao cấp',
      'Đóng gói sang trọng',
      'Thiệp chúc mừng miễn phí',
      'Giao hàng trong ngày'
    ],
    included_fruits: [
      { name: 'Nho mẫu đơn Nhật Bản', quantity: '500g' },
      { name: 'Dâu tây Amaou', quantity: '250g' },
      { name: 'Cherry Mỹ', quantity: '500g' },
      { name: 'Kiwi Zespri', quantity: '6 quả' },
      { name: 'Táo Envy', quantity: '4 quả' },
      { name: 'Lê Hàn Quốc', quantity: '3 quả' },
      { name: 'Cam Navel Úc', quantity: '5 quả' },
      { name: 'Xoài Thái Lan', quantity: '2 quả' }
    ],
    occasions: ['Sinh nhật', 'Kỷ niệm', 'Thăm hỏi', 'Doanh nghiệp'],
    packaging: {
      type: 'Hộp gỗ cao cấp',
      color: 'Nâu walnut',
      ribbon: 'Ruy băng vàng',
      card: 'Thiệp chúc mừng cao cấp'
    },
    stock: 15,
    rating: 4.9,
    reviews_count: 89,
    tags: ['premium', 'luxury', 'corporate', 'special-occasion'],
    created_at: '2024-01-10',
    updated_at: '2024-03-25'
  },
  {
    id: 2,
    name: 'Giỏ quà Standard',
    price: '1200000',
    originalPrice: '1400000',
    image: '/images/giftBaskets/gift-standard.webp',
    description: 'Giỏ quà tiêu chuẩn với 5-6 loại hoa quả nhập khẩu chất lượng',
    badge: 'Giảm giá',
    category: 'Standard',
    type: 'regular',
    size: 'medium',
    serves: '5-6 người',
    delivery_time: '1-2 ngày',
    colorClass: 'bg-gradient-to-br from-primary-orange to-orange-600',
    features: [
      '5-6 loại hoa quả nhập khẩu',
      'Hộp quà đẹp mắt',
      'Thiệp chúc mừng',
      'Bảo quản lạnh'
    ],
    included_fruits: [
      { name: 'Nho Chile', quantity: '500g' },
      { name: 'Cherry Mỹ', quantity: '300g' },
      { name: 'Kiwi Zespri', quantity: '4 quả' },
      { name: 'Táo Envy', quantity: '3 quả' },
      { name: 'Cam Navel', quantity: '4 quả' },
      { name: 'Lê Hàn Quốc', quantity: '2 quả' }
    ],
    occasions: ['Sinh nhật', 'Thăm hỏi', 'Cảm ơn'],
    packaging: {
      type: 'Hộp carton cao cấp',
      color: 'Trắng kem',
      ribbon: 'Ruy băng cam',
      card: 'Thiệp chúc mừng'
    },
    stock: 28,
    rating: 4.6,
    reviews_count: 156,
    tags: ['standard', 'popular', 'gift', 'discount'],
    created_at: '2024-01-15',
    updated_at: '2024-03-20'
  },
  {
    id: 3,
    name: 'Giỏ quà Basic',
    price: '800000',
    originalPrice: null,
    image: '/images/giftBaskets/gift-basic.webp',
    description: 'Giỏ quà cơ bản với 3-4 loại hoa quả nhập khẩu phổ biến',
    badge: null,
    category: 'Basic',
    type: 'basic',
    size: 'small',
    serves: '3-4 người',
    delivery_time: '1-2 ngày',
    colorClass: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    features: [
      '3-4 loại hoa quả nhập khẩu',
      'Túi quà xinh xắn',
      'Giao hàng nhanh',
      'Giá cả phải chăng'
    ],
    included_fruits: [
      { name: 'Cam Navel Úc', quantity: '6 quả' },
      { name: 'Kiwi Zespri', quantity: '4 quả' },
      { name: 'Táo Envy', quantity: '3 quả' },
      { name: 'Xoài Thái Lan', quantity: '1 quả' }
    ],
    occasions: ['Thăm hỏi', 'Cảm ơn', 'Hàng ngày'],
    packaging: {
      type: 'Túi giấy kraft',
      color: 'Nâu tự nhiên',
      ribbon: 'Ruy băng vàng',
      card: 'Thiệp nhỏ'
    },
    stock: 45,
    rating: 4.3,
    reviews_count: 203,
    tags: ['basic', 'affordable', 'everyday', 'small'],
    created_at: '2024-01-20',
    updated_at: '2024-03-18'
  },
  {
    id: 4,
    name: 'Giỏ quà Doanh nghiệp',
    price: '5000000',
    originalPrice: null,
    image: '/images/giftBaskets/gift-corporate.jpg',
    description: 'Giỏ quà dành cho doanh nghiệp, khách hàng VIP',
    badge: 'VIP',
    category: 'Corporate',
    type: 'corporate',
    size: 'extra-large',
    serves: '15-20 người',
    delivery_time: 'Theo lịch hẹn',
    colorClass: 'bg-gradient-to-br from-purple-500 to-purple-700',
    features: [
      '12-15 loại hoa quả cao cấp',
      'Thiết kế theo yêu cầu',
      'Logo công ty',
      'Giao hàng toàn quốc'
    ],
    included_fruits: [
      { name: 'Nho mẫu đơn Nhật Bản', quantity: '1kg' },
      { name: 'Dâu tây Amaou', quantity: '500g' },
      { name: 'Cherry Mỹ Washington', quantity: '1kg' },
      { name: 'Kiwi Zespri', quantity: '12 quả' },
      { name: 'Táo Envy', quantity: '8 quả' },
      { name: 'Lê Hàn Quốc', quantity: '6 quả' },
      { name: 'Cam Navel Úc', quantity: '10 quả' },
      { name: 'Xoài Thái Lan', quantity: '4 quả' }
    ],
    occasions: ['Doanh nghiệp', 'Khách hàng VIP', 'Sự kiện'],
    packaging: {
      type: 'Hộp gỗ sang trọng có khóa',
      color: 'Đen bóng',
      ribbon: 'Ruy băng bạc',
      card: 'Thiệp cao cấp có logo'
    },
    stock: 8,
    rating: 5.0,
    reviews_count: 34,
    tags: ['corporate', 'vip', 'luxury', 'custom', 'business'],
    created_at: '2024-02-01',
    updated_at: '2024-03-22'
  },
  {
    id: 5,
    name: 'Giỏ quà Tết',
    price: '1800000',
    originalPrice: '2200000',
    image: '/images/giftBaskets/gift-tet.jpg',
    description: 'Giỏ quà đặc biệt cho dịp Tết Nguyên Đán',
    badge: 'Đặc biệt',
    category: 'Seasonal',
    type: 'seasonal',
    size: 'large',
    serves: '8-10 người',
    delivery_time: 'Trước Tết 3 ngày',
    colorClass: 'bg-gradient-to-br from-red-500 to-red-700',
    features: [
      'Hoa quả may mắn',
      'Trang trí Tết truyền thống',
      'Màu sắc rực rỡ',
      'Ý nghĩa tốt lành'
    ],
    included_fruits: [
      { name: 'Cam Navel (may mắn)', quantity: '8 quả' },
      { name: 'Táo đỏ (bình an)', quantity: '6 quả' },
      { name: 'Nho đỏ (thịnh vượng)', quantity: '500g' },
      { name: 'Lê vàng (tài lộc)', quantity: '4 quả' },
      { name: 'Xoài (sung túc)', quantity: '3 quả' },
      { name: 'Kiwi (sức khỏe)', quantity: '6 quả' }
    ],
    occasions: ['Tết Nguyên Đán', 'Năm mới', 'Thăm hỏi Tết'],
    packaging: {
      type: 'Giỏ tre truyền thống',
      color: 'Đỏ vàng may mắn',
      ribbon: 'Ruy băng đỏ vàng',
      card: 'Thiệp chúc Tết'
    },
    stock: 22,
    rating: 4.8,
    reviews_count: 127,
    tags: ['tet', 'seasonal', 'traditional', 'lucky', 'special'],
    created_at: '2024-01-25',
    updated_at: '2024-03-15'
  },
  {
    id: 6,
    name: 'Giỏ quà Sinh nhật',
    price: '950000',
    originalPrice: null,
    image: '/images/giftBaskets/gift-birthday.jpg',
    description: 'Giỏ quà tươi vui dành cho ngày sinh nhật',
    badge: null,
    category: 'Birthday',
    type: 'birthday',
    size: 'medium',
    serves: '6-8 người',
    delivery_time: 'Trong ngày',
    colorClass: 'bg-gradient-to-br from-pink-500 to-pink-700',
    features: [
      'Hoa quả tươi ngon',
      'Trang trí sinh nhật',
      'Thiệp chúc mừng đặc biệt',
      'Màu sắc tươi sáng'
    ],
    included_fruits: [
      { name: 'Dâu tây (ngọt ngào)', quantity: '300g' },
      { name: 'Cherry đỏ (vui vẻ)', quantity: '400g' },
      { name: 'Kiwi vàng (tươi mới)', quantity: '5 quả' },
      { name: 'Cam tươi (năng lượng)', quantity: '5 quả' },
      { name: 'Nho tím (may mắn)', quantity: '400g' },
      { name: 'Táo xanh (sức khỏe)', quantity: '4 quả' }
    ],
    occasions: ['Sinh nhật', 'Kỷ niệm', 'Chúc mừng'],
    packaging: {
      type: 'Hộp sinh nhật màu sắc',
      color: 'Hồng tươi',
      ribbon: 'Ruy băng nhiều màu',
      card: 'Thiệp sinh nhật'
    },
    stock: 35,
    rating: 4.5,
    reviews_count: 178,
    tags: ['birthday', 'celebration', 'colorful', 'fun', 'party'],
    created_at: '2024-02-05',
    updated_at: '2024-03-12'
  }
]

// Gift basket categories
export const giftCategoriesData = [
  { id: 1, name: 'Premium', slug: 'premium', description: 'Giỏ quà cao cấp nhất' },
  { id: 2, name: 'Standard', slug: 'standard', description: 'Giỏ quà tiêu chuẩn' },
  { id: 3, name: 'Basic', slug: 'basic', description: 'Giỏ quà cơ bản' },
  { id: 4, name: 'Corporate', slug: 'corporate', description: 'Giỏ quà doanh nghiệp' },
  { id: 5, name: 'Seasonal', slug: 'seasonal', description: 'Giỏ quà theo mùa' },
  { id: 6, name: 'Birthday', slug: 'birthday', description: 'Giỏ quà sinh nhật' }
]

// Mock API functions for gift baskets
export const giftBasketsAPI = {
  async getAllGiftBaskets() {
    await new Promise(resolve => setTimeout(resolve, 100))
    return {
      success: true,
      data: giftBasketsData,
      total: giftBasketsData.length
    }
  },

  async getGiftBasketById(id) {
    await new Promise(resolve => setTimeout(resolve, 50))
    const basket = giftBasketsData.find(b => b.id === parseInt(id))
    return {
      success: !!basket,
      data: basket || null,
      message: basket ? 'Gift basket found' : 'Gift basket not found'
    }
  },

  async getGiftBasketsByCategory(category, limit = null) {
    await new Promise(resolve => setTimeout(resolve, 80))
    let baskets = giftBasketsData.filter(b => b.category === category)
    if (limit) {
      baskets = baskets.slice(0, limit)
    }
    return {
      success: true,
      data: baskets,
      total: baskets.length
    }
  },

  async getFeaturedGiftBaskets(limit = 4) {
    await new Promise(resolve => setTimeout(resolve, 60))
    const featured = giftBasketsData
      .filter(b => b.badge && ['Bán chạy', 'VIP', 'Đặc biệt'].includes(b.badge))
      .slice(0, limit)
    return {
      success: true,
      data: featured,
      total: featured.length
    }
  },

  async searchGiftBaskets(query, filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 120))
    let results = giftBasketsData.filter(basket => {
      const matchesQuery = !query || 
        basket.name.toLowerCase().includes(query.toLowerCase()) ||
        basket.description.toLowerCase().includes(query.toLowerCase()) ||
        basket.tags.some(tag => tag.includes(query.toLowerCase()))

      const matchesCategory = !filters.category || basket.category === filters.category
      const matchesType = !filters.type || basket.type === filters.type
      const matchesPriceRange = !filters.minPrice || !filters.maxPrice || 
        (parseInt(basket.price) >= filters.minPrice && parseInt(basket.price) <= filters.maxPrice)

      return matchesQuery && matchesCategory && matchesType && matchesPriceRange
    })

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          results.sort((a, b) => parseInt(a.price) - parseInt(b.price))
          break
        case 'price_desc':
          results.sort((a, b) => parseInt(b.price) - parseInt(a.price))
          break
        case 'rating':
          results.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          break
      }
    }

    return {
      success: true,
      data: results,
      total: results.length,
      query,
      filters
    }
  },

  async getGiftCategories() {
    await new Promise(resolve => setTimeout(resolve, 40))
    return {
      success: true,
      data: giftCategoriesData,
      total: giftCategoriesData.length
    }
  }
}

export const {
  getAllGiftBaskets,
  getGiftBasketById,
  getGiftBasketsByCategory,
  getFeaturedGiftBaskets,
  searchGiftBaskets,
  getGiftCategories
} = giftBasketsAPI
