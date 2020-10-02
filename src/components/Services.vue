<template>
  <div>
    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title>
            Services' Table
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
            {{ selected }}
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
      service: {
        niche: '',
        category: '',
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
      showSnackbar: false
    }
  },
  computed: {
    ...mapGetters(['services'])
  },
  methods: {
    ...mapActions({
      addServiceOnServer: 'addService',
      deleteServiceOnServer: 'deleteService'
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
      if (this.selected.length > 0) {
        this.showSnackbar = true
        this.selected.forEach(select => {
          this.deleteServiceOnServer(select.key)
        })
      }
    }
  }
}
</script>

<style></style>
