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
              <router-link to="/blogs" class="item-select">博文日记</router-link>
              <router-link to="/about" class="item-select"> 关于我</router-link>
              <router-link to="/timeLine" class="item-select">时间轴</router-link>
              <router-link to="/leaveMessage" class="item-select">留言</router-link>
               <router-link to="/personal" class="item-select" v-show="personal"> 个人中心</router-link>
               <li class="item-select"  v-show="personal" @click="login_out()">登出</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from '../../main'
export default {
    name: "pageHeader",
    data(){
      return {
        input2:'',
        personal:false,//站长登录显示
      }
    },
    props: {
      msg: String
    },
    methods:{
     // 路由跳转
     goToUrl(url) {
      this.$router.push({
          path: url
      }); 
  },
  //登出
      login_out() {
        this.personal = false;
        sessionStorage.removeItem('personal');
        this.$router.push('/')
      }

    },
    mounted(){
    },
    watch:{},
    created() {
      this.personal = sessionStorage.getItem('personal')
      console.log(this.personal)
      eventBus.$on('personal' ,(message) => {
        this.personal = message
        console.log(this.personal);
      })
    }
  };
</script>

<style scoped lang="scss">
@import "./pageHeader.scss";
</style>