import axios from 'axios'
export default {
  state: {
    appointments: [],
    appointment: {}
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
      Object.assign(state.products[payload.index], payload.product)
    },
    SET_APPOINTMENT(state, appointment) {
      state.appointment = appointment
    }
  },
  actions: {
    saveAppointment: ({ commit }, appointment) => {
      axios
        .post(
          'https://copabacana-salon.firebaseio.com/appointments.json',
          appointment
        )
        .then(response => {
          const appointmentResponse = JSON.parse(response.config.data)
          appointmentResponse.key = response.data.name
          commit('ADD_APPOINTMENT', appointmentResponse)
        })
        .catch(error => console.log(error))
    },
    //TODOS
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
        .catch(error => console.log(error))
    },
    //TODOS
    updateProduct({ commit }, payload) {
      axios
        .put(
          'https://copabacana-salon.firebaseio.com/products/' +
            payload.product.key +
            '.json'
        )
        .then(commit('UPDATE_SERVICE', payload))
        .catch(error => console.log('Update Service Error: ' + error))
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
    },
    fetchAppointment: ({ commit }, appointment) => {
      axios
        .get(
          'https://copabacana-salon.firebaseio.com/appointments/' +
            appointment.key +
            '.json'
        )
        .then(response => {
          console.log(response, response.data)
          commit('SET_APPOINTMENT', response.data)
        })
        .catch(error => console.log('Fetch appointment error ' + error))
    }
  },
  modules: {},
  getters: {
    appointments: state => {
      return state.appointments
    },
    appointment: state => {
      if (!state.appointment) {
        return {
          clientName: '',
          service: {},
          enhancement: {},
          start: '',
          end: ''
        }
      }
      return state.appointment
    }
  }
}
