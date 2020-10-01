import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appointment: 0,
    appointments: [],
    services: [],
    products: [],
    enhancements: []
  },
  mutations: {
    SET_APPOINTMENT(state, payload) {
      state.appointment = payload
    },
    ADD_SERVICE(state, payload) {
      state.services.push(payload)
    },
    SET_SERVICES(state, services) {
      state.services = services
    },
    REMOVE_SERVICE(state, service) {
      const servicesId = state.services.find(el => el.key === service.key)
      state.services.splice(state.services.indexOf(servicesId), 1)
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    ADD_ENHANCEMENTS(state, enhancements) {
      state.enhancements = enhancements
    }
  },
  actions: {
    /* Services */
    addService: ({ commit }, service) => {
      axios
        .post('https://copabacana-salon.firebaseio.com/services.json', service)
        .then(response => {
          console.log(response.data)
          service.key = response.data.name
          commit('ADD_SERVICE', service)
        })
        .then(error => console.log(error))
    },
    deleteService: ({ commit }, service) => {
      axios
        .delete(
          'https://copabacana-salon.firebaseio.com/services/' +
            service.key +
            '.json'
        )
        .then(response => {
          console.log(response)
          commit('REMOVE_SERVICE', response)
        })
        .then(error => console.log(error))
    },
    fetchServices: ({ commit }) => {
      axios
        .get('https://copabacana-salon.firebaseio.com/services.json')
        .then(response => {
          for (const key in response.data) {
            var service = response.data[key]
            service.key = key
            commit('ADD_SERVICE', service)
          }
        })
    },
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
    appointment: state => {
      return state.appointment
    },
    services: state => {
      if (state.services == null) return
      return state.services
    },
    products: state => {
      return state.products
    },
    enhancements: state => {
      return state.enhancements
    },
    servicesNames: state => {
      const names = []
      state.services.forEach(service => {
        names.push(service.name)
      })
      return names
    },
    appointments: state => {
      return state.appointments
    }
  }
})
