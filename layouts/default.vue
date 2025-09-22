<template>
  <div class="min-h-screen bg-cream overflow-x-hidden max-w-full">
    <Header />
    <main class="w-full overflow-x-hidden">
      <slot />
    </main>
    <Footer />
    
    <!-- Support Buttons Component -->
    <SupportButtons />
    
    <!-- Toast Container -->
    <ToastContainer />
  </div>
</template>

<script setup>
// Layout for the entire application
</script>
