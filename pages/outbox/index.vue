<template>  
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex>
        <v-data-table
          :headers="headers"
          :items="sentList"
          :loading="isLoading"
          :pagination.sync="pagination"
          class="elevation-1"
  >
  <v-progress-linear slot="progress" color="blue"  indeterminate></v-progress-linear>
    <template slot="items" slot-scope="props">
      <td width='5%'>{{ props.item.ID }}</td>
      <td width='5%' class="text-xs-left">{{ props.item.Status }}</td>
      <td width='5%' class="text-xs-left">{{ props.item.DestinationNumber }}</td>
      <td class="text-xs-left">{{ props.item.TextDecoded }}</td>
      <td class="text-xs-left">{{ props.item.SMSCNumber }}</td>
      <td class="text-xs-left">{{ formatDate(props.item.UpdatedInDB) }}</td>
      <td class="text-xs-left">{{ formatDate(props.item.InsertIntoDB) }}</td>
    </template>
  </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TableFormatter from '@/js/formatters/TableFormatter'

export default {
  data() {
    return {
      pagination: {
        sortBy: 'ID',
        descending : true,
        rowsPerPage : 10
      },
      errorMessage: '',
      headers: [
        { text: "Id", value: "ID", sortable: true, align: 'center'  },
        { text: "Status", value: "Status", sortable: true, align: 'left'  },
        { text: "Destination Number", value: "DestinationNumber", sortable: true, align: 'left'  },
        { text: "Text", value: "TextDecoded", sortable: true, align: 'left'  },
        { text: "SMSCNumber", value: "SMSCNumber", sortable: true, align: 'left'  },
        { text: "Updated Date", value: "UpdatedInDB", sortable: true, align: 'left'  },
        { text: "Inserted Date", value: "InsertIntoDB", sortable: true, align: 'left'  }
      ]
    };
  },
  computed: {
    ...mapGetters({
      sentList: 'api/sentList',
      isLoading: 'api/isLoading'
    }),
    showError () {
      return this.errorMessage !== '';
    },
    errorMessageComputed () {
      return this.errorMessage;
    }
  },
  created() {
    this.getMessages();
  },
  methods: {
    ...mapActions({
      getSentMessages: 'api/getSent'
    }),
    getMessages() {
      this.getSentMessages()
      .catch((error) => {
        console.log(error);
        this.errorMessage = error.message;
      })
    },
    formatDate(value) {
      return TableFormatter.dateFormatter(value);
    }
  },
};
</script>