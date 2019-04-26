<template>
  <div class="contentContainer">
    <south-korea-geo></south-korea-geo>
    <dash-board-area :value="value"></dash-board-area>
  </div>
</template>

<script>
import Vue from 'vue'
import southKoreaGeo from './component/southKoreaGeo.vue'
import dashBoardArea from './component/dashBoardArea.vue'

export default {
  name : 'baseContainer',
  components : {
    'south-korea-geo' : southKoreaGeo,
    'dash-board-area' : dashBoardArea,
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
