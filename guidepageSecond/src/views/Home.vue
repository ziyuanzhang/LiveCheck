<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <div class="top">
      <img class="top-img" src="../assets/img/guide/top-logo.png" alt="" />
      <img class="top-title" src="../assets/img/guide/top-title.png" alt="" />

      <div class="top-circle">
        <div class="animation" :class="{ rotate: showAnimation }">
          <img class="arrow" src="../assets/img/guide/arrow.png" alt="" />
        </div>
        <div class="txt-con">
          <p class="tips">特批额度限时有效</p>
          <p class="">
            <span class="unit">￥</span>
            <span class="money">{{ money }}</span>
          </p>
        </div>
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
        <div class="picTab">
          <div class="topDiv">
            <p>来自广东的李女士成功领取1000元;</p>
            <p>来自湖南的王女士成功领取1500元;</p>
            <p>来自福建的张女士成功领取2000元;</p>
            <p>来自浙江的赵女士成功领取1000元;</p>
            <p>来自湖北的钱女士成功领取1500元;</p>
            <p>来自湖南的刘女士成功领取1500元;</p>
            <p>来自广东的张女士成功领取2500元;</p>
            <p>来自江西的钱女士成功领取1000元;</p>
            <p>来自苏州的李女士成功领取2500元;</p>
            <p>来自湖北的刘女士成功领取1500元;</p>
          </div>
        </div>
      </div>
      <div class="protocol-con">
        <span class="dui" @click="onAgree" :class="{ active: isAgree }"></span>
        <p class="txt">
          我已阅读并同意
          <a class="link" href="http://xiniuyp.cn/register.html">
            《e卡花用户协议》</a
          >
          与
          <a class="link" href="http://xiniuyp.cn/privacy.html">
            《隐私协议》</a
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
    <div class="recharge">
      <img
        class="title-img"
        src="../assets/img/guide/recharge-title.png"
        alt=""
      />
      <div class="list">
        <img
          :src="item"
          alt=""
          v-for="(item, index) in rechargeImgArr"
          :key="index"
        />
      </div>
    </div>
    <div class="footer">
      <p class="record">{{ recordNum }}</p>
      <p class="company">{{ company }}</p>
      <div class="warn">
        贷款有风险，借款需谨慎
        <p>请根据个人能力合理贷款，理性消费，避免逾期</p>
      </div>

      <p>贷款额度，放款时间以实际审批结果为准</p>
      <p>金融服务将根据您的个人情况由适合的正规金融机构提供</p>
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
      isAgree: false,
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
      ],
      txtArr: [
        "来自广东的李女士成功领取1000元",
        "来自湖南的王女士成功领取1500元",
        "来自福建的张女士成功领取2000元",
        "来自浙江的赵女士成功领取1000元",
        "来自湖北的钱女士成功领取1500元"
      ],
      index: 0,
      recordNum: "",
      company: "",
      rechargeImgArr: [
        require("../assets/img/guide/recharge1.png"),
        require("../assets/img/guide/recharge2.png"),
        require("../assets/img/guide/recharge3.png"),
        require("../assets/img/guide/recharge4.png"),
        require("../assets/img/guide/recharge5.png"),
        require("../assets/img/guide/recharge6.png"),
        require("../assets/img/guide/recharge7.png"),
        require("../assets/img/guide/recharge8.png")
      ]
    };
  },
  async created() {
    this.showAnimation = false;
    let data = {
      channelNo: this.$channelNo,
      clientType: this.$clientType
    };
    let res = await this.$ajax.get("/ad/browserCount", { params: data });
    if (res && res.data && res.data.msg == "success") {
      console.log("埋点：", res);
    }
    let recordData = {
      configType: "ICP",
      majia: this.$majia
    };
    let recordRes = await this.$ajax.get("/api/common/getConfig", {
      params: recordData
    });

    if (recordRes && recordRes.data.status == 0) {
      console.log("recordRes:", recordRes);
      this.recordNum = recordRes.data.data.split(",")[0];
      this.company = recordRes.data.data.split(",")[1];
    }
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
    async onGetApp() {
      if (this.$utls.isMobileNum(this.mobileNum)) {
        if (this.isAgree) {
          let data = {
            channelNo: this.$channelNo,
            clientType: this.$clientType,
            majia: this.$majia,
            mobile: this.mobileNum
          };
          let res = await this.$ajax.get("/api/user/FastRegister", {
            params: data
          });
          if (res) {
            if (res.data && res.data.status == "0") {
              if (this.$utls.isAndroid()) {
                window.location.href =
                  "https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/ekahua.apk";
              } else {
                window.location.href =
                  "itms-services://?action=download-manifest&url=https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/manifest_ekahua.plist";
                this.$router.push({
                  name: "download",
                  params: {
                    mobile: this.mobileNum
                  }
                });
              }
            } else {
              this.$toast(res.data.msg);
            }
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
@keyframes move {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-320px);
  }
}
// @keyframes rotate {
//   transform: rotate(-50deg);
// }
.top {
  width: 100%;
  height: 423px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url("../assets/img/guide/top-bg.png");
  text-align: left;
  .top-img {
    height: 32px;
    margin-top: 16px;
    margin-left: 19px;
  }
  .top-title {
    margin-top: 12px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    height: 75px;
  }
  .top-circle {
    width: 250px;
    height: 250px;
    margin: 15px auto 0;
    background-image: url("../assets/img/guide/top-circle.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    .animation {
      //background: red;
      width: 85%;
      text-align: left;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-60deg);
      transform-origin: center;
      transition: transform 2s;
      .arrow {
        width: 35px;
        height: 40px;
        transform: rotate(-160deg);
      }
    }
    .rotate {
      transform: translate(-50%, -50%) rotate(170deg);
    }
    .txt-con {
      text-align: left;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 38px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #000000;
      .tips {
        text-align: center;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #3b3b3b;
        margin-bottom: 10px;
      }
      .unit {
        font-size: 20px;
      }
      .money {
      }
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
      color: #7e7e7e;
      font-size: 16px;
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
    .picTab {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      height: 100%;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      z-index: 9;
      .topDiv {
        animation: move 10s linear 0s infinite normal;
        text-align: center;
      }
      p {
        text-align: center;
        margin-bottom: 20px;
        color: #9d9d9d;
      }
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
        color: #ff9343;
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
      width: 40px;
      height: 40px;
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
.recharge {
  background-color: #fff;
  .title-img {
    width: 240px;
    height: 20px;
    margin: 35px 0;
  }
  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 30px;
    img {
      width: 90px;
      height: 120px;
    }
  }
}
.footer {
  background: #fefdfc;
  padding-top: 24px;
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
