<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <div class="top">
      <img class="top-img" src="../assets/img/guide/top.png" alt="" />
      <div class="animation" :class="{ rotate: showAnimation }">
        <img class="arrow" src="../assets/img/guide/arrow.png" alt="" />
      </div>
      <div class="txt-con">
        <span class="unit">￥</span>
        <span class="money">{{ money }}</span>
      </div>
    </div>
    <div class="middle">
      <div class="input-con">
        <img class="icon" src="../assets/img/guide/mobile.png" alt="" />
        <input
          class="input"
          type="text"
          v-model="mobileNum"
          placeholder="请输入您的手机号码"
        />
      </div>
      <img
        class="img-btn"
        @click="onGetApp"
        src="../assets/img/guide/btn.png"
        alt=""
      />
      <div class="advisory-con">
        <img class="triangle" src="../assets/img/guide/triangle.jpg" alt="" />
        <img class="baogao" src="../assets/img/guide/baogao.png" alt="" />
        <div class="txt">来自广东的李女士成功领取1000元</div>
      </div>
      <div class="protocol-con">
        <span class="dui" @click="onAgree" :class="{ active: isAgree }"></span>
        <p class="txt">
          同意并接受<a class="link" href="http://xianquansi.cn/mayi/credit.pdf"
            >《蚂蚁信用用户服务协议》</a
          >
        </p>
      </div>
    </div>

    <div class="down">
      <div class="icon-wrapper" v-for="(item, index) in iconArr" :key="index">
        <img class="icon-img" :src="item.icon" alt="" />
        <p class="title">{{ item.title }}</p>
        <p class="subTitle">{{ item.subTitle }}</p>
      </div>
    </div>
    <div class="footer">
      <p class="record">粤ICP备2000401号-1</p>
      <div class="warn">
        贷款有风险，借款需谨慎
        <p>请根据个人能力合理贷款，理性消费，避免逾期</p>
      </div>

      <p>贷款额度，放款时间以实际审批结果为准</p>
      <p>金融服务将根据您的</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      showAnimation: false,
      money: 0,
      isAgree: true,
      mobileNum: "",
      iconArr: [
        {
          icon: require("../assets/img/guide/1.png"),
          title: "额度高",
          subTitle: "最高额度5万元"
        },
        {
          icon: require("../assets/img/guide/2.png"),
          title: "审核快",
          subTitle: "最快30分钟到账"
        },
        {
          icon: require("../assets/img/guide/3.png"),
          title: "放心贷",
          subTitle: "正规安全机构"
        },
        {
          icon: require("../assets/img/guide/4.png"),
          title: "利息低",
          subTitle: "年化利率低"
        },
        {
          icon: require("../assets/img/guide/5.png"),
          title: "可分期",
          subTitle: "还款无压力"
        },
        {
          icon: require("../assets/img/guide/6.png"),
          title: "门槛低",
          subTitle: "仅凭身份证可借"
        }
      ]
    };
  },
  created() {
    this.showAnimation = false;
  },
  mounted() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 1);
    let amount = setInterval(() => {
      if (this.money < 200000) {
        this.money += 625;
      } else {
        clearInterval(amount);
      }
    }, 0);
  },
  methods: {
    onAgree() {
      this.isAgree = !this.isAgree;
    },
    onGetApp() {
      if (this.$utls.isMobileNum(this.mobileNum)) {
        if (this.isAgree) {
          if (this.$utls.isAndroid()) {
            window.location.href =
              "https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/jiguang.apk";
          } else {
            window.location.href =
              "itms-services://?action=download-manifest&url=https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/manifest_jiguang.plist";
            this.$router.push({
              name: "download"
            });
          }
        } else {
          this.$toast("请先同意协议！");
        }
      } else {
        this.$toast("请输入正确手机号！");
      }
    }
  }
};
</script>
<style lang="less" scoped>
// @keyframes rotate {
//   transform: rotate(-50deg);
// }
.top {
  width: 100%;
  .top-img {
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .animation {
    //background: red;
    width: 57%;
    text-align: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -190%) rotate(-65deg);
    transform-origin: center;
    transition: transform 2s;
    .arrow {
      width: 35px;
      height: 40px;
      transform: rotate(-160deg);
      //animation: ;
    }
  }
  .rotate {
    transform: translate(-50%, -122%) rotate(160deg);
  }
  .txt-con {
    text-align: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -150%);
    font-size: 38px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #1185fc;
    .unit {
      font-size: 20px;
    }
    .money {
    }
  }
}
.middle {
  margin-top: 25px;
  padding: 0 20px;
  .input-con {
    width: 100%;
    height: 53px;
    border: 1px solid #9d9d9d;
    border-radius: 50px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .icon {
      width: 14px;
      padding-right: 12px;
      border-right: 1px solid #9d9d9d;
      margin-right: 20px;
    }
    .input {
      border: none;
      outline: none;
      height: 80%;
      flex: 1;
    }
  }
  .img-btn {
    margin-top: 19px;
    width: 100%;
    margin-bottom: 15px;
  }
  .advisory-con {
    width: 100%;
    height: 50px;
    box-shadow: 2px -1px 2px 2px #e7e7e7;
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    .triangle {
      position: absolute;
      top: -18px;
      left: 52px;
      z-index: 1;
      width: 40px;
    }
    .baogao {
      width: 42px;
      height: 37px;
      margin-right: 7px;
    }
    .txt {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      opacity: 0.8;
    }
  }
  .protocol-con {
    margin-top: 25px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .dui {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 100px;
      border: 1px solid #ccc;
      margin-right: 4px;
    }
    .active {
      background: url("../assets/img/guide/dui.png");
      background-size: contain;
    }
    .txt {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #9a9899;
      .link {
        color: #1185fc;
      }
    }
  }
}
.down {
  width: 100%;
  padding: 23px 0;
  background: #ecf3ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .icon-wrapper {
    flex: 1;
    min-width: 30%;
    .icon-img {
      width: 35px;
      height: 35px;
      margin-bottom: 10px;
    }
    .title {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
      margin-bottom: 4px;
    }
    .subTitle {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #8a8a8a;
    }
  }
  .icon-wrapper:nth-of-type(1),
  .icon-wrapper:nth-of-type(2),
  .icon-wrapper:nth-of-type(3) {
    margin-bottom: 20px;
  }
}
.footer {
  background: #f4f9fb;
  padding-top: 27px;
  padding-bottom: 30px;
  font-size: 9px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #9d9d9d;
  p {
    line-height: 1.5;
  }
  .warn {
    margin-top: 22px;
    margin-bottom: 22px;
  }
}
</style>
