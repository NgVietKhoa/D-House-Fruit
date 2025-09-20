<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-poppins">
          Sản phẩm nổi bật
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Những loại hoa quả nhập khẩu cao cấp được yêu thích nhất, 
          tươi ngon và chất lượng từ các vùng đất nổi tiếng thế giới
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <NuxtLink to="/fruits" class="btn-primary">
          Xem tất cả sản phẩm
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Use products composable
const { getFeaturedProducts } = useProducts()

// Get featured products
const featuredProducts = computed(() => getFeaturedProducts(6))
</script>
