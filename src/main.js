import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./styles/index.scss";
import { useREM } from "./utils/flexible";

import mLibs from "./libs";
// 注册svgicons
import "virtual:svg-icons-register";

useREM();

const app = createApp(App);

app.use(router);
app.use(store);
app.use(mLibs);

app.mount("#app");
