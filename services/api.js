// API Service - Ready for real API integration
// Currently using mock data, easily replaceable with real API calls

import { mockAPI } from '~/data/products.js'
import { giftBasketsAPI } from '~/data/giftBaskets.js'

// Base API configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api'
const API_TIMEOUT = 10000 // 10 seconds

// HTTP client configuration (ready for axios or fetch)
const createApiClient = () => {
  // This will be replaced with actual HTTP client (axios, $fetch, etc.)
  return {
    get: async (url, config = {}) => {
      // Mock implementation - replace with real HTTP calls
      console.log(`[MOCK API] GET ${API_BASE_URL}${url}`)
      return mockAPI
    },
    post: async (url, data, config = {}) => {
      console.log(`[MOCK API] POST ${API_BASE_URL}${url}`, data)
      return mockAPI
    },
    put: async (url, data, config = {}) => {
      console.log(`[MOCK API] PUT ${API_BASE_URL}${url}`, data)
      return mockAPI
    },
    delete: async (url, config = {}) => {
      console.log(`[MOCK API] DELETE ${API_BASE_URL}${url}`)
      return mockAPI
    }
  }
}

const apiClient = createApiClient()

// Products API
export const productsAPI = {
  // Get all products
  async getAll(params = {}) {
    try {
      // Real API call would be:
      // const response = await apiClient.get('/products', { params })
      // return response.data
      
      // Mock implementation
      return await mockAPI.getAllProducts()
    } catch (error) {
      console.error('Error fetching products:', error)
      throw new Error('Không thể tải danh sách sản phẩm')
    }
  },

  // Get product by ID
  async getById(id) {
    try {
      // Real API call would be:
      // const response = await apiClient.get(`/products/${id}`)
      // return response.data
      
      return await mockAPI.getProductById(id)
    } catch (error) {
      console.error('Error fetching product:', error)
      throw new Error('Không thể tải thông tin sản phẩm')
    }
  },

  // Get products by category
  async getByCategory(category, limit = null) {
    try {
      // Real API call would be:
      // const response = await apiClient.get(`/products/category/${category}`, { 
      //   params: { limit } 
      // })
      // return response.data
      
      return await mockAPI.getProductsByCategory(category, limit)
    } catch (error) {
      console.error('Error fetching products by category:', error)
      throw new Error('Không thể tải sản phẩm theo danh mục')
    }
  },

  // Get featured products
  async getFeatured(limit = 6) {
    try {
      // Real API call would be:
      // const response = await apiClient.get('/products/featured', { 
      //   params: { limit } 
      // })
      // return response.data
      
      return await mockAPI.getFeaturedProducts(limit)
    } catch (error) {
      console.error('Error fetching featured products:', error)
      throw new Error('Không thể tải sản phẩm nổi bật')
    }
  },

  // Search products
  async search(query, filters = {}) {
    try {
      // Real API call would be:
      // const response = await apiClient.get('/products/search', { 
      //   params: { q: query, ...filters } 
      // })
      // return response.data
      
      return await mockAPI.searchProducts(query, filters)
    } catch (error) {
      console.error('Error searching products:', error)
      throw new Error('Không thể tìm kiếm sản phẩm')
    }
  }
}

// Categories API
export const categoriesAPI = {
  // Get all categories
  async getAll() {
    try {
      // Real API call would be:
      // const response = await apiClient.get('/categories')
      // return response.data
      
      return await mockAPI.getCategories()
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw new Error('Không thể tải danh mục sản phẩm')
    }
  }
}

