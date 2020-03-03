<template>
  <div class="wrapper">
        <!--       弹出层-->
        <el-dialog
                :visible.sync="fatherValue"
                width="50%"
                :before-close="handleClose"
                :modal=true
                :close-on-click-modal=false
                :show-close=false
                top="300px"
        >
            <!--            顶部标题-->
            <span slot="title">
                <h4 class="font-white float-L font-Size">信息提示</h4>
                <div class="clearfix"></div>
            </span>
            <!--            中间内容-->
            <div class="midContent">
                <slot name="midContent"></slot>
            </div>
            <!--            底部按钮-->
            <span slot="footer" class="dialog-footer">
                <slot name="footerBtn"></slot>
               </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
  name:"dialog",
  components: {},
  props: {
     fatherValue: {
            type: [Boolean],
            default:false
        }
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {
     /**
         * @description 弹窗关闭
         */
        handleClose() {
            function executor(resolve, reject) {
                resolve(false)
            }
            let demo = new Promise(executor)
            demo.then((data) => {
                this.$emit('input', data)
            }).finally(() => {
                done()
            })
        },
  },
  created() {},
  mounted() {
    
  }
};
</script>
<style lang="scss" scoped>
.wrapper{
   /deep/ .el-dialog {
    box-shadow: none;
    -webkit-box-shadow: none;
    background: rgba(255, 255, 255, 0) !important;


    //对话框顶部标题
    .el-dialog__header {
      background-color: #1560B7;
      border-radius: 3px 3px 0 0;
      height: 6.7vh;
      padding: 2vh 20px 2.3vh;
      //关闭按钮
      .el-dialog__headerbtn {
        top: 2.3vh;
      }

      //按钮icon
      .el-dialog__headerbtn .el-dialog__close {
        color: #FFFFFF;
      }
    }

    //中间body内容
    /deep/ .el-dialog__body {
      background-color: rgba(72, 133, 217, 0.4);
      .midContent{
        color: #FFFFFF;
        font-size: 1.5rem;
      }
    }

    //对话框底部
    .el-dialog__footer {
      text-align: center;
      background-color: rgba(72, 133, 217, 0.4);
      border-radius: 0 0 3px 3px;

    }


  }

}
</style>