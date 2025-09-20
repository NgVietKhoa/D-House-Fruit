// Mock data for products - will be replaced with API calls later
export const productsData = [
  {
    id: 1,
    name: 'Nho mẫu đơn Nhật Bản',
    price: '1200000',
    originalPrice: '1500000',
    image: '/images/products/grapes-japan.webp',
    description: 'Nho mẫu đơn Okayama cao cấp, vị ngọt thanh, hạt to',
    badge: 'Bán chạy',
    category: 'Nho',
    origin: 'Nhật Bản',
    weight: '500g',
    shelf_life: '7-10 ngày',
    storage: 'Bảo quản trong tủ lạnh 2-4°C',
    stock: 25,
    rating: 4.8,
    reviews_count: 156,
    nutrition: {
      calories: '62 kcal/100g',
      vitamin_c: '10.8mg',
      fiber: '0.9g',
      sugar: '16.25g'
    },
    detailed_description: 'Nho mẫu đơn Okayama là giống nho cao cấp nhất của Nhật Bản, được trồng tại tỉnh Okayama nổi tiếng. Mỗi quả nho có kích thước lớn, vỏ mỏng, thịt chắc và vị ngọt thanh đặc trưng. Quy trình chăm sóc tỉ mỉ từng chùm nho, đảm bảo chất lượng hoàn hảo.',
    benefits: [
      'Giàu chất chống oxy hóa',
      'Hỗ trợ sức khỏe tim mạch',
      'Tăng cường hệ miễn dịch',
      'Cải thiện trí nhớ'
    ],
    tags: ['premium', 'nhật-bản', 'nho', 'cao-cấp'],
    created_at: '2024-01-15',
    updated_at: '2024-03-20'
  },
  {
    id: 2,
    name: 'Cherry Mỹ Washington',
    price: '890000',
    originalPrice: null,
    image: '/images/products/cherry-usa.png',
    description: 'Cherry đỏ tươi từ Washington, ngọt mọng nước',
    badge: 'Mới về',
    category: 'Cherry',
    origin: 'Mỹ (Washington)',
    weight: '500g',
    shelf_life: '5-7 ngày',
    storage: 'Bảo quản trong tủ lạnh 0-2°C',
    stock: 18,
    rating: 4.6,
    reviews_count: 89,
    nutrition: {
      calories: '50 kcal/100g',
      vitamin_c: '10mg',
      fiber: '1.6g',
      sugar: '8.5g'
    },
    detailed_description: 'Cherry Washington là loại cherry cao cấp được trồng tại bang Washington, Mỹ - vùng đất có khí hậu lý tưởng cho cherry. Quả cherry có màu đỏ tươi, thịt chắc, ngọt mọng nước với hương vị đặc trưng khó quên.',
    benefits: [
      'Giàu vitamin C và chất chống oxy hóa',
      'Hỗ trợ giấc ngủ ngon',
      'Chống viêm tự nhiên',
      'Tốt cho sức khỏe khớp'
    ],
    tags: ['mỹ', 'cherry', 'mới-về', 'washington'],
    created_at: '2024-02-10',
    updated_at: '2024-03-18'
  },
  {
    id: 3,
    name: 'Kiwi Zespri New Zealand',
    price: '450000',
    originalPrice: '520000',
    image: '/images/products/kiwi-nz.png',
    description: 'Kiwi vàng Zespri, giàu vitamin C, vị chua ngọt',
    badge: 'Giảm giá',
    category: 'Kiwi',
    origin: 'New Zealand',
    weight: '1kg (6-8 quả)',
    shelf_life: '2-3 tuần',
    storage: 'Bảo quản nơi khô ráo, thoáng mát',
    stock: 42,
    rating: 4.7,
    reviews_count: 203,
    nutrition: {
      calories: '61 kcal/100g',
      vitamin_c: '92.7mg',
      fiber: '3g',
      sugar: '9g'
    },
    detailed_description: 'Kiwi vàng Zespri là thương hiệu kiwi nổi tiếng thế giới từ New Zealand. Với thịt vàng óng, vị ngọt thanh có chút chua nhẹ, kiwi Zespri chứa lượng vitamin C gấp đôi cam, là nguồn dinh dưỡng tuyệt vời cho sức khỏe.',
    benefits: [
      'Vitamin C cao gấp đôi cam',
      'Tăng cường hệ miễn dịch',
      'Hỗ trợ tiêu hóa',
      'Chống lão hóa da'
    ],
    tags: ['new-zealand', 'kiwi', 'zespri', 'giảm-giá', 'vitamin-c'],
    created_at: '2024-01-20',
    updated_at: '2024-03-22'
  },
  {
    id: 4,
    name: 'Táo Envy New Zealand',
    price: '680000',
    originalPrice: null,
    image: '/images/products/apple-envy.png',
    description: 'Táo Envy giòn ngọt, màu đỏ tự nhiên quyến rũ',
    badge: null,
    category: 'Táo',
    origin: 'New Zealand',
    weight: '1kg (4-5 quả)',
    shelf_life: '3-4 tuần',
    storage: 'Bảo quản trong tủ lạnh 2-4°C',
    stock: 35,
    rating: 4.5,
    reviews_count: 127,
    nutrition: {
      calories: '52 kcal/100g',
      vitamin_c: '4.6mg',
      fiber: '2.4g',
      sugar: '10.4g'
    },
    detailed_description: 'Táo Envy là giống táo cao cấp được phát triển tại New Zealand, nổi tiếng với màu đỏ tự nhiên quyến rũ và vị ngọt đậm đà. Thịt táo giòn, mọng nước, có hương thơm đặc trưng và độ ngọt cân bằng hoàn hảo.',
    benefits: [
      'Giàu chất xơ hỗ trợ tiêu hóa',
      'Chứa pectin tốt cho tim',
      'Ít calo, phù hợp ăn kiêng',
      'Chất chống oxy hóa cao'
    ],
    tags: ['new-zealand', 'táo', 'envy', 'giòn-ngọt'],
    created_at: '2024-01-25',
    updated_at: '2024-03-15'
  },
  {
    id: 5,
    name: 'Cam Navel Úc',
    price: '320000',
    originalPrice: '380000',
    image: '/images/products/orange-australia.jpg',
    description: 'Cam navel Úc, không hạt, nhiều nước ngọt mát',
    badge: 'Khuyến mãi',
    category: 'Cam',
    origin: 'Úc',
    weight: '2kg (8-10 quả)',
    shelf_life: '2-3 tuần',
    storage: 'Bảo quản nơi khô ráo, thoáng mát',
    stock: 60,
    rating: 4.4,
    reviews_count: 178,
    nutrition: {
      calories: '47 kcal/100g',
      vitamin_c: '53.2mg',
      fiber: '2.4g',
      sugar: '9.4g'
    },
    detailed_description: 'Cam Navel Úc là loại cam cao cấp không hạt, có vị ngọt tự nhiên và nhiều nước. Được trồng tại những vùng đất màu mỡ của Úc với khí hậu ôn đới, cam Navel có múi to, thịt cam mọng nước và hương thơm đặc trưng.',
    benefits: [
      'Vitamin C cao tăng cường miễn dịch',
      'Không hạt tiện lợi',
      'Giàu folate tốt cho bà bầu',
      'Chất xơ hỗ trợ tiêu hóa'
    ],
    tags: ['úc', 'cam', 'navel', 'không-hạt', 'khuyến-mãi'],
    created_at: '2024-02-01',
    updated_at: '2024-03-25'
  },
  {
    id: 6,
    name: 'Lê Hàn Quốc',
    price: '550000',
    originalPrice: null,
    image: '/images/products/pear-korea.webp',
    description: 'Lê Hàn Quốc giòn ngọt, thịt trắng mịn màng',
    badge: 'Premium',
    category: 'Lê',
    origin: 'Hàn Quốc',
    weight: '1kg (3-4 quả)',
    shelf_life: '2-3 tuần',
    storage: 'Bảo quản trong tủ lạnh 2-4°C',
    stock: 28,
    rating: 4.6,
    reviews_count: 95,
    nutrition: {
      calories: '57 kcal/100g',
      vitamin_c: '4.3mg',
      fiber: '3.1g',
      sugar: '9.8g'
    },
    detailed_description: 'Lê Hàn Quốc nổi tiếng với đặc điểm thịt trắng, giòn như táo nhưng ngọt như lê truyền thống. Được trồng theo công nghệ hiện đại tại Hàn Quốc, mỗi quả lê có kích thước lớn, vỏ mỏng, thịt mịn và vị ngọt thanh mát.',
    benefits: [
      'Giàu chất xơ hỗ trợ tiêu hóa',
      'Ít calo phù hợp ăn kiêng',
      'Chứa kali tốt cho tim mạch',
      'Có tác dụng giải nhiệt'
    ],
    tags: ['hàn-quốc', 'lê', 'premium', 'giòn-ngọt'],
    created_at: '2024-01-30',
    updated_at: '2024-03-12'
  },
  {
    id: 7,
    name: 'Dâu tây Nhật Bản',
    price: '1800000',
    originalPrice: null,
    image: '/images/products/strawberry-japan.jpg',
    description: 'Dâu tây Amaou Nhật Bản, to ngọt, thơm đặc trưng',
    badge: 'Cao cấp',
    category: 'Dâu tây',
    origin: 'Nhật Bản',
    weight: '250g (8-12 quả)',
    shelf_life: '3-5 ngày',
    storage: 'Bảo quản trong tủ lạnh 2-4°C',
    stock: 12,
    rating: 4.9,
    reviews_count: 67,
    nutrition: {
      calories: '32 kcal/100g',
      vitamin_c: '58.8mg',
      fiber: '2g',
      sugar: '4.9g'
    },
    detailed_description: 'Dâu tây Amaou là giống dâu tây cao cấp nhất của Nhật Bản, được trồng tại tỉnh Fukuoka. Tên "Amaou" có nghĩa là "vua của sự ngọt ngào". Mỗi quả dâu có kích thước lớn, màu đỏ tươi, vị ngọt đậm đà và hương thơm quyến rũ.',
    benefits: [
      'Vitamin C cao gấp nhiều lần cam',
      'Chất chống oxy hóa mạnh',
      'Hỗ trợ làm đẹp da',
      'Tăng cường trí nhớ'
    ],
    tags: ['nhật-bản', 'dâu-tây', 'amaou', 'cao-cấp', 'limited'],
    created_at: '2024-02-14',
    updated_at: '2024-03-28'
  },
  {
    id: 8,
    name: 'Xoài Thái Lan',
    price: '280000',
    originalPrice: '320000',
    image: '/images/products/mango-thailand.png',
    description: 'Xoài Nam Dok Mai Thái Lan, thịt vàng ngọt đậm đà',
    badge: 'Giảm giá',
    category: 'Xoài',
    origin: 'Thái Lan',
    weight: '1kg (2-3 quả)',
    shelf_life: '5-7 ngày khi chín',
    storage: 'Để ngoài nhiệt độ phòng cho chín, sau đó bảo quản tủ lạnh',
    stock: 45,
    rating: 4.3,
    reviews_count: 142,
    nutrition: {
      calories: '60 kcal/100g',
      vitamin_c: '36.4mg',
      fiber: '1.6g',
      sugar: '13.7g'
    },
    detailed_description: 'Xoài Nam Dok Mai là giống xoài đặc sản của Thái Lan, nổi tiếng với thịt vàng óng, mịn như bơ và vị ngọt đậm đà. Được trồng tại những vùng đất phù sa màu mỡ, xoài Nam Dok Mai có hương thơm nồng nàn và vị ngọt tự nhiên khó quên.',
    benefits: [
      'Giàu vitamin A tốt cho mắt',
      'Vitamin C tăng cường miễn dịch',
      'Chất xơ hỗ trợ tiêu hóa',
      'Chất chống oxy hóa cao'
    ],
    tags: ['thái-lan', 'xoài', 'nam-dok-mai', 'giảm-giá'],
    created_at: '2024-02-05',
    updated_at: '2024-03-20'
  },
  {
    id: 9,
    name: 'Nho đen Chile',
    price: '650000',
    originalPrice: null,
    image: '/images/products/grapes-chile.png',
    description: 'Nho đen Chile, vỏ mỏng, thịt chắc ngọt thanh',
    badge: null,
    category: 'Nho',
    origin: 'Chile',
    weight: '500g',
    shelf_life: '7-10 ngày',
    storage: 'Bảo quản trong tủ lạnh 2-4°C',
    stock: 33,
    rating: 4.4,
    reviews_count: 108,
    nutrition: {
      calories: '62 kcal/100g',
      vitamin_c: '10.8mg',
      fiber: '0.9g',
      sugar: '16.25g'
    },
    detailed_description: 'Nho đen Chile được trồng tại thung lũng Central Valley nổi tiếng của Chile. Với khí hậu Địa Trung Hải lý tưởng, nho Chile có vỏ mỏng, thịt chắc và vị ngọt thanh đặc trưng. Màu đen tự nhiên của nho chứa nhiều anthocyanin có tác dụng chống oxy hóa mạnh.',
    benefits: [
      'Anthocyanin chống lão hóa',
      'Resveratrol tốt cho tim mạch',
      'Chất chống oxy hóa cao',
      'Hỗ trợ tuần hoàn máu'
    ],
    tags: ['chile', 'nho', 'nho-đen', 'anthocyanin'],
    created_at: '2024-01-18',
    updated_at: '2024-03-10'
  }
]

