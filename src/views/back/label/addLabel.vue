<template>
  <div class = "addsort">
  <el-form @submit.native.prevent="saveLabel" ref="form" :model="label" label-width="80px">
    <el-form-item label="标签名称">
      <el-input v-model="label.name" width="500" placeholder="请输入标签名" ></el-input>
    </el-form-item>
        <el-form-item label="标签描述">
      <el-input v-model="label.description" width="500" placeholder="请输入标签相关描述"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">添加标签</el-button>
      <!-- <el-button>取消</el-button> -->
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      label:{
        name:'',
        description:''
      },
    }
  },
 
  methods: {
    // 获取分类
    saveLabel() {
      if(!this.label.name){
        this.$message({
          message: "标签名称为空，请输入标签名称",
          type: "error"
        });
      }else{
          this.$http.post("addLabel" , this.label).then(res => {
         if(res.status == 200){
            if(res.data.massage == "标签添加成功"){
              this.$message({
                  message: "标签添加成功",
                  type: "success"
                });
            this.$router.push("labelList"); 
        }else{
         this.$message({
              message: "标签添加失败",
              type: "error"
            });
        }
         }
       
      });
      }
    
    },
  },
  created(){
    
  }
};
</script>
<style lang="scss">
.addsort{
 
  width:800px;
  margin:100px auto;
}
textarea {
  width: 400px;
  height: 300px;
}
</style>