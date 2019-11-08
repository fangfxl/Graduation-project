<template>
  <div class="home">
    <div class="row">
      <div class="row-item" v-for="(index, n) in 6" :key="n">
        <div class="item">
          <div class="item-img">
            <img class="image" src="../../assets/img/fruit_1.jpg" alt />
            <div class="icon">
              <i class="el-icon-position"></i>
            </div>
            <p class="wrap-img"></p>
          </div>
          <div class="item-content">
            <h1>Class Aptent Taciti Urna Bibendum Id</h1>
            <p class="c-say">
              Suspendisse porttitor sapien ac lectus euismod imperdiet.
              Curabitur nec nibh at massa pellentesque accumsan eu id nibh.
              Donec accumsan ut mi.
            </p>
            <p class="c-day">MAY 21, 2016 BY KOMPLEET</p>
            <a class="more">Read more</a>
          </div>
          <div class="item-footer">
            <div class="f-content">Continue reading …</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Home.js"></script>
<style lang="scss" scoped>
@import "./Home.scss";
</style>
