<template>
    <div class="about">
        <h1> this is about</h1>
      <label for="test">测试<input type="text" v-model="msg" placeholder="请输入文本" class="test" name="test"></label>  
    </div>
</template>
<script>

export default{
    name:'about',
    data(){
        return{
            msg:'aa'
        }
    },
    created(){

    },
    methods:{
       
    },
   
    watch:{
         '$route.path': function(newVal,oldVal){
              if(newVal === '/home'){
                  console.log('欢迎进入login')
              }else if(newVal === '/about'){
                console.log('欢迎进入register')
              }
          }

    
    }
}
</script>
<style lang="scss" scoped>
@import "About.scss";
</style>