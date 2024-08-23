<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAccountStore } from '@/stores/account';
import { useEventStore } from '@/stores/event';
import Toast from '@/components/Toast.vue';

const router = useRouter();
const eventStore = useEventStore();
const accountStore = useAccountStore();
const email = ref('');
const password = ref('');
const toasts = ref([]);

const addToast = (message, status = 'success') => {
  const id = Date.now();
  toasts.value.push({ id, message, status });
  setTimeout(() => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  }, 3000); // Toast disappears after 3 seconds
};

const login = async () => {
  try {
    await accountStore.singInWithAdmin(email.value, password.value);
    router.push({ name: 'admin-dashboard' });
  } catch (error) {
    console.log('error page =', error.message);
    eventStore.popupMessage('error', error.message);
    addToast(`Login failed: ${error.message}`, 'error');
  }
};
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center">
    <div class="card mx-auto w-full max-w-2xl shadow-xl">
      <div class="py-24 px-10">
        <h2 class="text-2xl font-semibold mb-2 text-center">Login</h2>
        <div class="mb-4">
          <div class="form-control w-full mt-4">
            <label class="label">
              <span class="label-text text-base-content">Email Id</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder=""
              class="input input-bordered w-full"
            />
          </div>
          <div class="form-control w-full mt-4">
            <label class="label">
              <span class="label-text text-base-content">Password</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder=""
              class="input input-bordered w-full"
            />
          </div>
        </div>
        <p class="text-center text-error mt-8"></p>
        <button @click="login" class="btn mt-2 w-full btn-primary">Login</button>
      </div>
    </div>
  </div>

  <!-- Render Toast notifications -->
  <div>
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :status="toast.status"
    />
  </div>
</template>
