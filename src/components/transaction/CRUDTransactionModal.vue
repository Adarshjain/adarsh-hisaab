<template>
  <b-modal :active="show" :can-cancel="false" has-modal-card @update:active="$emit('update:active',$event)">
    <form class="modal-card"
          style="min-width: 400px;max-width: 95vw;min-height: 630px;max-height: 95vh;margin: auto"
          @submit.prevent="validateAndEmit"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Transaction</p>
      </header>
      <section class="modal-card-body">
        <b-field grouped label="Date">
          <b-datepicker :mobile-native="false" :value="new Date(transaction.date)" @input="transaction.date = +$event">
            <template slot="trigger">
              <b-button type="is-primary">{{ formattedDate }}</b-button>
            </template>
          </b-datepicker>
        </b-field>
        <b-field label="Narration">
          <b-input
              :value="transaction.narration"
              placeholder="Narration"
              type="text"
              @input="transaction.narration = $event"
          >
          </b-input>
        </b-field>
        <b-field label="Type">
          <b-radio-button
              v-model="transaction.type"
              name="type"
              native-value="credit"
              :disabled="isEditMode"
          >
            Credit
          </b-radio-button>
          <b-radio-button
              v-model="transaction.type"
              name="type"
              native-value="debit"
              :disabled="isEditMode"
          >
            Debit
          </b-radio-button>
        </b-field>
        <b-field
            :message="amountErrorMessage"
            :type="isAmountError ? 'is-danger' : undefined"
            label="Amount"
        >
          <b-input
              :value="transaction.amount"
              placeholder="Amount"
              required
              type="number"
              @input="transaction.amount = parseInt($event)"
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" style="margin-left: auto;" type="button" @click="$emit('dismiss')">Cancel</button>
        <button class="button is-primary" type="submit">Save</button>
      </footer>
    </form>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// eslint-disable-next-line no-unused-vars
import {TransactionInput} from "@/types/types";
import {Watch} from "vue-property-decorator";
import {formatDate} from "@/helper";

@Component({
  name: 'CRUDTransactionModal',
  props: {
    show: {
      type: Boolean
    },
    transaction: {
      type: Object,
      required: true
    },
    isEditMode: {
      type: Boolean,
      default: false
    },
  },
  model: {
    event: 'update',
    prop: 'transaction'
  }
})
export default class CRUDTransactionModal extends Vue {
  transaction!: TransactionInput;
  amountErrorMessage = "";
  isAmountError = false;

  get formattedDate() {
    return formatDate(new Date(this.transaction.date));
  }

  @Watch('transaction.amount')
  onAmountUpdate() {
    this.amountErrorMessage = "";
    this.isAmountError = false;
  }

  validateAndEmit() {
    if (this.transaction.amount === 0) {
      this.amountErrorMessage = "Amount cannot be empty"
      this.isAmountError = true;
    } else {
      this.$emit('primaryAction');
    }
  }
}
</script>