<template>
  <div>
    <el-table :data="dataShow.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" stripe highlight-current-row >
      <el-table-column type="index" label="ID" width="60"></el-table-column>
      <el-table-column prop="title" label="标题" width="250" class="title"></el-table-column>
      <el-table-column prop="time" label="创建时间" width="250"></el-table-column>
      <el-table-column prop="views" label="浏览量" width="150"></el-table-column>
      <el-table-column prop="count" label="点赞量" width="150"></el-table-column>
      <el-table-column prop="sort" label="分类" width="250"></el-table-column>
      <el-table-column prop="label" label="标签" width="250"></el-table-column>
      <el-table-column prop="author" label="作者" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" >
           <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
                <i @click="edit(scope.row._id)" style="display:none"></i>
           </template>
        <template slot-scope="scope">
          <el-button @click="readComment(scope.row)" type="primary" size="small">查看评论</el-button>
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
        :page-sizes="[5, 10, 15, 20]"
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
      articlesAll:[],
      pageSize: 10,
      currentPage: 1,
      search: '', //搜索
      input2: ''
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
    readComment(item){
      console.log(item)
      this.$router.push({path:'/personal/comment', query:{article_item:item}});
    },
    //搜索
    /**
       * @description 搜索
       * */
      Search(){
        var searchs = this.search;
        if(searchs){
          this.articles = this.articlesAll.filter(item => item.includes(searchs));
        }else{
          this.articles = this.articlesAll;
        }
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
    getArticles() {
      this.$http.get("articles").then(res => {
        this.articles = res.data;
        this.articlesAll = res.data;
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
.title {
  overflow: hidden;
 
}
</style>