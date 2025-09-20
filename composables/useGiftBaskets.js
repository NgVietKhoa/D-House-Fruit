import { giftBasketsData, giftCategoriesData, giftBasketsAPI } from '~/data/giftBaskets.js'

export const useGiftBaskets = () => {
  // Reactive data
  const allGiftBaskets = ref(giftBasketsData)
  const giftCategories = ref(giftCategoriesData)
  const loading = ref(false)
  const error = ref(null)

  // Sync methods (using local data)
  const getGiftBasketById = (id) => {
    if (!id) return null
    // Handle both string and number IDs
    const basketId = typeof id === 'string' ? parseInt(id) : id
    if (isNaN(basketId)) return null
    
    return allGiftBaskets.value.find(basket => basket.id === basketId) || null
  }

  const getGiftBasketsByCategory = (category, limit = null) => {
    let baskets = allGiftBaskets.value.filter(b => b.category === category)
    if (limit) {
      baskets = baskets.slice(0, limit)
    }
    return baskets
  }

  const getFeaturedGiftBaskets = (limit = 4) => {
    return allGiftBaskets.value
      .filter(b => b.badge && ['Bán chạy', 'VIP', 'Đặc biệt'].includes(b.badge))
      .slice(0, limit)
  }

  const getGiftBasketsByType = (type, limit = null) => {
    let baskets = allGiftBaskets.value.filter(b => b.type === type)
    if (limit) {
      baskets = baskets.slice(0, limit)
    }
    return baskets
  }

  const getGiftBasketsByOccasion = (occasion, limit = null) => {
    let baskets = allGiftBaskets.value.filter(b => 
      b.occasions.some(occ => occ.toLowerCase().includes(occasion.toLowerCase()))
    )
    if (limit) {
      baskets = baskets.slice(0, limit)
    }
    return baskets
  }

  const searchGiftBaskets = (query, filters = {}) => {
    let results = allGiftBaskets.value.filter(basket => {
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
  const fetchAllGiftBaskets = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await giftBasketsAPI.getAllGiftBaskets()
      if (response.success) {
        allGiftBaskets.value = response.data
      }
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchGiftBasketById = async (id) => {
    try {
      loading.value = true
      error.value = null
      const response = await giftBasketsAPI.getGiftBasketById(id)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchGiftBasketsByCategory = async (category, limit = null) => {
    try {
      loading.value = true
      error.value = null
      const response = await giftBasketsAPI.getGiftBasketsByCategory(category, limit)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchFeaturedGiftBaskets = async (limit = 4) => {
    try {
      loading.value = true
      error.value = null
      const response = await giftBasketsAPI.getFeaturedGiftBaskets(limit)
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
      const response = await giftBasketsAPI.searchGiftBaskets(query, filters)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchGiftCategories = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await giftBasketsAPI.getGiftCategories()
      if (response.success) {
        giftCategories.value = response.data
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
      'Giảm giá': 'bg-orange-500',
      'VIP': 'bg-purple-500',
      'Đặc biệt': 'bg-pink-500',
      'Mới': 'bg-blue-500'
    }
    return colors[badge] || 'bg-gray-500'
  }

  const isInStock = (basket) => {
    return basket.stock && basket.stock > 0
  }

  const getStockStatus = (basket) => {
    if (!basket.stock || basket.stock === 0) return 'out-of-stock'
    if (basket.stock <= 5) return 'low-stock'
    return 'in-stock'
  }

  const getPriceRange = () => {
    const prices = allGiftBaskets.value.map(b => parseInt(b.price))
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }

  const getBasketsByPriceRange = (minPrice, maxPrice) => {
    return allGiftBaskets.value.filter(basket => {
      const price = parseInt(basket.price)
      return price >= minPrice && price <= maxPrice
    })
  }

  const getRecommendedBaskets = (currentBasketId, limit = 3) => {
    const currentBasket = getGiftBasketById(currentBasketId)
    if (!currentBasket) return []

    return allGiftBaskets.value
      .filter(basket => 
        basket.id !== parseInt(currentBasketId) && 
        (basket.category === currentBasket.category || basket.type === currentBasket.type)
      )
      .slice(0, limit)
  }

  return {
    // Reactive data
    allGiftBaskets,
    giftCategories,
    loading,
    error,
    
    // Sync methods (local data)
    getGiftBasketById,
    getGiftBasketsByCategory,
    getFeaturedGiftBaskets,
    getGiftBasketsByType,
    getGiftBasketsByOccasion,
    searchGiftBaskets,
    
    // Async methods (API ready)
    fetchAllGiftBaskets,
    fetchGiftBasketById,
    fetchGiftBasketsByCategory,
    fetchFeaturedGiftBaskets,
    fetchSearchResults,
    fetchGiftCategories,
    
    // Utility functions
    formatPrice,
    getDiscountPercent,
    getBadgeColor,
    isInStock,
    getStockStatus,
    getPriceRange,
    getBasketsByPriceRange,
    getRecommendedBaskets
  }
}
