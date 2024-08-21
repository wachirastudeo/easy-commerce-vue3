<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { ref, onMounted, computed,watch } from "vue";
import { useRoute,useRouter } from "vue-router";
import { useProductStore } from '@/stores/user/product';
import Product from "@/components/Product.vue";
import { useCartStore } from '@/stores/user/cart';

const route = useRoute();
const router = useRouter()

const productStore = useProductStore();
const searchText = ref('');
const cartStore = useCartStore();

const addToCart = (product) => {
  cartStore.addTocart(product); 
  router.push({name:'cart'})

};

watch(()=> route.query.q ,(newSearchText)=>{
  searchText.value = route.query.q;
},{immediate:true})

const filterProducts =  computed(()=>{
  return productStore.filterProduct(searchText.value)
})
</script>

<template>
  <UserLayout>
    <div class="text-3lx">
      Search: <b>{{ searchText }}</b>
    </div>
    <Product :products="filterProducts" :addToCart="addToCart"></Product>
  </UserLayout>
</template>
