<template>
<div class="pages">
  <div class="leaveMessgae">
    <h2 class="title"> <span class="title_leave">留言</span> </h2>
    <div class="leaveMessage">
      <p>说你想说的，也可以骂我，但请不要在留言板申请友链，发外链，发广告！</p>
                <el-form ref="messages" @submit.native.prevent="leaveMSG()"   :model="messages" label-width="120px">
                    <el-form-item label="您的姓名或昵称:">
                        <el-input v-model="messages.name" class="input-width"  clearable placeholder="请输入姓名或昵称"></el-input>
                    </el-form-item>
                     <el-form-item label="网址:">
                        <el-input v-model="messages.Iurl" class="input-width"  clearable placeholder="请输入您博客地址"></el-input>
                    </el-form-item>
                    <el-form-item label="留言内容">
                        <el-input type="textarea" v-model="messages.content"  
                                  clearable placeholder="请输入您的留言"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" native-type="submit">提交</el-button>
                    </el-form-item>
                    <el-form-item>
                        <span class="fr" ref="loginRef"></span>
                    </el-form-item>
                </el-form>
                <h2 class="record"><span>留言记录</span></h2>
                <div class="showLeave" v-for="(leaveMessage,index) in leaveMessages" :key="index">

                  <div class="block">
                       <el-avatar :size="50"  icon="el-icon-user-solid" class="head"></el-avatar>
                       <div> 
                          <h3 class="username">{{leaveMessage.Name}}</h3>
                          <span class="time">{{ leaveMessage.createTime }}</span>
                       </div>
                      
                  </div>
                  <p>{{leaveMessage.content}}</p>
                 
                </div>
            </div>
  </div>
   <footer>
      <div class="chatme">
        <img src="../../assets/show/wx.jpg" width="100" height="100" alt />
        <p class="chat">我的微信</p>
      </div>
      <div>
        <p class="shenming  end">站点声明：</p>
        <p class="end">1、本站是个人博客，不做任何商业用途。</p>
        <p class="end">
          2、Copyright©2020 基于vue.js+node.js+express搭建|Design by 龙哥blogs |
          <router-link to="/login" tag="a" class="item-select">站长登录</router-link>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      messages:{
        createTime:'',
        content:'',
        name:'',
        Iurl:''
      },
      leaveMessages:{},
    };
  },
  watch: {},
  computed: {},
  methods: {
     //正则替换空格
        replaceSpace() {
            this.messages.name = this.messages.name.replace(/\s+/g, "");
            this.messages.Iurl = this.messages.Iurl.replace(/\s+/g, "");
            this.messages.content = this.messages.content.replace(/\s+/g, "");
        },
    //发表留言
    leaveMSG() {
      var aData = new Date();
      console.log(aData);
      this.messages.createTime = aData.getFullYear() + '-' + (aData.getMonth()+1) + '-' +aData.getDate();
    //  this.messages.createTime = aData.getFullYear() + '-' + (aData.getMonth()+1) + '-' +aData.getDate() + ' ' + aData.getHours() + ':' + aData.getMinutes() + ':' + aData.getSeconds();
     console.log(this.messages)
     if(this.messages.name){
       if(this.messages.content){
          this.$http.post('/addLM',this.messages)
          .then(res => {
            if(res.status == 200){
              this.messages = {}
            this.getleaveMessage()
            }
        })
       }else{
            this.$message({
              message: "留言内容不得为空",
              type: "error"
            });
            }
     }else{
        this.$message({
              message: "请输入您的姓名或昵称",
              type: "error"
            });
     }
     
    },
    //获取留言列表
    getleaveMessage() {
       this.$http.get('/leaveMessage')
        .then(res => {
          if(res.status == 200){
            // console.log(res)
            this.leaveMessages = res.data.reverse();

          }
        })
    }
  },
  created() {},
  mounted() {
    this.getleaveMessage();
  }
};
</script>
<style lang="scss" scoped>
.pages{
  width: 98vw;
  background-color: #E9EAED;
  padding: 30px 0 0 0;
}
.leaveMessgae{
  
  width: 85vw;
  background-color: white;
  margin: 30px auto;
  border-radius: 4px;
  padding: 15px 25px;
}
.title{
  line-height: 50px;
  border-bottom: 1px solid rgb(206, 200, 200);
  .title_leave{
    display: inline-block;
    border-bottom: 2px solid green ;
    width: 60px;
  }
   .title_leave:hover{
     width: 80px;
   }
}
p{
  line-height: 50px;
}
.input-width{
  width: 500px;
}
.showLeave{
  padding: 15px 15px;
  border-bottom: 1px solid rgb(206, 200, 200);
}
.block{
  height: 55px;
    .head{
      float: left;  
    }
    .username{
      float: left;
      margin: 0 20px;
      line-height: 50px;
    }
    .time{
      display: block;
      float: right;
      line-height: 50px;
      color: #999;
    }
}
.record{
  border-bottom: 1px solid rgb(206, 200, 200);
  line-height: 50px;
  span{
    display: inline-block;
    border-bottom: 2px solid green ;
    width: 100px;
  }
  span:hover{
    width: 115px;
  }
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
    line-height: 25px;
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
  .end {
    line-height: 25px;
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
