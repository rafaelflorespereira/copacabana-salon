import axios from 'axios'
export default {
  state: {
    enhancements: []
  },
  mutations: {
    ADD_ENHANCEMENT(state, enhancement) {
      state.enhancements.push(enhancement)
    },
    REMOVE_ENHANCEMENT(state, enhancement) {
      const enhancementsId = state.enhancements.find(
        el => el.key === enhancement.key
      )
      state.enhancements.splice(state.enhancements.indexOf(enhancementsId), 1)
    },
    UPDATE_ENHANCEMENT(state, payload) {
      console.log(payload.enhancement, state.enhancements[payload.index])
      Object.assign(state.enhancements[payload.index], payload.enhancement)
    }
  },
  actions: {
    saveEnhancement: ({ commit }, enhancement) => {
      axios
        .post(
          'https://copabacana-salon.firebaseio.com/enhancements.json',
          enhancement
        )
        .then(response => {
          enhancement.key = response.data.name
          commit('ADD_ENHANCEMENT', enhancement)
        })
        .then(error => console.log(error))
    },
    updateEnhancement: ({ commit }, payload) => {
      axios
        .put(
          'https://copabacana-salon.firebaseio.com/enhancements/' +
            payload.enhancement.key +
            '.json',
          payload.enhancement
        )
        .then(commit('UPDATE_ENHANCEMENT', payload))
        .then(error => console.log('Update enhancement Error: ' + error))
    },
    deleteEnhancement: ({ commit }, enhancement) => {
      axios
        .delete(
          'https://copabacana-salon.firebaseio.com/enhancements/' +
            enhancement.key +
            '.json'
        )
        .then(response => {
          console.log(response)
          commit('REMOVE_ENHANCEMENT', enhancement)
        })
        .then(error => console.log(error))
    },
    fetchEnhancements: ({ commit }) => {
      axios
        .get('https://copabacana-salon.firebaseio.com/enhancements.json')
        .then(response => {
          for (const key in response.data) {
            var enhancement = response.data[key]
            enhancement.key = key
            commit('ADD_ENHANCEMENT', enhancement)
          }
        })
    }
  },
  getters: {
    enhancements: state => {
      return state.enhancements
    }
  },
  modules: {}
}
