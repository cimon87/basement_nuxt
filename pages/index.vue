<template>
  <v-layout column justify-center align-left>
    <v-flex xs12 sm5 md3>
        <v-switch
          label="Security"
          v-model="securityEnabled" 
          color="orange">
        </v-switch>
        <v-switch
          label="Silent"
          v-model="silentModeEnabled"
          color="orange">
        </v-switch>
        <v-switch
          label="SMS"
          v-model="smsEnabled" 
          color="orange">
        </v-switch>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      status: 'api/securityStatus'
    }),
    securityEnabled: {
      get: function() { return this.status.Enabled },
      set: function(state) { this.setSecurityState({Enabled: state});}
    },
    silentModeEnabled: {
      get: function() { return this.status.SilentMode },
      set: function(state) { this.setSecurityState({SilentMode: state});}
    },
    smsEnabled: {
      get: function() { return this.status.SmsEnabled },
      set: function(state) { this.setSecurityState({SmsEnabled: state}); }
    }
  },
  methods: {
    ...mapActions({
      getSecurityStatus: 'api/getSecurityStatus',
      setSecurityState: 'api/setSecurityState'
    })
  },
  created () {
    this.getSecurityStatus();
  },
  data() {
    return {
      on: 0,
      off: 1,

      options: [
        { text: 'Off', value: 0 },
        { text: 'On', value: 1 }
      ]
    };
  }
};
</script>

