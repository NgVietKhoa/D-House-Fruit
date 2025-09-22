<template>
  <Transition
    enter-active-class="transform ease-out duration-500 transition-all"
    enter-from-class="translate-y-4 opacity-0 scale-90 sm:translate-y-0 sm:translate-x-6 sm:scale-90 rotate-1"
    enter-to-class="translate-y-0 opacity-100 scale-100 sm:translate-x-0 sm:scale-100 rotate-0 animate-bounce-gentle"
    leave-active-class="transition-all ease-in duration-300"
    leave-from-class="opacity-100 scale-100 rotate-0"
    leave-to-class="opacity-0 scale-90 translate-y-2 sm:translate-x-4 rotate-1"
  >
    <div
      v-if="visible"
      class="toast-container"
      :class="toastClasses"
      @touchstart.passive="true"
    >
      <div class="toast-content">
        <div class="toast-layout">
          <!-- Icon -->
          <div class="toast-icon-wrapper">
            <div class="toast-icon-bg" :class="iconBgClasses">
              <component 
                :is="iconComponent" 
                class="toast-icon" 
                :class="iconClasses"
              />
            </div>
          </div>
          
          <!-- Content -->
          <div class="toast-text">
            <p class="toast-message">
              {{ toast.message }}
            </p>
            <div v-if="toast.description" class="toast-description">
              {{ toast.description }}
            </div>
          </div>
          
          <!-- Close Button -->
          <div v-if="toast.closable" class="toast-close-wrapper">
            <button
              @click="$emit('close')"
              @touchstart.passive="true"
              class="toast-close-btn"
              aria-label="Đóng thông báo"
            >
              <XMarkIcon class="toast-close-icon" />
            </button>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div 
          v-if="showProgress" 
          class="toast-progress-container"
        >
          <div 
            class="toast-progress-bar"
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
  const baseClasses = 'border-l-4 relative overflow-hidden toast-glow'
  const typeClasses = {
    success: 'border-green-500 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 shadow-green-500/30 ring-2 ring-green-300/40 toast-success-glow',
    error: 'border-red-500 bg-gradient-to-br from-red-50 via-rose-50 to-red-100 shadow-red-500/30 ring-2 ring-red-300/40 toast-error-glow animate-pulse-gentle',
    warning: 'border-yellow-500 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 shadow-yellow-500/30 ring-2 ring-yellow-300/40 toast-warning-glow',
    info: 'border-blue-500 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 shadow-blue-500/30 ring-2 ring-blue-300/40 toast-info-glow'
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
    success: 'bg-gradient-to-br from-green-100 to-emerald-200 shadow-2xl shadow-green-500/40 ring-3 ring-green-300/60 icon-glow-success',
    error: 'bg-gradient-to-br from-red-100 to-rose-200 shadow-2xl shadow-red-500/40 ring-3 ring-red-300/60 icon-glow-error animate-pulse-icon',
    warning: 'bg-gradient-to-br from-yellow-100 to-amber-200 shadow-2xl shadow-yellow-500/40 ring-3 ring-yellow-300/60 icon-glow-warning',
    info: 'bg-gradient-to-br from-blue-100 to-sky-200 shadow-2xl shadow-blue-500/40 ring-3 ring-blue-300/60 icon-glow-info'
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
/* Toast Container - Mobile First Design */
.toast-container {
  /* Highest z-index priority */
  z-index: 99999 !important;
  position: relative;
  
  /* Mobile: Compact size, full width with margins */
  width: calc(100vw - 2rem);
  max-width: 100%;
  margin: 0 1rem;
  
  /* Base styling */
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  pointer-events: auto;
  overflow: hidden;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  
  /* Enhanced mobile shadows - moderate */
  box-shadow: 
    0 8px 15px -3px rgba(0, 0, 0, 0.12),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 0 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  
  /* Touch optimization */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  /* Smooth transitions with spring */
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Transform GPU acceleration */
  transform: translateZ(0);
  will-change: transform, opacity;
}

/* Desktop: Larger size, positioned */
@media (min-width: 640px) {
  .toast-container {
    width: 26rem;
    max-width: 26rem;
    margin: 0;
    border-radius: 1.25rem;
    
    /* Enhanced desktop shadows - balanced */
    box-shadow: 
      0 12px 20px -5px rgba(0, 0, 0, 0.15),
      0 8px 12px -3px rgba(0, 0, 0, 0.08),
      0 4px 6px -2px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 15px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.08)) 
            drop-shadow(0 3px 6px rgba(0, 0, 0, 0.06));
  }
  
  .toast-container:hover {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 
      0 16px 25px -5px rgba(0, 0, 0, 0.18),
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 6px 8px -2px rgba(0, 0, 0, 0.06),
      0 0 0 1px rgba(255, 255, 255, 0.15),
      0 0 20px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
}

/* Toast Content */
.toast-content {
  /* Mobile: Compact padding */
  padding: 0.875rem;
}

@media (min-width: 640px) {
  .toast-content {
    padding: 1rem;
  }
}

