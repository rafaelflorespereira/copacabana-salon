import axios from 'axios'
export default {
  state: {
    products: []
  },
  mutations: {
    ADD_PRODUCT(state, product) {
      state.products.push(product)
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
    saveProduct: ({ commit }, product) => {
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
    }
  },
  modules: {},
  getters: {
    products: state => {
      return state.products
    }
  }
}
