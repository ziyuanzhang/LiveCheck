<template>
  <div class="vVerify-com">
    <div class="Verify-container">
      <div class="title">
        <img class="dun" src="../assets/img/dun.gif" alt="" />
        安全验证
      </div>
      <div class="main">
        <verify @emitSuccess="eventSuccess"></verify>
      </div>
    </div>
    <div class="bg" @click="cancelFun"></div>
  </div>
</template>
<script>
// import Verify from "vue2-verify";
import verify from "@/components/verify.vue";
export default {
  components: {
    verify
  },
  data() {
    return {};
  },
  methods: {
    eventSuccess() {
      //console.log("eventSuccess-内");
      this.$emit("emitSuccess", "ok");
    },
    cancelFun() {
      this.$emit("emitSuccess", "cancel");
    }
  }
};
</script>
<style lang="less" scoped>
.vVerify-com {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;
  font-size: 12px;
  .bg {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
  }
  .Verify-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999999;

    margin: 0 auto;
    width: 80%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 5px;
    .title {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: left;
      .dun {
        width: 40px;
        margin-right: 10px;
      }
    }
    .main {
      /deep/ .verify-bar-area {
        background-color: #e8e8e8;
      }
      /deep/ .verify-move-block {
        background-color: #fff !important;
      }
      /deep/ .verify-left-bar {
        background-color: green !important;
        color: #000;
      }
    }
  }
}
</style>
