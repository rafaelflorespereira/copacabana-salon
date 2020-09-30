<template>
  <div>
    <ul v-for="service in services" :key="service.key">
      <li>
        {{ service.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    services() {
      return this.$store.getters.services;
    }
  }
};
</script>

<style></style>
