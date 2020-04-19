<template>
  <div class="comment">
    <el-table :data="dataShow.filter(data => !search || data.Sort_name.toLowerCase().includes(search.toLowerCase()))" stripe  size ="small">
      <el-table-column type="index" label="ID" width="60"></el-table-column>
      <el-table-column prop="Sort_name" label="类名" ></el-table-column>
      <el-table-column prop="sort_description" label="描述" ></el-table-column>
      <el-table-column fixed="right" label >
        <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
                <i @click="edit(scope.row._id)" style="display:none"></i>
           </template>
        <template slot-scope="scope">
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
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sorts.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      sorts: [],
      pageSize: 5,
      currentPage: 1,
      input2: "",
      search:''
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
    // 编辑分类
    edit(id) {
      console.log("================")
      console.log(id)
        console.log("================")
        this.$router.push({path:'editSort', query:{sort_id : id}});
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
    this.getSorts();
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