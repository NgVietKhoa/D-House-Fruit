import { ref, computed, readonly, watch } from 'vue'
import { useAuth } from './useAuth'
import { useProducts } from './useProducts'
import { useGiftBaskets } from './useGiftBaskets'

// Global orders state
const orders = ref([])
const isLoading = ref(false)

export const useOrders = () => {
  const { user } = useAuth()
  const { getProductById } = useProducts()
  const { getGiftBasketById } = useGiftBaskets()

  // Load orders from localStorage on initialization
  if (process.client && !orders.value.length) {
    const savedOrders = localStorage.getItem('dhouse-orders')
    if (savedOrders) {
      try {
        orders.value = JSON.parse(savedOrders)
      } catch (error) {
        console.error('Error loading orders from localStorage:', error)
        orders.value = []
      }
    }
  }

  // Save orders to localStorage whenever it changes
  if (process.client) {
    watch(orders, (newOrders) => {
      localStorage.setItem('dhouse-orders', JSON.stringify(newOrders))
    }, { deep: true })
  }

  // Mock orders data for demo
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      userId: 2,
      status: 'delivered',
      orderDate: '2024-03-15T10:30:00Z',
      deliveryDate: '2024-03-17T14:20:00Z',
      items: [
        { id: 1, type: 'product', quantity: 2, price: 1200000 },
        { id: 3, type: 'product', quantity: 1, price: 450000 }
      ],
      subtotal: 2850000,
      shippingCost: 0,
      total: 2850000,
      shippingAddress: {
        fullName: 'Nguyễn Văn A',
        phone: '0987654321',
        address: '123 Nguyễn Huệ, Quận 1',
        city: 'TP. Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé'
      },
      paymentMethod: 'cod',
      notes: 'Giao hàng buổi chiều'
    },
    {
      id: 'ORD-2024-002',
      userId: 2,
      status: 'shipping',
      orderDate: '2024-03-20T09:15:00Z',
      deliveryDate: null,
      items: [
        { id: 2, type: 'product', quantity: 1, price: 890000 },
        { id: 7, type: 'product', quantity: 1, price: 1800000 }
      ],
      subtotal: 2690000,
      shippingCost: 0,
      total: 2690000,
      shippingAddress: {
        fullName: 'Nguyễn Văn A',
        phone: '0987654321',
        address: '123 Nguyễn Huệ, Quận 1',
        city: 'TP. Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé'
      },
      paymentMethod: 'bank_transfer',
      notes: ''
    },
    {
      id: 'ORD-2024-003',
      userId: 2,
      status: 'processing',
      orderDate: '2024-03-22T16:45:00Z',
      deliveryDate: null,
      items: [
        { id: 4, type: 'product', quantity: 2, price: 680000 },
        { id: 5, type: 'product', quantity: 1, price: 320000 }
      ],
      subtotal: 1680000,
      shippingCost: 30000,
      total: 1710000,
      shippingAddress: {
        fullName: 'Nguyễn Văn A',
        phone: '0987654321',
        address: '456 Lê Lợi, Quận 3',
        city: 'TP. Hồ Chí Minh',
        district: 'Quận 3',
        ward: 'Phường 7'
      },
      paymentMethod: 'cod',
      notes: 'Gọi trước khi giao'
    }
  ]

  // Initialize with mock data if no orders exist
  if (process.client && orders.value.length === 0 && user.value) {
    orders.value = mockOrders
  }

  // Computed properties
  const userOrders = computed(() => {
    if (!user.value) return []
    return orders.value.filter(order => order.userId === user.value.id)
  })

  const ordersWithDetails = computed(() => {
    return userOrders.value.map(order => ({
      ...order,
      items: order.items.map(item => {
        const itemData = item.type === 'product' 
          ? getProductById(item.id) 
          : getGiftBasketById(item.id)
        
        return {
          ...item,
          data: itemData,
          subtotal: item.price * item.quantity
        }
      }).filter(item => item.data)
    }))
  })

  const ordersByStatus = computed(() => {
    const grouped = {}
    userOrders.value.forEach(order => {
      if (!grouped[order.status]) {
        grouped[order.status] = []
      }
      grouped[order.status].push(order)
    })
    return grouped
  })

  const orderStats = computed(() => {
    const total = userOrders.value.length
    const delivered = userOrders.value.filter(o => o.status === 'delivered').length
    const shipping = userOrders.value.filter(o => o.status === 'shipping').length
    const processing = userOrders.value.filter(o => o.status === 'processing').length
    const cancelled = userOrders.value.filter(o => o.status === 'cancelled').length

    return {
      total,
      delivered,
      shipping,
      processing,
      cancelled
    }
  })

  // Order actions
  const createOrder = async (orderData) => {
    try {
      // Mock API call - simulate order creation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newOrder = {
        id: `ORD-${Date.now()}`,
        userId: user.value?.id || 1,
        status: 'processing',
        orderDate: new Date().toISOString(),
        deliveryDate: null,
        items: orderData.items.map(item => ({
          id: item.id,
          type: item.type,
          quantity: item.quantity,
          price: item.type === 'product' 
            ? getProductById(item.id)?.price || 0
            : getGiftBasketById(item.id)?.price || 0
        })),
        subtotal: orderData.subtotal,
        shippingCost: orderData.shippingFee,
        discount: orderData.discount || 0,
        total: orderData.total,
        shippingAddress: {
          fullName: orderData.customerInfo.fullName,
          phone: orderData.customerInfo.phone,
          address: orderData.customerInfo.address
        },
        paymentMethod: orderData.paymentMethod,
        notes: orderData.customerInfo.notes || ''
      }
      
      orders.value.unshift(newOrder)
      
      // Save to localStorage
      if (process.client) {
        localStorage.setItem('dhouse-orders', JSON.stringify(orders.value))
      }
      
      return { success: true, orderId: newOrder.id }
    } catch (error) {
      return { success: false, message: 'Không thể tạo đơn hàng' }
    }
  }

  const getOrderById = (orderId) => {
    return orders.value.find(order => order.id === orderId)
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    isLoading.value = true
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const orderIndex = orders.value.findIndex(order => order.id === orderId)
      if (orderIndex > -1) {
        orders.value[orderIndex].status = newStatus
        
        if (newStatus === 'delivered') {
          orders.value[orderIndex].deliveryDate = new Date().toISOString()
        }
      }
      
      return { success: true }
    } catch (error) {
      console.error('Update order status error:', error)
      return { 
        success: false, 
        message: 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const cancelOrder = async (orderId, reason = '') => {
    isLoading.value = true
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const orderIndex = orders.value.findIndex(order => order.id === orderId)
      if (orderIndex > -1) {
        orders.value[orderIndex].status = 'cancelled'
        orders.value[orderIndex].cancelReason = reason
        orders.value[orderIndex].cancelDate = new Date().toISOString()
      }
      
      return { success: true }
    } catch (error) {
      console.error('Cancel order error:', error)
      return { 
        success: false, 
        message: 'Có lỗi xảy ra khi hủy đơn hàng' 
      }
    } finally {
      isLoading.value = false
    }
  }

  // Utility functions
  const getStatusText = (status) => {
    const statusMap = {
      'processing': 'Đang xử lý',
      'confirmed': 'Đã xác nhận',
      'shipping': 'Đang giao hàng',
      'delivered': 'Đã giao hàng',
      'cancelled': 'Đã hủy'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status) => {
    const colorMap = {
      'processing': 'text-yellow-600 bg-yellow-100',
      'confirmed': 'text-blue-600 bg-blue-100',
      'shipping': 'text-purple-600 bg-purple-100',
      'delivered': 'text-green-600 bg-green-100',
      'cancelled': 'text-red-600 bg-red-100'
    }
    return colorMap[status] || 'text-gray-600 bg-gray-100'
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const canCancelOrder = (order) => {
    return ['processing', 'confirmed'].includes(order.status)
  }

  return {
    // State
    orders: readonly(orders),
    isLoading: readonly(isLoading),
    
    // Computed
    userOrders,
    ordersWithDetails,
    ordersByStatus,
    orderStats,
    
    // Actions
    createOrder,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    
    // Utilities
    getStatusText,
    getStatusColor,
    formatPrice,
    formatDate,
    canCancelOrder
  }
}
