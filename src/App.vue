<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { computed, ref } from 'vue'

const store = useAuthStore();
const isAuth = computed(() => store.isAuth);
const user = computed(() => store.user);
const errorMsg = computed(() => store.errorMsg);
const email = ref('');
const password = ref('');

const login = async() => {
  const info = {
    email: email.value,
    password: password.value
  }
  await store.login(info);
}

</script>

<template>
  <header>
    <nav>
      <div v-if="isAuth && user">
        <p>Welcome, {{user.name}}</p>
        <button @click="store.logout">Logout</button>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <div>
            <label for="email">Email: </label>
            <input v-model="email" id="email" type="email" required>
          </div>
          <div>
            <label for="password">Password: </label>
            <input v-model="password" id="password" type="password" required>
          </div>
          <button type="submit">Log in</button>
          <p v-if="errorMsg" class="error">{{errorMsg}}</p>
        </form>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.error {
  color: red;
}
</style>
