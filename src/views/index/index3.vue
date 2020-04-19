<template>
    <div class="index">
        <!-- <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <img  class= "wheel" src="../../assets/show/home.jpg" alt="">
          </el-carousel-item> -->
          <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="getFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
              multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        <!-- </el-carousel> -->



         <el-upload
          action="#"
          list-type="picture-card"
          :show-file-list="false"
          :on-change="getFile"
          style="float:left;"
          accept="image/jpeg"
          :auto-upload="false">
          <img v-if="imageUrl" :src="imageUrl" class="el-upload-list__item-thumbnail">
          <i v-else slot="default" class="el-icon-plus"></i>
       </el-upload>
    </div>
    
</template>

<script>
export default {
 data() {
      return {
        fileList: [],
          imageUrl:'',
          imgRes:'',
          imgName:'',

      };
    },
    methods: {
       //把图片转成64位流
          getBase64(file) {
            return new Promise(function(resolve, reject) {
            let reader = new FileReader();
            let imgResult = "";
            reader.readAsDataURL(file);
            reader.onload = function() {
              imgResult = reader.result;
            };
            reader.onerror = function(error) {
              reject(error);
            };
            reader.onloadend = function() {
               resolve(imgResult);
            };
          });
        },
         //图片一点击打开就触发的函数
         getFile(file, fileList){
         console.log(file)
           this.imgName = file.name;
           console.log(this.imgName);
           this.imageUrl= file.url;
           console.log("lujing",this.imageUrl)
           this.getBase64(file.raw).then(res => {
            //  _this.imgRes=res;
            console.log("res")
          });
         },
      beforeAvatarUpload(file,fileList){
        console.log("ffff",file.name)
        //  console.log("测试",file, fileList);
      },
      handleRemove(file, fileList) {
        console.log("测试",file, fileList);
      },
      handlePreview(file) {
        console.log("cs11",file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        console.log("cs222",file,fileList)
        return this.$confirm(`确定移除 ${ file }？`);
      }
    }
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