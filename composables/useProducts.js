import { productsData, categoriesData, mockAPI } from '~/data/products.js'

export const useProducts = () => {
  // Reactive data
  const allProducts = ref(productsData)
  const categories = ref(categoriesData)
  const loading = ref(false)
  const error = ref(null)

  // Sync methods (using local data)
  const getProductById = (id) => {
    return allProducts.value.find(product => product.id === parseInt(id))
  }

  const getRelatedProducts = (currentProductId, category, limit = 4) => {
    return allProducts.value
      .filter(product => product.id !== parseInt(currentProductId) && product.category === category)
      .slice(0, limit)
  }

  const getProductsByCategory = (category, limit = null) => {
    let products = allProducts.value.filter(p => p.category === category)
    if (limit) {
      products = products.slice(0, limit)
    }
    return products
  }

  const getFeaturedProducts = (limit = 6) => {
    return allProducts.value
      .filter(p => p.badge && ['Bán chạy', 'Premium', 'Cao cấp'].includes(p.badge))
      .slice(0, limit)
  }

  const searchProducts = (query, filters = {}) => {
    let results = allProducts.value.filter(product => {
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

    return results
  }

  // Async methods (using mock API - ready for real API)
  const fetchAllProducts = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await mockAPI.getAllProducts()
      if (response.success) {
        allProducts.value = response.data
      }
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchProductById = async (id) => {
    try {
      loading.value = true
      error.value = null
      const response = await mockAPI.getProductById(id)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchProductsByCategory = async (category, limit = null) => {
    try {
      loading.value = true
      error.value = null
      const response = await mockAPI.getProductsByCategory(category, limit)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchFeaturedProducts = async (limit = 6) => {
    try {
      loading.value = true
      error.value = null
      const response = await mockAPI.getFeaturedProducts(limit)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchSearchResults = async (query, filters = {}) => {
    try {
      loading.value = true
      error.value = null
      const response = await mockAPI.searchProducts(query, filters)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await mockAPI.getCategories()
      if (response.success) {
        categories.value = response.data
      }
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Utility functions
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price)
  }

  const getDiscountPercent = (currentPrice, originalPrice) => {
    if (!originalPrice) return 0
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  const getBadgeColor = (badge) => {
    const colors = {
      'Bán chạy': 'bg-red-500',
      'Mới về': 'bg-blue-500',
      'Giảm giá': 'bg-orange-500',
      'Khuyến mãi': 'bg-purple-500',
      'Premium': 'bg-yellow-500',
      'Cao cấp': 'bg-pink-500'
    }
    return colors[badge] || 'bg-gray-500'
  }

  const isInStock = (product) => {
    return product.stock && product.stock > 0
  }

  const getStockStatus = (product) => {
    if (!product.stock || product.stock === 0) return 'out-of-stock'
    if (product.stock <= 5) return 'low-stock'
    return 'in-stock'
  }

  return {
    // Reactive data
    allProducts,
    categories,
    loading,
    error,
    
    // Sync methods (local data)
    getProductById,
    getRelatedProducts,
    getProductsByCategory,
    getFeaturedProducts,
    searchProducts,
    
    // Async methods (API ready)
    fetchAllProducts,
    fetchProductById,
    fetchProductsByCategory,
    fetchFeaturedProducts,
    fetchSearchResults,
    fetchCategories,
    
    // Utility functions
    formatPrice,
    getDiscountPercent,
    getBadgeColor,
    isInStock,
    getStockStatus
  }
}
