<template>
  <div class="mainContainer">
    <main-header></main-header>
      <router-view :key="$route.fullPath"></router-view>
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
      activeView : ''
    }
  },
  mounted () {
    this.$nextTick(()=>{
    })
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import '~Styles/base.scss';
</style>
