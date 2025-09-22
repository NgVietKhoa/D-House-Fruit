<template>
  <Teleport to="body">
    <div
      v-if="displayedToasts.length > 0"
      class="toast-container-wrapper"
      :class="containerClasses"
    >
      <div class="toast-list-wrapper">
        <TransitionGroup
          enter-active-class="transform ease-out duration-700 transition-all"
          enter-from-class="-translate-y-6 opacity-0 scale-90 sm:translate-y-0 sm:translate-x-8 sm:scale-85 rotate-2"
          enter-to-class="translate-y-0 opacity-100 scale-100 sm:translate-x-0 sm:scale-100 rotate-0"
          leave-active-class="transition-all ease-in duration-400"
          leave-from-class="opacity-100 scale-100 rotate-0"
          leave-to-class="opacity-0 scale-90 -translate-y-4 rotate-1"
          move-class="transition-all duration-500 ease-out"
        >
          <Toast
            v-for="toast in displayedToasts"
            :key="toast.id"
            :toast="toast"
            :show-progress="showProgress"
            @close="removeToast(toast.id)"
            class="pointer-events-auto"
          />
        </TransitionGroup>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '~/composables/useToast'
import Toast from './Toast.vue'

const props = defineProps({
  position: {
    type: String,
    default: 'top-right',
    validator: (value) => [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ].includes(value)
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  maxToasts: {
    type: Number,
    default: 5
  }
})

// Use toast composable
const { toasts, removeToast } = useToast()

// Computed properties
const containerClasses = computed(() => {
  const positionClasses = {
    'top-left': 'sm:items-start sm:justify-start',
    'top-center': 'sm:items-start sm:justify-center',
    'top-right': 'sm:items-start sm:justify-end',
    'bottom-left': 'sm:items-end sm:justify-start',
    'bottom-center': 'sm:items-end sm:justify-center',
    'bottom-right': 'sm:items-end sm:justify-end'
  }
  return positionClasses[props.position] || positionClasses['top-right']
})

// Limit number of toasts displayed
const displayedToasts = computed(() => {
  return toasts.value.slice(-props.maxToasts)
})

// Watch for toast overflow and remove oldest
watch(() => toasts.value.length, (newLength) => {
  if (newLength > props.maxToasts) {
    const toastsToRemove = newLength - props.maxToasts
    for (let i = 0; i < toastsToRemove; i++) {
      removeToast(toasts.value[i].id)
    }
  }
})
</script>

<style scoped>
/* Toast Container Wrapper - Highest Priority Z-Index */
.toast-container-wrapper {
  /* HIGHEST z-index - above everything */
  z-index: 99999 !important;
  position: fixed !important;
  
  /* Mobile: Top positioning with safe area */
  top: 1rem;
  left: 0;
  right: 0;
  
  /* Pointer events */
  pointer-events: none;
  
  /* Ensure no overflow */
  max-width: 100vw;
  overflow: visible;
  
  /* Mobile: Center alignment */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
  /* Padding for mobile */
  padding: 0 1rem;
  
  /* Enhanced backdrop for better visibility */
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
}

/* Desktop positioning */
@media (min-width: 640px) {
  .toast-container-wrapper {
    top: 1.5rem;
    right: 1.5rem;
    left: auto;
    width: auto;
    max-width: 30rem;
    padding: 0;
    justify-content: flex-end;
    align-items: flex-start;
    overflow: visible;
  }
}

/* Toast List Wrapper */
.toast-list-wrapper {
  width: 100%;
  max-width: 100%;
  
  /* Mobile: Center alignment */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  /* Ensure proper stacking */
  position: relative;
  z-index: 1;
  
  /* Enhanced visual separation - subtle */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
}

/* Desktop: Right alignment */
@media (min-width: 640px) {
  .toast-list-wrapper {
    align-items: flex-end;
    gap: 1.25rem;
    max-width: 26rem;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }
}

/* Position-specific classes */
.toast-container-wrapper.sm\:items-start.sm\:justify-start {
  /* Top-left */
  @media (min-width: 640px) {
    left: 1.5rem;
    right: auto;
    justify-content: flex-start;
  }
}

.toast-container-wrapper.sm\:items-start.sm\:justify-start .toast-list-wrapper {
  @media (min-width: 640px) {
    align-items: flex-start;
  }
}

.toast-container-wrapper.sm\:items-start.sm\:justify-center {
  /* Top-center */
  @media (min-width: 640px) {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    justify-content: center;
  }
}

.toast-container-wrapper.sm\:items-start.sm\:justify-center .toast-list-wrapper {
  @media (min-width: 640px) {
    align-items: center;
  }
}

.toast-container-wrapper.sm\:items-end.sm\:justify-start {
  /* Bottom-left */
  @media (min-width: 640px) {
    top: auto;
    bottom: 1.5rem;
    left: 1.5rem;
    right: auto;
    justify-content: flex-start;
    align-items: flex-end;
  }
}

.toast-container-wrapper.sm\:items-end.sm\:justify-start .toast-list-wrapper {
  @media (min-width: 640px) {
    align-items: flex-start;
  }
}

.toast-container-wrapper.sm\:items-end.sm\:justify-center {
  /* Bottom-center */
  @media (min-width: 640px) {
    top: auto;
    bottom: 1.5rem;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    justify-content: center;
    align-items: flex-end;
  }
}

.toast-container-wrapper.sm\:items-end.sm\:justify-center .toast-list-wrapper {
  @media (min-width: 640px) {
    align-items: center;
  }
}

.toast-container-wrapper.sm\:items-end.sm\:justify-end {
  /* Bottom-right */
  @media (min-width: 640px) {
    top: auto;
    bottom: 1.5rem;
    align-items: flex-end;
  }
}

/* Force highest z-index globally */
.toast-container-wrapper,
.toast-container-wrapper * {
  z-index: 99999 !important;
}

/* Ensure toast container is above modals, dropdowns, etc */
.toast-container-wrapper::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
}

/* Mobile-specific optimizations */
@media (max-width: 639px) {
  .toast-container-wrapper {
    /* Ensure no horizontal overflow on mobile */
    max-width: 100vw !important;
    box-sizing: border-box;
    
    /* Safe area support for notched devices */
    top: max(1rem, env(safe-area-inset-top));
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
  
  .toast-list-wrapper {
    width: 100%;
    max-width: 100%;
  }
}

/* Animation performance optimization */
.toast-container-wrapper {
  will-change: auto;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .toast-container-wrapper,
  .toast-list-wrapper {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
</style>
