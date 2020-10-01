<template>
  <div>
    <v-row justify="center">
      <v-col cols="8">
        <v-data-table
          :headers="servicesHeaders"
          :items="services"
          class="elevation-1"
        >
        </v-data-table>
      </v-col>
      <v-col cols="3">
        <v-form justify="center">
          <v-card elevation="12">
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
            {{ service.price | numberToCash }}
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  filters: {
    numberToCash(num) {
      return num.toLocaleString("en", {
        useGrouping: false,
        minimumFractionDigits: 2
      });
    }
  },
  data: () => {
    return {
      /* These will be got from the server */
      service: {
        niche: "",
        category: "",
        name: "",
        price: ""
      },
      enhancements: [],
      enhancement: {
        name: "",
        price: ""
      },
      product: {
        brand: "",
        name: "",
        amount: "",
        price: ""
      },
      /* These are for the front-end purpose */
      servicesHeaders: [
        {
          text: "Niche",
          align: "center",
          sortable: true,
          value: "niche"
        },
        { text: "Category", value: "category" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" }
      ],
      enhancementsHeaders: [],
      productHeaders: []
    };
  },
  computed: {
    ...mapGetters(["services"])
  },
  methods: {
    addService() {
      this.$store.commit("ADD_SERVICE", {
        niche: this.service.niche,
        category: this.service.category,
        name: this.service.name,
        price: this.service.price
      });
      this.service.niche = "";
      this.service.category = "";
      this.service.name = "";
      this.service.price = "";
    },
    addProduct() {
      this.$store.commit("ADD_PRODUCT", {
        brand: this.product.brand,
        name: this.product.name,
        amount: this.product.amount,
        price: this.product.price
      });
      this.product.brand = "";
      this.product.name = "";
      this.product.amount = "";
      this.product.price = "";
    },
    addEnhancement() {
      this.$store.commit("ADD_ENHANCEMENT", {
        name: this.enhancement.name,
        price: this.enhancement.price
      });
      this.enhancement.name = "";
      this.enhancement.price = "";
    }
  }
};
</script>

<style></style>
