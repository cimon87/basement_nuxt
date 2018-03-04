<template>  
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex md7 xs12 sm12>
        <v-data-table
          :headers="headers"
          :items="permisssionList"
          :loading="isLoading"
          :pagination.sync="pagination"
          hide-actions
        >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props" >
            <td class="text-xs-center">
                <v-btn icon @click="editItem(props.item)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
            </td>
            <td class="text-xs-center">{{ props.item.Number }}</td>
            <td class="text-xs-center">
                <v-icon v-if="props.item.Receive === true" color="green">done</v-icon>
                <v-icon v-else color="red">do_not_disturb_alt</v-icon>
            </td>
            <td class="text-xs-center">
                <v-icon v-if="props.item.Send === true" color="green">done</v-icon>
                <v-icon v-else color="red">do_not_disturb_alt</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog v-model="isEditing" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit permission</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field label="Phone number" v-model="editedItem.Number"></v-text-field>
                <v-checkbox
                  color="orange"
                  label="Allow receive commands"
                  v-model="editedItem.Receive"
                ></v-checkbox>
                <v-checkbox
                  color="orange"
                  label="Allow receive commands"
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
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
export default {
  methods: {
    editItem(item) {
      this.editedIndex = this.permisssionList.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.isEditing = true;
    },
    close () {
      this.isEditing = false
      var self = this;

      setTimeout(() => {
        self.editedItem = Object.assign({}, this.defaultItem)
        self.editedIndex = -1;
      }, 300);
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.permisssionList[this.editedIndex], this.editedItem)
      } else {
        this.permisssionList.push(this.editedItem)
      }
      this.close()
    }
  },
  data () {
    return {
      defaultItem: {
        Number: '',
        Receive: false,
        Send: false
      },
      editedItem: {},
      editedIndex: -1,
      isEditing: false,
      isLoading: false,
      permisssionList: [
        { Number: '+48603705226', Receive: true, Send: true },
        { Number: '+48888888888', Receive: true, Send: false },
        { Number: '+48xxxxxxxxx', Receive: false, Send: false }
      ],
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



