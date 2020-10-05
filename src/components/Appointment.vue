<template>
  <v-card>
    <v-img height="250" src="../../public/appointment-background.webp"></v-img>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Appointment</h3>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="appointment.clientName"
            label="Client Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select :items="services.map(el => el.name)"> </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select :items="enhancements.map(el => el.name)"></v-select>
          <v-radio v-model="hasEnhancement" label="no Enhancement?"></v-radio>
        </v-col>
        <!-- //todos Add date/time picker -->
        <v-col cols="12" sm="6" md="4"> </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary">text</v-btn>
      <v-btn color="primary">text</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      appointment: {
        clientName: '',
        service: '',
        enhancement: '',
        startDate: '',
        endDate: ''
      },
      hasEnhancement: true
    }
  },
  computed: {
    ...mapGetters(['services', 'enhancements'])
  }
}
</script>

<style></style>
