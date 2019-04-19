<template>
  
</template>


<script>
import Vue from 'vue';
import $ from 'jquery';

export default {
  name : 'sample',
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