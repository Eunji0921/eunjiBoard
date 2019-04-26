<template>
  <CanvasWrapper :style="{width: propInfo.width + 'px', height: propInfo.height  + 'px'}">
    <Donut :value="value"
          :width="propInfo.width"
          :height="propInfo.height"
          :styles="propInfo.styles"></Donut>
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
    },
    propInfo : {
      type : Object
    }
  }
}
</script>
<style>
</style>