export default {
    name: "pageHeader",
    data(){
      return {
        input2:'',
      }
    },
    props: {
      msg: String
    },
    methods:{
   
    },
    mounted(){
      

    },
    watch:{
      '$route.path': function(newVal,oldVal){
           if(newVal === '/'){
               console.log('欢迎进入login')
           }else if(newVal === '/about'){
              console.log('欢迎进入register')
           }
       }

 
 }
    
  };
  