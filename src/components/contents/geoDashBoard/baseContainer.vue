<template>
  <div class="contentContainer">
    <gaugeCanvas-1 :value="value"></gaugeCanvas-1>
    <gaugeCanvas-2 :value="value"></gaugeCanvas-2>
    <gaugeNormal-1 :value="value"></gaugeNormal-1>
  </div>
</template>

<script>
import Vue from 'vue'
import gaugeCanvas_1 from './component/gaugeCanvas_1.vue'
import gaugeCanvas_2 from './component/gaugeCanvas_2.vue'
import gaugeNormal_1 from './component/gaugeNomal_1.vue'

export default {
  name : 'baseContainer',
  components : {
    'gaugeCanvas-1' : gaugeCanvas_1,
    'gaugeCanvas-2' : gaugeCanvas_2,
    'gaugeNormal-1' : gaugeNormal_1
  },
  props: [],
  data(){
    return{
      value : 90
    }
  },
  mounted() {
    // setInterval(() => {
    //   this.value = Math.floor(Math.random() * (100 - 0 + 1)); 
    //   console.log("this.value@@", this.value);
    // }, 5000);
  },
  watch: {
  },
  methods: {
  }
}
</script>
