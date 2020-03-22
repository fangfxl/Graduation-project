<template>
  <div class="sort_list">
    <el-table :data="dataShow" stripe  size ="small">
      <el-table-column type="index" label="ID" width="60"></el-table-column>
      <el-table-column prop="label_name" label="标签名" ></el-table-column>
      <el-table-column prop="label_description" label="标签描述" ></el-table-column>
      <el-table-column fixed="right" label >
        <template slot="header" slot-scope="scope">
          <el-input placeholder="请输入标签名" v-model="input2">
            <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button>
          </el-input>
        </template>
        <template slot-scope="scope">
          <!-- <el-button @click="edit(scope.row._id)" type="primary" size="small">查看评论</el-button> -->
          <el-button  @click="edit(scope.row._id)" type="primary" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 1, 2]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="labels.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      labels: [],
      pageSize: 5,
      currentPage: 1,
      input2: ""
    };
  },
  computed: {
    dataShow: function() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = Math.min(
        this.currentPage * this.pageSize,
        this.labels.length
      );
      return this.labels.slice(start, end);
    },
    pageNum: function() {
      return Math.round(this.labels.length / this.pageSize) || 1;
    }
  },
  methods: {
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
    getLabels() {
      this.$http.get("label").then(res => {
        this.labels = res.data;
      });
    },
    // 编辑分类
    edit(id) {
        this.$router.push({path:'editLabel', query:{label_id : id}});
    },
    // 删除分类
    remove(id) {
      this.$confirm("确定删除该标签吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`deleteLabel/${id}`).then(() => {
            this.$message({
              message: "标签删除成功",
              type: "success"
            });
            this.getLabels();
          });
        })
        .catch(() => {
          this.$message({ 
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this. getLabels();
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
</style>