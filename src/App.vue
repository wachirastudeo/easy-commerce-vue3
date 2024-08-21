<script setup>
import {  RouterView } from 'vue-router'
import { useCartStore } from '@/stores/user/cart';
import { onMounted } from 'vue';
const cartStore = useCartStore();

onMounted(()=>{
  cartStore.loadCart()
})
</script>

<template>
  
  <RouterView />
</template>

