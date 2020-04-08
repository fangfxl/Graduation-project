<template>
  <div class="page">
    <div class="content">
       <div class="headPortrait">
         <img class="headphoto" src="../../assets/show/show3.jpg" width="100" height="100" alt="">
        </div>

        <div class="signature">
          <h3>龙哥Blogs</h3>
         
          <p>一个90后小站长！喜欢分享，业余投资爱好者。</p>
          <p>欢迎您，来到我的个人博客，你，我生命中一个重要的过客，我们之所以是过客，因为你未曾会为我停留。</p>
        </div>


    </div>
    <div class="monologue">
      <h3>内心独白</h3>
      <p>
        我是龙哥Blogs的站长小龙,从接触互联网开始我都一直渴望有自己的一个博客。
        经过一番准备,在本次毕业设计中决定做一个属于自己的个人博客。
        建这个网站的目的就是分享一些个人观点,写一写原创文章,记录生活的点点滴滴,
        花花世界人来人往,是对是错记下来留着慢慢回味便是一种享受。
        如一句歌词“生活是一碗辛酸的面,头发白白的滋味”慢
        慢回味很美。
      </p>
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
      <!-- <div class="dandelion">
        <span class="smalldan"></span>
        <span class="bigdan"></span>
      </div> -->
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.page{
  background-color: #E9EAED;
  padding: 30px 0;
}
.content{
  background-color: white;
  width: 85vw;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 10px;
  padding: 10px 15px;
  display: flex;
  .headphoto{
    border-radius: 50px;
  }
  .signature{
    padding-left: 25px;
    h3{
      line-height: 40px;
    }
    p{
      line-height: 30px;
    }
  }
  
}
.monologue{
  background-color: white;
  width: 85vw;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 10px;
  padding: 10px 15px;
  h3{
    line-height: 40px;
  }
  p{
    line-height: 30px;
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
</style>