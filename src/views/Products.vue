<template>
  <div>
    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title>
            Services Table
            <v-spacer></v-spacer>
            <v-btn icon @click="removeServices"
              ><v-icon>mdi-trash-can-outline</v-icon></v-btn
            >
          </v-card-title>
          <v-data-table
            v-model="selected"
            :headers="servicesHeaders"
            :items="services"
            class="elevation-1"
            show-select
          >
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-form justify="center">
          <v-card elevation="12">
            <v-card-title>Add Service</v-card-title>
            <v-col>
              <v-text-field
                v-model="service.niche"
                label="niche"
              ></v-text-field>
              <v-text-field
                v-model="service.category"
                label="category"
              ></v-text-field>
              <v-text-field v-model="service.name" label="name"></v-text-field>
              <v-text-field
                v-model="service.price"
                label="price in $"
                type="number"
              ></v-text-field>
              <v-row align="center">
                <v-card-actions>
                  <v-btn color="success" dark @click="addService">CREATE</v-btn>
                </v-card-actions>
              </v-row>
            </v-col>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  filters: {
    numberToCash(num) {
      return num.toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2
      })
    }
  },
  data: () => {
    return {
      /* These will be got from the server */
      service: {
        niche: '',
        category: '',
        name: '',
        price: ''
      },
      product: {
        brand: '',
        name: '',
        amount: '',
        price: ''
      },
      enhancement: {
        name: '',
        price: ''
      },
      /* These are for the front-end purpose */
      selected: [],
      servicesHeaders: [
        { text: 'Id', value: 'id' },
        {
          text: 'Niche',
          align: 'start',
          sortable: true,
          value: 'niche'
        },
        { text: 'Category', value: 'category' },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' }
      ],
      enhancementsHeaders: [],
      productHeaders: []
    }
  },
  computed: {
    ...mapGetters(['services', 'products', 'enhancements'])
  },
  methods: {
    ...mapActions({
      addServiceOnServer: 'addService',
      deleteService: 'deleteService'
    }),
    addService() {
      this.addServiceOnServer({
        id: this.services.length,
        niche: this.service.niche,
        category: this.service.category,
        name: this.service.name,
        price: this.service.price
      })
      this.service.niche = ''
      this.service.category = ''
      this.service.name = ''
      this.service.price = ''
    },
    removeServices() {
      if (this.selected.length > 0)
        this.selected.forEach(element => {
          this.deleteService(element)
          this.selected.splice(this.selected.indexOf(element), 1)
        })
    },
    addProduct() {
      this.addServiceOnServer({
        id: this.products.length,
        brand: this.product.brand,
        name: this.product.name,
        amount: this.product.amount,
        price: this.product.price
      })
      this.product.brand = ''
      this.product.name = ''
      this.product.amount = ''
      this.product.price = ''
    },
    addEnhancement() {
      this.$store.commit('ADD_ENHANCEMENT', {
        id: this.enhancements.lenght,
        name: this.enhancement.name,
        price: this.enhancement.price
      })
      this.enhancement.name = ''
      this.enhancement.price = ''
    }
  }
}
</script>

<style></style>
