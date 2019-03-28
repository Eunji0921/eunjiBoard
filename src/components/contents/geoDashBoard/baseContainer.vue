<template>
  <div class="contentContainer">
    <gaugeComponent :value="value"></gaugeComponent>
  </div>
</template>

<script>
import Vue from 'vue'
import gaugeComponent from './component/gaugeComponent.vue'

export default {
  name : 'baseContainer',
  components : {
    gaugeComponent
  },
  props: [],
  data(){
    return{
      value : 0
    }
  },
  mounted() {
    setInterval(() => {
      this.value = Math.floor(Math.random() * (100 - 0 + 1)); 
      console.log("this.value@@", this.value);
    }, 5000);
  },
  watch: {
  },
  methods: {
  }
}
</script>
