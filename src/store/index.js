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
    UPDATE_SERVICE(state, payload) {
      console.log(payload.service, state.services[payload.index])
      Object.assign(state.services[payload.index], payload.service)
    },
    REMOVE_SERVICE(state, service) {
      const servicesId = state.services.find(el => el.key === service.key)
      state.services.splice(state.services.indexOf(servicesId), 1)
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    REMOVE_PRODUCT(state, product) {
      const productsId = state.products.find(el => el.key === product.key)
      state.products.splice(state.products.indexOf(productsId), 1)
    },
    ADD_ENHANCEMENT(state, enhancement) {
      state.enhancement.push(enhancement)
    },
    REMOVE_ENHANCEMENT(state, enhacements) {
      const enhancementsId = state.enhancements.find(
        el => el.key === enhacements.key
      )
      state.enhancements.splice(state.enhancements.indexOf(enhancementsId), 1)
    }
  },
  actions: {
    /* Services */
    saveService: ({ commit }, service) => {
      axios
        .post('https://copabacana-salon.firebaseio.com/services.json', service)
        .then(response => {
          service.key = response.data.name
          commit('ADD_SERVICE', service)
        })
        .then(error => console.log(error))
    },
    updateService: ({ commit }, payload) => {
      axios
        .put(
          'https://copabacana-salon.firebaseio.com/services/' +
            payload.service.key +
            '.json',
          payload.service
        )
        .then(commit('UPDATE_SERVICE', payload))
        .then(error => console.log('Update Service Error: ' + error))
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
          commit('REMOVE_SERVICE', service)
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
    addProduct: ({ commit }, product) => {
      axios
        .post('https://copabacana-salon.firebaseio.com/products.json', product)
        .then(response => {
          console.log(response.data)
          product.key = response.data.name
          commit('ADD_PRODUCT', product)
        })
        .then(error => console.log(error))
    },
    deleteProduct: ({ commit }, product) => {
      axios
        .delete(
          'https://copabacana-salon.firebaseio.com/products/' +
            product.key +
            '.json'
        )
        .then(response => {
          commit('REMOVE_PRODUCT', response)
        })
        .then(error => console.log(error))
    },
    fetchProducts: ({ commit }) => {
      axios
        .get('https://copabacana-salon.firebaseio.com/products.json')
        .then(response => {
          for (const key in response.data) {
            var product = response.data[key]
            product.key = key
            commit('ADD_PRODUCT', product)
          }
        })
    },
    /* enhancements */
    addEnhancement: () => {},
    deleteEnhancement: () => {},
    fetchEnhancements: () => {}
  },
  modules: {},
  getters: {
    appointment: state => {
      return state.appointment
    },
    appointments: state => {
      return state.appointments
    },
    services: state => {
      if (state.services == null) return
      return state.services
    },
    servicesNames: state => {
      const names = []
      state.services.forEach(service => {
        names.push(service.name)
      })
      return names
    },
    products: state => {
      return state.products
    },
    enhancements: state => {
      return state.enhancements
    }
  }
})
