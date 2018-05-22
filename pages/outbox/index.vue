<template>  
<div>
  <v-btn :disabled="this.selected.length == 0" color="orange darken-2" @click="deleteSelected()">Delete</v-btn>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex>
        <v-data-table
          :headers="headers"
          :items="sentList"
          :loading="isLoading"
          class="elevation-1"
          v-model="selected"
           item-key="ID"
          :pagination.sync="pagination"
          select-all
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TableFormatter from '@/js/formatters/TableFormatter'

export default {
  data() {
    return {
      selected: [],
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
      getSentMessages: 'api/getSent',
      deleteSendItems: "api/deleteSendItems"
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
    },
    deleteSelected() {
      if(confirm("Delete selected items?"))
      {
        let selectedIds = [];

        for (let i = 0; i < this.selected.length; i++) {
          selectedIds.push(this.selected[i].ID);
        }

        this.deleteSendItems(selectedIds);
      }
    }
  },
};
</script>
<style>
  div[role='checkbox']{
    color: #ff9800 !important;
  }
</style>
