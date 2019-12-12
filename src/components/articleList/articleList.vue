<template>
  <div class="articleList">
    <div class="container">
      <ul class="article">
        <el-row :gutter="10" v-for="(index, n) in 36" :key="n">
          <el-col :sm="10" :md="8" :lg="5" :xl="5" hidden-xs-only>
            <div class="left">
              <a href="#">
                <img src="../../assets/img/article2.jpg" alt />
              </a>
            </div>
          </el-col>
          <el-col :sm="14" :md="16" :lg="19" :xl="19">
            <div class="right">
              <div class="top">
                <a href="#">Zaha Hadid：沙特利雅得地铁站</a>
                <p>
                  Zaha Hadid建筑事务所获得了沙特阿拉伯利雅得地
                  铁站竞赛项目的第一名。地铁站作为利雅得全新公
                  共交通系统的组成部分，坐落于Abdullah国王金融
                  区的一隅，将成为城市六条地铁线路中的三条的换乘站
                  。新的地铁站落成后将会更好地融入阿卜杜拉国王金融区，更
                  好地满足该金融区多样化的运输需求，符合该地长远发展利益。
                </p>
              </div>
              <div class="bottom">
                <span  class="author">fangxiaolong</span>
                <span  class="time">2016-09-09</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </ul>
    </div>
  </div>
</template>
<script src="./articleList.js"></script>
<style lang="scss" scoped>
@import "articleList.scss";
</style>