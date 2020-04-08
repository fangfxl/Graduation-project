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
          <h2 class="menu"><span class="title">最新博文</span></h2>
          <div class="list" v-for="(article , index ) in  dataShow" :key="index">
              <h3>
                <a class="article-title"  href="javascript:void(0)"  @click="goToDetails(article._id)">{{ article.title }}</a>
              </h3>
              <figure>
                <img :src="getImgUrl(article.image)" alt="本站个人博客模板下载分享" />
              </figure>
              <ul>
                <p class="article-content" v-html="article.content">{{ article.content}}</p>
                <a title="本站个人博客模板下载分享" href="javascript:void(0)"  @click="goToDetails(article._id)"  class="readmore">阅读全文&gt;&gt;</a>
              </ul>
              <p class="dateview">
                <i class="el-icon-time"></i>
                <span>{{article.time}}</span>
                <span>
                  分类：[
                  <a href="#">{{article.sort_id}}</a> ]
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
<script src="./articleList.js">

</script>
<style lang="scss" scoped>
@import "articleList.scss";
</style>