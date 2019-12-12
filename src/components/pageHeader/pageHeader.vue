<template>
  <div class="pageHeader">
    <div class="nav">
      <div class="nav-wrap">
        <div class="wrap-left">
          <router-link to="/" class="left-c">
            <span>Xiao🐉</span>&nbsp;&nbsp;
            <span>首页</span>
          </router-link>
        </div>
        <div class="wrap-right">
          <el-input placeholder="请输入内容" v-model="input2">
            <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button>
          </el-input>
          <ul class="menu">
            <li>
              <i class="el-icon-edit"></i> 写文章
            </li>
            <li>登录|注册</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./pageHeader.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./pageHeader.scss";
</style>