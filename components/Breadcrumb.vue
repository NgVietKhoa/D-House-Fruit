<template>
  <nav class="mb-8" aria-label="Breadcrumb">
    <ol class="flex items-center justify-center space-x-2 text-sm" :class="textColor">
      <li v-for="(item, index) in breadcrumbItems" :key="index" class="flex items-center">
        <!-- Home or Link Item -->
        <NuxtLink 
          v-if="item.href" 
          :to="item.href" 
          class="transition-colors"
          :class="linkHoverColor"
        >
          {{ item.text }}
        </NuxtLink>
        
        <!-- Current Page (no link) -->
        <span v-else class="font-medium" :class="currentColor">
          {{ item.text }}
        </span>
        
        <!-- Separator (not for last item) -->
        <span v-if="index < breadcrumbItems.length - 1" class="mx-2 text-current opacity-60">
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    // Format: [{ text: 'Trang chủ', href: '/' }, { text: 'Hoa quả nhập khẩu' }]
  },
  theme: {
    type: String,
    default: 'light', // 'light', 'green', 'orange'
  }
})

// Computed styles based on theme
const textColor = computed(() => {
  switch (props.theme) {
    case 'green':
      return 'text-green-100'
    case 'orange':
      return 'text-orange-100'
    default:
      return 'text-gray-600'
  }
})

const linkHoverColor = computed(() => {
  switch (props.theme) {
    case 'green':
      return 'hover:text-white'
    case 'orange':
      return 'hover:text-white'
    default:
      return 'hover:text-gray-800'
  }
})

const currentColor = computed(() => {
  switch (props.theme) {
    case 'green':
      return 'text-white'
    case 'orange':
      return 'text-white'
    default:
      return 'text-gray-800'
  }
})

// Process breadcrumb items
const breadcrumbItems = computed(() => {
  return props.items.map((item, index) => ({
    ...item,
    // Last item should not have href (current page)
    href: index === props.items.length - 1 ? null : item.href
  }))
})
</script>
