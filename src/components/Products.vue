<template>
  <div>
    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title>
            Products' Table
            <v-spacer></v-spacer>
            <v-btn icon @click="removeServices"
              ><v-icon>mdi-trash-can-outline</v-icon></v-btn
            >
          </v-card-title>
          <v-data-table
            v-model="selected"
            :headers="productsHeaders"
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
            <v-card-title>Add Product</v-card-title>
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
    <v-snackbar v-model="showSnackbar" dark app timeout="3000">
      {{
        selected.length > 1
          ? `${selected.length} services deleted`
          : 'service deleted'
      }}
    </v-snackbar>
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
      product: {
        brand: '',
        name: '',
        amount: '',
        price: ''
      },
      /* These are for the front-end purpose */
      selected: [],
      productsHeaders: [
        { text: 'Id', value: 'id' },
        {
          text: 'Brand',
          align: 'start',
          sortable: true,
          value: 'brand'
        },
        { text: 'Name', value: 'name' },
        { text: 'Amount', value: 'amount' },
        { text: 'Price', value: 'price' }
      ],
      showSnackbar: false
    }
  },
  computed: {
    ...mapGetters(['products'])
  },
  methods: {
    ...mapActions({
      addProductOnServer: 'addProduct',
      deleteService: 'deleteService'
    }),
    addProduct() {
      this.addProductOnServer({
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
    }
  }
}
</script>

<style></style>
