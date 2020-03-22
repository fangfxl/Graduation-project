<template>
  <el-container style=" border: 1px solid #eee">
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>博文管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="1"><router-link :to="{name: 'articleList'}" tag="li" >博文列表</router-link></el-menu-item>
              <el-menu-item index="2"><router-link :to="{name: 'addarticle'}" tag="li" >创建博文</router-link></el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      articles: []
    };
  },
  methods: {
    getArticles() {
      this.$http.get("articles").then(res => {
        this.articles = res.data;
        console.log(this.articles);
      });
    }
    // edit(id) {
    //   this.$router.push(`/articles/edit/${id}`).then(() => {
    //     this.fetch();
    //   });
    // },
    // remove(id) {
    //   this.$http.delete(`articles/${id}`).then(() => {
    //     this.$message({
    //       message: "文章删除成功",
    //       type: "success"
    //     });
    //     this.fetch();
    //   });
    // }
  },
  created() {
    this.getArticles();
  }
};
</script>

<style>
/* .el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
} */

.el-aside {
  color: #333;
}
</style>