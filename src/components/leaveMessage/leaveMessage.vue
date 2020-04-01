<template>
<div class="pages">
  <div class="leaveMessgae">
    <h2 class="title">留言</h2>
    <div class="leaveMessage">
      <p>说你想说的，也可以骂我，但请不要在留言板申请友链，发外链，发广告！</p>
                <el-form ref="messages" @submit.native.prevent="leaveMSG()"   :model="messages" label-width="120px">
                    <el-form-item label="您的姓名或昵称:">
                        <el-input v-model="messages.name" class="input-width" @input="replaceSpace()" clearable placeholder="请输入姓名或昵称"></el-input>
                    </el-form-item>
                     <el-form-item label="网址:">
                        <el-input v-model="messages.Iurl" class="input-width" @input="replaceSpace()" clearable placeholder="请输入您博客地址"></el-input>
                    </el-form-item>
                    <el-form-item label="留言内容">
                        <el-input type="textarea" v-model="messages.content" @input="replaceSpace()" class="input-width1"
                                  clearable placeholder="请输入您的留言"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" native-type="submit">提交</el-button>
                    </el-form-item>
                    <el-form-item>
                        <span class="fr" ref="loginRef"></span>
                    </el-form-item>
                </el-form>
                <div class="showLeave" v-for="(leaveMessage,index) in leaveMessages" :key="index">
                  <h3>{{leaveMessage.Name}}</h3>
                  <p>{{leaveMessage.content}}</p>
                  <span>{{ leaveMessage.createTime }}</span>
                </div>
            </div>
  </div>
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
      this.messages.createTime = aData.getFullYear() + '-' + (aData.getMonth()+1) + '-' +aData.getDate() + ' ' + aData.getHours() + ':' + aData.getMinutes() + ':' + aData.getSeconds();
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
  padding: 30px 0;
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
  border-bottom: 1px solid white;
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
</style>
