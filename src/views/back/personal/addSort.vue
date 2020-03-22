<template>
  <div class = "addsort">
  <el-form @submit.native.prevent="saveSort" ref="form" :model="sort" label-width="80px">
    <el-form-item label="分类名称">
      <el-input v-model="sort.name" width="500"></el-input>
    </el-form-item>
        <el-form-item label="分类描述">
      <el-input v-model="sort.description" width="500"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">添加分类</el-button>
      <!-- <el-button>取消</el-button> -->
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sort:{
        name:'',
        description:''
      },
    }
  },
 
  methods: {
    // 获取分类
    saveSort() {
      if(!this.sort.name){
        this.$message({
          message: "分类名称为空，请输入分类名称",
          type: "error"
        });
      }else{
          this.$http.post("addSort" , this.sort).then(res => {
         if(res.status == 200){
            if(res.data.massage == "分类添加成功"){
          this.$message({
              message: "分类添加成功",
              type: "success"
            });
            this.$router.push("sortList"); 
        }else{
         this.$message({
              message: "分类添加失败",
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