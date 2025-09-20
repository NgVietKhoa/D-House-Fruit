<template>
  <Teleport to="body">
    <div
      v-if="displayedToasts.length > 0"
      class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-[9999]"
      style="top: 80px;"
      :class="containerClasses"
    >
      <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
        <TransitionGroup
          enter-active-class="transform ease-out duration-500 transition-all"
          enter-from-class="translate-y-4 opacity-0 scale-95 sm:translate-y-0 sm:translate-x-4 sm:scale-90"
          enter-to-class="translate-y-0 opacity-100 scale-100 sm:translate-x-0 sm:scale-100"
          leave-active-class="transition-all ease-in duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95 translate-y-2"
          move-class="transition-all duration-300 ease-out"
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
/* Ensure proper z-index and positioning */
.toast-container {
  z-index: 9999;
}

/* Custom scrollbar for overflow */
.toast-list::-webkit-scrollbar {
  width: 4px;
}

.toast-list::-webkit-scrollbar-track {
  background: transparent;
}

.toast-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}
</style>
