# Hệ thống quản lý dữ liệu D'House Fruit

## Tổng quan

Hệ thống dữ liệu được thiết kế để dễ dàng chuyển đổi từ mock data sang real API. Tất cả dữ liệu được tổ chức trong các file riêng biệt và sử dụng thông qua composables và services.

## Cấu trúc thư mục

```
├── data/
│   └── products.js          # Mock data và API functions
├── composables/
│   └── useProducts.js       # Composable quản lý products
├── services/
│   └── api.js              # API service layer
└── docs/
    └── DATA_STRUCTURE.md   # Documentation này
```

## 1. Data Layer (`/data/products.js`)

### Dữ liệu sản phẩm
```javascript
export const productsData = [
  {
    id: 1,
    name: 'Tên sản phẩm',
    price: '1200000',           // Giá hiện tại (string)
    originalPrice: '1500000',   // Giá gốc (string hoặc null)
    image: '/images/...',       // Đường dẫn hình ảnh
    description: 'Mô tả ngắn',
    badge: 'Bán chạy',         // Badge hiển thị (string hoặc null)
    category: 'Nho',           // Danh mục sản phẩm
    origin: 'Nhật Bản',       // Xuất xứ
    weight: '500g',            // Trọng lượng
    shelf_life: '7-10 ngày',   // Hạn sử dụng
    storage: 'Bảo quản...',    // Hướng dẫn bảo quản
    stock: 25,                 // Số lượng tồn kho
    rating: 4.8,               // Đánh giá (1-5)
    reviews_count: 156,        // Số lượng đánh giá
    nutrition: {               // Thông tin dinh dưỡng
      calories: '62 kcal/100g',
      vitamin_c: '10.8mg',
      fiber: '0.9g',
      sugar: '16.25g'
    },
    detailed_description: '...', // Mô tả chi tiết
    benefits: [                  // Lợi ích sức khỏe
      'Giàu chất chống oxy hóa',
      'Hỗ trợ sức khỏe tim mạch'
    ],
    tags: ['premium', 'nhật-bản'], // Tags cho tìm kiếm
    created_at: '2024-01-15',      // Ngày tạo
    updated_at: '2024-03-20'       // Ngày cập nhật
  }
]
```

### Mock API Functions
```javascript
export const mockAPI = {
  getAllProducts(),           // Lấy tất cả sản phẩm
  getProductById(id),        // Lấy sản phẩm theo ID
  getProductsByCategory(category, limit),
  getFeaturedProducts(limit),
  searchProducts(query, filters),
  getCategories()
}
```

## 2. Composable Layer (`/composables/useProducts.js`)

### Reactive Data
```javascript
const { 
  allProducts,    // ref(productsData)
  categories,     // ref(categoriesData)
  loading,        // ref(false)
  error          // ref(null)
} = useProducts()
```

### Sync Methods (Local Data)
```javascript
const {
  getProductById(id),                    // Tìm sản phẩm theo ID
  getRelatedProducts(id, category, limit), // Sản phẩm liên quan
  getProductsByCategory(category, limit),  // Sản phẩm theo danh mục
  getFeaturedProducts(limit),             // Sản phẩm nổi bật
  searchProducts(query, filters)          // Tìm kiếm sản phẩm
} = useProducts()
```

### Async Methods (API Ready)
```javascript
const {
  fetchAllProducts(),        // Gọi API lấy tất cả sản phẩm
  fetchProductById(id),      // Gọi API lấy sản phẩm theo ID
  fetchProductsByCategory(category, limit),
  fetchFeaturedProducts(limit),
  fetchSearchResults(query, filters),
  fetchCategories()
} = useProducts()
```

### Utility Functions
```javascript
const {
  formatPrice(price),           // Format giá tiền
  getDiscountPercent(current, original), // Tính % giảm giá
  getBadgeColor(badge),         // Màu badge
  isInStock(product),           // Kiểm tra còn hàng
  getStockStatus(product)       // Trạng thái tồn kho
} = useProducts()
```

## 3. Service Layer (`/services/api.js`)

### Products API
```javascript
import { productsAPI } from '~/services/api.js'

// Sử dụng
const products = await productsAPI.getAll()
const product = await productsAPI.getById(1)
const featured = await productsAPI.getFeatured(6)
const results = await productsAPI.search('nho', { category: 'Nho' })
```

### Categories API
```javascript
import { categoriesAPI } from '~/services/api.js'

const categories = await categoriesAPI.getAll()
```

