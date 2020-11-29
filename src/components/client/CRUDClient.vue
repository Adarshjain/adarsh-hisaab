<template>
  <div>
    <b-button :class="customClass" @click="isPopupVisible = true">{{ triggerName }}</b-button>
    <CRUDClientModal
        v-model="clientName"
        :errorMessage="errorMessage"
        :is-error="isError"
        :show="isPopupVisible"
        @dismiss="dismissPopup"
        @primaryAction="onPrimaryAction"
        @update:active="isPopupVisible = $event"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {addClient, updateClient} from "@/api";
import CRUDClientModal from "@/components/client/CRUDClientModal.vue";
import {Watch} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {Client} from "@/types/types";

@Component({
  name: 'CRUDClient',
  components: {CRUDClientModal},
  props: {
    triggerName: {
      type: String,
      default: "Add"
    },
    customClass: {
      type: String,
      default: ""
    },
    meta: {
      type: Object,
      default: () => {
        return {name: ""}
      }
    }
  }
})
export default class CRUDClient extends Vue {
  meta!: Client;
  isPopupVisible = false;
  isError = false;
  errorMessage = "";
  clientName = this.meta.name;
  CRUDType: "ADD" | "EDIT" = "ADD";

  dismissPopup() {
    this.isPopupVisible = false;
    this.clientName = "";
  }

  mounted() {
    this.CRUDType = this.meta.id ? "EDIT" : "ADD";
  }

  @Watch('clientName')
  onTextChange() {
    this.isError = false;
    this.errorMessage = "";
  }

  async onPrimaryAction() {
    if (this.CRUDType === "ADD") {
      await this.addClient();
    } else {
      await this.updateClient();
    }
  }

  async addClient() {
    if (this.clientName === "") {
      this.isError = true;
      this.errorMessage = "Client name should not be empty";
      return;
    }
    try {
      await addClient({name: this.clientName, balance: 0});
      this.isPopupVisible = false;
      this.$emit('update');
    } catch (e) {
      this.isError = true;

    }
  }

  async updateClient() {
    if (this.clientName === "") {
      this.isError = true;
      this.errorMessage = "Client name should not be empty";
      return;
    }
    try {
      await updateClient(this.meta.id, {...this.meta, name: this.clientName});
      this.isPopupVisible = false;
      this.$emit('update');
    } catch (e) {
      console.error(e);
      this.isError = true;
      if (e.graphQLErrors[0].extensions.code === "instance not unique") {
        this.errorMessage = "Client name already exists";
      } else {
        this.errorMessage = e.graphQLErrors[0].extensions.code;
      }
    }
  }

}
</script>