<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      hide-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
    >
      <v-spacer></v-spacer>
      <v-btn
        v-for="(route, index) in routes"
        :key="index"
        text
        dark
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
  name: 'App',
  data: () => ({
    routes: [
      {
        label: 'home',
        url: '/'
      },
      {
        label: 'Users',
        url: '/users'
      },
      {
        label: 'Store',
        url: '/store/services'
      },
      {
        label: 'Calendar',
        url: '/calendar'
      }
    ]
  }),
  created() {
    this.$store.dispatch('fetchServices')
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchEnhancements')
  }

  /*   computed: {
    changeTheme() {
      return;
    },
  }, */
}
</script>

<style>
.background {
  background-color: #263238;
}
</style>
