<template>
  <div>
    <v-row>
      <v-toolbar flat>
        <v-row justify="center">
          <v-btn text to="/store/products">Products</v-btn>
          <v-btn text to="/store/services">Services</v-btn>
          <v-btn text to="/store/enhancements">Enhancements</v-btn>
        </v-row>
      </v-toolbar>
    </v-row>
    <v-slide-x-reverse-transition>
      <router-view></router-view>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
