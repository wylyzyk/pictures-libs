import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./styles/index.scss";
import { useREM } from "./utils/flexible";
import useTheme from "./utils/theme";

import mLibs from "./libs";
import mDirectives from "./directives";
// 注册svgicons
import "virtual:svg-icons-register";
import "./premission";

useREM();
useTheme();

const app = createApp(App);

app.use(router);
app.use(store);
app.use(mLibs);
app.use(mDirectives);

app.mount("#app");
