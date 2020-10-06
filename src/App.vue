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
      <v-container fluid>
        <v-slide-x-reverse-transition leave-absolute>
          <router-view></router-view>
        </v-slide-x-reverse-transition>
      </v-container>
    </v-main>

    <v-footer padless dark>
      <v-card class="flex" flat tile>
        <!-- //? IS THIS REALLY NECESSARY? PEOPLE FROM WITHIN MAY NOT ENTER ON THOSE LINKS  -->
        <v-card-text class="text-center">
          <v-btn v-for="icon in icons" :key="icon" icon class="mx-4">
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-row justify="center" align="center">
          <v-col>
            <v-card-text class="text-center">
              2020 - {{ new Date().getFullYear() }} Copacabana Salon
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-footer>
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
    ],
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
  }),
  created() {
    this.$store.dispatch('fetchServices')
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchEnhancements')
    this.$store.dispatch('fetchAppointments')
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
