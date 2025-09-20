import { ref, readonly } from 'vue'

// Global toast state
const toasts = ref([])
let toastId = 0

export const useToast = () => {
  // Toast types
  const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  }

  // Default options
  const defaultOptions = {
    duration: 4000,
    position: 'top-right',
    closable: true,
    persistent: false
  }

  // Add toast
  const addToast = (message, type = TOAST_TYPES.SUCCESS, options = {}) => {
    const id = ++toastId
    const toast = {
      id,
      message,
      type,
      ...defaultOptions,
      ...options,
      createdAt: Date.now()
    }

    toasts.value.push(toast)

    // Auto remove toast if not persistent
    if (!toast.persistent && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }

    return id
  }

  // Remove toast
  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  // Clear all toasts
  const clearToasts = () => {
    toasts.value = []
  }

  // Convenience methods
  const success = (message, options = {}) => {
    return addToast(message, TOAST_TYPES.SUCCESS, options)
  }

  const error = (message, options = {}) => {
    return addToast(message, TOAST_TYPES.ERROR, {
      duration: 6000, // Error messages stay longer
      ...options
    })
  }

  const warning = (message, options = {}) => {
    return addToast(message, TOAST_TYPES.WARNING, options)
  }

  const info = (message, options = {}) => {
    return addToast(message, TOAST_TYPES.INFO, options)
  }

  // Loading toast (persistent until manually removed)
  const loading = (message = 'Đang xử lý...', options = {}) => {
    return addToast(message, TOAST_TYPES.INFO, {
      persistent: true,
      closable: false,
      ...options
    })
  }

  // Update existing toast
  const updateToast = (id, updates) => {
    const toast = toasts.value.find(t => t.id === id)
    if (toast) {
      Object.assign(toast, updates)
    }
  }

  // Promise-based toast for async operations
  const promise = async (promise, messages = {}) => {
    const {
      loading: loadingMsg = 'Đang xử lý...',
      success: successMsg = 'Thành công!',
      error: errorMsg = 'Có lỗi xảy ra!'
    } = messages

    const loadingId = loading(loadingMsg)

    try {
      const result = await promise
      removeToast(loadingId)
      success(successMsg)
      return result
    } catch (err) {
      removeToast(loadingId)
      error(typeof errorMsg === 'function' ? errorMsg(err) : errorMsg)
      throw err
    }
  }

  return {
    // State
    toasts: readonly(toasts),
    
    // Types
    TOAST_TYPES,
    
    // Core methods
    addToast,
    removeToast,
    clearToasts,
    updateToast,
    
    // Convenience methods
    success,
    error,
    warning,
    info,
    loading,
    promise
  }
}
