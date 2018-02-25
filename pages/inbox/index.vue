<template>  
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex md12 xs12 sm12>
        <v-data-table
          :headers="headers"
          :items="inboxList"
          :loading="isLoading"
          :pagination.sync="pagination"
          class="elevation-1"
  >
  <v-progress-linear slot="progress" color="blue"  indeterminate></v-progress-linear>
    <template slot="items" slot-scope="props">
      <td width='10%'>{{ props.item.SenderNumber }}</td>
      <td width='75%' class="text-xs-left">{{ props.item.TextDecoded }}</td>
      <td class="text-xs-left">{{ formatDate(props.item.ReceivingDateTime) }}</td>
    </template>
  </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import TableFormatter from '@/js/formatters/TableFormatter'

export default {
  data () {
    return {
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
      getInbox: 'api/getInbox'
    }),
    getInboxLocal() {
      this.getInbox()
      .catch((err) => {
        console.log(err);
        this.errorMesssage = err.Message;
      })
    }
  },
}
</script>