<script setup>


</script>

<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/films">Films</router-link></li>
        <li><router-link to="/halls">Halls</router-link></li>
      </ul>
    </nav>
  </header>
  <router-view></router-view>
</template>

<style scoped>

</style>
