<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[500px] lg:min-h-[580px] flex flex-col">
    <!-- Header -->
    <div class="bg-primary-green text-white p-4 flex items-center">
      <Bars3Icon class="w-5 h-5 mr-3" />
      <span class="font-semibold">Tất cả danh mục</span>
      <ChevronDownIcon class="w-4 h-4 ml-auto" />
    </div>

    <!-- Categories List -->
    <div class="divide-y divide-gray-100 flex-1">
      <div v-for="category in categories" :key="category.id" 
           class="group relative">
        <NuxtLink :to="category.link" 
                  class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
          <span class="text-gray-700 group-hover:text-primary-green transition-colors font-medium">
            {{ category.name }}
          </span>
          <ChevronRightIcon class="w-4 h-4 text-gray-400 group-hover:text-primary-green transition-colors" />
        </NuxtLink>

        <!-- Subcategories (shown on hover) -->
        <div v-if="category.subcategories" 
             class="absolute left-full top-0 w-64 bg-white shadow-lg border border-gray-200 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ml-2">
          <div class="p-2">
            <div class="text-sm font-semibold text-gray-800 p-2 border-b border-gray-100 mb-2">
              {{ category.name }}
            </div>
            <div v-for="sub in category.subcategories" :key="sub.id"
                 class="block p-2 text-sm text-gray-600 hover:text-primary-green hover:bg-gray-50 rounded transition-colors">
              {{ sub.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Special Offers -->
    <div class="p-4 bg-gradient-to-r from-green-50 to-green-100 border-t border-gray-100">
      <div class="text-center">
        <h4 class="font-semibold text-gray-800 mb-1">Ưu đãi hoa quả</h4>
        <p class="text-xs text-gray-600 mb-3">Giảm giá đến 30% hoa quả nhập khẩu</p>
        <NuxtLink to="/fruits" class="text-xs bg-primary-green text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors">
          Xem ngay
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bars3Icon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

// Categories data - focused on fruits and gift baskets only
const categories = [
  {
    id: 1,
    name: 'Sản phẩm bán chạy',
    link: '/best-sellers',
    subcategories: [
      { id: 11, name: 'Hoa quả nhập khẩu cao cấp' },
      { id: 12, name: 'Giỏ quà tặng' },
      { id: 13, name: 'Hoa quả theo mùa' }
    ]
  },
  {
    id: 2,
    name: 'Hoa quả nhập khẩu',
    link: '/fruits',
    subcategories: [
      { id: 21, name: 'Hoa quả Nhật Bản' },
      { id: 22, name: 'Hoa quả Mỹ' },
      { id: 23, name: 'Hoa quả New Zealand' },
      { id: 24, name: 'Hoa quả Úc' },
      { id: 25, name: 'Hoa quả Hàn Quốc' },
      { id: 26, name: 'Hoa quả Thái Lan' }
    ]
  },
  {
    id: 3,
    name: 'Giỏ quà tặng',
    link: '/giftBaskets',
    subcategories: [
      { id: 31, name: 'Giỏ quà Premium' },
      { id: 32, name: 'Giỏ quà Standard' },
      { id: 33, name: 'Giỏ quà Basic' },
      { id: 34, name: 'Giỏ quà Doanh nghiệp' },
      { id: 35, name: 'Giỏ quà theo dịp' }
    ]
  },
  {
    id: 4,
    name: 'Hoa quả theo loại',
    link: '/fruits',
    subcategories: [
      { id: 41, name: 'Táo & Lê' },
      { id: 42, name: 'Cam & Chanh' },
      { id: 43, name: 'Nho & Cherry' },
      { id: 44, name: 'Dâu tây & Berry' },
      { id: 45, name: 'Xoài & Kiwi' },
      { id: 46, name: 'Hoa quả exotic' }
    ]
  },
  {
    id: 5,
    name: 'Hoa quả theo mùa',
    link: '/seasonal',
    subcategories: [
      { id: 51, name: 'Hoa quả mùa xuân' },
      { id: 52, name: 'Hoa quả mùa hè' },
      { id: 53, name: 'Hoa quả mùa thu' },
      { id: 54, name: 'Hoa quả mùa đông' }
    ]
  },
  {
    id: 6,
    name: 'Hoa quả theo dịp',
    link: '/occasions',
    subcategories: [
      { id: 61, name: 'Hoa quả Tết' },
      { id: 62, name: 'Hoa quả sinh nhật' },
      { id: 63, name: 'Hoa quả thăm hỏi' },
      { id: 64, name: 'Hoa quả khai trương' }
    ]
  }
]
</script>

<style scoped>
/* Ensure proper z-index for dropdown */
.group:hover .absolute {
  z-index: 50;
}
</style>
