import Vue from 'vue'
import Vuex from 'vuex'
import services from './services'
import products from './products'
import enhancements from './enhancements'
import appointments from './appointments'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    services,
    products,
    enhancements,
    appointments
  }
})
