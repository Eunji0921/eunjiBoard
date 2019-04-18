<template>
  <div class="contentContainer">
    <gauge-1 :value="value"></gauge-1>
    <gauge-2 :value="value"></gauge-2>
  </div>
</template>

<script>
import Vue from 'vue'
import gaugeComponent from './component/gaugeComponent.vue'
import gaugeComponent_2 from './component/gaugeComponent_2.vue'

export default {
  name : 'baseContainer',
  components : {
    'gauge-1' : gaugeComponent,
    'gauge-2' : gaugeComponent_2
  },
  props: [],
  data(){
    return{
      value : 50
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