// Categories data
export const categoriesData = [
  { id: 1, name: 'Nho', slug: 'nho', description: 'Các loại nho nhập khẩu cao cấp' },
  { id: 2, name: 'Cherry', slug: 'cherry', description: 'Cherry tươi ngon từ các vùng nổi tiếng' },
  { id: 3, name: 'Kiwi', slug: 'kiwi', description: 'Kiwi giàu vitamin C' },
  { id: 4, name: 'Táo', slug: 'tao', description: 'Táo giòn ngọt nhập khẩu' },
  { id: 5, name: 'Cam', slug: 'cam', description: 'Cam tươi ngọt mát' },
  { id: 6, name: 'Lê', slug: 'le', description: 'Lê giòn ngọt cao cấp' },
  { id: 7, name: 'Dâu tây', slug: 'dau-tay', description: 'Dâu tây premium Nhật Bản' },
  { id: 8, name: 'Xoài', slug: 'xoai', description: 'Xoài thơm ngon nhiệt đới' }
]

// Mock API functions - will be replaced with real API calls
export const mockAPI = {
  // Get all products
  async getAllProducts() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return {
      success: true,
      data: productsData,
      total: productsData.length
    }
  },

  // Get product by ID
  async getProductById(id) {
    await new Promise(resolve => setTimeout(resolve, 50))
    const product = productsData.find(p => p.id === parseInt(id))
    return {
      success: !!product,
      data: product || null,
      message: product ? 'Product found' : 'Product not found'
    }
  },

  // Get products by category
  async getProductsByCategory(category, limit = null) {
    await new Promise(resolve => setTimeout(resolve, 80))
    let products = productsData.filter(p => p.category === category)
    if (limit) {
      products = products.slice(0, limit)
    }
    return {
      success: true,
      data: products,
      total: products.length
    }
  },

  // Get featured products
  async getFeaturedProducts(limit = 6) {
    await new Promise(resolve => setTimeout(resolve, 60))
    const featured = productsData
      .filter(p => p.badge && ['Bán chạy', 'Premium', 'Cao cấp'].includes(p.badge))
      .slice(0, limit)
    return {
      success: true,
      data: featured,
      total: featured.length
    }
  },

  // Search products
  async searchProducts(query, filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 120))
    let results = productsData.filter(product => {
      const matchesQuery = !query || 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.includes(query.toLowerCase()))

      const matchesCategory = !filters.category || product.category === filters.category
      const matchesOrigin = !filters.origin || product.origin === filters.origin
      const matchesPriceRange = !filters.minPrice || !filters.maxPrice || 
        (parseInt(product.price) >= filters.minPrice && parseInt(product.price) <= filters.maxPrice)

      return matchesQuery && matchesCategory && matchesOrigin && matchesPriceRange
    })

    // Sort results
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

  // Get all categories
  async getCategories() {
    await new Promise(resolve => setTimeout(resolve, 40))
    return {
      success: true,
      data: categoriesData,
      total: categoriesData.length
    }
  }
}

// Export individual functions for convenience
export const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  searchProducts,
  getCategories
} = mockAPI
