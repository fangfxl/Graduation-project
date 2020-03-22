<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title" width="500"></el-input>
    </el-form-item>
    <el-form-item label="文章分类">
      <el-select v-model="article.sort_id" placeholder="请选择">
        <el-option
          v-for="item in sorts"
          :key="item._id"
          :label="item.Sort_name"
          :value="item.Sort_name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章内容">
          <quill-editor 
                v-model="article.content" 
                ref="myQuillEditor" 
                :options="editorOption" 
              >
          </quill-editor>
    </el-form-item>
       <el-form-item label="标签">
      <el-select v-model="article.label_id" placeholder="请选择">
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
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title:'',
        content:'',
        image:'show1.jpg',
        time:'',
        author:'龙哥',
        views:0,
        comment_count:0,
        sort_id:'',
        label_id:''
      },
      sorts:'',//分类
      labels:'',//标签
      options:'',
      value:'',
      content: `<p>hello world</p>`,
      editorOption: {},
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
      console.log(aData);
      this.article.time = aData.getFullYear() + '-' + (aData.getMonth()+1) + '-' +aData.getDate() + ' ' + aData.getHours() + ':' + aData.getMinutes() + ':' + aData.getSeconds();
      console.log(this.article)
      this.$http.post("addArticle", this.article).then(() => {
        this.$message({
          message: "文章创建成功",
          type: "success"
        });
        console.log(this.article)
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
</style>