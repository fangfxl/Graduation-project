<template>
  <div class="comment">
    <div class="article_title">
      <h3>{{article_item.title}}</h3>
    </div>
    <div class="showpage">
        <div class="showLeave" v-for="(item,index) in comments" :key="index">
              <div class="l_head" >
                <el-avatar :size="50" icon="el-icon-user-solid" class="head"></el-avatar>
                <span class="l_name">{{item.username}}&nbsp;&nbsp;说：</span>
              </div>
              <p class="l_time">{{item.time}}</p>
              <div class="l_content">{{item.content}}</div>
              <div class="replay">
                <span class="l_replay" @click="toggle(item)">回复</span>
                <!-- <span class="l_replay" @click="deleteComment(item._id)">删除</span> -->
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
                    <span class="l_name">{{ replay.name }} 回复 {{ replay.parentName}}：</span>
                  </div>
                  <p class="l_time">{{replay.replayTime}}</p>
                  <div class="l_content">{{replay.content}}</div>
                  <div class="replay">
                    <span class="l_replay" @click="toggle(replay)">回复</span>
                    <!-- <span class="l_replay" @click="toggle(item)">删除</span> -->
                     <div class="r_info"  v-show="replay.isShow">
                        <span class="info_title">发表留言</span>
                          <span class="l_replay" @click="toggle1(replay)">取消回复</span>
                          <el-form ref="replayComments" @submit.native.prevent="replayPL(replay)" :model="replayComments.replay" label-width="120px" >
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      article_item:{},
      comments:[],//评论列表
      replayComments:{//回复评论
        _id: "",
          replay: {
            name: "",
            replayTime: "",
            content: "",
            isShow: false,
            parentName:""
          }
      },
      pageSize: 5,
      currentPage: 1,
      search:'',
      comments:''
    };
  },
  computed: {
    dataShow: function() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = Math.min(
        this.currentPage * this.pageSize,
        this.sorts.length
      );
      return this.sorts.slice(start, end);
    },
    pageNum: function() {
      return Math.round(this.sorts.length / this.pageSize) || 1;
    }
  },
  methods: {
      //切换
    toggle(info) {
      info.isShow = true;
    },
    toggle1(info) {
      info.isShow = false;
    },
    //删除评论
    deleteComment(item){
      this.$http.delete("/delComment",item).then(
        console.log(item)
      );
    },
    //回复评论
    replayPL(item){
      console.log("item",item);
      this.replayComments._id = item._id;
      var aData = new Date();
      this.replayComments.replay.replayTime = aData.getFullYear() +  "年" + (aData.getMonth() + 1) + "月" + aData.getDate() + "日 " + aData.getHours() + ":" +  aData.getMinutes() + ":" +  aData.getSeconds();
      this.replayComments.replay.parentName = item.username;
       if(this.replayComments.replay.name){
         if(this.replayComments.replay.content){
            console.log("this.replayComments",this.replayComments);
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
    // 关闭弹窗
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      console.log(this.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 初始化列表
    getSorts() {
      this.$http.get("sort").then(res => {
        this.sorts = res.data;
      });
    },
   //获取评论列表
   //获取评论列表
    getComment() {
      this.$http.get("/Comments").then(res => {
        if (res.status == 200) {
          this.comments = res.data.reverse();
          console.log("art",this.article_item)
          this.comments = this.comments.filter(item => item.article_id == this.article_item._id);
        console.log(this.comments)
        
        }
      });
    },
    // 删除分类
    remove(id) {
      this.$confirm("确定删除该分类吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`deleteSort/${id}`).then(() => {
            this.$message({
              message: "文章删除成功",
              type: "success"
            });
            this.getSorts();
          });
        })
        .catch(() => {
          this.$message({ 
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(id);
    }
  },
  created() {
    this.article_item = this.$route.query.article_item;
    this.getSorts();
    this.getComment();
  }
};
</script>
<style lang="scss"  >
.sort_list{
  // width: 1500px;
  margin: 0 auto;
}
.list {
  .row_title {
    border: 1px solid gray;
  }
}
.article_title{
  height: 80px;
  text-align: center;
  background-color: blanchedalmond;
  line-height: 80px;
}
// .showpage{
//   height: 500px;
// }
//评论
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
</style>