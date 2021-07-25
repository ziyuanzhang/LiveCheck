<template>
  <div class="download">
    <img src="../assets/img/download/1 (1).jpg" alt="" />
    <img class="gif" src="../assets/img/download/gif.gif" alt="" />
    <img src="../assets/img/download/1 (2).jpg" alt="" />
    <img src="../assets/img/download/1 (3).jpg" alt="" />
    <img src="../assets/img/download/step (1).jpg" alt="" />
    <img src="../assets/img/download/step (2).jpg" alt="" />
    <img src="../assets/img/download/step (3).jpg" alt="" />
    <img src="../assets/img/download/step (4).jpg" alt="" />
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
    onGetApp() {
      window.location.href =
        "itms-services://?action=download-manifest&url=https://test-1255867289.cos.ap-shanghai.myqcloud.com/apk/manifest_jiguang.plist";
    }
  }
};
</script>
<style lang="less" scoped>
.download {
  font-size: 0px;
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
  .footer {
    position: relative;
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
