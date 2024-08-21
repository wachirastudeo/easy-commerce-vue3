import { createRouter, createWebHistory } from 'vue-router';

import AdminLogin from '@/views/admin/LoginView.vue';
import AdminDashboard from '@/views/admin/DashboardView.vue';

import AdminProductList from '@/views/admin/product/ListView.vue';
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue';

import AdminOrderList from '@/views/admin/order/ListView.vue';
import AdminOrderDetail from '@/views/admin/order/DetailView.vue';

import AdminUserList from '@/views/admin/user/ListView.vue';
import AdminUserUpdate from '@/views/admin/user/UpdateView.vue';
import { useAccountStore } from '@/stores/account';


import Home from '@/views/User/HomeView.vue';
import Search from '@/views/User/SearchView.vue';
import Profile from '@/views/User/ProfileView.vue';
import Success from '@/views/User/SuccessView.vue';
import Checkout from '@/views/User/CheckoutView.vue';
import Cart from '@/views/User/CartView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
    //admin site 
    {
      path: '/admin/login',
      name: 'login',
      component: AdminLogin
    }, {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard
    }, {
      path: '/admin/products',
      name: 'admin-products',
      component: AdminProductList
    },
    {
      path: '/admin/products/create',
      name: 'admin-products-create',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/edit/:id',
      name: 'admin-products-update',
      component: AdminProductUpdate
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: AdminOrderList
    },
    {
      path: '/admin/orders/:id',
      name: 'admin-order-detail',
      component: AdminOrderDetail
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: AdminUserList
    },
    {
      path: '/admin/users/:id',
      name: 'admin-user-update',
      component: AdminUserUpdate
    }

  ]
});
router.beforeEach(async (to, from, next) => {
  // เพิ่มเรียก checkAuthState ขึ้นมาเพื่อ update store ให้ user ถูก update
  const accountStore = useAccountStore();
  await accountStore.checkAuthState();

  if (to.name.includes('admin') && !accountStore.isAdmin) {
    next({ name: 'home' });
  } else if (to.name === 'login' && accountStore.isAdmin) {

    next({ name: 'admin-dashboard' });

  } else {
    next();

  }

  // ทำการแสดง route ออกไป
});
export default router;