<template>
  <ul>
    <template v-for="(menu, index) in menuList">
      <li class="menu" 
          :class="[activeMenu == menu.key ? 'active' : '']" 
          :key="index"
          @click="setActiveMenu(menu.key)">
        <a href="javascript:;">{{menu.title}}</a>
      </li>
    </template>
  </ul>
</template>

<script>
import Vue from 'vue'

export default {
  name : 'headerBar',
  components : {

  },
  props: [],
  data(){
    return{
      activeMenu : 'index',
      menuList : [
        {key : 'index', title : '인덱스'},
        {key : 'geoDashBoard', title : '맵 대시보드'}
      ]
    }
  },
  mounted () {
    this.$nextTick(()=>{
    })
  },
  watch: {
  },
  methods: {
    setActiveMenu(menuKey){
      if(this.activeMenu !== menuKey){
        this.activeMenu = menuKey;
        this.$emit('activeMenu', menuKey);
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~Styles/header.scss';
</style>