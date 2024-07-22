import axios from "axios";

const BASE_URL = "https://iapitest.eva.guru/";

axios.defaults.baseURL = "https://iapitest.eva.guru/";

export const ENDPOINT_URLS = {
  login: "/oauth/token",
  logout: "/user/logout",
  user: "/user/user-information",
  sales: "/data/daily-sales-overview/",
  salesSku: "/data/daily-sales-sku-list",
  refundRate: "/data/get-sku-refund-rate/",
};
