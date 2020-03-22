<template>
  <div>
    <el-table :data="dataShow" stripe highlight-current-row>
      <el-table-column type="index" label="ID" width="60"></el-table-column>
      <el-table-column prop="title" label="标题" width="150"></el-table-column>
      <el-table-column prop="time" label="创建时间" width="250"></el-table-column>
      <el-table-column prop="views" label="浏览量" width="150"></el-table-column>
      <el-table-column prop="comment_count" label="点赞量" width="150"></el-table-column>
      <el-table-column prop="sort_id" label="分类" width="150"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="author" label="作者" width="100"></el-table-column>
      <el-table-column fixed="right" label width="300">
        <template slot="header" slot-scope="scope">
          <el-input placeholder="请输入标题" v-model="input2">
            <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button>
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="primary" size="small">查看评论</el-button>
          <el-button @click="edit(scope.row._id)" type="primary" size="small">编辑</el-button>
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
        :total=" articles.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      pageSize: 5,
      currentPage: 1,
      search: "", //搜索
      input2: ""
    };
  },
  computed: {
    dataShow: function() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = Math.min(
        this.currentPage * this.pageSize,
        this.articles.length
      );
      return this.articles.slice(start, end);
    },
    pageNum: function() {
      return Math.round(this.articles.length / this.pageSize) || 1;
    }
  },
  methods: {
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
    getArticles() {
      this.$http.get("articles").then(res => {
        this.articles = res.data;
        console.log(this.articles);
      });
    },
    // 获取图片地址
    getImgUrl(icon) {
      return require("@/assets/show/" + icon);
    },
    edit(id) {
      this.$router.push({path:'/personal/editArticle', query:{article_id : id}});
    },
    remove(id) {
      this.$confirm("此操作将永久删除该博文, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`deleteArticles/${id}`).then(() => {
            this.$message({
              message: "文章删除成功",
              type: "success"
            });
            this.getArticles();
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
    this.getArticles();
  }
};
</script>
<style lang="scss"  >
.list {
  // border: 1px solid gray;
  .row_title {
    // margin-bottom: 15px;
    border: 1px solid gray;
  }
}
</style>