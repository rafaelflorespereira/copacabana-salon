<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-card elevation="12">
        <v-data-table :headers="servicesHeaders" :items="services">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>
                Services
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Create</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedService.niche"
                            label="Niche"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedService.category"
                            label="Category"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedService.name"
                            label="Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model.number="editedService.price"
                            type="number"
                            label="Price in $"
                            prefix="$"
                            step="0.25"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="close"
                      >CLOSE</v-btn
                    >
                    <v-btn color="success" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">
                    Are you sure you want to delete this item?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" text @click="closeDelete"
                      >No</v-btn
                    >
                    <v-btn color="success" text @click="deleteItemConfirm"
                      >Yes</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editService(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small class="mr-2" @click="deleteService(item)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  filters: {
    currency(value) {
      return value.toFixed(2)
    }
  },
  data: () => {
    return {
      showSnackbar: false,
      dialog: false,
      dialogDelete: false,
      serviceIndex: -1,
      editedService: {
        niche: '',
        category: '',
        name: '',
        price: '0.00'
      },
      defaultService: {
        niche: '',
        category: '',
        name: '',
        price: '0.00'
      },
      servicesHeaders: [
        {
          text: 'Niche',
          align: 'start',
          sortable: true,
          value: 'niche'
        },
        { text: 'Category', value: 'category' },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters(['services']),
    formTitle() {
      return this.serviceIndex === -1 ? 'Create Service' : 'Update Service'
    }
  },
  methods: {
    ...mapActions({
      saveServiceOnServer: 'saveService',
      updateService: 'updateService',
      deleteServiceOnServer: 'deleteService'
    }),
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedService = Object.assign({}, this.defaultService)
        this.serviceIndex = -1
      })
    },
    save() {
      //*Edits
      if (this.serviceIndex > -1) {
        this.updateService({
          service: this.editedService,
          index: this.serviceIndex
        })
      } else {
        //*Saves
        this.saveServiceOnServer(Object.assign({}, this.editedService))
      }
      this.close()
    },
    deleteService(item) {
      this.editedService = Object.assign({}, item)
      this.dialogDelete = true
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.serviceIndex = -1
        this.service = Object.assign({}, this.defaultService)
      })
    },
    deleteItemConfirm() {
      this.deleteServiceOnServer(this.editedService)
      this.closeDelete()
    },
    editService(item) {
      this.serviceIndex = this.services.indexOf(item)
      this.editedService = Object.assign({}, item)
      this.dialog = true
    }
    //todos CREATE VALIDATION FOR INPUTS
  }
}
</script>
