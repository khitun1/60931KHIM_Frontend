<script setup>
import { useAuthStore } from '@/stores/authStore.js';
import { computed, ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

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
  <div class="flex items-center gap-2">
    <div v-if="isAuth && user">
      <span class="pi pi-fw pi-user mr-4"/> {{ user.name }}
      <Button @click="store.logout" class="ml-4">Выйти</Button>
    </div>
    <div v-else>
      <form @submit.prevent="login">
        <InputText v-model="email" type="email" id="email" required placeholder="Логин" class="m-2 sm:w-auto"
                   :class="{'p-invalid': errorMsg}"/>
        <InputText v-model="password" type="password" id="password" required placeholder="Пароль"
                   class="m-2 sm:w-auto" :class="{'p-invalid': errorMsg}"/>
        <Button type="submit">Войти</Button>
        <div class="m-2"><small v-if="errorMsg" class="error">{{ errorMsg }}</small></div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>