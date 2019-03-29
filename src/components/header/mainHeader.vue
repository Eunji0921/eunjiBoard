<template>
  <div class="headerContainer">
    <template v-for="(menu, index) in menuList">
      <input :id="menu.title" name="radio" type="radio" :key="'menu_radio_' + index">
      <label :style="{'height': 69 + (menu.subMenu.length * 64) +'px'}" :for='menu.title' :key="'menu' + index">
        <span>{{menu.title}}</span>
        <div class="lil_arrow"></div>
        <div class="bar"></div>
        <div v-if="menu.subMenu.length" class="headerContainer__content">
          <ul>
            <template v-for="(subMenu, subIndex) in menu.subMenu">
              <li :key="'subMenu_' + subIndex">{{subMenu}}</li>
            </template>
          </ul>
        </div>
      </label>
    </template>
    </div>
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
      menuList : [
        {key : 'index', title : 'Index', subMenu: []},
        {key : 'DashBoard', title : 'DashBoard', subMenu: ['Map', 'Map2', 'Map3', 'Map4']}
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
  }
}
</script>

<style lang="scss">
  @import '~Styles/header.scss';
</style>