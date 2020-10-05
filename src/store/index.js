import Vue from 'vue'
import Vuex from 'vuex'
import services from './services'
import products from './products'
import enhancements from './enhancements'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appointment: 0,
    appointments: []
  },
  mutations: {},
  actions: {},
  modules: {
    services,
    products,
    enhancements
  },
  getters: {
    appointment: state => {
      return state.appointment
    },
    appointments: state => {
      return state.appointments
    }
  }
})
