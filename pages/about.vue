<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-green via-green-600 to-green-700 text-white overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div class="absolute top-32 right-20 w-20 h-20 bg-white rounded-full"></div>
        <div class="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        <div class="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
      </div>
      
      <div class="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl lg:text-7xl font-bold mb-6 font-poppins leading-tight">
              Hương vị <span class="text-primary-orange">thế giới</span><br>
              trong tầm tay
            </h1>
            <p class="text-xl lg:text-2xl text-green-100 mb-8 leading-relaxed">
              Chúng tôi mang đến những trái cây cao cấp nhất từ khắp thế giới, 
              được tuyển chọn kỹ lưỡng để trao gửi tình yêu thương đến mọi gia đình Việt.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NuxtLink to="/fruits" class="bg-primary-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Khám phá sản phẩm
              </NuxtLink>
              <NuxtLink to="/giftBaskets" class="bg-white text-primary-green hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Giỏ quà tặng
              </NuxtLink>
            </div>
          </div>
          <div class="relative">
            <div class="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div class="grid grid-cols-2 gap-6">
                <div class="text-center">
                  <div class="text-4xl font-bold mb-2">5+</div>
                  <div class="text-green-100">Năm kinh nghiệm</div>
                </div>
                <div class="text-center">
                  <div class="text-4xl font-bold mb-2">15+</div>
                  <div class="text-green-100">Quốc gia</div>
                </div>
                <div class="text-center">
                  <div class="text-4xl font-bold mb-2">10K+</div>
                  <div class="text-green-100">Khách hàng</div>
                </div>
                <div class="text-center">
                  <div class="text-4xl font-bold mb-2">50+</div>
                  <div class="text-green-100">Loại trái cây</div>
                </div>
              </div>
            </div>
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 w-20 h-20 bg-primary-orange rounded-full flex items-center justify-center animate-bounce z-20">
              <HeartIcon class="w-10 h-10 text-white" />
            </div>
            <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center animate-pulse z-20">
              <StarIcon class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-20 bg-gradient-to-br from-cream to-light-cream">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 font-poppins">
            Tại sao chọn <span class="text-primary-green">D'House Fruit</span>?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi không chỉ bán trái cây, mà còn mang đến trải nghiệm cao cấp và giá trị thực sự cho khách hàng
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-4 font-poppins">Chất lượng đảm bảo</h3>
            <p class="text-gray-600 leading-relaxed">
              100% trái cây nhập khẩu chính hãng, có chứng nhận chất lượng quốc tế
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-orange to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <TruckIcon class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-4 font-poppins">Giao hàng tận nơi</h3>
            <p class="text-gray-600 leading-relaxed">
              Giao hàng nhanh chóng trong 2-4 giờ tại TP.HCM, đảm bảo độ tươi ngon
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <PhoneIcon class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-4 font-poppins">Hỗ trợ 24/7</h3>
            <p class="text-gray-600 leading-relaxed">
              Đội ngũ tư vấn chuyên nghiệp, sẵn sàng hỗ trợ mọi lúc mọi nơi
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-orange to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <StarIcon class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-4 font-poppins">Trải nghiệm cao cấp</h3>
            <p class="text-gray-600 leading-relaxed">
              Đóng gói sang trọng, phù hợp làm quà tặng cho người thân yêu
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quality Process Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 font-poppins">
            Quy trình <span class="text-primary-orange">chọn lọc chất lượng</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Mỗi trái cây đến tay bạn đều trải qua 4 bước kiểm tra nghiêm ngặt để đảm bảo chất lượng hoàn hảo
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Step 1: Source Selection -->
          <div class="relative group">
            <div class="bg-white border-l-4 border-primary-green rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-green rounded-full flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xl">1</span>
              </div>
              <div class="mt-8 mb-6">
                <div class="w-20 h-20 bg-green-50 border-2 border-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon class="w-10 h-10 text-primary-green" />
                </div>
                <h3 class="text-xl font-bold mb-4 text-gray-800">Chọn nguồn gốc</h3>
                <p class="text-gray-600 leading-relaxed">
                  Tuyển chọn các vườn trái cây uy tín nhất từ 15+ quốc gia, 
                  đảm bảo điều kiện khí hậu và đất đai lý tưởng.
                </p>
              </div>
              <div class="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                <span>🇺🇸</span>
                <span>🇯🇵</span>
                <span>🇦🇺</span>
                <span>🇳🇿</span>
                <span>🇰🇷</span>
              </div>
            </div>
          </div>

          <!-- Step 2: Quality Check -->
          <div class="relative group">
            <div class="bg-white border-l-4 border-primary-orange rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xl">2</span>
              </div>
              <div class="mt-8 mb-6">
                <div class="w-20 h-20 bg-orange-50 border-2 border-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon class="w-10 h-10 text-primary-orange" />
                </div>
                <h3 class="text-xl font-bold mb-4 text-gray-800">Kiểm tra chất lượng</h3>
                <p class="text-gray-600 leading-relaxed">
                  Từng trái cây được kiểm tra kỹ lưỡng về kích thước, 
                  màu sắc, độ chín và không có khuyết tật.
                </p>
              </div>
              <div class="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                <span>✓ Kích thước</span>
                <span>✓ Màu sắc</span>
                <span>✓ Độ chín</span>
              </div>
            </div>
          </div>

          <!-- Step 3: Packaging -->
          <div class="relative group">
            <div class="bg-white border-l-4 border-primary-green rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-green rounded-full flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xl">3</span>
              </div>
              <div class="mt-8 mb-6">
                <div class="w-20 h-20 bg-green-50 border-2 border-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <GiftIcon class="w-10 h-10 text-primary-green" />
                </div>
                <h3 class="text-xl font-bold mb-4 text-gray-800">Đóng gói bảo quản</h3>
                <p class="text-gray-600 leading-relaxed">
                  Sử dụng công nghệ đóng gói hiện đại, 
                  duy trì nhiệt độ và độ ẩm tối ưu trong suốt quá trình vận chuyển.
                </p>
              </div>
              <div class="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                <span>Lạnh</span>
                <span>Ẩm độ</span>
                <span>An toàn</span>
              </div>
            </div>
          </div>

          <!-- Step 4: Delivery -->
          <div class="relative group">
            <div class="bg-white border-l-4 border-primary-orange rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xl">4</span>
              </div>
              <div class="mt-8 mb-6">
                <div class="w-20 h-20 bg-orange-50 border-2 border-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <TruckIcon class="w-10 h-10 text-primary-orange" />
                </div>
                <h3 class="text-xl font-bold mb-4 text-gray-800">Giao hàng tận nơi</h3>
                <p class="text-gray-600 leading-relaxed">
                  Giao hàng nhanh chóng trong 2-4 giờ tại TP.HCM, 
                  đảm bảo trái cây đến tay bạn vẫn tươi ngon như vừa hái.
                </p>
              </div>
              <div class="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                <span>Nhanh</span>
                <span>Tươi</span>
                <span>Hoàn hảo</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quality Guarantee -->
        <div class="mt-16 text-center">
          <div class="bg-gray-50 border-2 border-dashed border-primary-green rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 class="text-2xl lg:text-3xl font-bold mb-4 text-gray-800">Cam kết chất lượng 100%</h3>
            <p class="text-lg mb-6 text-gray-600">
              Nếu bạn không hoàn toàn hài lòng với sản phẩm, chúng tôi sẽ hoàn tiền 100% hoặc đổi sản phẩm mới miễn phí
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div class="flex items-center space-x-2 text-primary-green">
                <ShieldCheckIcon class="w-6 h-6" />
                <span class="font-semibold">Bảo hành chất lượng</span>
              </div>
              <div class="flex items-center space-x-2 text-primary-orange">
                <HeartIcon class="w-6 h-6" />
                <span class="font-semibold">Hài lòng 100%</span>
              </div>
              <div class="flex items-center space-x-2 text-primary-green">
                <StarIcon class="w-6 h-6" />
                <span class="font-semibold">Dịch vụ 5 sao</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 font-poppins">
            Khách hàng <span class="text-primary-green">nói gì</span> về chúng tôi
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Hàng nghìn khách hàng đã tin tưởng và lựa chọn D'House Fruit
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-primary-green to-green-600 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h4 class="font-bold text-gray-800">Chị Linh Nguyễn</h4>
                <p class="text-gray-600">Khách hàng VIP</p>
              </div>
            </div>
            <div class="flex mb-4">
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
            </div>
            <p class="text-gray-600 leading-relaxed italic">
              "Cherry Mỹ ở đây tươi ngon không thua gì bên Mỹ. Đóng gói đẹp, 
              giao hàng nhanh. Tôi đã giới thiệu cho nhiều bạn bè rồi!"
            </p>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-primary-orange to-orange-600 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h4 class="font-bold text-gray-800">Anh Minh Trần</h4>
                <p class="text-gray-600">Doanh nhân</p>
              </div>
            </div>
            <div class="flex mb-4">
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
            </div>
            <p class="text-gray-600 leading-relaxed italic">
              "Giỏ quà tặng của D'House rất sang trọng, phù hợp tặng đối tác. 
              Chất lượng trái cây luôn đảm bảo, dịch vụ chuyên nghiệp."
            </p>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-primary-green to-green-600 rounded-full flex items-center justify-center mr-4">
                <span class="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h4 class="font-bold text-gray-800">Chị Hương Lê</h4>
                <p class="text-gray-600">Nội trợ</p>
              </div>
            </div>
            <div class="flex mb-4">
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
              <StarIcon class="w-5 h-5 text-primary-orange fill-current" />
            </div>
            <p class="text-gray-600 leading-relaxed italic">
              "Nho Nhật Bản ở đây ngọt lịm, không hạt. Con tôi rất thích. 
              Giá cả hợp lý, tôi sẽ mua thường xuyên cho gia đình."
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-20 bg-gradient-to-br from-primary-green via-green-600 to-green-700 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-20 w-40 h-40 bg-white rounded-full"></div>
        <div class="absolute bottom-20 right-20 w-32 h-32 bg-primary-orange rounded-full"></div>
        <div class="absolute top-1/2 left-10 w-24 h-24 bg-primary-green rounded-full"></div>
        <div class="absolute bottom-10 left-1/3 w-20 h-20 bg-white rounded-full"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-4xl lg:text-6xl font-bold mb-6 font-poppins leading-tight">
            Sẵn sàng trải nghiệm <br>
            <span class="text-primary-orange">hương vị thế giới</span>?
          </h2>
          <p class="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-8">
            Hãy để D'House Fruit mang đến cho bạn những trái cây cao cấp nhất, 
            tươi ngon nhất từ khắp thế giới. 
            Chỉ cần một cú click, bạn sẽ có ngay những trải nghiệm tuyệt vời!
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <!-- Quick Order -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
            <div class="w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCartIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-4">Mua ngay</h3>
            <p class="text-green-100 mb-6">
              Khám phá và đặt hàng ngay hôm nay
            </p>
            <NuxtLink to="/fruits" class="bg-primary-orange hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block">
              Xem sản phẩm
            </NuxtLink>
          </div>

          <!-- Gift Baskets -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
            <div class="w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <GiftIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-4">Giỏ quà tặng</h3>
            <p class="text-green-100 mb-6">
              Quà tặng ý nghĩa cho người thân
            </p>
            <NuxtLink to="/giftBaskets" class="bg-white hover:bg-gray-100 text-primary-green px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block">
              Chọn giỏ quà
            </NuxtLink>
          </div>

          <!-- Contact -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
            <div class="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-4">Liên hệ tư vấn</h3>
            <p class="text-green-100 mb-6">
              Gọi ngay để được tư vấn miễn phí
            </p>
            <NuxtLink to="/contact" class="bg-white hover:bg-gray-100 text-primary-green px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-block">
              Liên hệ ngay
            </NuxtLink>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="text-center">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 class="text-2xl font-bold mb-6">Liên hệ với chúng tôi</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <PhoneIcon class="w-8 h-8 text-primary-orange mx-auto mb-2" />
                <p class="font-semibold">Hotline</p>
                <p class="text-green-100">1900 1234</p>
              </div>
              <div>
                <EnvelopeIcon class="w-8 h-8 text-primary-orange mx-auto mb-2" />
                <p class="font-semibold">Email</p>
                <p class="text-green-100">info@dhousefruit.vn</p>
              </div>
              <div>
                <MapPinIcon class="w-8 h-8 text-primary-orange mx-auto mb-2" />
                <p class="font-semibold">Địa chỉ</p>
                <p class="text-green-100">123 Nguyễn Huệ, Q1, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final Statistics -->
    <section class="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4 font-poppins">
            D'House Fruit trong số
          </h2>
          <p class="text-gray-300">
            Những con số nói lên thành công của chúng tôi
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="group">
            <div class="text-5xl font-bold mb-2 text-primary-green group-hover:text-primary-orange transition-colors duration-300">5+</div>
            <div class="text-gray-300">Năm kinh nghiệm</div>
          </div>
          <div class="group">
            <div class="text-5xl font-bold mb-2 text-primary-orange group-hover:text-primary-green transition-colors duration-300">10K+</div>
            <div class="text-gray-300">Khách hàng hài lòng</div>
          </div>
          <div class="group">
            <div class="text-5xl font-bold mb-2 text-primary-green group-hover:text-primary-orange transition-colors duration-300">50+</div>
            <div class="text-gray-300">Loại trái cây</div>
          </div>
          <div class="group">
            <div class="text-5xl font-bold mb-2 text-primary-orange group-hover:text-primary-green transition-colors duration-300">15+</div>
            <div class="text-gray-300">Quốc gia nhập khẩu</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  StarIcon, 
  UserIcon, 
  TruckIcon, 
  PhoneIcon,
  ShoppingCartIcon,
  GiftIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Giới thiệu - D\'House Fruit | Hương vị thế giới trong tầm tay',
  meta: [
    { 
      name: 'description', 
      content: 'Khám phá câu chuyện D\'House Fruit - thương hiệu trái cây nhập khẩu cao cấp hàng đầu Việt Nam. 5+ năm kinh nghiệm, 15+ quốc gia, 50+ loại trái cây, phục vụ 10,000+ khách hàng hài lòng.' 
    },
    { name: 'keywords', content: 'D\'House Fruit, trái cây nhập khẩu, hoa quả cao cấp, giỏ quà tặng, cherry Mỹ, nho Nhật Bản' },
    { property: 'og:title', content: 'Giới thiệu D\'House Fruit - Hương vị thế giới trong tầm tay' },
    { property: 'og:description', content: 'Thương hiệu trái cây nhập khẩu cao cấp uy tín với 5+ năm kinh nghiệm, mang đến hương vị tươi ngon từ 15+ quốc gia.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>
