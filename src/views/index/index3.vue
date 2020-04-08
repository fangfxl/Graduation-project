<template>
    <div class="index">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <img  class= "wheel" src="../../assets/show/home.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
    </div>
    
</template>

<script>
export default {

}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .wheel{
    width: 100%;
    height: 100%;
  }
</style>