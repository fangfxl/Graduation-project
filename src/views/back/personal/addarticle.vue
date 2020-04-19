<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <div class="title">
          <el-input v-model="article.title" placeholder="请输入文章标题" ></el-input>
      </div>
    </el-form-item>
      <el-form-item label="配图名称">
         <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="getFile"
            :before-remove="beforeRemove"
              multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
    </el-form-item>
    <el-form-item label="文章分类">
      <el-select v-model="article.sort" placeholder="请选择">
        <el-option
          v-for="item in sorts"
          :key="item._id"
          :label="item.Sort_name"
          :value="item.Sort_name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章内容">
      <div class="editor">
          <quill-editor 
                v-model="article.content" 
                ref="myQuillEditor" 
                :options="editorOption" 
              >
          </quill-editor>
      </div>
          
    </el-form-item>
       <el-form-item label="标签">
        <el-select v-model="article.label" multiple  placeholder="请选择">
          <el-option
            v-for="item in labels"
            :key="item.value"
            :label="item.label_name"
            :value="item.label_name"
          ></el-option>
      </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    <!-- <el-form-item>
      <div class="block">
        <span class="demonstration">默认</span>
        <el-image class="image" :src="src"></el-image>
      </div>
    </el-form-item> -->
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title:'',
        content:'',
        image:'',
        time:'',
        author:'龙哥',
        views:0,
        count:0,
        sort:'',
        label:[]
      },
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpe',
      sorts:[],//分类
      labels:[],//标签
      editorOption: {},
      // imageUrl: '',//上传图片
      fileList: [],
      imageUrl:'',
      imgRes:'',
      imgName:'',
      modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'],     //引用，代码块
              [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
              [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
              [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
              [{ 'direction': 'rtl' }],             // 文本方向
              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'header': [1, 2, 3, 4, 5, false] }],     //几级标题
              [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
              [{ 'font': [] }],     //字体
              [{ 'align': [] }],    //对齐方式
              ['clean'],    //清除字体样式
              ['image','video']    //上传图片、上传视频
            ]
          },
          theme:'snow'
        }
  },
  computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
  },
  methods: {
      //图片一点击打开就触发的函数
      getFile(file, fileList){
        this.imgName = file.name;
        this.imageUrl=file.url;
        
      },
      handleExceed(files, fileList) {
         this.$message.warning(`当前限制选择1张，若想替换请先将已存的图片删除`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    // 获取分类
    getSort() {
      this.$http.get("sort").then(res => {
        this.sorts = res.data;
        console.log(this.sorts);
      });
    },
    // 获取标签
    getLabel() {
       this.$http.get("label").then(res => {
        this.labels = res.data;
        console.log(this.labels);
      });
    },
    saveArticle() {
      var aData = new Date();
      this.article.time = aData.getFullYear() + '-' + (aData.getMonth()+1) + '-' +aData.getDate() + ' ' + aData.getHours() + ':' + aData.getMinutes() + ':' + aData.getSeconds();
     console.log("img",this.imgName)
      this.article.image = this.imgName || 'show1.jpg';
       console.log(this.article)
      this.$http.post("addArticle", this.article).then(() => {
        this.$message({
          message: "文章创建成功",
          type: "success"
        });
        this.$router.push("/personal"); //创建成功跳回文章列表页
      });
    }
  },
  created(){
    this.getSort();
    this.getLabel()
  }
};
</script>
<style lang="scss">
textarea {
  width: 400px;
  height: 300px;
}
.editor{
  height: 310px;
   width: 1000px
}
.quill-editor{
    height: 200px !important;
  }
.title{
  width: 1000px;
}
.image{
  width: 200px;
  height: 150px;
}

// 上传图片
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>