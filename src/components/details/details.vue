<template>
  <div class="page">
    <div class="page1">
      <div class="left">
        <div class="content">
          <div class="head">
            <h2 class="menu">
              <span class="title1">最新博文</span>
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
              <span>【{{this.article.sort}}】</span>
              <span>{{this.article.views}}人已围观</span>
            </div>
            <div class="imageShow">
                 <img :src="getImgUrl( this.article.image || 'show1.jpg' )"  class="articlepic">
            </div>
           
            <div class="article_content" v-html="this.article.content">{{this.article.content}}</div>
            <div class="tags">
              <span>Tages: </span>
              <span class="label">{{this.article.label}} </span>
               <!-- <el-tag v-for="item in 4"
                    :key="item.label"
                    :type="item.type"
                    effect="dark">
                    {{this.article.label_id}}
                  </el-tag> -->
            </div>
            <div class="comment_count">
              <el-button class="commentbtn" type="success" round  @click="commentCount()">很赞哦！({{this.article.count}})</el-button>
              <el-button class="commentbtn" type="info" round @click="goback()">返回上一页</el-button>
            </div>
          </div>
          <div class="comment">
            <h3 class="comment_title"><span>文章评论</span></h3>
            <div class="comment_form">
              <p class="speak">来说两句吧。。。。</p>
               <el-form ref="comment" @submit.native.prevent="Comment()"   :model="comment" label-width="120px">
                    <el-form-item label="用户名:">
                        <el-input v-model="comment.name" class="input-width" @input="replaceSpace()" clearable placeholder="请输入姓名或昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="评论内容">
                        <el-input type="textarea"  :autosize="{ minRows: 5, maxRows: 14}" v-model="comment.content" @input="replaceSpace()" 
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
              <span>评论记录</span>
            </h2>
            <div class="noComment" v-if="comments.length < 1">
             <p>暂无评论，来说两句吧！！！</p>
            </div>
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
                    <el-form ref="replayComments" @submit.native.prevent="replayPL(item)" :model="replayComments.replay" label-width="120px" >
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
                          :autosize="{ minRows: 5, maxRows: 14}"
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
              <div class="showReplay"  v-for="(replay,index) in item.replay" :key="index">
                  <div class="l_head" >
                    <el-avatar :size="50" icon="el-icon-user-solid" class="head"></el-avatar>
                    <span class="l_name">{{ replay.name }}说11：</span>
                  </div>
                  <p class="l_time">{{replay.replayTime}}</p>
                  <div class="l_content">{{replay.content}}</div>
                  <div class="replay">
                    <span class="l_replay" @click="toggle(replay)">回复</span>
                     <div class="r_info"  v-show="replay.isShow">
                        <span class="info_title">发表留言</span>
                          <span class="l_replay" @click="toggle1(replay)">取消回复</span>
                          <el-form ref="replayComments" @submit.native.prevent="replayPL(item)" :model="replayComments.replay" label-width="120px" >
                            <el-form-item label="您的姓名或昵称:">
                              <el-input
                                v-model="replayComments.replay.name"
                                class="input-width"
                                clearable
                                placeholder="请输入姓名或昵称"
                              ></el-input>
                            </el-form-item>
                            <el-form-item label="评论内容">
                              <el-input
                                type="textarea"
                                :autosize="{ minRows: 5, maxRows: 14}"
                                v-model="replayComments.replay.content"
                                clearable
                                placeholder="请输入您的评论"
                              ></el-input>
                            </el-form-item>
                            <el-form-item>
                              <el-button type="primary" native-type="submit">提交</el-button>
                            </el-form-item>
                          </el-form>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          <!-- 评论结束 -->
        </div>
      </div>
      <div class="right">
          <el-card class="box-card">
            <p class="r_head"><span class="sort">点击排行</span></p>
            <div class="text item" v-for="(item ,index) in this.rank" :key="index">
              <div v-if="index == 0" class="box" @click="goToDetails(item._id)"> 
                 <img class="welcome" :src="getImgUrl(item.image || 'show1.jpg')" alt="欢迎来到龙哥博客">
              </div>
              <p class="rank" @click="goToDetails(item._id)">
                {{index+1+"."}} {{ item.title}}
              </p>
            </div>
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
     like:'',
    //  评论
    comment:{
            name:'',
            article_id:'',
            time:'',
            content:'',
            isShow:false,
            replay:[]
    },
    comments:[],//评论列表
    replayComments:{//回复评论
       _id: "",
        replay: {
          name: "",
          replayTime: "",
          content: "",
          isShow: false,
          parentName: ""
        }
    },
    rank:[],//点击列表
    articles:[],//文章列表

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
    //回复评论
    replayPL(item){
      this.replayComments._id = item._id;
      var aData = new Date();
      this.replayComments.replay.replayTime = aData.getFullYear() +  "年" + (aData.getMonth() + 1) + "月" + aData.getDate() + "日 " + aData.getHours() + ":" +  aData.getMinutes() + ":" +  aData.getSeconds();
      console.log("this.replayComments");
       console.log(this.replayComments);
       if(this.replayComments.replay.name){
         if(this.replayComments.replay.content){
             this.$http.put("/replayComment", this.replayComments).then(res => {
               if(res.status == 200){
                 this.getComment();
                 item.isShow = false;
                 this.replayComments.replay.name = '';
                 this.replayComments.replay.content = '';
                 this.$message({
                    message: "评论发表成功",
                    type: "success"
                  });
               }
             })
         }else{
           this.$message({
            message: "请输入评论内容",
            type: "error"
          });
         }
       }else{
          this.$message({
            message: "请输入用户名",
            type: "error"
          });
       }

    },
    //正则替换空格
    replaceSpace() {
        this.comment.name = this.comment.name.replace(/\s+/g, "");
        this.comment.content = this.comment.content.replace(/\s+/g, "");
    },
    //发表评论
    Comment(){
      console.log("sssssssssssssssssss==============")
      this.comment.article_id = this.detail.id;
      var aData = new Date();
      this.comment.time = aData.getFullYear() +  "年" + (aData.getMonth() + 1) + "月" + aData.getDate() + "日 " + aData.getHours() + ":" +  aData.getMinutes() + ":" +  aData.getSeconds();
      console.log(this.comment)
      if(this.comment.name){
         if(this.comment.content){
             this.$http.post("/Comment", this.comment).then(res => {
               if(res.status == 200){
                 this.getComment();
                 this.comment = {};
                 this.$message({
                    message: "评论发表成功",
                    type: "success"
                  });
               }
             })
         }else{
           this.$message({
            message: "请输入评论内容",
            type: "error"
          });
         }
       }else{
          this.$message({
            message: "请输入用户名",
            type: "error"
          });
       }

    },
    //获取评论列表
    getComment() {
      this.$http.get("/Comments").then(res => {
        if (res.status == 200) {
          this.comments = res.data.reverse();
          this.comments = this.comments.filter(item => item.article_id == this.detail.id);
        console.log(this.comments.length)
        
        }
      });
    },
    //点赞
    commentCount(){
      this.liked = this.detail.id;
      this.like = sessionStorage.getItem(this.liked);
        if(!this.like){
          sessionStorage.setItem(this.liked, 'true');
          this.article.count++
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
    //获取文章列表
    getArticles() {
      this.$http.get('articles').then(res => {
        this.articles = res.data.reverse();
        this.rank = res.data.concat();
        console.log(this.articles)
        this.Rank();
      })
    },
      //点击排行
    Rank(){
      this.rank.sort(this.compare("views"))
      console.log("bbb",this.articles)
      console.log("ccc",this.rank)
    },
    compare(index){
      return function (a, b) {
        var value1 = a[index];
        var value2 = b[index];
        return value2 - value1;
      }
    },
     //阅读全文
    goToDetails(id) {
      this.detail.id = id;
      this.getDetails();
      this.getComment();
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
    this. getArticles();
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
.imageShow{
   text-align: center;
  margin: auto;
}
.articlepic{
  // text-align: center;
  // margin: auto;
  width: 800px;
  height: 400px;
  margin: 20px auto;
  border: 2px solid gray;
}
.article_content{
  line-height: 30px;
  font-size: 18px;
  text-indent: 2rem;
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
    .title1 {
      display: inline-block;
      color: #444;
      font-weight: bold;
      line-height: 40px;
      border-bottom: 2px solid #099b43;
    }
    .title1:hover {
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
  line-height: 40px;
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
  line-height: 40px;
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
  padding: 20px 60px 0px 10px;
  border-radius: 8px;
  border: 1px solid rgb(187, 243, 187);
  background-color: rgb(187, 243, 187);
}
.info_title {
  font-size: 20px;
  font-weight: 800;
  padding-right: 15px;
}
.showReplay{
  margin-left: 80px;
  margin-top: 20px;
  border-bottom: 1px solid rgb(206, 200, 200);
}
// 评论


.right {
  margin: 25px 0 0 15px;
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
      border-bottom: 2px solid #099B43;
      padding-bottom: 10px;
    }
    .sort:hover {
      width: 90px;
      transition: all 2s ease;
    }
  }
}
.box{
  margin: 20px 0;
  height: 150px;
  width: 250px;
  overflow: hidden;
}
.welcome{
  height: 150px;
  width: 250px;
  transition:all 1s;
}
.welcome:hover{
  transform:scale(1.1);
}
.text {
  font-size: 20px;
 
  cursor: pointer;
}
.rank{
  padding: 5px 0;
}
.rank:hover{
  background-color: yellowgreen;
}

.noComment{
  padding-top: 30px;
  height: 60px;
  text-align: center;
  line-height: 60px;
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
@media screen and (min-width: 1920px){

  .box{
    margin: 20px 0;
    height: 238px;
    width: 382px;
    overflow: hidden;
  }
  .welcome{
    height: 238px;
    width: 382px;
    transition:all 1s;
  }
  .welcome:hover{
    transform:scale(1.1);
  }
  .item{
    line-height: 30px;
    font-size: 20px;
  }
}
</style>