import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./permisson";

import { parseTime, resetForm } from "@/utils/common";

const app = createApp(App);

// 全局方法挂载
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.resetForm = resetForm;

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.mount("#app");
