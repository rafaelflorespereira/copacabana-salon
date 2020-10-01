<template>
  <v-app>
    <v-app-bar app color="white" hide-on-scroll>
      <v-spacer></v-spacer>
      <v-btn
        v-for="(route, index) in routes"
        :key="index"
        color="white"
        :to="route.url"
        >{{ route.label }}</v-btn
      >
    </v-app-bar>

    <v-main class="background">
      <v-slide-x-reverse-transition leave-absolute>
        <router-view></router-view>
      </v-slide-x-reverse-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    routes: [
      {
        label: "home",
        url: "/"
      },
      {
        label: "Users",
        url: "/users"
      },
      {
        label: "products",
        url: "/products"
      },
      {
        label: "Calendar",
        url: "/calendar"
      }
    ]
  })

  /*   computed: {
    changeTheme() {
      return;
    },
  }, */
};
</script>

<style>
.background {
  background-color: #263238;
}
</style>
