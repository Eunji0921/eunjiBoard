<template>
  <CanvasWrapper :style="{width: propInfo.width + 'px', height: propInfo.height  + 'px'}">
    <Gauge :value="value"
          :width="propInfo.width"
          :height="propInfo.height"
          :styles="propInfo.styles"></Gauge>
  </CanvasWrapper>
</template>

<script>
import Vue from 'vue'
import CanvasWrapper from 'Component/canvas/canvasWrapper.vue';
import Gauge from 'Component/canvas/component/gauge_1.vue';

export default {
  name : 'gaugeCanvasComponent_2',
  components: {
    CanvasWrapper,
    Gauge
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