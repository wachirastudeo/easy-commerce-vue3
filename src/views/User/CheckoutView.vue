<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { reactive } from 'vue';
import { useCartStore } from "@/stores/user/cart";
import { RouterLink, useRouter } from 'vue-router'

const formData = [{
  name: 'Name',
  field: 'name'
}, {
  name: 'Email',
  field: 'email'
},
{
  name: 'Address',
  field: 'address'
}, {
  name: 'Note',
  field: 'note'
},
];

const cartStore = useCartStore();

const router = useRouter()

const userFormData = reactive({
  name: '',
  email: '',
  address: '',
  note: ''

});
const payment = () => {
  cartStore.placeorder(userFormData);
  router.push({ name: 'success' });
};
</script>

<template>

  <UserLayout>
    <h1 class="text-2xl font-bold m-4">Check out</h1>
    <div class="flex py-3">
      <section class="flex-auto w-64 bg-base-200">
        <div class="py-2 px-8">
          <div v-for="form in formData" class="form-control w-full">
            <label class="label">
              <span class="label-text pt-2"><b>{{ form.name }}</b></span>
            </label>
            <textarea v-if="form.field === 'address'" class="textarea textarea-bordered h-24" placeholder="Address"
              v-model="userFormData[form.field]"></textarea>
            <input v-else type="text" placeholder="Type here" class="input input-bordered input-sm w-full"
              v-model="userFormData[form.field]" />
          </div>
          <button @click="payment" class="btn btn-neutral my-10 w-full  ">ชำระเงิน </button>
        </div>

      </section>
      <section class="flex-auto w-32 bg-slate-300 ">
        <div v-for="item in cartStore.items" class="flex p-4 bg-white m-8">
          <div class="flex-1 px-4">
            <img :src="item.imageUrl"  alt="">
          </div>
          <div class="flex-1">
            <div class="flex flex-col justify-between h-full">
              <div>
                <div> <b>{{ item.name }}</b></div>
                <div>จำนวน : {{ item.quantity }}</div>
              </div>

              <div > <RouterLink class="btn btn-neutral" :to="{name:'cart'}"> Edit </RouterLink></div>
            </div>
          </div>
          
        </div>
          <div class="p-8">
            <div class="divider"></div>

            <div><b>Order summary</b></div>
            <div class="divider"></div>

            <div class="flex justify-between">
              <div>ราคารวม</div>
              <div>{{ cartStore.summaryPrice }}</div>
            </div>
            <div class="flex justify-between">
              <div>ค่าจัดส่ง</div>
              <div>0</div>
            </div>
            <div class="divider"></div>

            <div class="flex justify-between">
              <div><b> ราคารวมทั้งหมด</b></div>
              <div><b>{{ cartStore.summaryPrice }}</b></div>
            </div>
          </div>
      </section>
      
    </div>
  </UserLayout>
</template>
