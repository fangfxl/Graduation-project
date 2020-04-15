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
            <h2><span>{{this.article.title}}</span></h2>
            <div class="info">
              <span>作者: {{this.article.author}}</span>
              <span>{{this.article.time}}</span>
              <span>【{{this.article.sort_id}}】</span>
              <span>{{this.article.views}}人已围观</span>
            </div>
            <img :src="getImgUrl( this.article.image || 'show1.jpg' )"  class="articlepic">
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
          <div class="comment">
            <h3 class="comment_title"><span>文章评论</span></h3>
            <div class="comment_form">
              <p class="speak">来说两句吧。。。。</p>
               <el-form ref="messages" @submit.native.prevent="leaveMSG()"   :model="messages" label-width="120px">
                    <el-form-item label="用户名:">
                        <el-input v-model="messages.name" class="input-width" @input="replaceSpace()" clearable placeholder="请输入姓名或昵称"></el-input>
                    </el-form-item>
                     <!-- <el-form-item label="网址:">
                        <el-input v-model="messages.Iurl" class="input-width" @input="replaceSpace()" clearable placeholder="请输入您博客地址"></el-input>
                    </el-form-item> -->
                    <el-form-item label="评论内容">
                        <el-input type="textarea" v-model="messages.content" @input="replaceSpace()" 
                                  clearable placeholder="请输入您的留言"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" native-type="submit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
          </div>
          <!-- 评论列表 -->
          <div class="pilun">
            <h2 class="record">
              <span>留言记录</span>
            </h2>
            <div class="showLeave" v-for="(item,index) in comments" :key="index">
              <div class="l_head" >
                <el-avatar :size="50" icon="el-icon-user-solid" class="head"></el-avatar>
                <span class="l_name">{{item.username}}&nbsp;&nbsp;说：</span>
              </div>
               <p class="l_time">{{item.time}}</p>
               <div class="l_content">{{item.content}}</div>
              <div class="replay">
                 <span class="l_replay" @click="toggle(item)">回复</span>
                   <div class="r_info"  v-show="item.isShow">
                      <span class="info_title">发表留言</span>
                       <span class="l_replay" @click="toggle1(item)">取消回复</span>
                       <el-form ref="replayComments" @submit.native.prevent="replayLM(leaveMessage)" :model="replayComments.replay" label-width="120px" >
                          <el-form-item label="您的姓名或昵称:">
                            <el-input
                              v-model="replayComments.replay.name"
                              class="input-width"
                              clearable
                              placeholder="请输入姓名或昵称"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="留言内容">
                            <el-input
                              type="textarea"
                              v-model="replayComments.replay.content"
                              clearable
                              placeholder="请输入您的留言"
                            ></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" native-type="submit">提交</el-button>
                          </el-form-item>
                         
                        </el-form>
                   </div>
              </div>
            </div>
            <!-- 子评论 -->
           
            <!-- 子评论 -->
          </div>
          <!-- 评论结束 -->
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
       messages:{
        createTime:'',
        content:'',
        name:'',
        Iurl:''
      },
      article: {},
      detail:{
        id:""
      },
     liked:'',
     like:'',
    //  评论
    comments:[],//评论列表
    replayComments:{
       _id: "",
        replay: {
          name: "",
          replayTime: "",
          content: "",
          isShow: false,
          parentName: ""
        }
    }

    };
  },
  computed: {
    
  },
  methods: {
      //切换
    toggle(info) {
      info.isShow = true;
    },
    toggle1(info) {
      info.isShow = false;
    },
    //获取留言列表
    getComment() {
      this.$http.get("/Comments").then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.comments = res.data.reverse();
           console.log("this.comments");
          console.log(this.comments);
        }
      });
    },
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
    
    //返回上一页
    goback(){
       this.$router.go(-1);
    },
    // 获取图片地址
    getImgUrl(icon){
      return require("@/assets/show/" + icon);
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
    this. getComment();
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
}
.comment{
  .comment_title{
    line-height: 40px;
    border-bottom: 1px solid gray;
  }
  span{
    display: inline-block;
    padding: 0 5px;
    line-height: 40px;
    border-bottom: 2px solid green;
  }
  span:hover{
    width: 85px;
  }
  .speak{
    line-height: 40px;
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
// 评论
.record {
  border-bottom: 1px solid rgb(206, 200, 200);
  line-height: 50px;
  span {
    display: inline-block;
    border-bottom: 2px solid green;
    width: 100px;
  }
  span:hover {
    width: 115px;
  }
}
.showLeave {
  // background-color: red;
  padding: 15px 15px;
  border-bottom: 1px solid rgb(206, 200, 200);
}
.r_showLeave {
  padding-left: 80px;
  padding-top: 20px;
  border-bottom: 1px solid rgb(206, 200, 200);
}
.l_head {
  // border: 1px solid green;
  .head {
    vertical-align: bottom;
  }
  .l_name {
    display: inline-block;
    font-size: 20px;
    font-weight: 800;
    padding-left: 15px;
  }
}
.l_time {
  color: #aaa;
}
.l_content {
  line-height: 35px;
  color: #424242;
  font-size: 18px;
  font-weight: 400;
  font-family: "Source Sans Pro", sans-serif;
}
.l_replay {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 20px;
  color: green;
  line-height: 35px;
  margin-top: 15px;
  padding: 3px 5px;
  border-radius: 4px;
}
.l_replay:hover {
  background-color: rgb(187, 243, 187);
  color: black;
  text-decoration: underline;
}
.r_info {
  border: 1px solid rgb(187, 243, 187);
  background-color: rgb(187, 243, 187);
}
.info_title {
  font-size: 20px;
  font-weight: 800;
  padding-right: 15px;
}
// 评论


.right {
  margin: 25px 0 0 15px;
  background-color: yellow;
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