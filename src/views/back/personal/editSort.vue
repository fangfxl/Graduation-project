<template>
  <div class = "addsort">
  <el-form @submit.native.prevent="updateSorts" ref="form" :model="updateSort" label-width="80px">
    <el-form-item label="分类名称">
      <el-input v-model="updateSort.Sort_name" width="500"></el-input>
    </el-form-item>
        <el-form-item label="分类描述">
      <el-input v-model="updateSort.sort_description" width="500"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button @click ="goSort()">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateSort:{},
      detail: {
        id: ""
      },
    }
  },
 
  methods: {
     goSort(){
      this.$router.push("sortList");
    },
    // 初始化表单
    getDetails() {
      this.$http.post("sortDetails", this.detail).then(res => {
        this.updateSort = res.data;
        console.log(this.updateSort)
      });
    },
    // 保存编辑
    updateSorts() {
      this.$http.put("updateSort", this.updateSort).then(res => {
       if(res.status == 200){
          this.$message({
          message: "保存成功",
          type: "success"
        });
        this.$router.push("sortList"); //创建成功跳回文章列表页
       }
       
      });
    
    }
    // 获取分类
    // saveSort() {
    //   if(!this.sort.name){
    //     this.$message({
    //       message: "分类名称为空，请输入分类名称",
    //       type: "error"
    //     });
    //   }else{
    //       this.$http.post("addSort" , this.sort).then(res => {
    //      if(res.status == 200){
    //         if(res.data.massage == "分类添加成功"){
    //       this.$message({
    //           message: "分类添加成功",
    //           type: "success"
    //         });
    //         this.$router.push("sortList"); 
    //     }else{
    //      this.$message({
    //           message: "分类添加失败",
    //           type: "error"
    //         });
    //     }
    //      }
       
    //   });
    //   }
    
    // },
  },
  created(){
     this.detail.id = this.$route.query.sort_id;
     this.getDetails();
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