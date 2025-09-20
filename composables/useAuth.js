import { ref, computed, watch, readonly } from 'vue'

// Global auth state
const user = ref(null)
const isLoading = ref(false)
const authToken = ref(null)

export const useAuth = () => {
  // Load user from localStorage on initialization
  if (process.client && !user.value) {
    const savedUser = localStorage.getItem('dhouse-user')
    const savedToken = localStorage.getItem('dhouse-token')
    
    if (savedUser && savedToken) {
      try {
        user.value = JSON.parse(savedUser)
        authToken.value = savedToken
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
        user.value = null
        authToken.value = null
      }
    }
  }

  // Save user to localStorage whenever it changes
  if (process.client) {
    watch([user, authToken], ([newUser, newToken]) => {
      if (newUser && newToken) {
        localStorage.setItem('dhouse-user', JSON.stringify(newUser))
        localStorage.setItem('dhouse-token', newToken)
      } else {
        localStorage.removeItem('dhouse-user')
        localStorage.removeItem('dhouse-token')
      }
    }, { deep: true })
  }

  // Computed properties
  const isAuthenticated = computed(() => !!user.value && !!authToken.value)
  const userDisplayName = computed(() => {
    if (!user.value) return ''
    return user.value.fullName || user.value.email || 'Người dùng'
  })

  // Mock API functions (replace with real API calls)
  const loginAPI = async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    if (credentials.email === 'admin@dhousefruit.com' && credentials.password === '123456') {
      return {
        success: true,
        data: {
          user: {
            id: 1,
            email: 'admin@dhousefruit.com',
            fullName: 'Admin D\'House Fruit',
            phone: '0963152236',
            role: 'admin',
            avatar: null,
            createdAt: new Date().toISOString()
          },
          token: 'mock-jwt-token-' + Date.now()
        }
      }
    }
    
    // Check for demo users
    const demoUsers = [
      {
        email: 'user@example.com',
        password: '123456',
        user: {
          id: 2,
          email: 'user@example.com',
          fullName: 'Nguyễn Văn A',
          phone: '0987654321',
          role: 'customer',
          avatar: null,
          createdAt: new Date().toISOString()
        }
      }
    ]
    
    const foundUser = demoUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    )
    
    if (foundUser) {
      return {
        success: true,
        data: {
          user: foundUser.user,
          token: 'mock-jwt-token-' + Date.now()
        }
      }
    }
    
    return {
      success: false,
      message: 'Email hoặc mật khẩu không đúng'
    }
  }

  const registerAPI = async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock validation
    if (userData.email === 'admin@dhousefruit.com') {
      return {
        success: false,
        message: 'Email này đã được sử dụng'
      }
    }
    
    // Mock successful registration
    return {
      success: true,
      data: {
        user: {
          id: Date.now(),
          email: userData.email,
          fullName: userData.fullName,
          phone: userData.phone,
          role: 'customer',
          avatar: null,
          createdAt: new Date().toISOString()
        },
        token: 'mock-jwt-token-' + Date.now()
      }
    }
  }

  // Auth actions
  const login = async (credentials) => {
    isLoading.value = true
    
    try {
      const response = await loginAPI(credentials)
      
      if (response.success) {
        user.value = response.data.user
        authToken.value = response.data.token
        return { success: true }
      } else {
        return { 
          success: false, 
          message: response.message || 'Đăng nhập thất bại' 
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: 'Có lỗi xảy ra, vui lòng thử lại' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    
    try {
      const response = await registerAPI(userData)
      
      if (response.success) {
        user.value = response.data.user
        authToken.value = response.data.token
        return { success: true }
      } else {
        return { 
          success: false, 
          message: response.message || 'Đăng ký thất bại' 
        }
      }
    } catch (error) {
      console.error('Register error:', error)
      return { 
        success: false, 
        message: 'Có lỗi xảy ra, vui lòng thử lại' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    
    try {
      // TODO: Call logout API to invalidate token
      user.value = null
      authToken.value = null
      
      // Redirect to home page
      if (process.client) {
        await navigateTo('/')
      }
      
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { 
        success: false, 
        message: 'Có lỗi xảy ra khi đăng xuất' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (profileData) => {
    isLoading.value = true
    
    try {
      // TODO: Call update profile API
      // Mock update
      if (user.value) {
        user.value = { ...user.value, ...profileData }
      }
      
      return { success: true }
    } catch (error) {
      console.error('Update profile error:', error)
      return { 
        success: false, 
        message: 'Có lỗi xảy ra khi cập nhật thông tin' 
      }
    } finally {
      isLoading.value = false
    }
  }

  // Utility functions
  const hasRole = (role) => {
    return user.value?.role === role
  }

  const isAdmin = computed(() => hasRole('admin'))
  const isCustomer = computed(() => hasRole('customer'))

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return {
    // State
    user: readonly(user),
    isLoading: readonly(isLoading),
    authToken: readonly(authToken),
    
    // Computed
    isAuthenticated,
    userDisplayName,
    isAdmin,
    isCustomer,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    
    // Utilities
    hasRole,
    getInitials
  }
}
