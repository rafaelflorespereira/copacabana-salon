<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-col>
          <v-sheet>
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="appointmentsCalendar"
              :event-color="getEventColor"
              :type="type"
              elevation="8"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @click:time="createAppointment"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-row>
                <v-col>
                  <v-card>
                    <v-toolbar color="#6D4C41" dark>
                      <v-toolbar-title>{{ appointment.name }}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-select
                        id
                        v-model="appointmentId"
                        label="Select Service"
                        :items="servicesNames"
                      ></v-select>
                      <v-text-field
                        v-model="appointment.clientName"
                        outlined
                        label="Client Name"
                      ></v-text-field>
                      <v-text-field
                        v-model="appointment.startTime"
                        outlined
                        label="Start Time"
                        @click="openClock = !openClock"
                      ></v-text-field>
                      <v-text-field
                        v-model="appointment.endTime"
                        outlined
                        label="End Time"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn color="success">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col v-if="openClock">
                  <v-time-picker
                    ampm-in-title
                    format="ampm"
                    landscape
                  ></v-time-picker>
                </v-col>
              </v-row>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    selectedElement: null,
    selectedOpen: false,
    openClock: false,
    appointmentId: 0
  }),
  computed: {
    ...mapGetters(['services', 'servicesNames', 'appointments']),
    appointmentsCalendar() {
      return this.appointments
    },
    appointment() {
      return {
        clientName: '',
        name: this.services[this.appointmentId].name,
        price: this.services[this.appointmentId].price,
        startTime: 0,
        endTime: 0
      }
    }
  },
  watch: {
    appointmentId(val) {
      const appointment = this.services.find(service => service.name === val)
      this.$store.commit('SET_APPOINTMENT', appointment.id)
    }
  },
  created() {
    this.appointmentId = this.$store.getters.appointment
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    createAppointment(event) {
      this.selectedOpen = true
      const start = new Date(event.date + 'T' + event.time)
      const end = new Date(Date.parse(start) + this.appointment.endTime * 60000)
      this.appointment.startTime = start
      this.appointment.endTime = end
    }
    //Unecessary
    /* updateRange({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        })
      }

      this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    }*/
  }
}
</script>
