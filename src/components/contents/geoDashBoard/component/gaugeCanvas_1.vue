<template>
  <CanvasWrapper :style="{width: width + 'px', height: height  + 'px'}">
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
  name : 'gaugeCanvasComponent_1',
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
      width : 150,
      height : 150,
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