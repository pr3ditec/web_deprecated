import { createApp } from "vue";
import App from "@/App.vue";

const app = createApp(App);

// vue mask
import VueTheMask from "vue-the-mask";
app.use(VueTheMask);

// pinia store
import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);

import router from "@/router";
app.use(router);

// main app css
import "@/assets/css/app.css";

// perfect scrollbar
import PerfectScrollbar from "vue3-perfect-scrollbar";
app.use(PerfectScrollbar);

//vue-meta
import { createHead } from "@vueuse/head";
const head = createHead();
app.use(head);

// set default settings
import appSetting from "@/app-setting";
appSetting.init();

//vue-i18n
import i18n from "@/i18n";
app.use(i18n);

// popper
import Popper from "vue3-popper";
app.component("Popper", Popper);

import Request from "./helpers/Request";
const request = new Request();
app.provide("request", request);

app.mount("#app");
