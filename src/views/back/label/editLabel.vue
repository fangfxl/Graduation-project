<template>
  <div class = "addsort">
  <el-form @submit.native.prevent="updateLabels" ref="form" :model="updateLabel" label-width="80px">
    <el-form-item label="分类名称">
      <el-input v-model="updateLabel.label_name" width="500"></el-input>
    </el-form-item>
        <el-form-item label="分类描述">
      <el-input v-model="updateLabel.label_description" width="500"></el-input>
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
      updateLabel:{},
      detail: {
        id: ""
      },
    }
  },
 
  methods: {
     goSort(){
      this.$router.push("labelList");
    },
    // 初始化表单
    getDetails() {
      this.$http.post("labelDetails", this.detail).then(res => {
        this.updateLabel = res.data;
        console.log(this.updateLabel)
      });
    },
    // 保存编辑
    updateLabels() {
      this.$http.put("updateLabel", this.updateLabel).then(res => {
       if(res.status == 200){
          this.$message({
          message: "保存成功",
          type: "success"
        });
        this.$router.push("labelList"); //创建成功跳回标签列表页
       }
       
      });
    
    }
  },
  created(){
     this.detail.id = this.$route.query.label_id;
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