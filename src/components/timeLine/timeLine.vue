<template>
<div class="page">
  
    <div class="block1">
        <h2 class="title">往期文章</h2>
        <div class="timeLine">
          <el-timeline>
            <el-timeline-item :timestamp = " article.time " placement="top"  v-for="(article ,index) in dataShow" :key="index">
                <div  @click="goToDetails(article._id)">
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
    <footer>
      <div class="chatme">
        <img src="../../assets/show/wx.jpg" width="100" height="100" alt />
        <p class="chat">我的微信</p>
      </div>
      <div>
        <p class="shenming  end">站点声明：</p>
        <p class="end">1、本站是个人博客，不做任何商业用途。</p>
        <p class="end">
          2、Copyright©2020 基于vue.js+node.js+express搭建|Design by 龙哥blogs |
          <router-link to="/login" tag="a" class="item-select">站长登录</router-link>
        </p>
      </div>
    </footer>
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
   //阅读全文
    goToDetails(id) {
      console.log(id)
      this.$router.push({path:'/details', query:{article_id : id}});
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
  // width: 98vw;
  background-color: #E9EAED;
  padding: 30px 0;
}
.block1{
  background-color: white;
  width: 85vw;
  margin: auto;
  border-radius: 10px;
  padding: 20px 15px;
  margin-bottom: 20px;
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

footer {
  padding: 20px 180px;
  background: rgb(236, 231, 231);
  display: flex;
  // border-top: #E8E8E8 1px solid;
  margin: auto;
  border-top: 10px solid #00c1de;
  .chatme {
    padding: 0 30px 0 0;
  }
  .chat {
    line-height: 25px;
    text-align: center;
    margin: 0;
    color: gray;
  }
  div {
    .shenming {
      margin: 5px;
      font-size: 18px;
      font-weight: bold;
      color: #007fff;
    }
  }
  .end {
    line-height: 25px;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .dandelion {
    display: block;
    span {
      display: block;
      position: fixed;
      z-index: 9999999999;
      bottom: 0px;
      background: url(../../assets/pgy.png) no-repeat;
      -webkit-animation: ball-x 3s linear 2s infinite;
      -moz-animation: ball-x 3s linear 2s infinite;
      animation: ball-x 3s linear 2s infinite;
      -webkit-transform-origin: bottom center;
      -moz-transform-origin: bottom center;
      transform-origin: bottom center;
    }
    .smalldan {
      width: 36px;
      height: 60px;
      left: 21px;
      background-position: 0 -90px;
      border: 0px solid red;
    }
    .bigdan {
      width: 64px;
      height: 115px;
      left: 47px;
      background-position: -86px -36px;
    }
  }
}
</style>