<script setup>
import Menubar from 'primevue/menubar';
import HomeComponent from '@/components/HomeComponent.vue'
import AuthForm from '@/components/AuthForm.vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
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

  const items = [
    {
      label: 'Home page',
      icon: 'pi pi-fw pi-home',
      route: '/',
    },
    {
      label: 'Films',
      icon: 'pi pi-fw pi-video',
      route: '/films',
    },
    {
      label: 'Halls',
      icon: 'pi pi-fw pi-warehouse',
      route: '/halls',
    },
  ]
</script>

<template>
  <header>
    <Menubar :model="items">
      <template #item=" {item}">
        <a class="flex items-center ml-5 p-5">
          <router-link v-if="item.route" :to="item.route">
          <span :class="item.icon"/>
          <span class="ml-1">{{ item.label }}</span>
          </router-link>
        </a>
      </template>
      <template #end>
        <AuthForm/>
      </template>
    </Menubar>
  </header>
  <router-view></router-view>
</template>

<style scoped>

</style>
