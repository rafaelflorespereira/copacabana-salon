<template>
  <v-card>
    <v-img height="200" src="../../public/appointment-background.webp"></v-img>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Appointment</h3>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="appointment.clientName"
            label="Client Full Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="appointment.service"
            label="Services"
            :items="teste"
            :item-value="teste"
            :item-text="text"
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-show="hasEnhancement"
            v-model="appointment.enhancement"
            label="Enhancement"
            :item-text="enhancements.map(el => el.name)"
            :item-value="enhancements"
          ></v-select>
          <v-switch
            v-model="hasEnhancement"
            label="Need Enhancement?"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="200px"
            min-width="250px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="appointment.start"
                label="Begins at"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu"
              v-model="appointment.start"
              full-width
              @click:minute="$refs.menu.save(appointment.start)"
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="200px"
            min-width="250px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="appointment.end"
                label="Finishes at"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              v-model="appointment.end"
              full-width
              @click:minute="$refs.menu.save(appointment.end)"
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model.number="appointment.price"
            type="number"
            label="Total"
            prefix="$"
            step="0.25"
            mask="#.##"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined color="primary" @click="close">Cancel</v-btn>
      <v-btn outlined color="primary">Submit</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    isDialogOpen: Boolean
  },
  data: () => {
    return {
      appointment: {
        clientName: '',
        service: {},
        enhancement: {},
        start: '',
        end: '',
        totalPrice: 0.0
      },
      defaultAppointment: {
        clientName: '',
        service: {},
        enhancement: {},
        startDate: '',
        endDate: '',
        totalPrice: 0.0
      },
      teste: {
        text: 'test 1',
        divider: 'category 1',
        header: 'niche',
        value: {
          niche: 'niche 1',
          category: 'category 1',
          name: 'name 1'
        }
      },
      hasEnhancement: false,
      menu: false,
      menu2: false
    }
  },
  computed: {
    ...mapGetters(['services', 'enhancements']),
    ...mapActions({
      saveOnServer: 'saveAppointment'
    }),
    totalPrice() {
      return 0
    }
  },
  methods: {
    close() {
      this.isDialogOpen = false
      this.$nextTick(() => {
        this.appointment = Object.assign({}, this.defaultAppointment)
        this.hasEnhancement = false
      })
      this.$emit('is-dialog-open', this.isDialogOpen)
    },
    save() {
      this.saveOnServer(this.appointment)
      this.close()
    }
  }
}
</script>

<style></style>
