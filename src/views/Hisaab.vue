<template>
  <div id="app">
    <div class="is-flex p-2 is-align-items-center mb-0">
      <router-link class="is-flex" to="/">
        <img alt="MLI" height="50" src="/assets/mli.png" width="50">
      </router-link>
      <p class="is-size-5 ml-3 mb-0">Metal Letters India</p>

      <CRUDClient class="ml-auto" custom-class="is-primary" triggerName="Add Client" @update="updateClients"/>
    </div>
    <ClientList
        :clients="clients"
        @delete="deleteClient"
        @update="updateClients"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CRUDClient from "@/components/client/CRUDClient.vue";
import ClientList from "@/components/ClientList.vue";
// eslint-disable-next-line no-unused-vars
import {Client} from "@/types/types";
import {deleteClient, fetchClients} from "@/api";

@Component({
  components: {ClientList, CRUDClient},
})
export default class Hisaab extends Vue {
  clients: Client[] = [];

  async mounted() {
    await this.updateClients();
  }

  async deleteClient(id: string) {
    try {
      await deleteClient(id);
      await this.updateClients();
    } catch (e) {
      console.error(e);
    }
  }

  async updateClients() {
    const resp = await fetchClients();
    this.clients = resp.docs.map(d => {
          const data = d.data();
          return {
            name: data.name,
            balance: data.balance,
            id: d.id
          }
        }
    )
  }
}
</script>
<style>
.ml-auto {
  margin-left: auto;
}
</style>

