<template>
  <div class="about">
    <articleList></articleList>
    <div class="pages">
      
    </div>
  </div>
</template>
<script>
import articleList from "../../components/articleList/articleList.vue";
export default {
  name: "about",

  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    articleList,
  },
  created() {},
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (newVal === "/home") {
        console.log("欢迎进入login");
      } else if (newVal === "/about") {
        console.log("欢迎进入register");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "About.scss";
</style>