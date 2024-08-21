<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import Close from "@/components/icons/Close.vue";
import { useCartStore } from "@/stores/user/cart";
import { RouterLink } from "vue-router";
const cartStore = useCartStore();

const changeQuantity = (event, index) => {
  cartStore.updateQuantity(index, event.target.value);
};
</script>

<template>
  <UserLayout>
    <h1 class="text-2xl font-bold m-4">Shopping Cart</h1>

      <div class="flex my-4">
        <div class="flex-auto bg-base-200 w-64 p-4 ">
          <div v-if="cartStore.items.length === 0">
            Cart is empty
          </div>
          <div v-else class="flex py-3" v-for="(item, index) in cartStore.items" :key="index">
            <div class="flex-1 w-full px-10">
              <img :src="item.imageUrl" alt="" />
            </div>
            <div class="flex-1">
              <div class="flex relative flex-col justify-between h-full">
                <div class="grid grid-cols-2">
                  <div >
                    <div class="my-3"><b>{{ item.name }}</b></div>
                    <div class="my-3">{{ item.about }}</div>
                    <div class="my-3">ราคา : {{ item.price }} บาท </div>
                  </div>
                  <div>
                    <select  v-model="item.quantity" class="w-1/2 p-4" @change="changeQuantity($event, index)">
                      <option v-for="quantity in [1, 2, 3, 4, 5]" :key="quantity" :value="quantity">
                        {{ quantity }}
                      </option>
                    </select>
                  </div>
                  <div @click="cartStore.removeItemCart(index)" class="absolute top-0 right-0">
                    <Close />
                  </div>
                </div>
                <div><b>In Stock</b></div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-auto bg-base-300 w-32 p-4">
          <div class="text-xl font-bold">Summary</div>
          <div class="m-4 divide-y">
            <div class="flex justify-between p-2">
              <div>ราคาสินค้าทั้งหมด</div>
              <div>{{ cartStore.summaryPrice }}</div>
            </div>
            <div class="flex justify-between p-2">
              <div>ค่าส่ง</div>
              <div>0</div>
            </div>
            <div class="flex justify-between p-2"> 
              <div>รวมราคาสินค้าทั้งหมด</div>
              <div>{{ cartStore.summaryPrice }}</div>
            </div>
            <div class="flex flex-col items-end p-4 ">
                <div >             
                  <RouterLink :to="{ name: 'checkout' }"> <button class="btn btn-neutral w-32  text-md" >ชำระเงิน </button> </RouterLink>
                </div>

            </div>
          </div>
        </div>
      </div>
  </UserLayout>
</template>
