import { ref, computed, watch, readonly } from 'vue'
import { useProducts } from './useProducts'
import { useGiftBaskets } from './useGiftBaskets'

// Global cart state
const cartItems = ref([])
const isLoading = ref(false)

export const useCart = () => {
  const { getProductById } = useProducts()
  const { getGiftBasketById } = useGiftBaskets()

  // Load cart from localStorage on initialization
  if (process.client && !cartItems.value.length) {
    const savedCart = localStorage.getItem('dhouse-cart')
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart)
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        cartItems.value = []
      }
    }
  }

  // Save cart to localStorage whenever it changes
  if (process.client) {
    watch(cartItems, (newCart) => {
      localStorage.setItem('dhouse-cart', JSON.stringify(newCart))
    }, { deep: true })
  }

  // Computed properties
  const cartItemsCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      const itemData = item.type === 'product' 
        ? getProductById(item.id) 
        : getGiftBasketById(item.id)
      
      if (itemData) {
        const price = itemData.salePrice || itemData.price
        return total + (price * item.quantity)
      }
      return total
    }, 0)
  })

  const cartItemsWithDetails = computed(() => {
    return cartItems.value.map(item => {
      const itemData = item.type === 'product' 
        ? getProductById(item.id) 
        : getGiftBasketById(item.id)
      
      return {
        ...item,
        data: itemData,
        subtotal: itemData ? (itemData.salePrice || itemData.price) * item.quantity : 0
      }
    }).filter(item => item.data) // Remove items that no longer exist
  })

  const isEmpty = computed(() => cartItems.value.length === 0)

  // Cart actions
  const addToCart = (item) => {
    const existingItemIndex = cartItems.value.findIndex(
      cartItem => cartItem.id === item.id && cartItem.type === item.type
    )

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      cartItems.value[existingItemIndex].quantity += item.quantity || 1
    } else {
      // Add new item
      cartItems.value.push({
        id: item.id,
        type: item.type, // 'product' or 'giftBasket'
        quantity: item.quantity || 1,
        addedAt: new Date().toISOString()
      })
    }
  }

  const removeFromCart = (itemId, itemType) => {
    const index = cartItems.value.findIndex(
      item => item.id === itemId && item.type === itemType
    )
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const updateQuantity = (itemId, itemType, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, itemType)
      return
    }

    const item = cartItems.value.find(
      item => item.id === itemId && item.type === itemType
    )
    if (item) {
      item.quantity = newQuantity
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const getItemQuantity = (itemId, itemType) => {
    const item = cartItems.value.find(
      item => item.id === itemId && item.type === itemType
    )
    return item ? item.quantity : 0
  }

  const isInCart = (itemId, itemType) => {
    return cartItems.value.some(
      item => item.id === itemId && item.type === itemType
    )
  }

  // Utility functions
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const getShippingCost = () => {
    // Free shipping for orders over 500k
    return cartTotal.value >= 500000 ? 0 : 30000
  }

  const getFinalTotal = () => {
    return cartTotal.value + getShippingCost()
  }


  return {
    // State
    cartItems: readonly(cartItems),
    isLoading: readonly(isLoading),
    
    // Computed
    cartItemsCount,
    cartTotal,
    cartItemsWithDetails,
    isEmpty,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    
    // Utilities
    formatPrice,
    getShippingCost,
    getFinalTotal
  }
}
