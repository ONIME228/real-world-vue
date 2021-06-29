<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'Details' }">Details</router-link>
      |
      <router-link :to="{ name: 'Register' }">Register</router-link>
      |
      <router-link :to="{ name: 'Edit' }">Edit</router-link>
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>
<script>
export default {
  inject: ["GStore"],
};
</script>