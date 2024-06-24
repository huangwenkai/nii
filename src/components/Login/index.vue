<script setup>
import dayjs from "dayjs";
import { ref } from "vue";
import { onMounted } from "vue";
const system = useSystemsStore();
const type = ref(0); // 0 = 待机页 1 = 输入密码
const pwalist = ref([
  { n: 1, n1: "" },
  { n: 2, n1: "ABC" },
  { n: 3, n1: "DEF" },
  { n: 4, n1: "GHI" },
  { n: 5, n1: "JKL" },
  { n: 6, n1: "MNO" },
  { n: 7, n1: "PQRS" },
  { n: 8, n1: "TUV" },
  { n: 9, n1: "WXYZ" },
]);
const pwa = ref([]);
function getDayJsTime() {
  return dayjs(system.systemsData.time);
}
function getDay() {
  let days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  return days[getDayJsTime().day()];
}
function goHome() {
  if (type.value === 0) {
    type.value = 1;
  } else {
    if (pwa.length) return;
    type.value = 0;
  }
}
function init() {
  type.value = 0;
}
function pushPwa(n) {
  pwa.value.push(n);
  if (pwa.value.length === 6) {
    if (pwa.value.join("") === "111111") {
      system.setSystemsData({ token: !system.systemsData.token });
      pwa.value.length = 0;
    } else {
      pwa.value.length = 0;
    }
  }
}
onMounted(() => {
  init();
});
</script>
<template>
  <div class="login-box" :class="system.systemsData.token ? 'login-in' : 'login-out'" @click="goHome">
    <div class="login-time" v-if="type === 0">
      <icon-lock />
      <p>
        {{ getDayJsTime().format("HH:mm") }}
      </p>
      <span class="pr[20px]"> {{ getDayJsTime().format("M月D日") }} </span>
      <span>{{ getDay() }}</span>
      <div class="ts">
        <div class="ts-text">按下空格键打开主屏幕</div>
        <icon-home />
      </div>
    </div>
    <div class="login-pwa" v-else-if="type === 1">
      <div class="pwa-index">
        <p>输入密码</p>
        <span v-for="t in 6" :class="{ 'pwa-active': t <= pwa.length }"></span>
      </div>
      <div class="pwa-li pwa-num" v-for="t in pwalist" @click.stop="pushPwa(t.n)">
        <p>{{ t.n }}</p>
        <div class="py-text">{{ t.n1 }}</div>
      </div>
      <div class="pwa-li show"></div>
      <div class="pwa-li pwa-num zero" @click.stop="pushPwa(0)">0</div>
      <div class="pwa-li show"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@keyframes show-ac {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes show-ac-pwa {
  from {
    transform: translateY(-60%) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(-50%) translateX(-50%);
    opacity: 1;
  }
}
.login-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: 0.8s;
  text-align: center;
  color: white;

  .login-pwa {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    width: calc(90px * 3);
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: show-ac-pwa 0.8s ease-in-out;
    .pwa-index {
      width: 100%;
      padding-bottom: 30px;
      p {
        font-size: 16px;
        padding-bottom: 10px;
        font-weight: 300;
      }
      span {
        display: inline-block;
        margin: 10px;
        width: 10px;
        height: 10px;
        border: 1px solid white;
        border-radius: 50%;
        transition: 0.3s;
      }
      .pwa-active {
        background-color: white;
      }
    }
    .pwa-li {
      display: inline-block;
      width: 80px;
      height: 80px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      text-align: center;
      line-height: 80px;
      margin: 5px;
    }
    .pwa-num {
      align-items: center;
      justify-content: center;
      line-height: 1.3;
      font-size: 30px;
      font-weight: 300;
      padding-top: 14px;
      cursor: pointer;

      .py-text {
        line-height: 1;
        font-size: 12px;
        letter-spacing: 3px;
        text-align: center;
      }
    }
    .zero {
      padding-top: 0;
      font-size: 32px;
      line-height: 80px;
    }
    .show {
      opacity: 0;
    }
  }

  .login-time {
    height: 100%;
    width: 100%;
    position: relative;
    padding-top: 40px;
    font-weight: 300;
    font-size: 20px;
    letter-spacing: 4px;
    animation: show-ac 0.8s ease-in-out;

    p {
      font-size: 100px;
    }
    .ts {
      font-size: 13px;
      position: absolute;
      left: 50%;
      bottom: 0;
      padding-bottom: 10px;
      transform: translateX(-50%);
      .ts-text {
        padding-bottom: 10px;
      }
    }
  }
}

.login-in {
  top: -100%;
  backdrop-filter: blur(0);
  background-color: rgba(0, 0, 0, 0.1);
}

.login-out {
  top: 0;
  backdrop-filter: blur(50px);
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
