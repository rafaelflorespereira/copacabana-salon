import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appointment: 0,
    services: [],
    products: [],
    enhancements: []
  },
  mutations: {
    SET_APPOINTMENT(state, payload) {
      state.appointment = payload;
    },
    ADD_SERVICE(state, payload) {
      state.services.push(payload);
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    ADD_ENHANCEMENTS(state, enhancements) {
      state.enhancements = enhancements;
    }
  },
  actions: {
    /* Services
     */
    addService: () => {},
    updateService: () => {},
    deleteService: () => {},
    fetchServices: () => {},
    /* products */
    addProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {},
    fetchProducts: () => {},
    /* enhancements */
    addEnhancement: () => {},
    updateEnhancement: () => {},
    deleteEnhancement: () => {},
    fetchEnhancements: () => {}
  },
  modules: {},
  getters: {
    selectedAppointment: state => {
      return state.appointment;
    },
    services: state => {
      return state.services;
    },
    products: state => {
      return state.products;
    },
    enhancements: state => {
      return state.enhancements;
    },
    servicesNames: state => {
      const names = [];
      state.services.forEach(service => {
        names.push(service.name);
      });
      return names;
    }
  }
});
