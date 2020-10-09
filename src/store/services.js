import axios from 'axios'
export default {
  state: {
    services: []
  },
  mutations: {
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
    }
  },
  actions: {
    saveService: ({ commit }, service) => {
      axios
        .post('https://copabacana-salon.firebaseio.com/services.json', service)
        .then(response => {
          const serviceResponse = JSON.parse(response.config.data)
          serviceResponse.key = response.data.name
          commit('ADD_SERVICE', serviceResponse)
        })
        .catch(error => console.log(error))
    },
    updateService: ({ commit }, payload) => {
      axios
        .put(
          'https://copabacana-salon.firebaseio.com/services/' +
            payload.service.key +
            '.json',
          payload.service
        )
        .then(response => {
          console.log(response.data)
          const payloadResponse = {
            service: response.data,
            index: payload.index
          }
          commit('UPDATE_SERVICE', payloadResponse)
        })
        .catch(error => console.log('Update Service Error: ' + error))
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
        .catch(error => console.log('Delete Services error: ', error))
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
        .catch(error => console.log('fetchServices Error: ', error))
    }
  },
  getters: {
    services: state => {
      if (state.services == null) return
      return state.services
    }
  },
  modules: {}
}
