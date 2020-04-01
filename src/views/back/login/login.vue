<template>
  <div class="login">
     <div class="card">
             <!--登录框logo-->
            <div class="logo">龙哥blogs</div>
            <!--登录框表单-->
            <div class="login-form container" v-if="isshows">
                <el-form ref="form" @submit.native.prevent="login()"   :model="form" label-width="100px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" class="input-width" @input="replaceSpace()" clearable placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.password" @input="replaceSpace()" class="input-width"
                                  clearable placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" native-type="submit">登录</el-button>
                        <!-- <el-button @click="goregister()">未注册！去注册</el-button> -->
                    </el-form-item>
                    <el-form-item>
                        <span class="fr" ref="loginRef"></span>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 注册框表单 -->
             <div class="registerFrom" v-else >
                <el-form :rules="rules" :model="form1" ref="regForm" label-width="100px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form1.username" class="input-width" clearable
                                  placeholder="只限英文和数字"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form1.password" class="input-width"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="form1.email" class="input-width"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="form1.sex" placeholder="请选择性别">
                            <el-option label="男" value="male"></el-option>
                            <el-option label="女" value="female"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="btn_group">
                        <el-button type="success" @click="register()">注册</el-button>
                        <el-button @click="goLogin()">已注册，去登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
      </div>
     
  </div>
  
</template>

<script>
import { eventBus } from '../../../main'
export default {
  components: {},
  props: {},
  data() {
    return {
      // 登录表单
      form: {
                  username: '',
                  password: ''
              },
      // 注册表单
      form1: {
                  username: '',
                  password: '',
                  email: '',
                  sex: '',
              },
      //表单验证
      rules: {
          username: [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 4, max: 10, message: '名字长度在4~10位', trigger: 'blur'}
          ],
          password: [
              {required: true, message: '请输入密码', trigger: 'blur'},
              {min: 6, max: 11, message: '密码长度在6~11位', trigger: 'blur'}
          ],
          email: [
              {required: true, message: '请输入邮箱号', trigger: 'blur'},
              {type: 'email', message: '请输入正确邮箱号', trigger: 'blur'}
          ],
          sex: [
              {required: true, message: '请选择性别', trigger: 'change'}
          ]
      },
      isshows:"true"
    };
  },
  watch: {},
  computed: {},
  methods: {
    //正则替换空格
        replaceSpace() {
            this.form.username = this.form.username.replace(/\s+/g, "");
            this.form.password = this.form.password.replace(/\s+/g, "");
        },
        goLogin() {
            this.isshows = true
        },
        goregister(){
          this.isshows = false;
        },
        // 登录
       login() {
          // this.$http.get('/users').then(res =>{
          //   console.log(res)
          // })
          this.$http.post('/login',this.form)
            .then(res => {
              if(res.status == 200){
                console.log(res)
                  // alert(res.data.massage)
                if(res.data.massage == "登录成功"){
                   this.$message({
                      message: "登录成功",
                      type: "success"
                    });
                    sessionStorage.setItem('personal', 'true');
                    eventBus.$emit('personal', 'true')
                    this.$router.push("/personal");
                }else{
                  this.$message({
                      message: res.data.massage,
                      type: "error"
                    });
                }
              }
            });
        },
        register(){
          this.$http.post('/register',this.form1).then(res =>{
            if(res.status == 200){
                if(res.data.massage == '注册成功'){
                  this.$message({
                      message: res.data.massage,
                      type: "success"
                    });
                  this.isshows = true
                }else{
                  this.$message({
                      message: res.data.massage,
                      type: "error"
                    });
                }
            console.log(res)
            }
          })
        }

  },

};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  background-color: #f4f6f9;
}
.logo{
  text-align: center;
  padding: 30px 0;
  font-size: 28px;
  font-weight: 700;
}
.card {
  margin: 0px auto;
  width: 550px;
  // height: 400px;
  border: 1px solid rgb(241, 234, 234);
  border-radius: 10px;
  background-color: #ffffff;
  padding-right: 50px;
}
</style>