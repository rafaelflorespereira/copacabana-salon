import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    services: [
      {
        name: "Unha-Mao",
        price: "10",
        timeMinutes: "40",
        color: "indigo",
      },
      {
        name: "Unha-Pe",
        price: "10",
        timeMinutes: "40",
        color: "deep-purple",
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    services: (state) => {
      return state.services;
    },
    servicesNames: (state) => {
      const names = [];
      state.services.forEach((service) => {
        names.push(service.name);
      });
      return names;
    },
  },
});
