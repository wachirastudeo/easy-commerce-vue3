<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { ref, reactive, onMounted } from 'vue';
const userData = reactive({
  imageUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
  email: '',
  name: ''
})
onMounted(() => {
  const savedUserProfile = localStorage.getItem('user-profile')
  if (savedUserProfile) {
    const userProfile = JSON.parse(savedUserProfile)
    userData.imageUrl = userProfile.imageUrl
    userData.email = userProfile.email
    userData.name = userProfile.name
  }
})

const handleFileChange = (event) => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userData.imageUrl = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
const updateProfile = () => {
  localStorage.setItem('user-profile', JSON.stringify(userData))
}
</script>

<template>

  <UserLayout>
    <div class="border mx-auto border-base-200 shadow-lg p-8 max-w-4xl">
      <div class="text-2xl">Your Profile</div>
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center"> 
       
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img :src="userData.imageUrl" />
          </div>

        </div>

        <input type="file" name="" id="" @change="handleFileChange">
      </div>

<div class="form-control w-full"> 
  <label class="label">
    <span class="label-text">Email</span>
  </label>
  <input type="text" placeholder="Type here" v-model="userData.name" class="input input-bordered w-full " />
  <label class="label">
    <span class="label-text">Name</span>
  </label>
  <input type="text" placeholder="Type here"  v-model="userData.email" class="input input-bordered w-full " />
  <button class="btn btn-neutral my-4" @click="updateProfile" >Update Data</button>
</div>
      </div>
    </div>
  </UserLayout>
</template>
