<template>
  <v-sheet>
    <v-toolbar flat>
      <v-row justify="center">
        <v-btn text to="/store/products">Products</v-btn>
        <v-btn text to="/store/services">Services</v-btn>
        <v-btn text to="/store/enhancements">Enhancements</v-btn>
      </v-row>
    </v-toolbar>
    <!-- TODOS add transition -->
    <router-view></router-view>
  </v-sheet>
</template>

<script>
export default {}
</script>

<style></style>
