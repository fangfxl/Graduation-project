<template>
  <el-container style=" border: 1px solid #eee">
    <el-container>
      <el-aside width="200px" style="height:850px; background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2', '3']">
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
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>分类管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="3"><router-link :to="{name: 'sortList'}" tag="li" >分类列表</router-link></el-menu-item>
              <el-menu-item index="4"><router-link :to="{name: 'addSort'}" tag="li" >添加分类</router-link></el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>标签管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="3"><router-link :to="{name: 'labelList'}" tag="li" >标签列表</router-link></el-menu-item>
              <el-menu-item index="4"><router-link :to="{name: 'addLabel'}" tag="li" >添加标签</router-link></el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-message"></i>评论管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="3"><router-link :to="{name: 'labelList'}" tag="li" >标签列表</router-link></el-menu-item>
              <el-menu-item index="4"><router-link :to="{name: 'addLabel'}" tag="li" >添加标签</router-link></el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-message"></i>留言管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="3"><router-link :to="{name: 'labelList'}" tag="li" >标签列表</router-link></el-menu-item>
              <el-menu-item index="4"><router-link :to="{name: 'addLabel'}" tag="li" >添加标签</router-link></el-menu-item>
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
  },
  created() {
    this.getArticles();
  }
};
</script>

<style>


.el-aside {
  color: #333;
}
</style>