# Hệ thống giỏ hàng D'House Fruit

## Tổng quan
Hệ thống giỏ hàng hoàn chỉnh cho website D'House Fruit với khả năng quản lý sản phẩm hoa quả và giỏ quà tặng.

## Cấu trúc hệ thống

### 1. Composable useCart (`/composables/useCart.js`)
Quản lý state và logic của giỏ hàng:

```javascript
const {
  // State
  cartItems,
  isLoading,
  
  // Computed
  cartItemsCount,
  cartTotal,
  cartItemsWithDetails,
  isEmpty,
  
  // Actions
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getItemQuantity,
  isInCart,
  
  // Utilities
  formatPrice,
  getShippingCost,
  getFinalTotal
} = useCart()
```

### 2. Trang giỏ hàng (`/pages/cart.vue`)
- Layout responsive 2-column
- Danh sách sản phẩm với controls
- Tóm tắt đơn hàng
- Miễn phí vận chuyển từ 500k

### 3. Tích hợp Header
- Icon giỏ hàng với badge counter
- Link đến trang cart
- Hiển thị số lượng items

### 4. Tích hợp sản phẩm
- Nút "Thêm vào giỏ" trên ProductCard
- Nút "Thêm vào giỏ" trên GiftBasketCard
- Nút "Thêm vào giỏ" và "Mua ngay" trên trang chi tiết

## Cách sử dụng

### Thêm sản phẩm vào giỏ hàng
```javascript
// Thêm sản phẩm hoa quả
addToCart({
  id: productId,
  type: 'product',
  quantity: 1
})

// Thêm giỏ quà tặng
addToCart({
  id: giftBasketId,
  type: 'giftBasket',
  quantity: 1
})
```

### Cập nhật số lượng
```javascript
updateQuantity(itemId, itemType, newQuantity)
```

### Xóa sản phẩm
```javascript
removeFromCart(itemId, itemType)
```

### Xóa toàn bộ giỏ hàng
```javascript
clearCart()
```

## Tính năng chính

### ✅ Persistent Storage
- Tự động lưu vào localStorage
- Giữ giỏ hàng qua các session

### ✅ Stock Validation
- Kiểm tra tồn kho trước khi thêm
- Disable buttons khi hết hàng

### ✅ Price Calculation
- Tính toán chính xác với sale price
- Phí vận chuyển và miễn phí

### ✅ Responsive Design
- Mobile-friendly
- Sticky sidebar trên desktop

### ✅ Error Handling
- Xử lý hình ảnh lỗi
- Validation input
- Graceful fallbacks

### ✅ UX Enhancements
- Success notifications
- Loading states
- Empty state design

## Testing

### Test cơ bản
1. Thêm sản phẩm vào giỏ hàng từ trang chủ
2. Thêm giỏ quà tặng từ trang gift-baskets
3. Kiểm tra counter trên header
4. Vào trang cart kiểm tra sản phẩm
5. Cập nhật số lượng
6. Xóa sản phẩm
7. Refresh trang kiểm tra persistence

### Test edge cases
1. Thêm sản phẩm hết hàng
2. Cập nhật số lượng = 0
3. Xóa toàn bộ giỏ hàng
4. Test trên mobile
5. Test với localStorage disabled

## API Integration (Future)
Hệ thống đã sẵn sàng cho việc tích hợp API:

```javascript
// Trong useCart.js, thay thế:
const itemData = item.type === 'product' 
  ? getProductById(item.id) 
  : getGiftBasketById(item.id)

// Bằng API calls:
const itemData = await fetchItemById(item.id, item.type)
```

## Payment Integration (Future)
Trang cart đã có placeholder cho checkout:

```javascript
const proceedToCheckout = () => {
  // TODO: Implement payment gateway
  // - Validate cart items
  // - Calculate final total
  // - Redirect to payment page
}
```

## Performance Notes
- Sử dụng computed properties cho reactive calculations
- localStorage operations chỉ chạy trên client
- Lazy loading cho hình ảnh sản phẩm
- Debounced search trong filter

## Browser Support
- Modern browsers (ES6+)
- Mobile browsers
- CSS Grid và Flexbox support
- LocalStorage support required
