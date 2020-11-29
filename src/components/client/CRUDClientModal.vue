<template>
  <b-modal :active="show" @update:active="$emit('update:active',$event)" :can-cancel="false" has-modal-card>
    <form class="modal-card"
          style="min-width: 300px;max-width: 95vw;margin: auto"
          @submit.prevent="$emit('primaryAction')"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Client</p>
      </header>
      <section class="modal-card-body">
        <b-field :message="errorMessage" :type="isError ? 'is-danger':''" label="Name">
          <b-input
              :value="clientName"
              @input="$emit('update',$event)"
              placeholder="Client name"
              required
              type="text"
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('dismiss')">Cancel</button>
        <button class="button is-primary" type="submit">Save</button>
      </footer>
    </form>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'CRUDClientModal',
  props: ['show','errorMessage', 'clientName','isError'],
  model: {
    event: 'update',
    prop: 'clientName'
  }
})
export default class CRUDClientModal extends Vue {}
</script>