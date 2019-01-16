<template>
  <div id="container">
    <h2 class="msgTitle pointer">에러 페이지 입니다.</h2>
  </div>
</template>

<script>
export default {
  name: "error",
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  filters: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goMain() {
      this.$router.push({
        path: "/eunjiboard"
      });
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {}
};
</script>

<style>
</style>
