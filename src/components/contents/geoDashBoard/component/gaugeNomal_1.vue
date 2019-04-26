<template>
  <div class="horizon-bar-center-balloon" :style="{width: width + 'px', height: height  + 'px'}">
    <div ref="barLabel" class="label">
      <div class="labelBody" :style="{background: backColor}">
        <div ref="barLabelTxt" class="labelTxt">{{value}}%</div>
      </div>
      <div class="labelArrow" :style="{background: backColor}"></div>
    </div>
    <div ref="barContainer" class="barContainer" :style="{background: backColor}">
      <div ref="bar" class="bar" :style="{background : barColor}"></div>
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
    },
    backColor : {
      type : String,
      default : '#221E5F'
    },  
    barColor : {
      type : String,
      default : '#7346FF'
    }
  },
  data(){
    return{
      width : 200,
      height : 55,
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
    this.$nextTick(()=>{
        this.initDataSetting();
    })
  },
  methods: {
    initDataSetting(){
      let refKey = this.refKey;

      this.$barContainer = $(this.$refs['barContainer']);
      this.$barLabel = $(this.$refs['barLabel']);
      this.$bar = $(this.$refs['bar']);
      this.$barLabelTxt = $(this.$refs['barLabelTxt']);

      this.procLabelAnimate();

    },
    procLabelAnimate(){
      var result = Math.round(this.value);

      var newPositionX = this.$barContainer.width() * (result / 100);
      var newPer = newPositionX / this.$barContainer.width() * 100;

      this.$bar.stop().animate({ "width": "0%" }, 0);
      this.$barLabel.stop().animate({ "margin-left": "0%" }, 0);
      this.$barLabelTxt.html(Math.round(newPer) + "%");

      this.$nextTick(()=>{
        this.$bar.stop().animate({ "width": result + "%" }, 1000);
        this.$barLabel.stop().animate({ "margin-left": newPer + "%" }, 1000);
      })
    }
  }

}
</script>
<style>
  .horizon-bar-center-balloon {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px; 
      clear: both;
  }

  .horizon-bar-center-balloon .barContainer {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-radius: 30px;
      min-height: 15px;
      height: 20%;
      padding: 4px;
      box-sizing: border-box;
  }

  .horizon-bar-center-balloon .bar {
      height: 100%;
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
      border-radius: 6px;
      box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
      text-align: center;
      left: -50%;
      position: relative;
  }

  .horizon-bar-center-balloon .labelTxt {
      padding: 7px;
      font-size: 12px;
      text-align: center;
      color: #FFF;
      font-weight: bold;
  }

  .horizon-bar-center-balloon .labelArrow {
      left: -50%;
      position: relative;
      width: 10px;
      height: 10px;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      top: -5px;
      box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
  }
</style>