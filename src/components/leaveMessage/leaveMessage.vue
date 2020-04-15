<template>
  <div class="pages">
    <div class="leaveMessgae">
      <h2 class="title">
        <span class="title_leave">留言</span>
      </h2>
      <div class="leaveMessage">
        <p>说你想说的，也可以骂我，但请不要在留言板申请友链，发外链，发广告！</p>
        <el-form
          ref="messages"
          @submit.native.prevent="leaveMSG()"
          :model="messages"
          label-width="120px"
        >
          <el-form-item label="您的姓名或昵称:">
            <el-input v-model="messages.name" class="input-width" clearable placeholder="请输入姓名或昵称"></el-input>
          </el-form-item>
          <el-form-item label="网址:">
            <el-input v-model="messages.Iurl" class="input-width" clearable placeholder="请输入您博客地址"></el-input>
          </el-form-item>
          <el-form-item label="留言内容">
            <el-input type="textarea" v-model="messages.content" clearable placeholder="请输入您的留言"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">提交</el-button>
          </el-form-item>
          <el-form-item>
            <span class="fr" ref="loginRef"></span>
          </el-form-item>
        </el-form>
        <h2 class="record">
          <span>留言记录</span>
        </h2>
        <div class="showLeave" v-for="(leaveMessage,index) in leaveMessages" :key="index">
          <div class="l_head">
            <el-avatar :size="50" icon="el-icon-user-solid" class="head"></el-avatar>
            <span class="l_name">{{leaveMessage.Name}}&nbsp;&nbsp;说：</span>
          </div>
          <p class="l_time">{{leaveMessage.createTime}}</p>
          <div class="l_content">{{leaveMessage.content}}</div>
          <div class="replay">
            <span class="l_replay" @click="toggle(leaveMessage)">回复</span>
            <div class="r_info" v-show="leaveMessage.isShow">
              <span class="info_title">发表留言</span>
              <span class="l_replay" @click="toggle1(leaveMessage)">取消回复</span>
              <el-form ref="replayMessage" @submit.native.prevent="replayLM(leaveMessage)":model="replayMessage.replay" label-width="120px" >
                <el-form-item label="您的姓名或昵称:">
                  <el-input
                    v-model="replayMessage.replay.name"
                    class="input-width"
                    clearable
                    placeholder="请输入姓名或昵称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="网址:">
                  <el-input
                    v-model="replayMessage.replay.Iurl"
                    class="input-width"
                    clearable
                    placeholder="请输入您博客地址"
                  ></el-input>
                </el-form-item>
                <el-form-item label="留言内容">
                  <el-input
                    type="textarea"
                    v-model="replayMessage.replay.content"
                    clearable
                    placeholder="请输入您的留言"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit">提交</el-button>
                </el-form-item>
                <el-form-item>
                  <span class="fr" ref="loginRef"></span>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- 子回复 -->
          <div class="r_showLeave" v-for="(item,index) in leaveMessage.replay" :key="index">
            <div class="l_head">
              <el-avatar :size="50" icon="el-icon-user-solid" class="head"></el-avatar>
              <span class="l_name">{{item.name}}&nbsp;&nbsp;说：</span>
            </div>
            <p class="l_time">{{item.replayTime}}</p>
            <div class="l_content">{{item.content}}</div>
            <div class="replay">
              <span class="l_replay" @click="toggle(item)">回复</span>
              <div class="r_info" v-show="item.isShow">
                <span class="info_title">发表留言</span>
                <span class="l_replay" @click="toggle1(item)">取消回复</span>
                <el-form
                  ref="replayMessage"
                  @submit.native.prevent="replayLM(leaveMessage)"
                  :model="replayMessage.replay"
                  label-width="120px"
                >
                  <el-form-item label="您的姓名或昵称:">
                    <el-input
                      v-model="replayMessage.replay.name"
                      class="input-width"
                      clearable
                      placeholder="请输入姓名或昵称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="网址:">
                    <el-input
                      v-model="replayMessage.replay.Iurl"
                      class="input-width"
                      clearable
                      placeholder="请输入您博客地址"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="留言内容">
                    <el-input
                      type="textarea"
                      v-model="replayMessage.replay.content"
                      clearable
                      placeholder="请输入您的留言"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" native-type="submit">提交</el-button>
                  </el-form-item>
                  <el-form-item>
                    <span class="fr" ref="loginRef"></span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="chatme">
        <img src="../../assets/show/wx.jpg" width="100" height="100" alt />
        <p class="chat">我的微信</p>
      </div>
      <div>
        <p class="shenming end">站点声明：</p>
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
      messages: {
        createTime: "",
        content: "",
        name: "",
        Iurl: "",
        isShow: false,
        replay: []
      },
      replayMessage: {
        _id: "",
        replay: {
          name: "",
          replayTime: "",
          Iurl: "",
          content: "",
          isShow: false,
          parentName: ""
        }
      },
      leaveMessages: {}
    };
  },
  watch: {},
  computed: {},
  methods: {
    //切换
    toggle(info) {
      info.isShow = true;
    },
    toggle1(info) {
      info.isShow = false;
    },
    //正则替换空格
    // replaceSpace() {
    //     this.messages.name = this.messages.name.replace(/\s+/g, "");
    //     this.messages.Iurl = this.messages.Iurl.replace(/\s+/g, "");
    //     this.messages.content = this.messages.content.replace(/\s+/g, "");
    // },
    //发表留言
    leaveMSG() {
      var aData = new Date();
      console.log(aData);
      this.messages.createTime =
        aData.getFullYear() +
        "年" +
        (aData.getMonth() + 1) +
        "月" +
        aData.getDate() +
        "日 " +
        aData.getHours() +
        ":" +
        aData.getMinutes() +
        ":" +
        aData.getSeconds();
      //  this.messages.createTime = aData.getFullYear() + '-' + (aData.getMonth()+1) + '-' +aData.getDate() + ' ' + aData.getHours() + ':' + aData.getMinutes() + ':' + aData.getSeconds();
      console.log(this.messages);
      if (this.messages.name) {
        if (this.messages.content) {
          this.$http.post("/addLM", this.messages).then(res => {
            if (res.status == 200) {
              this.messages = {};
              this.getleaveMessage();
            }
          });
        } else {
          this.$message({
            message: "留言内容不得为空",
            type: "error"
          });
        }
      } else {
        this.$message({
          message: "请输入您的姓名或昵称",
          type: "error"
        });
      }
    },
    //回复留言
    replayLM(item) {
      this.replayMessage._id = item._id;
      var aData = new Date();
      this.replayMessage.replay.replayTime =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate();
      this.replayMessage.replay.parentName = item.name;
      console.log("this.replayMessage===========");
      console.log(this.replayMessage);
      if (this.replayMessage.replay.name) {
        if (this.replayMessage.replay.content) {
          this.$http.put("/updateLM", this.replayMessage).then(res => {
            if (res.status == 200) {
              this.$message({
                message: "回复成功",
                type: "success"
              });
              item.isShow = false;
              // this.replayMessage = {};
              this.getleaveMessage();
            }
          });
        } else {
          this.$message({
            message: "留言内容不得为空",
            type: "error"
          });
        }
      } else {
        this.$message({
          message: "请输入您的姓名或昵称",
          type: "error"
        });
      }
    },
    //获取留言列表
    getleaveMessage() {
      this.$http.get("/leaveMessage").then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.leaveMessages = res.data.reverse();
          console.log(this.leaveMessages);
        }
      });
    }
  },
  created() {},
  mounted() {
    this.getleaveMessage();
  }
};
</script>
<style lang="scss" scoped>
.pages {
  width: 98vw;
  background-color: #e9eaed;
  padding: 30px 0 0 0;
}
.leaveMessgae {
  width: 85vw;
  background-color: white;
  margin: 30px auto;
  border-radius: 4px;
  padding: 15px 25px;
}
.title {
  line-height: 50px;
  border-bottom: 1px solid rgb(206, 200, 200);
  .title_leave {
    display: inline-block;
    border-bottom: 2px solid green;
    width: 60px;
  }
  .title_leave:hover {
    width: 80px;
  }
}
p {
  line-height: 50px;
}
.input-width {
  width: 500px;
}

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
