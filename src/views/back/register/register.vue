<template>
   <div class="register">
        <div class="card">
            <div class="logo">
                龙哥blogs
            </div>
            <!--注册表单-->
            <div class="registerFrom">
                <el-form :rules="rules" :model="form" ref="regForm" label-width="100px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username" class="input-width" clearable
                                  placeholder="只限英文和数字"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.password" class="input-width"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="form.email" class="input-width"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                            <el-option label="男" value="male"></el-option>
                            <el-option label="女" value="female"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="btn_group">
                        <el-button type="success" @click="doReg('regForm')">注册</el-button>
                        <el-button @click="toHome">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
       return {
            form: {
                username: '',
                password: '',
                email: '',
                sex: '',
                address: '',
                roomNum: ''
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
            //    次级选择器
            options: [
                {
                    value: 'guangzhou',
                    label: '广州',
                    children: [
                        {
                            value: 'haizhu',
                            label: '海珠',
                        },
                        {
                            value: 'tianhe',
                            label: '天河',
                        },
                        {
                            value: 'yuexiu',
                            label: '越秀',
                        },
                        {
                            value: 'baiyun',
                            label: '白云',
                        },
                        {
                            value: 'panyu',
                            label: '番禺',
                        },
                        {
                            value: 'conghua',
                            label: '从化',
                        },
                        {
                            value: 'zengcheng',
                            label: '增城',
                        },
                    ]
                },
                {
                    value: 'zhanjiang',
                    label: '湛江',
                    children: [
                        {
                            value: 'xiashan',
                            label: '霞山'
                        },
                        {
                            value: 'kaifaqu',
                            label: '开发区'
                        },
                        {
                            value: 'chikan',
                            label: '赤坎'
                        },
                    ]
                },
            ],
        }
  },
  watch: {},
  computed: {},
  methods: {
     toHome() {
            this.$router.push('/')
        },
        //    次级选择器-存入数据
        handleChange(val) {
            console.log(this.form.address[0])
        },
        //点击注册
        doReg(regForm) {
            this.$refs[regForm].validate((valid) => {
                if (valid) {
                    this.$message.success('注册成功')
                } else {
                    // this.$message.error('注册失败');
                    return false;
                }
            })
        }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.register {
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