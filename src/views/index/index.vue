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
          <div class="sign">
            <a href="#" target="_blank"><span>MAOLAI博客</span></a>
          </div>
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
        <h2>首页<span>推荐</span></h2>
      </section>
      <section class="box3">
        <h2>文章<span>推荐</span></h2>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
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
    width: 1000px;
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
    li{
      margin: 3px;
      float: left;
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

</style>