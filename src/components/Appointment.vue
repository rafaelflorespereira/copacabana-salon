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
            :items="servicesHeader"
            item-value="value"
            item-text="text"
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-show="hasEnhancement"
            v-model="appointment.enhancement"
            label="Enhancement"
            :items="enhancementsHeader"
            item-value="value"
            item-text="text"
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
            v-model.number="totalPrice"
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
      <v-btn outlined color="primary" @click="save">Submit</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    isDialogOpen: Boolean,
    date: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    appointment: {
      type: Object,
      default: () => {
        return {
          clientName: '',
          service: {},
          enhancement: {},
          start: '',
          end: ''
        }
      }
    }
  },
  data: () => {
    return {
      defaultAppointment: {
        clientName: '',
        service: {},
        enhancement: {},
        start: '',
        end: ''
      },
      hasEnhancement: false,
      menu: false,
      menu2: false,
      isEditted: false //? Maybe still need it? and change it to a prop.
    }
  },

  computed: {
    ...mapGetters(['services', 'enhancements']),
    //! CONSERTAR ESSA FUNÇÃO
    totalPrice() {
      var appointment = 0.0
      var enhancement = 0.0
      return parseFloat(appointment) + parseFloat(enhancement)
    },
    //? I coudl refactor these two functions into one
    servicesHeader() {
      const header = []
      this.services.map(el => {
        header.push({
          text: el.niche + ' ' + el.category + ' ' + el.name,
          value: Object.assign({}, el)
        })
      })
      return header
    },
    enhancementsHeader() {
      const header = []
      this.enhancements.map(el => {
        header.push({
          text: el.brand + ' ' + el.name,
          value: Object.assign({}, el)
        })
      })
      return header
    },
    startDate() {
      var min = new Date(`${this.date}T${this.appointment.start}`)
      return min
    },
    endDate() {
      var max = new Date(`${this.date}T${this.appointment.end}`)
      return max
    }
  },
  watch: {
    time() {
      this.appointment.start = this.time
    },
    appointment() {
      return this.$store.getters.appointment
    }
  },
  methods: {
    ...mapActions({
      saveOnServer: 'saveAppointment'
    }),
    close() {
      this.$emit('is-dialog-open', false)
      this.$nextTick(() => {
        this.appointment = Object.assign({}, this.defaultAppointment)
        this.totalPrice = 0.0
        this.hasEnhancement = false
      })
    },
    save() {
      if (!this.appointment.key) {
        this.saveOnServer(
          Object.assign(this.appointment, {
            start: this.changeDateFormat(this.startDate),
            end: this.changeDateFormat(this.endDate)
          })
        )
        this.close()
      } else {
        this.close()
      }
    },
    appendLeadingZeroes(n) {
      return n <= 9 ? '0' + n : n
    },
    getTimeFromDate(date) {
      let hour = this.appendLeadingZeroes(date.getHours())
      let minute = this.appendLeadingZeroes(date.getMinutes())
      return hour + minute
    },
    changeDateFormat(date) {
      let formatted_date =
        date.getFullYear() +
        '-' +
        this.appendLeadingZeroes(date.getMonth() + 1) +
        '-' +
        this.appendLeadingZeroes(date.getDate()) +
        ' ' +
        this.appendLeadingZeroes(date.getHours()) +
        ':' +
        this.appendLeadingZeroes(date.getMinutes()) +
        ':' +
        this.appendLeadingZeroes(date.getSeconds())

      return formatted_date
    }
  }
}
</script>

<style></style>
