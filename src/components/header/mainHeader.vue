<template>
  <div class="headerContainer">
    <template v-for="(menu, index) in menuList">
      <input :id="menu.title" name="checkbox" type="checkbox" :key="'menu_radio_' + index">
      <router-link
        v-if="menu.type == 'master'"
        class="menu" 
        active-class="active"
        tag="label"
        :key="index"
        :to="menu.url">
          <span>{{menu.title}}</span>
          <div class="lil_arrow"></div>
          <div class="bar"></div>
          <div class="headerContainer__content">
            <ul>
              <template v-for="(subMenu, subIndex) in menu.subMenu">
                <router-link class="menu" 
                  active-class="active"
                  tag="li"
                  :key="'subMenu_' + subIndex"
                  :to="menu.url">
                  {{subMenu.title}}
                </router-link>
              </template>
            </ul>
          </div>
      </router-link>
      <label 
        v-if="menu.type == 'sub'"
        :for='menu.title'
        :key="'menu' + index">
          <span>{{menu.title}}</span>
          <div class="lil_arrow"></div>
          <div class="bar"></div>
          <div v-if="menu.type == 'sub'" class="headerContainer__content">
            <ul>
              <template v-for="(subMenu, subIndex) in menu.subMenu">
                <router-link class="menu" 
                  active-class="active"
                  tag="li"
                  :key="'subMenu_' + subIndex"
                  :to="subMenu.url">
                  {{subMenu.title}}
                </router-link>
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
  mounted(){    
    let target;
    let fullPath = this.$route.fullPath;
    if(fullPath.indexOf("geoDashBoard") > -1){
      target = 'dashBoard';
    }
    if(typeof target !== 'undefined') document.getElementById(target).click();
    this.$router.push({ path: fullPath });
  },
  data(){
    return{
      menuList : [{
                    title : 'index',
                    type:'master',
                    url:'/main/index',
                    subMenu: []
                  },
                  {
                    title : 'dashBoard',
                    type:'sub',
                    url:'',
                    subMenu: [
                              {title : 'Map', url: '/main/geoDashBoard'},
                              {title : 'Test_2', url: '#'},
                              {title : 'Test_3', url: '#'},
                              {title : 'Test_4', url: '#'}
                            ]
                  }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import '~Styles/header.scss';
</style>