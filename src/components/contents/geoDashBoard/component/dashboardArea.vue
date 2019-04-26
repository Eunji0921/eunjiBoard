<template>
  <div class="dashboardArea">
    <div class="valueContainer">
      <div class="barArea">
        <gaugeNormal-1 :value="value" :backColor="'#053F59'" :barColor="'#01BAD4'"></gaugeNormal-1>
        <gaugeNormal-1 :value="value" :backColor="'#221E5F'" :barColor="'#7346FF'"></gaugeNormal-1>
      </div>
      <div class="gaugeArea">
        <gaugeCanvas-1 :value="value" :propInfo="{width : 100, height : 100, styles : {backgorundColor : 'rgba(255,255,255,0)', color : 'rgba(34,150,182,1)', textColor : 'rgba(200,200,200,1)', borderRadius : 0}}"></gaugeCanvas-1>
        <gaugeCanvas-2 :value="value" :propInfo="{width : 150,height : 200, styles : {backgorundColor : 'rgba(255,255,255,0)', color : 'rgba(34,150,182,1)', textColor : 'rgba(200,200,200,1)', borderRadius : 0}}"></gaugeCanvas-2>
        <gaugeCanvas-3 :value="value" :propInfo="{width : 100, height : 200, styles : {color : '#D71764', textColor : 'rgba(200,200,200,1)'}}"></gaugeCanvas-3>
        <gaugeCanvas-3 :value="value" :propInfo="{width : 100, height : 200, styles : {color : 'rgba(109,181,255,1)', textColor : 'rgba(200,200,200,1)'}}"></gaugeCanvas-3>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import gaugeCanvas_1 from './gaugeCanvas_1.vue'
import gaugeCanvas_2 from './gaugeCanvas_2.vue'
import gaugeCanvas_3 from './gaugeCanvas_3.vue'
import gaugeNormal_1 from './gaugeNomal_1.vue'

export default {
  name : 'dashboardArea',
  components : {
    'gaugeCanvas-1' : gaugeCanvas_1,
    'gaugeCanvas-2' : gaugeCanvas_2,
    'gaugeCanvas-3' : gaugeCanvas_3,
    'gaugeNormal-1' : gaugeNormal_1
  },
  props: ['value'],
  data(){
    return{
    }
  },
  mounted() {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style>
  .dashboardArea{
    height: 100%;
    width: 100%;
    max-width: 960px;
    position: relative;
  }
  .dashboardArea > .valueContainer{
    width: 100%;
    height: 500px;
    bottom: 0;
    position: absolute;
  }
  .dashboardArea > .valueContainer > .barArea{
    width: 50%;
    height: 100%;
  }
  .dashboardArea > .valueContainer > .gaugeArea{
    width: 50%;
    height: 100%;
  }
</style>
