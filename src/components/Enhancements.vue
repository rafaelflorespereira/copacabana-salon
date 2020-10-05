<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-data-table :headers="itemsHeaders" :items="enhancements">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              Enhancements
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
                          v-model="editedItem.brand"
                          label="brand"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.price"
                          type="number"
                          label="Price in $"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="close">CLOSE</v-btn>
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
                  <v-btn color="secondary" text @click="closeDelete">No</v-btn>
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
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      showSnackbar: false,
      dialog: false,
      dialogDelete: false,
      itemIndex: -1,
      editedItem: {
        brand: '',
        name: '',
        price: ''
      },
      defaultItem: {
        brand: '',
        name: '',
        price: ''
      },
      itemsHeaders: [
        {
          text: 'Brand',
          align: 'start',
          sortable: true,
          value: 'brand'
        },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters(['enhancements']),
    formTitle() {
      return this.itemIndex === -1 ? 'Create Item' : 'Update Item'
    }
  },
  methods: {
    ...mapActions({
      saveItemOnServer: 'saveEnhancement',
      updateItemOnServer: 'updateEnhancement',
      deleteItemOnServer: 'deleteEnhancement'
    }),
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.itemIndex = -1
      })
    },
    save() {
      //*Edits
      if (this.itemIndex > -1) {
        this.updateItemOnServer({
          enhancement: this.editedItem,
          index: this.itemIndex
        })
      } else {
        //*Saves
        this.saveItemOnServer(Object.assign({}, this.editedItem))
      }
      this.close()
    },
    deleteService(item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.itemIndex = -1
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    deleteItemConfirm() {
      this.deleteItemOnServer(this.editedItem)
      this.closeDelete()
    },
    editService(item) {
      this.itemIndex = this.enhancements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    }
    //todos CREATE VALIDATION FOR INPUTS
  }
}
</script>
