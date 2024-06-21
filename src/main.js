import { createApp } from "vue";
import { createPinia } from "pinia";

// UI库
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
// UI图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";

import "./assets/styles/main.scss";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount("#app");
