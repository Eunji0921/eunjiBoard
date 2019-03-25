<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas-element"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name : 'canvasWrapper',
  props: [],
  data(){
    return{
      provider : {
        context : null  // CanvasRenderingContext 
      }
    }
  },
  provide () {
    return {
      provider: this.provider
    }
  },
  mounted () {
    this.$nextTick(()=>{
      this.provider.context = this.$refs['canvas-element'].getContext('2d');
      this.$refs['canvas-element'].width = this.$refs['canvas-element'].parentElement.clientWidth;
      this.$refs['canvas-element'].height = this.$refs['canvas-element'].parentElement.clientHeight;
    })
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style>
</style>