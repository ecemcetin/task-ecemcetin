import "./assets/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import highcharts from "highcharts-vue";

import Header from "./components/Header.vue";
import Chart from "./components/Chart.vue";
import Loading from "@/components/Loading.vue";
import SKUTable from "@/components/SKUTable.vue";

const app = createApp(App);

app.component("app-header", Header);
app.component("app-chart", Chart);
app.component("loading", Loading);
app.component("sku-table", SKUTable);

app.use(router);
app.use(store);
app.use(highcharts);

app.mount("#app");
