import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appointment: 0,
    services: [
      {
        id: 0,
        name: "Unha-Mao",
        price: "10",
        timeMinutes: "40",
        color: "indigo",
      },
      {
        id: 1,
        name: "Unha-Pe",
        price: "10",
        timeMinutes: "40",
        color: "deep-purple",
      },
      {
        id: 2,
        name: "cabelo",
        price: "10",
        timeMinutes: "40",
        color: "cyan",
      },
      {
        id: 3,
        name: "polish",
        price: "10",
        timeMinutes: "40",
        color: "orange",
      },
    ],
  },
  mutations: {
    SET_APPOINTMENT(state, payload) {
      state.appointment = payload;
    },
  },
  actions: {
    addService: () => {},
    updateService: () => {},
    deleteService: () => {},
  },
  modules: {},
  getters: {
    selectedAppointment: (state) => {
      return state.appointment;
    },
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
