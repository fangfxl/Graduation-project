export default {
    name: "pageHeader",
    data(){
      return {
        input2:'',
        personal:false,//站长登录显示
      }
    },
    props: {
      msg: String
    },
    methods:{
     // 路由跳转
     goToUrl(url) {
      this.$router.push({
          path: url
      });
  }

    },
    mounted(){
     
    },
    watch:{}
    
  };
  