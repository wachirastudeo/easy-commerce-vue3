<script setup>
import { RouterLink, useRouter,useRoute } from 'vue-router'
import { ref } from 'vue'
import { useAccountStore} from '@/stores/account'
const accountStore = useAccountStore();
const route = useRoute()
const router = useRouter()
const logout= async()=>{

  try {
    await accountStore.logout();
    router.push({name:'login'})
    
  } catch (error) {
    
  }
}
const pageData = [
  {
    name: 'Dashboard',
    route: '/admin/dashboard',
  

  },
  {
    name: 'Product',
    route: '/admin/products',
   

  },
  {
    name: 'Order',
    route: '/admin/orders',
   
  },
  {
    name: 'User',
    route: '/admin/users',
    

  }
 
]

const currentPath = ref('')
currentPath.value = route.path
</script>

<template>
  <div class="drawer drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content p-4">
      <slot></slot>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-60 h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li class="mb-2 font-semibold text-2xl">
          <div>Admin </div>
        </li>
        <li v-for="page in pageData">
          <RouterLink 
          
          :to="page.route" :class="currentPath === page.route ? 'active' : ''">
            {{ page.name }}
          </RouterLink>
        </li>
        <li>
          <a @click="logout">Logout</a>
        </li>
        
      </ul>
    </div>
  </div>
</template>
