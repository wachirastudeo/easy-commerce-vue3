<script setup>
import {defineProps} from 'vue'
defineProps({
  products: Array,
  addToCart: Function
})
</script>

<template>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-2">
      <div v-for="product in products" :key="product.name" class="card bg-base-100 w-full shadow-xl">
        <figure>
          <img :src="product.imageUrl" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ product.name }}</h2>
          <p>{{ product.about }}</p>
          <div class="card-actions justify-end" >
            <button @click="addToCart(product)" class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
</template>