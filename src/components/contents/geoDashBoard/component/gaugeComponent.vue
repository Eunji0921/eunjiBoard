<template>
  <CanvasWrapper style="width: 300px; height: 300px;">
    <Donut :value="value"
          :width="width"
          :height="height"
          :styles="styles"></Donut>
  </CanvasWrapper>
</template>

<script>
import Vue from 'vue'
import CanvasWrapper from 'Component/canvas/canvasWrapper.vue';
import Donut from 'Component/canvas/component/donut_1.vue';

export default {
  name : 'gaugeComponent',
  components: {
    CanvasWrapper,
    Donut
  },
  props: {
    value : {
      type : Number,
      default : 0
    }
  },
  data(){
    return{
      width : 300,
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