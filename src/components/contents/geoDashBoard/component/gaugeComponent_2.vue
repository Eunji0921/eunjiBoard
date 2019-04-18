<template>
  <CanvasWrapper :style="{width: width + 'px', height: height  + 'px'}">
    <Gauge :value="value"
          :width="width"
          :height="height"
          :styles="styles"></Gauge>
  </CanvasWrapper>
</template>

<script>
import Vue from 'vue'
import CanvasWrapper from 'Component/canvas/canvasWrapper.vue';
import Gauge from 'Component/canvas/component/gauge_1.vue';

export default {
  name : 'gaugeComponent',
  components: {
    CanvasWrapper,
    Gauge
  },
  props: {
    value : {
      type : Number,
      default : 0
    }
  },
  data(){
    return{
      width : 150,
      height : 300,
      styles : {
        backgorundColor : 'rgba(255,255,255,0)',
        color : 'rgba(34,150,182,1)',
        textColor : 'rgba(200,200,200,1)',
        borderRadius : 0
      }
    }
  }
}
</script>
<style>
</style>