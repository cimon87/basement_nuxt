<template>
    <div>
        <template v-for="(gpio, index) in localGpios">
          <v-switch
              v-bind:key="index"
              :label="formatLabel(gpio)"
              :true-value="true"
              :false-value="false"
              v-model="stateCache[gpio.PinName]"
              :readonly="gpio.ReadOnly == 1"
              @change="onChange(gpio, $event)"
              color="orange">
        </v-switch>
        </template>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  created () {
    this.getGpioLocal();
  },
  
  computed: {
    ...mapGetters({
        gpios: 'api/gpioList'
      }),
    localGpios() {
      return this.gpios.map((item, index) => {
        Vue.set( this.stateCache, item.PinName, item.State == 1);
        return item});
    },
  },
  data () {
    return {
      stateCache: {}
    }
  },
  methods: {
    onChange(gpio,state){
      if (gpio.ReadOnly === 1) {
        alert("GPIO is read only");
        state = 0;
        this.$store.commit('api/updateGpio', { gpio, state })
      } else {
        this.setGpio({PinName: gpio.PinName, State: state})
        .catch((error) => {
          console.log(error);
          alert(error);
        })
      }
    },
    formatLabel(gpio){
      var isReadOnly = gpio.ReadOnly == 1 ? '- read-only' : '';
      return gpio.Description +'(' +gpio.PinName + isReadOnly + ')';
    },
    ...mapActions({
      getGpio: 'api/getGpio',
      setGpio: 'api/setGpio'
    }),
    getGpioLocal() {
      this.getGpio()
      .catch((error) => {
        console.log(error);
      })
    },
    changeState(gpio, state) {
      if (gpio.ReadOnly === 1) {
        alert("GPIO is read only");
        state = 0;
        this.$store.commit('basementApi/updateGpio', { gpio, state })
      } else {
        this.setGpio({PinName: gpio.PinName, State: state})
        .catch((error) => {
          console.log(error);
          alert(error);
        })
      }
    }
  }
}
</script>