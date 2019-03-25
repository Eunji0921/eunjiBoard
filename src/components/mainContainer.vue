<template>
  <div class="mainContainer">
    <main-header v-on:activeMenu="activeContents"></main-header>
  </div>
</template>

<script>
import Vue from 'vue'
import MainHeader from './header/mainHeader.vue'

export default {
  name : 'mainController',
  components : {
    'main-header' : MainHeader
  },
  props: [],
  data(){
    return{
    
    }
  },
  mounted () {
    this.$nextTick(()=>{
    })
  },
  watch: {
  },
  methods: {
    activeContents(menuKey){
      console.log("activeContents@@@", menuKey);
    }
  }
}
</script>

<style>
</style>