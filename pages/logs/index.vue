<template>  
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex md12 xs12 sm12>
        <v-data-table
          :headers="headers"
          :items="logsList"
          :loading="isLoading"
          :pagination.sync="pagination"
          class="elevation-1"
  >
  <v-progress-linear slot="progress" color="blue"  indeterminate></v-progress-linear>
    <template slot="items" slot-scope="props">
       <td class="text-xs-right">
          <v-icon v-if="props.item.level === `info`" color="blue">info</v-icon>
          <v-icon v-if="props.item.level === `warning`" color="orange">warning</v-icon>
          <v-icon v-if="props.item.level === `error`" color="red">error</v-icon>
        </td>
      <td class="text-xs-right">{{ props.item.message }}</td>
      <td class="text-xs-right">{{ formatDate(props.item.timestamp) }}</td>
    </template>
  </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LogType from '@/js/types/logType';
  import TableFormatter from '@/js/formatters/TableFormatter';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        isLoading: 'api/isLoading',
        logsList: 'api/logsList'
      }),
      logs() {
        var list = this.logsList;

        if (typeof list === 'string') {
          if (list.substring(0, 1) !== '[') {
            list = '[' + list;
          }
          if (list.substring(list.length, 1) !== ']') {
            list = list + ']';
          }
          list = JSON.parse(list);
        }
        return this.processItems(list);
      }
    },
    data() {
      return {
        headers: [
          { value: 'level', text: "Level", sortable: true },
          { value: 'message', text: "Message", sortable: true },
          { value: 'timestamp', text: "Date", sortable: true }
        ],
        pagination: {
          sortBy: 'timestamp',
          descending : true,
          rowsPerPage : 10
        },
      }
    },
    created() {
      this.getLogs();
    },
    methods: {
      ...mapActions({
        getLogs: 'api/getLogs'
      }),
      formatDate(value) {
        return TableFormatter.dateFormatter(value);
      },
      processItems(values) {
        if (values) {
          for (let item of values) {
            if (item.level === LogType.Error) {
              item._rowVariant = RowVariant.Danger;
            }
            if (item.level === LogType.Warning) {
              item._rowVariant = RowVariant.Warning;
            }
          }
        }
        return values;
      }
    }
  }
</script>