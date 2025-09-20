<template>
  <Transition
    enter-active-class="transform ease-out duration-500 transition-all"
    enter-from-class="translate-y-4 opacity-0 scale-95 sm:translate-y-0 sm:translate-x-4 sm:scale-90"
    enter-to-class="translate-y-0 opacity-100 scale-100 sm:translate-x-0 sm:scale-100"
    leave-active-class="transition-all ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95 translate-y-2"
  >
    <div
      v-if="visible"
      class="max-w-sm w-full bg-white rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-10 overflow-hidden backdrop-blur-sm"
      :class="toastClasses"
      style="box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));"
    >
      <div class="p-4">
        <div class="flex items-start">
          <!-- Icon -->
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="iconBgClasses">
              <component 
                :is="iconComponent" 
                class="h-5 w-5" 
                :class="iconClasses"
              />
            </div>
          </div>
          
          <!-- Content -->
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">
              {{ toast.message }}
            </p>
            <div v-if="toast.description" class="mt-1 text-sm text-gray-500">
              {{ toast.description }}
            </div>
          </div>
          
          <!-- Close Button -->
          <div v-if="toast.closable" class="ml-4 flex-shrink-0 flex">
            <button
              @click="$emit('close')"
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green transition-colors"
            >
              <span class="sr-only">Đóng</span>
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div 
          v-if="showProgress" 
          class="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
        >
          <div 
            class="h-full rounded-full transition-all duration-100 ease-linear shadow-sm"
            :class="progressBarClasses"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon, 
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/vue/24/outline'

const props = defineProps({
  toast: {
    type: Object,
    required: true
  },
  showProgress: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

// Component state
const visible = ref(true)
const progress = ref(100)

// Icon mapping
const iconMap = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon
}

// Computed properties
const iconComponent = computed(() => iconMap[props.toast.type] || InformationCircleIcon)

const toastClasses = computed(() => {
  const baseClasses = 'border-l-4 relative overflow-hidden'
  const typeClasses = {
    success: 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-green-500/20 ring-1 ring-green-200/30',
    error: 'border-red-500 bg-gradient-to-r from-red-50 to-rose-50 shadow-red-500/20 ring-1 ring-red-200/30',
    warning: 'border-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-yellow-500/20 ring-1 ring-yellow-200/30',
    info: 'border-blue-500 bg-gradient-to-r from-blue-50 to-sky-50 shadow-blue-500/20 ring-1 ring-blue-200/30'
  }
  return `${baseClasses} ${typeClasses[props.toast.type] || typeClasses.info}`
})

const iconClasses = computed(() => {
  const typeClasses = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600'
  }
  return typeClasses[props.toast.type] || typeClasses.info
})

const iconBgClasses = computed(() => {
  const typeClasses = {
    success: 'bg-green-100 shadow-xl shadow-green-500/30 ring-2 ring-green-200/50',
    error: 'bg-red-100 shadow-xl shadow-red-500/30 ring-2 ring-red-200/50',
    warning: 'bg-yellow-100 shadow-xl shadow-yellow-500/30 ring-2 ring-yellow-200/50',
    info: 'bg-blue-100 shadow-xl shadow-blue-500/30 ring-2 ring-blue-200/50'
  }
  return typeClasses[props.toast.type] || typeClasses.info
})

const progressBarClasses = computed(() => {
  const typeClasses = {
    success: 'bg-gradient-to-r from-green-400 to-emerald-500',
    error: 'bg-gradient-to-r from-red-400 to-rose-500',
    warning: 'bg-gradient-to-r from-yellow-400 to-amber-500',
    info: 'bg-gradient-to-r from-blue-400 to-sky-500'
  }
  return typeClasses[props.toast.type] || typeClasses.info
})

// Progress bar animation
let progressInterval = null

onMounted(() => {
  if (props.showProgress && props.toast.duration > 0 && !props.toast.persistent) {
    const startTime = props.toast.createdAt || Date.now()
    const duration = props.toast.duration
    
    progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, duration - elapsed)
      progress.value = (remaining / duration) * 100
      
      if (remaining <= 0) {
        clearInterval(progressInterval)
        progress.value = 0
      }
    }, 50)
  }
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})

// Handle close
const handleClose = () => {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 100)
}

// Auto-close for non-persistent toasts - remove this logic since it's handled by useToast
</script>

<style scoped>
/* Enhanced toast animations and effects */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Subtle breathing animation */
@keyframes toast-breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* Apply breathing animation on hover */
.max-w-sm:hover {
  animation: toast-breathe 2s ease-in-out infinite;
}

/* Enhanced shadow on hover */
.max-w-sm:hover {
  filter: drop-shadow(0 15px 15px rgba(0, 0, 0, 0.1)) drop-shadow(0 8px 8px rgba(0, 0, 0, 0.15));
}
</style>
