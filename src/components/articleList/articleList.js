export default {
  name: "articleList",
  data() {
    return {
      mas: '',
      articles: [], //文章列表
      pageSize: 15,
      currentPage: 1,
      rank:[],
      articlesAll:[],
    }
  },
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
  //监听搜索
  watch:{
    '$store.state.search' (newVal , oldVal){
      console.log(newVal,oldVal,"监听");
      this.articles = this.articlesAll.filter(item => item.title.includes(newVal));
    }
  },
  methods: {
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
      console.log(id)
      this.$router.push({path:'/details', query:{article_id : id}});
    },
    //获取文章列表
    getArticles() {
      this.$http.get('articles').then(res => {
        this.articles = res.data.reverse();
        this.rank = res.data.concat();
        this.articlesAll = res.data;
        console.log(this.articles)
        this.Rank();
      })
    },
    // 获取图片地址
    getImgUrl(icon) {
      return require("@/assets/show/" + icon)
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
  },
  created() {},
  mounted() {
    this.getArticles();
  }
}