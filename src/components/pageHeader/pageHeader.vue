<template>
  <div class="pageHeader">
    <div class="nav">
      <div class="nav-wrap">
        <div class="wrap-left">
          <router-link to="/" class="left-c">
           
            <div class="left-logo">
              <span>Xiao🐉</span>
            </div>
            <div class="left-moudle">
              <span>首页</span>
            </div>
            <!-- </a> -->
          </router-link>
        </div>
        <div class="wrap-right">
          <!-- <div class="r-search">
                   
               </div> -->
          <div class="r-do">
            <div>
              <el-input placeholder="请输入内容" v-model="input2">
                <!-- <template slot="append">搜索</template> -->
                <el-button slot="append" type="primary" icon="el-icon-search"
                  >搜索</el-button
                >
              </el-input>
            </div>
            <div class="do-item">
              <router-link to="./about" tag="span">
              <i class="el-icon-edit"></i>
              <span>写文章</span>
              </router-link>
            </div>
            <div class="do-item">
              <span>登录</span>
              <span>/</span>
              <span>注册</span>
            </div>
          </div>
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