/* Toast Layout */
.toast-layout {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

/* Icon Wrapper */
.toast-icon-wrapper {
  flex-shrink: 0;
}

.toast-icon-bg {
  /* Mobile: Smaller icon background */
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (min-width: 640px) {
  .toast-icon-bg {
    width: 2.5rem;
    height: 2.5rem;
    box-shadow: 0 8px 10px -3px rgba(0, 0, 0, 0.1);
  }
}

.toast-icon {
  /* Mobile: Smaller icon */
  width: 1rem;
  height: 1rem;
}

@media (min-width: 640px) {
  .toast-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

/* Text Content */
.toast-text {
  flex: 1;
  min-width: 0;
  padding-top: 0.125rem;
}

.toast-message {
  /* Mobile: Slightly smaller text */
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.25;
  margin: 0;
}

@media (min-width: 640px) {
  .toast-message {
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.toast-description {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.3;
}

@media (min-width: 640px) {
  .toast-description {
    font-size: 0.875rem;
    margin-top: 0.375rem;
  }
}

/* Close Button */
.toast-close-wrapper {
  flex-shrink: 0;
  display: flex;
  margin-left: 0.5rem;
}

.toast-close-btn {
  /* Mobile: Touch-friendly 44px minimum */
  min-width: 2.75rem;
  min-height: 2.75rem;
  width: 2.75rem;
  height: 2.75rem;
  
  background: white;
  border: none;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  cursor: pointer;
  
  transition: all 0.15s ease-in-out;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  /* Focus styles */
  outline: none;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
}

.toast-close-btn:hover {
  color: #6b7280;
  background: #f9fafb;
}

.toast-close-btn:focus {
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.5);
}

.toast-close-btn:active {
  transform: scale(0.95);
  background: #f3f4f6;
}

@media (min-width: 640px) {
  .toast-close-btn {
    min-width: 2rem;
    min-height: 2rem;
    width: 2rem;
    height: 2rem;
  }
}

.toast-close-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .toast-close-icon {
    width: 1rem;
    height: 1rem;
  }
}

/* Progress Bar */
.toast-progress-container {
  margin-top: 0.75rem;
  width: 100%;
  height: 0.25rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

@media (min-width: 640px) {
  .toast-progress-container {
    height: 0.375rem;
  }
}

.toast-progress-bar {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.1s ease-linear;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Mobile-specific optimizations */
@media (max-width: 639px) {
  .toast-container {
    /* Ensure no horizontal overflow */
    max-width: calc(100vw - 2rem) !important;
    box-sizing: border-box;
  }
  
  /* Disable hover effects on mobile */
  .toast-container:hover {
    transform: none;
  }
  
  /* Better touch feedback */
  .toast-container:active {
    transform: scale(0.98);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .toast-container,
  .toast-close-btn,
  .toast-progress-bar {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
  
  .animate-bounce-gentle,
  .animate-pulse-gentle,
  .animate-pulse-icon {
    animation: none !important;
  }
  
  .toast-container:hover {
    transform: none !important;
  }
}

/* Force highest z-index globally */
.toast-container {
  z-index: 99999 !important;
  position: relative !important;
}

/* Ensure toast appears above everything */
.toast-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
}

/* Toast Glow Effects - Moderate */
.toast-success-glow {
  box-shadow: 
    0 0 0 1px rgba(34, 197, 94, 0.1),
    0 0 8px rgba(34, 197, 94, 0.12),
    0 0 16px rgba(34, 197, 94, 0.08),
    0 8px 15px -3px rgba(0, 0, 0, 0.12);
}

.toast-error-glow {
  box-shadow: 
    0 0 0 1px rgba(239, 68, 68, 0.1),
    0 0 8px rgba(239, 68, 68, 0.15),
    0 0 16px rgba(239, 68, 68, 0.1),
    0 8px 15px -3px rgba(0, 0, 0, 0.12);
}

.toast-warning-glow {
  box-shadow: 
    0 0 0 1px rgba(245, 158, 11, 0.1),
    0 0 8px rgba(245, 158, 11, 0.12),
    0 0 16px rgba(245, 158, 11, 0.08),
    0 8px 15px -3px rgba(0, 0, 0, 0.12);
}

.toast-info-glow {
  box-shadow: 
    0 0 0 1px rgba(59, 130, 246, 0.1),
    0 0 8px rgba(59, 130, 246, 0.12),
    0 0 16px rgba(59, 130, 246, 0.08),
    0 8px 15px -3px rgba(0, 0, 0, 0.12);
}

/* Icon Glow Effects - Subtle */
.icon-glow-success {
  box-shadow: 
    0 0 0 3px rgba(34, 197, 94, 0.15),
    0 0 8px rgba(34, 197, 94, 0.2),
    0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.icon-glow-error {
  box-shadow: 
    0 0 0 3px rgba(239, 68, 68, 0.15),
    0 0 8px rgba(239, 68, 68, 0.25),
    0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.icon-glow-warning {
  box-shadow: 
    0 0 0 3px rgba(245, 158, 11, 0.15),
    0 0 8px rgba(245, 158, 11, 0.2),
    0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.icon-glow-info {
  box-shadow: 
    0 0 0 3px rgba(59, 130, 246, 0.15),
    0 0 8px rgba(59, 130, 246, 0.2),
    0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Custom Animations */
@keyframes bounce-gentle {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

@keyframes pulse-gentle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.02);
  }
}

@keyframes pulse-icon {
  0%, 100% {
    transform: scale(1);
    box-shadow: 
      0 0 0 3px rgba(239, 68, 68, 0.15),
      0 0 8px rgba(239, 68, 68, 0.25);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 
      0 0 0 4px rgba(239, 68, 68, 0.2),
      0 0 12px rgba(239, 68, 68, 0.3);
  }
}

.animate-bounce-gentle {
  animation: bounce-gentle 1s ease-in-out;
}

.animate-pulse-gentle {
  animation: pulse-gentle 2s ease-in-out infinite;
}

.animate-pulse-icon {
  animation: pulse-icon 1.5s ease-in-out infinite;
}
</style>
