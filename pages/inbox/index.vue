<template>  
  <div>
    <v-btn :disabled="this.selected.length == 0" color="orange darken-2" @click="deleteSelected()">Delete</v-btn>
    <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex md12 xs12 sm12>
        <v-data-table
          id="table"
          :headers="headers"
          :items="inboxList"
          :loading="isLoading"
           v-model="selected"
           item-key="ID"
          :pagination.sync="pagination"
          select-all
          class="elevation-2"
  >
  <v-progress-linear slot="progress" color="blue"  indeterminate></v-progress-linear>
  
    <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            color="orange"
            hide-details
          ></v-checkbox>
        </td>
        <td width='10%'>{{ props.item.SenderNumber }}</td>
        <td width='65%' class="text-xs-left">{{ props.item.TextDecoded }}</td>
        <td class="text-xs-left">{{ formatDate(props.item.ReceivingDateTime) }}</td>
    </template>
  </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import TableFormatter from '@/js/formatters/TableFormatter'

export default {
  data () {
    return {
      selected: [],
      pagination: {
        sortBy: 'ID',
        descending : true,
        rowsPerPage : 10
      },
      errorMesssage: "",
      headers: [
        { value: 'SenderNumber', text: "Sender", sortable: true, align: 'center' },
        { value: 'TextDecoded', text: "Text", sortable: true, align: 'left' },
        { value: 'ReceivingDateTime', text: "Date", sortable: true, align: 'left' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      inboxList: 'api/inboxList',
      isLoading: 'api/isLoading'
    }),
    requestError () {
      return this.errorMessage;
    },
    showError () {
      return this.errorMesssage !== '';
    }
  },
  created () {
    this.getInboxLocal();
  },
  methods: {
    formatDate(value) {
      return TableFormatter.dateFormatter(value);
    },
    ...mapActions({
      getInbox: 'api/getInbox',
      deleteInboxItems: 'api/deleteInboxItems'
    }),
    getInboxLocal() {
      this.getInbox()
      .catch((err) => {
        console.log(err);
        this.errorMesssage = err.Message;
      })
    },
    deleteSelected() {
      if(confirm("Delete selected items?"))
      {
        let selectedIds = [];

        for (let i = 0; i < this.selected.length; i++) {
          selectedIds.push(this.selected[i].ID);
        }

        this.deleteInboxItems(selectedIds);
      }
    }
  },
}
</script>

<style>

  div[role='checkbox']{
    color: #ff9800 !important;
  }
</style>

