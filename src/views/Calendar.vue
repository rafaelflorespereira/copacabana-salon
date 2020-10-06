<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
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
            :event-color="getRandomColor"
            :type="type"
            elevation="8"
            @click:more="viewDay"
            @click:date="viewDay"
            @click:time="dialog = !dialog"
          >
          </v-calendar>
        </v-sheet>
        <v-dialog v-model="dialog" max-width="600">
          <Appointment :is-dialog-open="dialog" @is-dialog-open="isDialog">
          </Appointment>
        </v-dialog>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import Appointment from '../components/Appointment.vue'
export default {
  components: {
    Appointment
  },
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    appointmentsCalendar: [],
    selectedElement: null,
    selectedOpen: false,
    openClock: false,
    dialog: false
  }),
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
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
    isDialog(event) {
      this.dialog = event
    }
    /* 
    createAppointment(event) {
      this.selectedOpen = true
      const start = new Date(event.date + 'T' + event.time)
      const end = new Date(Date.parse(start) + this.appointment.endTime * 60000)
      this.appointment.startTime = start
      this.appointment.endTime = end
    } */
  }
}
</script>
