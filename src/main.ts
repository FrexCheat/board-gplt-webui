import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";

import App from "./App.vue";
import "tdesign-vue-next/es/style/index.css";
import "harmonyos-sans-sc-webfont-splitted";
import "./styles/base.css";

const app = createApp(App);
app.use(VueQueryPlugin).mount("#app");
