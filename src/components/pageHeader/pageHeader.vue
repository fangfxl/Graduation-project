<template>
  <div class="pageHeader">
    <div class="nav">
      <div class="nav-wrap">
        <div class="wrap-left">
          <router-link to="/" class="left-c">
            <span >龙哥blogs</span>
          </router-link>
        </div>
        <div class="wrap-right">
          <el-input placeholder="请输入内容" v-model="input2">
            <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button>
          </el-input>
          <ul class="menu">
              <router-link to="/" class="item-select">首页</router-link>
              <router-link to="/about" class="item-select"> 推荐文章</router-link>
              <router-link to="/home" class="item-select"> 个人中心</router-link>
              <router-link to="/login" class="item-select">登录</router-link>
              <router-link to="/register" class="item-select">注册</router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./pageHeader.js"></script>

<style scoped lang="scss">
@import "./pageHeader.scss";
</style>