<template>
  <div class="index">
    <div class="banner">
        <section class="box">
          <ul class="poetry">
            <p class="verse">在这个喧嚣的城市中</p>
            <p class="verse">你是否也在寻找那片属于你自己的宁静</p>
            <p class="verse">给生活一个新起点</p>
            <p class="verse">慢下来，发现身边的美好点滴</p>
          </ul>
          <!-- <div class="sign">
            <a href="#" target="_blank"><span>MAOLAI博客</span></a>
          </div> -->
        </section>
    </div>
    <div class="carefully">
      <section class="box1">
        <h3>
          <p>热门推荐</p>
        </h3>
        <ul>
          <li>
            <a href="#" title="沐浴在阳光下" target="_blank">
            <img src="../../assets/show/show1.jpg" alt="沐浴在阳光下">
            </a>
            <span>沐浴在阳光下</span>
          </li>
          <li>
            <a href="#" title="沐浴在阳光下" target="_blank">
            <img src="../../assets/show/show1.jpg" alt="沐浴在阳光下">
            </a>
            <span>沐浴在阳光下</span>
          </li>
          
          <li>
            <a href="#" title="沐浴在阳光下" target="_blank">
            <img src="../../assets/show/show4.jpg" alt="沐浴在阳光下">
            </a>
            <span>沐浴在阳光下</span>
          </li>
          <li>
            <a href="#" title="沐浴在阳光下" target="_blank">
            <img src="../../assets/show/show2.jpg" alt="沐浴在阳光下">
            </a>
            <span>沐浴在阳光下</span>
          </li>
          <li>
            <a href="#" title="沐浴在阳光下" target="_blank">
            <img src="../../assets/show/show3.jpg" alt="沐浴在阳光下">
            </a>
            <span>沐浴在阳光下</span>
          </li>
          <li>
            <a href="#" title="沐浴在阳光下" target="_blank">
            <img src="../../assets/show/show4.jpg" alt="沐浴在阳光下">
            </a>
            <span>沐浴在阳光下</span>
          </li>
        </ul>
      </section>
    </div>
    <div class="articles">
      
      <section class="box2">
        <!-- <h2><p>文章<span>推荐</span></p></h2> -->
        
        <div class="left">
          <h2> <span class="title">最新博文</span> </h2>
          <div class="list " v-for="(article , index ) in dataShow" :key="index">
                <h3>
                  <a class="article-title" href="javascript:void(0)"  @click="goToDetails(article._id)">{{ article.title }}</a>
                </h3>
                <figure>
                  <img :src="getImgUrl(article.image || 'show1.jpg')" alt="本站个人博客模板下载分享">
                </figure>
                <ul>
                  <p class="article-content" v-html="article.content">{{ article.content}} </p>
                  <a title="本站个人博客模板下载分享" href="javascript:void(0)"  @click="goToDetails(article._id)" class="readmore">阅读全文&gt;&gt;</a>
                </ul>
                <p class="dateview">
                  <i class="el-icon-time"></i>
                  <span>{{article.time}}</span>
                  <span>分类：[ <a href="#">{{ article.sort}}</a> ] </span>
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
        <aside class="right">
          <div class="profile-card">
            <h1>我的名片</h1>
            <p>网名：BACKLIGHT | 逆光</p>
            <p>职业：web前端开发工程师</p>
            <p>现居：广东省-广州市</p>
            <p>Email：1360967095@qq.com</p>
          </div>
                  <el-card class="box-card">
                    <p class="r_head"><span class="sort">点击排行</span></p>
                    <div class="text item" v-for="(item ,index) in this.rank" :key="index">
                      <div v-if="index == 0" class="box" @click="goToDetails(item._id)"> 
                        <img class="welcome" :src="getImgUrl(item.image || 'show1.jpg')" alt="欢迎来到龙哥博客">
                      </div>
                      <p class="rank" @click="goToDetails(item._id)">
                        {{index+1+"、"}} {{ item.title}}
                      </p>
                    </div>
                </el-card>
        </aside>
      </section>
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
      <div class="dandelion">
        <span class="smalldan"></span>
        <span class="bigdan"></span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      articles:[],//文章列表
      dialogVisible: false,
      rank:[],
      path:"./p.html",
      pageSize: 5,
      currentPage: 1,
    };
  },
  watch: {},
  computed: {
    dataShow: function () {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = Math.min(
        this.currentPage * this.pageSize,
        this.articles.length
      );
      return this.articles.slice(start, end);
    },
    pageNum: function () {
      return Math.round(this.articles.length / this.pageSize) || 1;
    }
  },
  methods: {
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
  //点击排行
    Rank(){
      this.rank.sort(this.compare("views"))
      console.log("bbb",this.articles)
      console.log("ccc",this.rank)
    },
    compare(index){
      return function (a, b) {
        var value1 = a[index];
        var value2 = b[index];
        return value2 - value1;
      }
    },

     //阅读全文
    goToDetails(id) {
      this.$router.push({path:'/details', query:{article_id : id}});
    },
    //获取文章列表
    getArticles(){
      this.$http.get('articles').then(res => {
        this.articles = res.data;
        this.rank = res.data.concat();
        this.Rank();
      })
    },
    // 获取图片地址
    getImgUrl(icon){
      return require("@/assets/show/"+icon)
    },
  },
  created() {},
  mounted() {
    this.getArticles();
  }
};
</script>
<style lang="scss" scoped>
*{
  
  margin: 0;
  padding: 0;
}
.index{
  width: 100%;
  font: 14px "宋体", Arial, Helvetica, sans-serif;
  // border: 1px solid green;
  background-color: #E9EAED;
}
.banner{
  width: 100%;
  height: 265px;
  background: url(../../assets/show/home.jpg)top center;
  overflow: hidden;
  .box{
    width: 1000px;
    margin: auto;
    overflow: hidden;
    display: block;
  } 
  .poetry{
    width: 350px;
    line-height: 26px;
    margin: 60px 0 0 20px;
    float: left;
    font-size: 14px;
    p{
      transform: translate(60px);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8), 2px 2px 3px rgba(180, 151, 151, 0.3);
    }
  }
  .sign{
    float: right;
    margin: 40px;
    width: 130px;
    height: 130px;
    border-radius: 100%;
    overflow: hidden;
    border: #FFF 4px solid;
    display: block;
    a{
      display: block;
      padding-top: 97px;
      width: 160px;
      background: url(../../assets/show/show3.jpg) no-repeat;
      background-size: 130px 130px;
      cursor: pointer;
      span{
        display: block;
        margin-top: 63px;
        padding-top: 5px;
        height: 50px;
        text-align: center;
        width: 130px;
        line-height: 16px;
        color: #fff;
        background: rgba(0, 0, 0, .5);
        -webkit-transition: margin-top .2s ease-in-out;
        -moz-transition: margin-top .2s ease-in-out;
        -o-transition: margin-top .2s ease-in-out;
        transition: margin-top .2s ease-in-out;
      }
    }
    a:link, a:visited {
      text-decoration: none;
      color: #333;
    }
  }
  .sign:hover{
    a{
      span{
        margin-top: 0px;
      }
    }
  }
}
.carefully{
  width: 100%;
  .box1{
    width: 1300px;
    margin: auto;
    overflow: hidden;
  }
  h3{
    border-bottom: #FFF 1px solid;
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    margin: 0 0 10px;
    font-family: "微软雅黑";
    display: block;
    clear: both;
    p{
      background: #474645;
      width: 180px;
      height: 25px;
      margin: 15px 0 0 10px;
      line-height: 25px;
      color: #fff;
      text-align: center;
      box-shadow: #999 4px 5px 1px;
    }
  }
  ul{
    display: flex;
    li{
      margin: 3px;
      // float: left;
      display: block;
      padding: 5px 5px 6px 5px;
      -webkit-transition: all 1s;
      -moz-transition: all 1s;
      -o-transition: all 1s;
      transition: all 1s;
      a{
        text-decoration: none;
        color: #333;
        img{
          width: 176px;
          height: 110px;
          background: #FFF;
          padding: 4px;
          box-shadow: 0px 0px 2px rgba(0,0,0,.5);
          display: block;
        }
      }
      span{
        color: #F1F0EE;
        display: block;
        text-align: center;
        margin-top: 5px;
        width: 177px;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 16px;
      }
    }
  li:hover{
    background: #333;
  }
  }
}
.articles{
  // position: absolute;
  .box2{
    width: 1200px;
    margin: auto;
    overflow: hidden;
    display: block;
  }
  h2{

    font: 18px "微软雅黑", Arial, Helvetica, sans-serif;
    
    border-bottom: 1px solid rgb(238, 231, 231);
    .title{
      display: inline-block;
      color: #444;
      font-weight: bold;
      line-height: 40px;
      border-bottom: 2px solid #099B43;
    }
    .title:hover{
      width: 85px;
    }
    // background: url(../../assets/fenge.png) repeat-x 20px center;
    p{
    background: #fff;
    width: 90px;
    span{
      color: #FE5187;
    }
    }
  }
  .left{
    width: 840px;
    overflow: hidden;
    margin: 20px 20px 10px 0 ;
    padding: 15px 25px;
    float: left;
    background-color: #FFFFFF;
     border-radius: 8px;
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
      width: 615px;
      margin: 10px 0px 0 15px;
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
           width: 620px;
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
      padding-left: 25px;
      span{
            margin: 0 10px;
        a{
          text-decoration: none;
          color: #099B43;
        }
      }
    }
  }
  .right{
    margin-top: 20px;
    float: left;
    width: 290px;
    height: 1200px;
    .profile-card{
      height: 260px;
      overflow: hidden;
      margin-bottom: 20px;
      border-radius: 6px;
      background: url(../../assets/quote-bg.png) no-repeat top right rgba(42,42,42,1);
      box-shadow: 0px 1px 0px rgba(255,255,255,.1), inset 0px 1px 1px rgba(0,0,0,.7);
      h1{
        padding-left: 10px;
        line-height: 40px;
        font-size: 28px;
        margin: 10px;
        color: #89919a;
        font-weight: normal;
        // padding-bottom: 10px;
      }
      p{
        font-size: 18px;
        padding: 0 0 0 20px;
        line-height: 28px;
        text-shadow: 0px 1px 2px rgba(0,0,0,.5);
        color: #d0d2d4;
      }
    }
.box-card{
  .r_head{
    // margin-top:10px;
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
.box{
  margin: 20px 0;
  height: 150px;
  width: 250px;
  overflow: hidden;
}
.welcome{
  height: 150px;
  width: 250px;
  transition:all 1s;
}
.welcome:hover{
  transform:scale(1.1);
}
.text {
  font-size: 20px;
 
  cursor: pointer;
}
.rank{
  padding: 5px 0;
}
.rank:hover{
  background-color: yellowgreen;
}
  }
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
@keyframes ball-x {
  0% {
      transform: rotate(0deg);
  }

  20% {
      transform: rotate(5deg);
  }
  40% {
      transform: rotate(0deg);
  }
  60% {
      transform: rotate(-5deg);
  }
  80% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(0deg);
  }
}
</style>