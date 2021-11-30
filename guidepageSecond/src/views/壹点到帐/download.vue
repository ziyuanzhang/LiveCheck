<template>
  <div class="download">
    <img src="../assets/img/download/1 (1).png" alt="" />
    <img class="gif" src="../assets/img/download/gif.gif" alt="" />
    <img src="../assets/img/download/1 (2).png" alt="" />
    <img class="policy" src="../assets/img/download/1 (3).png" alt="" />
    <img src="../assets/img/download/step.png" alt="" />

    <!-- <img src="../assets/img/download/step (1).png" alt="" />
    <img src="../assets/img/download/step (2).png" alt="" />
    <img src="../assets/img/download/step (3).png" alt="" />
    <img src="../assets/img/download/step (4).png" alt="" /> -->
    <div class="footer">
      <img src="../assets/img/download/footBG.png" alt="" />
      <img
        class="footBtn"
        @click="onGetApp"
        src="../assets/img/download/footBtn.png"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "download",
  data() {
    return {};
  },

  methods: {
    async onGetApp() {
      //  console.log("this.$route.params.mobile:", this.$route.params.mobile);
      let data = {
        channelNo: this.$channelNo,
        clientType: this.$clientType,
        majia: this.$majia,
        mobile: this.$route.params.mobile
      };
      let res = await this.$ajax.get("/api/user/FastRegister", {
        params: data
      });
      if (res) {
        if (res.data && res.data.status == "0") {
          window.location.href =
            "itms-services://?action=download-manifest&url=https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/manifest_yidian.plist";
        } else {
          this.$toast(res.data.msg);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.download {
  font-size: 0px;
  padding-bottom: 104px;
  img {
    width: 100%;
    margin-top: -1px;
  }
  .gif {
    width: 50%;
    position: relative;
    z-index: -1;
    margin-top: -70px;
    margin-bottom: -70px;
  }
  .policy {
    margin-top: 25px;
    margin-bottom: 30px;
  }
  .footer {
    position: fixed;
    bottom: 0px;
    left: 0;
    z-index: 9;
    .footBtn {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -25%);
      width: 80%;
    }
  }
}
</style>
