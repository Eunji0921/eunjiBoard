<template>
  <section>
    <div id="layout_1"></div>
    <div id="layout_2"></div>
    <div id="layout_3"></div>
  </section>
</template>

<script>

export default {
  name: 'sample_1',
  components: {

  },
  data () {
    return {

    }
  }
}
</script>

<style>
  div{
      height: 100px;
      float:left;
  }
  @media screen and (min-width:500px){

      div{
          height: 100px;
      }
      #layout_1{
          width: 30%;
          background-color: green;
      }
      #layout_2{
          margin-left: 5%;
          width: 45%;
          background-color: blue;
      }
      #layout_3{
          margin-left: 5%;
          width: 15%;
          background-color: red;
      }
  }
  @media screen and (max-width:500px){

      #layout_1{
          width: 30%;
          background-color: green;
      }
      #layout_2{
          margin-left: 5%;
          width: 65%;
          background-color: blue;
      }
      #layout_3{
          margin-top: 5%;
          width: 100%;
          background-color: red;
      }
  }
</style>