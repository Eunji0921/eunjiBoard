<template>
  <CanvasWrapper :style="{width: propInfo.width + 'px', height: propInfo.height  + 'px'}">
    <Person :value="value"
          :width="propInfo.width"
          :height="propInfo.height"
          :styles="propInfo.styles"></Person>
  </CanvasWrapper>
</template>

<script>
import Vue from 'vue'
import CanvasWrapper from 'Component/canvas/canvasWrapper.vue';
import Person from 'Component/canvas/component/person_1.vue';

export default {
  name : 'gaugeCanvasComponent_3',
  components: {
    CanvasWrapper,
    Person
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