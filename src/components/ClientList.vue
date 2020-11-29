<template>
  <div class="h-client-list-container">
    <div v-for="client in clients" :key="client.id" class="box">
      <p class="is-size-5">{{ client.name }}</p>
      <p
          :class="{'has-text-danger':client.balance < 0, 'has-text-success':!(client.balance < 0) }"
          class="is-size-4 mb-4 currency-format"
      >
        {{ formatCurrency(client.balance) }}
      </p>
      <div class="is-flex">
        <router-link :to="`/client/${client.id}`">
          <b-button class="is-flex-grow-1">View</b-button>
        </router-link>
        <CRUDClient
            :meta="client"
            class="is-flex-grow-1 is-flex mr-4 ml-4"
            custom-class="is-flex-grow-1 h-client-edit-button"
            trigger-name="Edit"
            @update="$emit('update')"
        />
        <b-button class="is-flex-grow-1" @click="deleteClientPrompt(client.id)">Delete</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// eslint-disable-next-line no-unused-vars
import {Client} from "@/types/types";
import CRUDClient from "@/components/client/CRUDClient.vue";
import {formatCurrencyWithSymbol} from "@/helper";

@Component({
  name: 'ClientList',
  components: {CRUDClient},
  props: ['clients']
})
export default class ClientList extends Vue {
  clients!: Client[];
  clientName = "";

  deleteClientPrompt(id: string) {
    this.$buefy.dialog.confirm({
      type: "is-danger",
      message: 'Delete client and its transactions?',
      onConfirm: () => this.$emit('delete', id)
    })
  }

  formatCurrency(amount: number) {
    return formatCurrencyWithSymbol(amount)
  }
}
</script>
<style scoped>
.h-client-list-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  max-width: 100vw;
}

.h-client-edit-button {
  margin: 0 6px;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .h-client-list-container {
    grid-template-columns: 1fr;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .h-client-list-container{
    grid-template-columns: 1fr 1fr;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .h-client-list-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.box:last-child {
  margin-bottom: 1.5rem;
}

.currency-format {
  font-variant-numeric: tabular-nums;

}
</style>