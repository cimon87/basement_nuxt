<template>
<div>
  <v-form v-model="valid" ref="form" lazy-validation> 
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md6>
          <v-text-field
            label="To"
            v-model="sms.to"
            :counter="11"
            required>
          </v-text-field>
        </v-flex>
        </v-layout>
       <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md6>
          <v-text-field
            label="Text"
            v-model="sms.text"
            textarea
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md1>
          <v-btn
          outline 
          dark
          @click="submit"
          :disabled="!valid">
          Send
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
  
  <v-layout row justify-center>
    <v-dialog v-model="showSmsStatus" max-width="350">
      <v-card>
        <v-card-title class="headline">{{ smsSendType }}</v-card-title>
        <v-card-text>{{ smsSendMessage  }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="showSmsStatus = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      valid : false,
      showSmsStatus: false,
      smsSendType: 'success',
      smsSendMessage: '',
      sms: {
        to: "48603705226",
        text: ""
      }
    };
  },
  methods: {
    ...mapActions({
      sendSms: 'api/sendSms'
    }),
    submit () {
        if (this.$refs.form.validate()) {
          //this.smsSendType = 'Success!';
          //this.smsSendMessage = "Message successfully sent to: " + this.sms.to;
          //this.showSmsStatus = true;
          this.sendSmsLocal(this.sms.to, this.sms.text);
        }
    },
    sendSmsLocal(to, text) {
      this.sendSms({to, text})
      .then((response) => {
        console.log(response);

        this.smsSendType = 'Success!';
        this.smsSendMessage = "Message successfully sent to: " + this.sms.to;
        this.showSmsStatus = true;
      })
      .catch((error) => {
        console.log(error);

        this.smsSendType = 'Failed!';
        this.smsSendMessage = "Sth's wrong";
        this.showSmsStatus = true;
      })
    },
    onSend(event) {
      let smsTo = this.sms.to;
      let smsText = this.sms.text;

      let beginWith = smsTo.substring(0, 1);
      if (beginWith !== '+') {
        smsTo = '+' + smsTo;
      }

      this.sendSmsLocal(smsTo, smsText);
    }
  }
};
</script>