### Cart API (Future)
```javascript
import { cartAPI } from '~/services/api.js'

await cartAPI.addItem(productId, quantity)
await cartAPI.updateItem(itemId, quantity)
await cartAPI.removeItem(itemId)
```

## 4. Cách sử dụng trong Components

### Trong Vue Components
```vue
<template>
  <div>
    <ProductCard 
      v-for="product in products" 
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup>
// Sử dụng sync methods (nhanh, local data)
const { getFeaturedProducts } = useProducts()
const products = computed(() => getFeaturedProducts(6))

// Hoặc sử dụng async methods (chuẩn bị cho API)
const { fetchFeaturedProducts, loading, error } = useProducts()
const products = ref([])

onMounted(async () => {
  try {
    const response = await fetchFeaturedProducts(6)
    products.value = response.data
  } catch (err) {
    console.error('Error:', err)
  }
})
</script>
```

### Tìm kiếm và lọc
```javascript
const { searchProducts } = useProducts()

// Tìm kiếm đơn giản
const results = searchProducts('nho')

// Tìm kiếm với filters
const results = searchProducts('', {
  category: 'Nho',
  origin: 'Nhật Bản',
  minPrice: 500000,
  maxPrice: 2000000,
  sortBy: 'price_asc'
})
```

## 5. Migration sang Real API

### Bước 1: Cập nhật API Service
```javascript
// Trong /services/api.js
const apiClient = createApiClient() // Sử dụng axios hoặc $fetch

export const productsAPI = {
  async getAll(params = {}) {
    // Thay thế mock call
    const response = await apiClient.get('/products', { params })
    return response.data
  }
}
```

### Bước 2: Cập nhật Environment Variables
```bash
# .env
API_BASE_URL=https://api.dhousefruit.com
API_TIMEOUT=10000
```

### Bước 3: Cập nhật Composable (nếu cần)
```javascript
// Trong useProducts.js - không cần thay đổi nhiều
// Chỉ cần đảm bảo async methods sử dụng đúng API service
```

## 6. Best Practices

### Performance
- Sử dụng sync methods cho data có sẵn (nhanh)
- Sử dụng async methods khi cần fresh data từ server
- Cache data khi có thể
- Sử dụng computed properties cho derived data

### Error Handling
```javascript
const { fetchProducts, loading, error } = useProducts()

try {
  await fetchProducts()
} catch (err) {
  // Error đã được handle trong composable
  // Chỉ cần hiển thị UI error
  console.error('Failed to load products:', error.value)
}
```

### Loading States
```vue
<template>
  <div>
    <div v-if="loading" class="loading-spinner">Đang tải...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else>
      <!-- Products content -->
    </div>
  </div>
</template>
```

## 7. Data Validation

### Product Schema
```javascript
const productSchema = {
  id: 'number (required)',
  name: 'string (required)',
  price: 'string (required)',
  originalPrice: 'string|null',
  category: 'string (required)',
  stock: 'number (required)',
  rating: 'number (1-5)',
  // ... other fields
}
```

### Validation Functions
```javascript
export const validateProduct = (product) => {
  const required = ['id', 'name', 'price', 'category']
  const missing = required.filter(field => !product[field])
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`)
  }
  
  return true
}
```

## 8. Testing

### Unit Tests
```javascript
// tests/composables/useProducts.test.js
import { useProducts } from '~/composables/useProducts'

describe('useProducts', () => {
  it('should get product by id', () => {
    const { getProductById } = useProducts()
    const product = getProductById(1)
    expect(product).toBeDefined()
    expect(product.id).toBe(1)
  })
})
```

### Integration Tests
```javascript
// tests/api/products.test.js
import { productsAPI } from '~/services/api'

describe('Products API', () => {
  it('should fetch all products', async () => {
    const response = await productsAPI.getAll()
    expect(response.success).toBe(true)
    expect(Array.isArray(response.data)).toBe(true)
  })
})
```

---

## Kết luận

Hệ thống data này được thiết kế để:
- ✅ Dễ dàng maintain và extend
- ✅ Sẵn sàng cho real API integration
- ✅ Type-safe và có validation
- ✅ Performance tối ưu
- ✅ Error handling tốt
- ✅ Testing friendly

Khi cần chuyển sang real API, chỉ cần thay đổi implementation trong service layer mà không ảnh hưởng đến components.
