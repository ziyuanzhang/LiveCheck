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
        <input class="input" type="text" placeholder="请输入您的手机号码" />
      </div>
      <img class="img-btn" src="../assets/img/guide/btn.png" alt="" />
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
      money: 0
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
    width: 60%;
    text-align: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -122%) rotate(-65deg);
    transform-origin: center;
    transition: transform 2s;
    .arrow {
      width: 78px;
      height: 78px;
      transform: rotate(-160deg);
      //animation: ;
    }
  }
  .rotate {
    transform: translate(-50%, -122%) rotate(165deg);
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
  }
}
</style>
