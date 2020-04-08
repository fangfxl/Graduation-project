<template>
  <div class="page">
    <div class="block">
      <div class="timeLine">
        <el-timeline>
          <el-timeline-item
            class="text"
            :color="show(info.active)"
            v-for="(info , index ) in ApplicationInfos"
            :key="index"
          >
            <div class="time">{{info.timestamp}}</div>
            <div class="content">
              <p :class="(info.active ? 'list' : 'title' )">{{info.content}}</p>
              <div v-if="info.showbtn">
                <p class="showBtn" @click="toggle(info)">{{ info.btninfo }}</p>
                <div class="info" v-show="info.show">
                  <span class="reason">说明原因</span>
                  <span class="details">我想撤回这个办件。balabala</span>
                </div>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "timeLine",
  data() {
    return {
      ApplicationInfos: [
        {
          content: "撤回成功，恢复办件",
          timestamp: "2018-04-12 20:46",
          active: "true", //控制左边圆点颜色字段
          btninfo: "展开申请信息"
        },
        {
          content: "你以及提交办件撤回申请，待业务部门审核", //展示标题
          timestamp: "2018-04-03 20:46", //展示时间的
          showbtn: "true", //控制"展开申请信息"是否展示
          show: false, //控制点击"展开申请信息"后展示的div
          btninfo: "展开申请信息" //展示按钮展示信息
        },
        {
          content: "你以及提交办件撤回申请，待业务部门审核",
          timestamp: "2018-04-03 20:46",
          btninfo: "展开申请信息"
        },
        {
          content: "审核不通过，审核意见：撤回申请书不符合要求",
          timestamp: "2018-04-03 20:46",
          showbtn: "true",
          show: false,
          btninfo: "展开申请信息"
        },
        {
          content: "你已提交办件撤回申请",
          timestamp: "2018-04-03 20:46"
        }
      ]
    };
  },
  methods: {
    //切换
    toggle(info) {
      info.show = !info.show;
      if (info.btninfo == "展开申请信息") {
        info.btninfo = "收起申请信息";
      } else {
        info.btninfo = "展开申请信息";
      }
    },
    //时间点颜色
    show(active) {
      if (active) {
        return "#254CCA";
      }
    }
  },
  mounted() {
    this.addshow();
  }
};
</script>

<style  lang="scss" scoped>
.text {
  display: flex;
}
.page {
  background: rgba(241, 242, 243, 1);
  border-radius: 4px;
}
.block {
  padding: 30px 40px;
}
.time {
  width: 157px;
  float: left;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
}

.content {
  float: left;
  .title {
    font-size: 16px;
    line-height: 24px;
  }
  .list {
    font-weight: 800;
    font-size: 16px;
    line-height: 24px;
  }
  .showBtn {
    padding: 7px 0;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 800;
    color: #254cca;
    line-height: 22px;
    cursor: pointer;
  }
  .info {
    margin-top: 10px;
    width: 826px;
    height: 78px;
    line-height: 78px;
    padding-left: 28px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;

    .reason {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #545454;
      line-height: 26px;
      padding-right: 54px;
    }
    .details {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 26px;
    }
  }
  .info::before {
    content: "";
    position: absolute;
    top: 50px;
    left: 205px;
    border: 10px solid #5190ac;
    border-color: transparent transparent #ffffff transparent;
  }
  p {
  }
}
</style>