<template>
<div class="page">
  
    <div class="block1">
        <h2 class="title">往期文章</h2>
        <div class="timeLine">
          <el-timeline>
            <el-timeline-item :timestamp = " article.time " placement="top"  v-for="(article ,index) in dataShow" :key="index">
                <div  @click="goToArticle(article._id)">
                <el-card >
                  <h4>{{article.title}}</h4>
                  <p>王小虎 提交于 2018/4/12 20:46</p>
                </el-card>
                </div>
            </el-timeline-item>
          
          </el-timeline>
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
    </div>
    
</div>
</template>

<script>
export default {
  name:"timeLine",
 data() {
        return{
            articles:[],//文章列表
            pageSize: 15,
            currentPage: 1,
        }
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
 methods:{
   //调至文章详情页
   goToArticle(id){
     console.log(id,"===========")
   },
   //获取文章列表
    getArticles(){
        this.$http.get('articles').then(res => {
          this.articles = res.data.reverse();
           console.log(this.articles)
        })
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
 },
 mounted() {
   this.getArticles();
 }
}
</script>

<style  lang="scss" scoped>
.page{
  width: 98vw;
  background-color: #E9EAED;
  padding: 30px 0;
}
.block1{
  background-color: white;
  width: 85vw;
  margin: auto;
  border-radius: 10px;
  padding: 20px 15px;
}
.title{
  line-height: 50px;
  border-bottom: 1px solid rgb(189, 186, 186);
}
.timeLine{
  width: 70vw;
  margin: 30px auto;
}
.timeNode{
  text-decoration: none;
  cursor: pointer;
}
.el-card:hover{
  transition: all 0.5s;
  transform:scale(1.01);
  background-color: rgb(207, 200, 200);
}

</style>