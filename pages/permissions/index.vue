<template>  
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex md7 xs12 sm12>
        <v-data-table
          :headers="headers"
          :items="permissionList"
          :loading="isLoading"
          :pagination.sync="pagination"
          hide-actions
        >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props" >
            <td class="text-xs-center">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                  <v-icon color="red lighten-2">delete_forever</v-icon>
                </v-btn>
            </td>
            <td class="text-xs-center">{{ props.item.Number }}</td>
            <td class="text-xs-center">
                <v-icon v-if="props.item.Receive " color="green">done</v-icon>
                <v-icon v-else color="red">do_not_disturb_alt</v-icon>
            </td>
            <td class="text-xs-center">
                <v-icon v-if="props.item.Send" color="green">done</v-icon>
                <v-icon v-else color="red">do_not_disturb_alt</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline"> {{ dialogTitle }} </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field 
                  label="Phone number" 
                  v-model="editedItem.Number" 
                  :readonly="editedIndex >= 0"
                  required>
                </v-text-field>
                <v-checkbox
                  color="orange"
                  label="Allow receive notifications"
                  v-model="editedItem.Receive"
                ></v-checkbox>
                <v-checkbox
                  color="orange"
                  label="Allow send commands"
                  v-model="editedItem.Send"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br>
    <v-fab-transition>
      <v-btn
        color="green"
        dark
        fixed
        fab
        bottom
        left
        @click="addItem()"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      permissionList : 'api/permissionsList',
      isLoading: 'api/isLoading'
    }),
    dialogTitle () {
      return this.editedIndex === -1 ? 'Add permission' : 'Edit permission'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.getPermissionList();
  },
  methods: {
    ...mapActions({
      getPermissionList : "api/getPermissionList",
      updatePermissionItem: "api/updatePermissionItem",
      createPermissionItem: "api/createPermissionItem",
      deletePermissionItem: "api/deletePermissionItem"
    }),
    deleteItem (item) {
        let index = this.permissionList.indexOf(item)
        if(confirm('Are you sure you want to delete this number: ' + item.Number))
        {
          this.deletePermissionItem(item.Number)
        }
    },
    addItem() {
      this.editItem(this.defaultItem);
    },
    editItem(item) {
      this.editedIndex = this.permissionList.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close () {
      this.dialog = false
      var self = this;
    },
    save () {
      if (this.editedIndex < 0) {
        this.createPermissionItem(this.editedItem);
      } else {
        this.updatePermissionItem(this.editedItem);
      }
      this.close()
    }
  },
  data () {
    return {
      dialog: false,
      defaultItem: {
        Number: '+48',
        Receive: false,
        Send: false
      },
      editedItem: {},
      editedIndex: -1,
      pagination: {
        sortBy: 'Number',
        descending : false,
        rowsPerPage : 10
      },
      errorMesssage: "",
      headers: [
        { value: 'name', text: 'Actions', align: 'center', sortable: false },
        { value: 'Number', text: "Sender", sortable: true, align: 'center' },
        { value: 'Receive', text: "Receive", sortable: true, align: 'center' },
        { value: 'Send', text: "Notifications", sortable: true, align: 'center' },
      ]
    }
  },
}
</script>



