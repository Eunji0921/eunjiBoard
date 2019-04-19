<template>
  <div class="horizon-bar-center-balloon" style="width:400px; height:100px;">
    <div ref="barLabel" class="label">
      <div class="labelBody">
        <div ref="barLabelTxt" class="labelTxt">{{value}}%</div>
      </div>
      <div class="labelArrow"></div>
    </div>
    <div ref="barContainer" class="barContainer">
      <div ref="bar" class="bar" :style="{ width : value + '%'}"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';

export default {
  name : 'gaugeNormalComponent_1',
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
      },
      $barContainer : null,
      $bar : null,
      $barLabel : null,
      $barLabelTxt : null
    }
  },
  mounted(){
    this.$barContainer = $(this.$refs.barContainer);
    this.$barLabel = $(this.$refs.barLabel);
    this.$bar = $(this.$refs.bar);
    this.$barLabelTxt = $(this.$refs.barLabelTxt);

    this.procLabelAnimate();
  },
  watch : {
    value(newVal, oldVal){
      this.procLabelAnimate();
    } 
  },
  methods: {
    procLabelAnimate(){
      var result = Math.round(this.value);

      var newPositionX = this.$barContainer.width() * (result / 100);
      var newPer = newPositionX / this.$barContainer.width() * 100;

      this.$bar.stop().animate({ "width": "0%" }, 0);
      this.$barLabel.stop().animate({ "margin-left": "0%" }, 0);
      this.$bar.stop().animate({ "width": result + "%" }, 1000);
      this.$barLabel.stop().animate({ "margin-left": newPer + "%" }, 1000);

      this.$barLabelTxt.html(Math.round(newPer) + "%");
    }
  }

}
</script>
<style>
  .horizon-bar-center-balloon {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
  }

  .horizon-bar-center-balloon .barContainer {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: #FFF;
      border-radius: 30px;
      min-height: 10px;
      height: 20%;
  }

  .horizon-bar-center-balloon .bar {
      width: 50%;
      height: 100%;
      min-height: 10px;
      height: 100%;
      background: #0EB795;
      border-radius: 30px;
  }

  .horizon-bar-center-balloon .label {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-items: center;
      position: relative;
      width: 20%;
  }

  .horizon-bar-center-balloon .labelBody {
      white-space: nowrap;
      /*min-width:120px;*/
      background: #0EB795;
      border-radius: 6px;
      box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
      text-align: center;
      left: -50%;
      position: relative;
  }

  .horizon-bar-center-balloon .labelTxt {
      padding: 7px;
      font-size: 18px;
      text-align: center;
      color: #FFF;
  }

  .horizon-bar-center-balloon .labelArrow {
      left: -50%;
      position: relative;
      width: 10px;
      height: 10px;
      background: #0EB795;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      top: -5px;
      box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
  }
</style>