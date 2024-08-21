<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { useCartStore } from "@/stores/user/cart";
import { ref, onMounted } from 'vue';

const cartStore = useCartStore();
const orderData = ref({});
onMounted(() => {
  cartStore.loadCheckout();
  console.log(cartStore.checkout);
  if (cartStore.checkout.orderNumber) {
    orderData.value = cartStore.checkout;
  }
});
</script>

<template>

  <UserLayout>
    <div class="card mx-auto max-w-4xl shadow-xl bg-base-100 p-8">
      <div class="card-body">
        <div>
          <div class="font-bold text-2xl">Your order is success</div>
          <div>hi {{ orderData.name }}</div>

        </div>
        <div class="divider"></div>


      
        
        <div class="grid grid-cols-4 gap-2">
          <div>
            <div><b>Order date</b></div>
            <div>{{ orderData.createdAt  }}</div>
          </div>
          <div>
            <div><b>Order numbe</b></div>
            <div>{{ orderData.orderNumber  }}</div>
          </div>
          <div>
            <div><b>Payment medthod</b></div>
            <div>{{ orderData.paymentMethod  }}</div>
          </div>
          <div>
            <div><b>Address</b></div>
            <div>{{ orderData.address  }}</div>
          </div>
        </div>

        <div class="divider"></div>
        <div class="grid grid-cols-4 gap-4 mb-4 items-center" v-for="product in orderData.products">
          <div><img :src="product.imageUrl" alt=""></div>
          <div><b>{{ product.name }}</b></div>
          <div>จำนวน : {{  product.quantity }}</div>
          <div>ราคารวม : {{ product.price * product.quantity }}  บาท</div>
          

        </div>
        <div class="divider"></div>
        <div class="flex justify-between">
            <div><b>ราคาสินค้าทั้งหมด</b></div>
            <div>{{ orderData.totalPrice }} บาท</div>

        </div>
        <div class="flex justify-between">
            <div>ราคาส่ง</div>
            <div>0 บาท</div>

        </div>
        <div class="divider"></div>
        <div class="flex justify-between">
            <div><b>รวมราคาทั้งหมด</b></div>
            <div>{{ orderData.totalPrice }} บาท</div>
        </div>
        <div class="divider"></div>
        <div class="text-center">Thank You</div>
      </div>
    </div>
  </UserLayout>
</template>
