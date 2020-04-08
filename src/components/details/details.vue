<template>
  <div class="page">
    <div class="page1">
      <div class="left">
        <div class="content">
          <div class="head">
            <h2 class="menu">
              <span class="title">最新博文</span>
            </h2>
            <el-breadcrumb separator="/" class="breadcrumb">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/blogs' }">博文日记</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="content">
            <h2>{{this.article.title}}</h2>
            <div class="info">
              <span>作者: {{this.article.author}}</span>
              <span>{{this.article.time}}</span>
              <span>【{{this.article.sort_id}}】</span>
              <span>{{this.article.views}}人已围观</span>
            </div>
            <img :src="getImgUrl(this.article.image)"  class="articlepic">
            <div class="article_content" v-html="this.article.content">{{this.article.content}}</div>
            <div class="tags">
              <span>Tages: </span>
              <span class="label">{{this.article.label_id}} </span>
               <!-- <el-tag v-for="item in 4"
                    :key="item.label"
                    :type="item.type"
                    effect="dark">
                    {{this.article.label_id}}
                  </el-tag> -->
            </div>
            <div class="comment_count">
              <el-button class="commentbtn" type="success" round  @click="commentCount()">很赞哦！({{this.article.comment_count}})</el-button>
              <el-button class="commentbtn" type="info" round @click="goback()">返回上一页</el-button>
            </div>
          </div>

        </div>
      </div>
      <div class="right">
        <el-card class="box-card">
          <p>
            <span class="sort">点击排行</span>
          </p>
          <img class="welcome" src="../../assets/show/show2.jpg" alt="欢迎来到龙哥博客" />
          <div class="text item" v-for="o in 4" :key="o">{{'别表内容'+ o}}</div>
        </el-card>
      </div>
    </div>
    <footer>
      <div class="chatme">
        <img src="../../assets/show/wx.jpg" width="100" height="100" alt />
        <p class="chat">我的微信</p>
      </div>

      <div>
        <p class="shenming">站点声明：</p>
        <p>1、本站是个人博客，不做任何商业用途。</p>
        <p>
          2、Copyright©2020 基于vue.js+node.js+express搭建|Design by 龙哥blogs |
          <router-link to="/login" tag="a" class="item-select">站长登录</router-link>
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "articleList",
  data() {
    return {
      article: {},
      detail:{
        id:""
      },
     liked:'',
     like:''
    };
  },
  computed: {
    
  },
  methods: {
    //点赞
    commentCount(){
      this.liked = this.detail.id;
      this.like = sessionStorage.getItem(this.liked);
        if(!this.like){
          sessionStorage.setItem(this.liked, 'true');
          this.article.comment_count++
            this.$http.put("updateArticle", this.article).then(res => {
                if(res.status == 200){
                  this.$message({
                    message: "谢谢您的支持",
                    type: "success"
                  });
                }
            });
        }else{
          this.$message({
                    message: "您已点过赞！！",
                    type: "success"
                  });
        }
    },
    //修改文章
    saveArticle() {
    
    },
    //返回上一页
    goback(){
       this.$router.go(-1);
    },
    // 获取图片地址
    getImgUrl(icon){
      return require("@/assets/show/"+icon)
    },
    //获取文章内容
    getDetails(){
      this.$http.post("articleDetails" , this.detail).then(res => {
        if(res.status == 200){
           this.article = res.data
           }
        })
      },
    //围观数
    Views(){
      this.article.views++
      this.$http.put("updateArticle", this.article).then(res => {
                if(res.status == 200){
                  console.log(res,"========")
                }
      });
    }
  },
  created() {},
  mounted() {
    this.detail.id = this.$route.query.article_id;
    this.getDetails();

  }
};
</script>
<style lang="scss" scoped>
.page {
  background-color: #e9eaed;
}
.page1 {
  width: 85vw;
  background-color: #e9eaed;
  border-radius: 8px;
  margin: auto;
  display: flex;
}
.articlepic{
width: 57vw;
height: 400px;
margin: 20px auto;
border: 2px solid gray;
}
.article_content{
  line-height: 30px;
}
.comment_count{
  margin: 40px 0;
  text-align: center;
}
.info{
  line-height: 40px;
  span{
    padding-right: 20px;
    color: gray;
  }
}
.tags{
  padding: 30px 0 0 0;
  .label{
    
  }
}
.content {
  padding: 20px 25px;
  background-color: white;
  border-radius: 8px;
  margin: auto;
  .head {
    height: 40px;
    border-bottom: 1px solid rgb(238, 231, 231);
  }
  .menu {
    float: left;
    font: 18px "微软雅黑", Arial, Helvetica, sans-serif;
    border-bottom: 1px solid rgb(238, 231, 231);
    .title {
      display: inline-block;
      color: #444;
      font-weight: bold;
      line-height: 40px;
      border-bottom: 2px solid #099b43;
    }
    .title:hover {
      width: 85px;
    }
  }
  .breadcrumb {
    float: right;
    line-height: 40px;
  }
}

.left {
  width: 65vw;
  margin-top: 25px;
  background-color: #e9eaed;
}
.right {
  margin: 25px 0 0 15px;
  background-color: yellow;
  // height: 200px;
  border-radius: 8px;
  width: 20vw;

  overflow: hidden;
}

.box-card {
  p {
    margin-top: 10px;
    border-bottom: 1px solid #eee;
    .sort {
      display: inline-block;
      font-size: 18px;
      font-weight: 800;
      border-bottom: 2px solid black;
      padding-bottom: 10px;
      // transition: all .5s ease;
    }
    .sort:hover {
      width: 90px;
      transition: all 2s ease;
    }
  }
}
.welcome {
  margin-top: 20px;
  height: 120px;
  width: 220px;
}
.text {
  font-size: 14px;
}
.item {
  padding: 10px 0;
}

footer {
  padding: 20px 180px;
  background: rgb(236, 231, 231);
  display: flex;
  // border-top: #E8E8E8 1px solid;
  margin: auto;
  border-top: 10px solid #00c1de;
  .chatme {
    padding: 0 30px 0 0;
  }
  .chat {
    text-align: center;
    margin: 0;
    color: gray;
  }
  div {
    .shenming {
      margin: 5px;
      font-size: 18px;
      font-weight: bold;
      color: #007fff;
    }
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .dandelion {
    display: block;
    span {
      display: block;
      position: fixed;
      z-index: 9999999999;
      bottom: 0px;
      background: url(../../assets/pgy.png) no-repeat;
      -webkit-animation: ball-x 3s linear 2s infinite;
      -moz-animation: ball-x 3s linear 2s infinite;
      animation: ball-x 3s linear 2s infinite;
      -webkit-transform-origin: bottom center;
      -moz-transform-origin: bottom center;
      transform-origin: bottom center;
    }
    .smalldan {
      width: 36px;
      height: 60px;
      left: 21px;
      background-position: 0 -90px;
      border: 0px solid red;
    }
    .bigdan {
      width: 64px;
      height: 115px;
      left: 47px;
      background-position: -86px -36px;
    }
  }
}
</style>