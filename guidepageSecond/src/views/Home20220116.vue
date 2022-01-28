<template>
  <div class="home20220116">
    <img class="img topImg" src="../assets/img/home20220116/top.png" alt="" />
    <img class="img top2Img" src="../assets/img/home20220116/top2.png" alt="" />
    <div class="form">
      <div class="input-container">
        <img
          class="mobile-img"
          src="../assets/img/home20220116/monile.png"
          alt=""
        />
        <input
          class="input"
          type="number"
          v-model="mobileNum"
          placeholder="输入您的手机号码"
        />
      </div>

      <img
        class="btn-img"
        @click="onGetApp"
        src="../assets/img/home20220116/btn.png"
        alt=""
      />
      <div class="agree-container">
        <span class="icon-container" @click="onAgree">
          <img
            class="img"
            v-if="isAgree"
            src="../assets/img/home20220116/agree.png"
            alt=""
          />
          <i class="icon" v-else></i>
        </span>
        <span class="txt"
          >我已阅读并同意<a class="link" href="http://xiniuyp.cn/register.html"
            >《用户协议》
          </a>
          <a class="link" href="http://xiniuyp.cn/privacy.html">《隐私协议》</a>
        </span>
      </div>
    </div>

    <div class="footer">
      <img class="img" src="../assets/img/home20220116/footer.png" alt="" />
      <p class="record">
        <a href="https://beian.miit.gov.cn">{{ recordNum }}</a>
      </p>
    </div>
    <vStay v-if="showConfirm" @emitStay="eventStay"></vStay>
    <vVerifyWrapper
      v-if="showVerify"
      @emitSuccess="eventSuccess"
    ></vVerifyWrapper>
    <img
      class="shield"
      v-if="showShield"
      src="../assets/img/home20220116/shield.png"
      alt=""
    />
  </div>
</template>
<script>
import vStay from "@/components/vStay";
import vVerifyWrapper from "@/components/vVerifyWrapper";
export default {
  components: {
    vStay,
    vVerifyWrapper
  },
  data() {
    return {
      isAgree: false,
      mobileNum: "",
      recordNum: "粤ICP备2021153686号",
      company: "公司公司",
      showConfirm: false,
      showShield: false,
      showVerify: false
    };
  },
  async created() {
    //-------检测受否微信打开-----------
    if (this.is_weixn()) {
      this.showShield = true;
    }
    //--------检测是否下架------------
    this.checkTakeDown();
    //--------埋点--------
    this.browserCount();
    //-------获取ICP--------
    this.getTCP();
    //-----激活挽留--------
    this.fobidden_back();
  },
  methods: {
    onAgree() {
      this.isAgree = !this.isAgree;
    },
    onGetApp() {
      if (this.$utls.isMobileNum(this.mobileNum)) {
        if (this.isAgree) {
          this.showVerify = true;
        } else {
          this.$toast("请先同意协议！");
        }
      } else {
        this.$toast("请输入正确手机号！");
      }
    },
    //--------埋点----------
    async browserCount() {
      let data = {
        channelNo: this.$channelNo,
        clientType: this.$clientType
      };
      let res = await this.$ajax.get("/ad/browserCount", { params: data });
      if (res && res.data && res.data.msg == "success") {
        console.log("埋点：", res);
      }
    },
    //-----检测是否下架------
    async checkTakeDown() {
      let takeDownData = { channelNo: this.$channelNo };
      let takeDownRes = await this.$ajax.get("/api/common/checkChannel", {
        params: takeDownData
      });
      if (takeDownRes && takeDownRes.data.status === 1) {
        this.$router.push({
          name: "page404"
        });
      }
    },
    //-------获取ICP--------
    async getTCP() {
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
    async eventSuccess(type) {
      console.log("eventSuccess-外");
      if (type === "ok") {
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
                "https://zhaowojie.oss-cn-shanghai.aliyuncs.com/app/ekahua.apk";
            } else {
              window.location.href =
                "itms-services://?action=download-manifest&url=https://zhaowojie.oss-cn-shanghai.aliyuncs.com/app/manifest_ekahua.plist";
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
        this.showVerify = false;
      }
    },
    eventStay(obj) {
      if (obj.type == "close") {
        this.showConfirm = false;
      } else if (obj.type == "come") {
        this.showConfirm = false;
      } else if (obj.type == "back") {
        this.showConfirm = false;
        history.go(-1);
        window.removeEventListener("popstate", this.back_common);
      }
    },
    is_weixn() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    //禁用浏览器返回
    fobidden_back() {
      //防止页面后退
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.back_common);
    },
    back_common() {
      this.showConfirm = true;
      history.pushState(null, null, document.URL);
    }
  }
};
</script>
<style lang="less" scoped>
.home20220116 {
  font-size: 0;
  text-align: center;
  .img {
    width: 100%;
  }
  .top2Img {
    width: 90%;
    margin-top: 8px;
    margin-bottom: 44px;
  }
  .form {
    margin: 0 auto;
    width: 285px;
    padding-bottom: 60px;
    .input-container {
      width: 100%;
      height: 43px;
      background: #ffffff;
      border: 1px solid #7f7e7f;
      border-radius: 23px;
      padding-left: 68px;
      padding-right: 15px;
      box-sizing: border-box;

      display: flex;
      align-items: center;
      .mobile-img {
        height: 20px;
        margin-right: 13px;
      }
      .input {
        height: 90%;
        flex: 1;
        outline: none;
        border: none;
      }
    }
    .btn-img {
      margin-top: 13px;
      height: 50px;
    }
    .agree-container {
      margin-top: 13px;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #9a9899;
      line-height: 18px;
      text-align: left;

      display: flex;
      align-items: center;
      .icon-container {
        width: 14px;
        height: 14px;

        .icon {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 1px solid #9d9d9d;
          border-radius: 100px;
          box-sizing: border-box;
        }
        .img {
          width: 14px;
          height: 14px;
        }
      }
      .txt {
        margin-left: 6px;
        .link,
        .link:hover,
        .link:active {
          color: #765442;
        }
      }
    }
  }

  .footer {
    padding-top: 30px;
    .img {
      width: 100%;
    }
    .record {
      margin-top: -30px;
      a {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #9d9d9d;
        display: inline-block;
        transform: scale(0.75);
      }
    }
  }
  .shield {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
  }
}
</style>
