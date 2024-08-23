<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/admin/user'
import { useEventStore } from '@/stores/event'
import AdminLayout from '@/layouts/AdminLayout.vue'

const userStore = useUserStore()
const eventStore = useEventStore()

const route = useRoute()

const userId = ref(-1)
const userData = reactive({
  name: '',
  role: '',
  status: ''
})

onMounted(async () => {
  if (route.params.id) {
    userId.value = route.params.id
    const user = await userStore.getUser(userId.value)
    if (user) {
      // Manually update each property of userData
      userData.name = user.name
      userData.role = user.role
      userData.status = user.status
    } else {
      eventStore.popupMessage('error', 'Failed to load user data')
    }
  }
})

const updateUser = async () => {
  try {
    await userStore.updateUser(userId.value, userData)
    eventStore.popupMessage('success', 'Update User successful!')
  } catch (error) {
    eventStore.popupMessage('error', 'Failed to update user')
  }
}
</script>

<template>
  <AdminLayout>
    <div class="flex pt-8 px-6">
      <div class="card w-full p-6 bg-base-100 shadow-xl mt-2">
        <div class="text-xl font-semibold">Update user id: {{ userId }}</div>
        <div class="divider"></div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-base-content">Name</span>
          </label>
          <input
            type="text"
            placeholder=""
            class="input input-bordered w-full"
            v-model="userData.name"
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-base-content">Role</span>
          </label>
          <select class="select select-bordered w-full" v-model="userData.role">
            <option disabled value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="member">Member</option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-base-content">Status</span>
          </label>
          <select class="select select-bordered w-full" v-model="userData.status">
            <option disabled value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div class="mt-4 flex justify-end">
          <RouterLink to="/admin/users" class="btn btn-ghost">
            Back
          </RouterLink>
          <button @click="updateUser" class="btn btn-primary ml-4">
            Update
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
