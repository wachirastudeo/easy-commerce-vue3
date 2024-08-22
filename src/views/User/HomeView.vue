<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { useProductStore } from '@/stores/user/product'
import ProductList from "@/components/Product.vue";
import { useCartStore } from '@/stores/user/cart';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const productStore = useProductStore();
const cartStore = useCartStore(); 

const router = useRouter()
// Function to handle adding products to cart
const addToCart = (product) => {
  cartStore.addTocart(product); 
  router.push({name:'cart'})

};
onMounted(() => {
  
  productStore.loadProduct()
  console.log(productStore.list);
})
</script>

<template>
  <UserLayout>
    <div class="hero bg-base-200 h-96">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">Hello Easy Shop</p>
        </div>
      </div>
    </div>
    
    <!-- product listing -->
    <ProductList 
    :products="productStore.list" 
    :addToCart="addToCart" />
  </UserLayout>
</template>
