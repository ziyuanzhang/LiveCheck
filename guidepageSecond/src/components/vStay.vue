<template>
  <div class="vStay">
    <div class="main">
      <img
        class="close"
        @click="closeFun()"
        src="../assets/img/stay/close.png"
        alt=""
      />
      <img class="img" src="../assets/img/stay/alert.png" alt="" />
      <div class="btn-list">
        <img
          class="btn-ok"
          @click="comeOnFun()"
          src="../assets/img/stay/alert-btn.png"
          alt=""
        />
        <img
          class="btn-cancel"
          @click="backFun()"
          src="../assets/img/stay/alert-cancel.png"
          alt=""
        />
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeFun() {
      this.$emit("emitStay", { type: "close" });
    },
    comeOnFun() {
      this.$emit("emitStay", { type: "come" });
    },
    backFun() {
      this.$emit("emitStay", { type: "back" });
    }
  }
};
</script>
<style lang="less" scoped>
.vStay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bg {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
  }
  .main {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    .close {
      position: absolute;
      top: -10px;
      left: 76%;
      width: 30px;
    }
    .img {
      width: 100%;
    }
    .btn-list {
      position: absolute;
      z-index: 2;
      bottom: 12%;
      .btn-ok {
        width: 58%;
      }
      .btn-cancel {
        position: absolute;
        bottom: -14px;
        left: 48%;
        z-index: 4;
        height: 30px;
      }
    }
  }
}
</style>
