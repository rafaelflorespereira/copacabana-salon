import axios from 'axios'
export default {
  state: {
    appointments: []
  },
  mutations: {
    ADD_APPOINTMENT(state, appointment) {
      state.appointments.push(appointment)
    },
    REMOVE_PRODUCT(state, product) {
      const productsId = state.products.find(el => el.key === product.key)
      state.products.splice(state.products.indexOf(productsId), 1)
    },
    UPDATE_PRODUCT(state, payload) {
      console.log(payload.product, state.products[payload.index])
      Object.assign(state.products[payload.index], payload.product)
    }
  },
  actions: {
    /* products */
    saveAppointment: ({ commit }, appointment) => {
      axios
        .post(
          'https://copabacana-salon.firebaseio.com/appointments.json',
          appointment
        )
        .then(response => {
          console.log(response.data)
          appointment.key = response.data.name
          commit('ADD_APPOINTMENT', appointment)
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
    /* TODOS: */
    updateProduct({ commit }, payload) {
      axios
        .put(
          'https://copabacana-salon.firebaseio.com/products/' +
            payload.product.key +
            '.json'
        )
        .then(commit('UPDATE_SERVICE', payload))
        .then(error => console.log('Update Service Error: ' + error))
    },
    fetchAppointments: ({ commit }) => {
      axios
        .get('https://copabacana-salon.firebaseio.com/appointments.json')
        .then(response => {
          for (const key in response.data) {
            var appointment = response.data[key]
            appointment.key = key
            commit('ADD_APPOINTMENT', appointment)
          }
        })
    }
  },
  modules: {},
  getters: {
    products: state => {
      return state.products
    }
  }
}
