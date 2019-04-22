<template>
  <div class="indexContainer">
    인덱스페이지입니다.
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name : 'index',
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

