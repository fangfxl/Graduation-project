<template>
<div class="page">
  <div class="page1">
    <div class="left">
      <div class="info">
        <div class="image">
          <img src="../../assets/show/wx.jpg" alt="">
        </div>
        <div class="title">
          <h2>博文日志</h2>
          <p>个人博客日记，记录生活的点点滴滴，聊聊互联网的那些事，那些人，毁三观，扭三观，正三观。</p>
        </div>
      </div>
      <div class="content">
          <div class="list" v-for="(article , index ) in  dataShow" :key="index">
              <h3>
                <a class="article-title" href="#" >{{ article.title }}</a>
              </h3>
              <figure>
                <img :src="getImgUrl(article.image)" alt="本站个人博客模板下载分享" />
              </figure>
              <ul>
                <p class="article-content" v-html="article.content">{{ article.content}}</p>
                <a title="本站个人博客模板下载分享" href="#" target="_blank" class="readmore">阅读全文&gt;&gt;</a>
              </ul>
              <p class="dateview">
                <i class="el-icon-time"></i>
                <span>{{article.time}}</span>
                <span>
                  分类：[
                  <a href="#">{{ article.sort}}</a> ]
                </span>
              </p>
          </div>
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
    <div class="right">
       <el-card class="box-card">
            <p><span class="sort">点击排行</span></p>
            <img class="welcome" src="../../assets/show/show2.jpg" alt="欢迎来到龙哥博客">
            <div class="text item" v-for="o in 4" :key="o">
                {{'别表内容'+ o}}
            </div>
          </el-card>
    </div>
   
</div>
 <footer>
      <div class="chatme">
         <img src="../../assets/show/wx.jpg" width="100" height="100" alt="">
         <p class="chat">我的微信</p>
      </div>
     
      <div>
      <p class="shenming">站点声明：</p>
      <p>1、本站是个人博客，不做任何商业用途。</p>
      <p>2、Copyright©2020 基于vue.js+node.js+express搭建|Design by 龙哥blogs | <router-link to="/login" tag="a" class="item-select">站长登录</router-link></p>
      </div>
      
    </footer>
</div>
</template>
<script>
export default{
    name:"articleList",
    data() {
        return{
            mas:'',
            articles:[],//文章列表
            pageSize: 15,
            currentPage: 1,
            search:'',
            articlesAll:[],

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
         //获取文章列表
    getArticles(){
        this.$http.get('articles').then(res => {
          this.articles = res.data;
          this.articlesAll = res.data;
          if(this.search){
            let i = this.search
          this.articles = this.articlesAll.filter(item => item.title.includes(i));
          this.search = ''
        }else{
          // this.articles = this.articlesAll;
        }
        })
      },
       // 获取图片地址
    getImgUrl(icon){
        return require("@/assets/show/"+icon)
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
    created() {
      this.search = this.$route.query.search;
       console.log(this.search,"=========")
    },
    mounted() {
       
      this.getArticles();
    }
}
</script>
<style lang="scss" scoped>

.page{
  width: 98vw;
  background-color: #E9EAED;
}
.page1{
  width: 85vw;
  background-color: #E9EAED;
  border-radius: 8px;
  margin: auto;
  display: flex;
 
}
.info{
  padding: 30px 25px;
  background-color: white;
  border-radius: 8px;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  img{
    width: 100px;
    height: 100px;
  }
  .title{
    padding-left:15px ;
    h2{
      line-height: 50px;
    }
    p{
      line-height: 50px;
    }
  }

}

.list{
  border-bottom: 1px dotted rgb(235, 228, 228);

}
h3{
  width: 100px;
  margin: 20px 0 10px 0;
  color: #333;
  a{
    width: 500px;
    text-decoration: none;
    color: #333;
    // border: 1px solid red;
    display: inline-block;
  }
  .article-title{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
figure {
    float: left;
    width: 183px;
    display: block;
    img{
      padding: 4px;
      border: #f4f2f2 1px solid;
      width: 175px;
      display: block;
    }
}
ul{
  float: left;
  // width: 650px;
  margin: 10px 0px 0px 15px;
  line-height: 20px;
  display: block;
    a.readmore {
      background: #fd8a61;
      color: #fff;
      padding: 5px 10px;
      float: right;
      margin: 20px 0 0 0;
      text-decoration: none;
    }
    .article-content{
       display: inline-block;
       width: 500px;
       height: 60px;
       overflow: hidden;//隐藏超出
      display:-webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;//第几行开始用省略号
      text-overflow: ellipsis;//省略号
    }
}
.dateview{
  width: 695px;
  overflow: hidden;
  clear: both;
  margin: 10px 0 0 0;
  display: inline-block;
  line-height: 26px;
  height: 26px;
  color: #838383;
  padding:0 0  25px 10px;
  span{
        margin: 0 10px;
    a{
      text-decoration: none;
      color: #099B43;
    }
  }
}


.content{
  padding: 30px 25px;
  background-color: white;
  border-radius: 8px;
  margin: auto;
}

.left{
  width: 65vw;
  margin-top: 25px;
  background-color: #E9EAED;
 
}
.right{
  margin: 25px 0 0 15px;
  background-color: yellow;
  // height: 200px;
  border-radius: 8px;
  width: 20vw;
  
  overflow: hidden;
}

.box-card{
  p{
    margin-top:10px;
    border-bottom: 1px solid #eee;
    .sort{
      display: inline-block;
      font-size: 18px;
      font-weight: 800;
      border-bottom:2px solid black;
      padding-bottom: 10px;
      // transition: all .5s ease;
    }
    .sort:hover{
      width: 90px;
      transition: all 2s ease;
    }
  }
}
.welcome{
  margin-top: 20px;
  height: 120px;
  width: 220px;
}
.text {
  font-size: 14px;
}
.item {
  padding: 10px 0;
}

footer{
   
  padding: 20px 180px;
  background: rgb(236, 231, 231);
  display: flex;
  // border-top: #E8E8E8 1px solid;
  margin: auto;
   border-top: 10px solid #00C1DE;
  .chatme{
    padding: 0 30px 0 0 ;
  }
   .chat{
      text-align: center;
      margin: 0;
      color: gray;
    }
  div{
    .shenming{
       margin: 5px;
      font-size: 18px;
      font-weight: bold;
      color:  #007fff;
    }
   
  }
  p{
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
.dandelion{
  display: block;
  span{
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
  .smalldan{
    width: 36px;
    height: 60px;
    left: 21px;
    background-position: 0 -90px;
    border: 0px solid red;
  }
  .bigdan{
    width: 64px;
    height: 115px;
    left: 47px;
    background-position: -86px -36px;
  }
}
}


</style>