// Cart API (for future implementation)
export const cartAPI = {
  // Get cart items
  async getItems() {
    try {
      // Real API call would be:
      // const response = await apiClient.get('/cart')
      // return response.data
      
      // Mock implementation
      return {
        success: true,
        data: [],
        total: 0
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      throw new Error('Không thể tải giỏ hàng')
    }
  },

  // Add item to cart
  async addItem(productId, quantity = 1) {
    try {
      // Real API call would be:
      // const response = await apiClient.post('/cart/items', { 
      //   product_id: productId, 
      //   quantity 
      // })
      // return response.data
      
      // Mock implementation
      return {
        success: true,
        message: 'Đã thêm sản phẩm vào giỏ hàng',
        data: { productId, quantity }
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw new Error('Không thể thêm sản phẩm vào giỏ hàng')
    }
  },

  // Update cart item
  async updateItem(itemId, quantity) {
    try {
      // Real API call would be:
      // const response = await apiClient.put(`/cart/items/${itemId}`, { quantity })
      // return response.data
      
      // Mock implementation
      return {
        success: true,
        message: 'Đã cập nhật giỏ hàng',
        data: { itemId, quantity }
      }
    } catch (error) {
      console.error('Error updating cart:', error)
      throw new Error('Không thể cập nhật giỏ hàng')
    }
  },

  // Remove item from cart
  async removeItem(itemId) {
    try {
      // Real API call would be:
      // const response = await apiClient.delete(`/cart/items/${itemId}`)
      // return response.data
      
      // Mock implementation
      return {
        success: true,
        message: 'Đã xóa sản phẩm khỏi giỏ hàng'
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
      throw new Error('Không thể xóa sản phẩm khỏi giỏ hàng')
    }
  }
}

// Orders API (for future implementation)
export const ordersAPI = {
  // Create order
  async create(orderData) {
    try {
      // Real API call would be:
      // const response = await apiClient.post('/orders', orderData)
      // return response.data
      
      // Mock implementation
      return {
        success: true,
        message: 'Đặt hàng thành công',
        data: {
          id: Date.now(),
          status: 'pending',
          ...orderData
        }
      }
    } catch (error) {
      console.error('Error creating order:', error)
      throw new Error('Không thể tạo đơn hàng')
    }
  },

  // Get order by ID
  async getById(orderId) {
    try {
      // Real API call would be:
      // const response = await apiClient.get(`/orders/${orderId}`)
      // return response.data
      
      // Mock implementation
      return {
        success: true,
        data: {
          id: orderId,
          status: 'pending',
          items: [],
          total: 0
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      throw new Error('Không thể tải thông tin đơn hàng')
    }
  }
}

// Gift Baskets API
export const giftBasketsAPIService = {
  // Get all gift baskets
  async getAll(params = {}) {
    try {
      // Real API call would be:
      // const response = await apiClient.get('/giftBaskets', { params })
      // return response.data
      
      // Mock implementation
      return await giftBasketsAPI.getAllGiftBaskets()
    } catch (error) {
      console.error('Error fetching gift baskets:', error)
      throw new Error('Không thể tải danh sách giỏ quà')
    }
  },

  // Get gift basket by ID
  async getById(id) {
    try {
      // Real API call would be:
      // const response = await apiClient.get(`/giftBaskets/${id}`)
      // return response.data
      
      return await giftBasketsAPI.getGiftBasketById(id)
    } catch (error) {
      console.error('Error fetching gift basket:', error)
      throw new Error('Không thể tải thông tin giỏ quà')
    }
  },

  // Get gift baskets by category
  async getByCategory(category, limit = null) {
    try {
      // Real API call would be:
      // const response = await apiClient.get(`/giftBaskets/category/${category}`, { 
      //   params: { limit } 
      // })
      // return response.data
      
      return await giftBasketsAPI.getGiftBasketsByCategory(category, limit)
    } catch (error) {
      console.error('Error fetching gift baskets by category:', error)
      throw new Error('Không thể tải giỏ quà theo danh mục')
    }
  },

  // Get featured gift baskets
  async getFeatured(limit = 4) {
    try {
      // Real API call would be:
      // const response = await apiClient.get('/giftBaskets/featured', { 
      //   params: { limit } 
      // })
      // return response.data
      
      return await giftBasketsAPI.getFeaturedGiftBaskets(limit)
    } catch (error) {
      console.error('Error fetching featured gift baskets:', error)
      throw new Error('Không thể tải giỏ quà nổi bật')
    }
  },

  // Search gift baskets
  async search(query, filters = {}) {
    try {
      // Real API call would be:
      // const response = await apiClient.get('/giftBaskets/search', { 
      //   params: { q: query, ...filters } 
      // })
      // return response.data
      
      return await giftBasketsAPI.searchGiftBaskets(query, filters)
    } catch (error) {
      console.error('Error searching gift baskets:', error)
      throw new Error('Không thể tìm kiếm giỏ quà')
    }
  }
}

// Export all APIs
export default {
  products: productsAPI,
  categories: categoriesAPI,
  giftBaskets: giftBasketsAPIService,
  cart: cartAPI,
  orders: ordersAPI
}

// Utility functions for API integration
export const apiUtils = {
  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const message = error.response.data?.message || 'Có lỗi xảy ra'
      
      switch (status) {
        case 400:
          return 'Dữ liệu không hợp lệ'
        case 401:
          return 'Bạn cần đăng nhập để tiếp tục'
        case 403:
          return 'Bạn không có quyền thực hiện hành động này'
        case 404:
          return 'Không tìm thấy dữ liệu'
        case 500:
          return 'Lỗi server, vui lòng thử lại sau'
        default:
          return message
      }
    } else if (error.request) {
      // Network error
      return 'Không thể kết nối đến server'
    } else {
      // Other error
      return error.message || 'Có lỗi xảy ra'
    }
  },

  // Format API response
  formatResponse(response) {
    return {
      success: true,
      data: response.data,
      message: response.message || 'Thành công',
      meta: response.meta || {}
    }
  },

  // Create query string from object
  createQueryString(params) {
    const searchParams = new URLSearchParams()
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        searchParams.append(key, params[key])
      }
    })
    return searchParams.toString()
  }
}
