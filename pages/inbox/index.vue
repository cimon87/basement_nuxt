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
      <td>{{ props.item.SenderNumber }}</td>
      <td class="text-xs-right">{{ props.item.TextDecoded }}</td>
      <td class="text-xs-right">{{ formatDate(props.item.ReceivingDateTime) }}</td>
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
  data () {
    return {
      pagination: {
        sortBy: 'ID',
        descending : true,
        rowsPerPage : 10
      },
      errorMesssage: "",
      headers: [
        { value: 'SenderNumber', text: "Sender", sortable: true },
        { value: 'TextDecoded', text: "Text", sortable: true },
        { value: 'ReceivingDateTime', text: "Date", sortable: true }
      ]
    }
  }
}
</script>