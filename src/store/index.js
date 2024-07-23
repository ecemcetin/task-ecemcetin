import { createStore } from "vuex";
import axios from "axios";
import { ENDPOINT_URLS } from "@/constants/endpoints";
import VueCookies from "vue-cookies";
const store = createStore({
  state: {
    userInformation: null,
    salesData: null,
    selectedDayRange: 60,
    skuList: [],
    skuListRange: [],
  },
  mutations: {
    setUserInformation(state, user) {
      state.userInformation = user;
    },
    setSalesData(state, data) {
      state.salesData = data;
    },
  },
  actions: {
    async login(context, user) {
      const response = await axios.post(ENDPOINT_URLS.login, {
        Email: user.email,
        Password: user.password,
        GrantType: "password",
        Scope: "amazon_data",
        ClientId: "C0001",
        ClientSecret: "SECRET0001",
        RedirectUri: "https://api.eva.guru",
      });
      const responseData = response.data.Data;
      if (response.data.ApiStatusCode !== 200) {
        throw {};
      }

      VueCookies.set("token", responseData.AccessToken);
      VueCookies.set("email", user.email);
      context.dispatch("fetchUserInformation");
    },
    async logout(context) {
      await axios.post(
        ENDPOINT_URLS.logout,
        {},
        {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token"),
          },
        }
      );
      VueCookies.remove("token");
      VueCookies.remove("email");
      context.commit("setUserInformation", null);
    },
    async fetchUserInformation(context) {
      try {
        const response = await axios.post(
          ENDPOINT_URLS.user,
          {
            email: VueCookies.get("email"),
          },
          {
            headers: {
              Authorization: "Bearer " + VueCookies.get("token"),
            },
          }
        );
        const responseData = response.data.Data;
        context.commit("setUserInformation", responseData);
        return responseData;
      } catch (error) {
        VueCookies.remove("token");
        VueCookies.remove("email");
        context.commit("setUserInformation", null);
        return {};
      }
    },
    async fetchDailySalesOverview(context) {
      try {
        context.commit("setSalesData", null);
        const response = await axios.post(
          ENDPOINT_URLS.sales,
          {
            marketplace:
              context.state.userInformation.user?.store[0]?.marketplaceName,
            sellerId: context.state.userInformation.user?.store[0]?.storeId,
            requestStatus: 0,
            day: context.state.selectedDayRange,
            excludeYoYData: true,
          },
          {
            headers: {
              Authorization: "Bearer " + VueCookies.get("token"),
            },
          }
        );
        const responseData = response.data.Data;
        context.commit("setSalesData", responseData);
        return responseData;
      } catch (error) {
        return {};
      }
    },
    async fetchDailySalesSkuList(context, days) {
      try {
        const sortedDays = days.sort();
        if (sortedDays?.length) {
          const salesSKU = await axios.post(
            ENDPOINT_URLS.salesSku,
            {
              marketplace:
                context.state.userInformation.user?.store[0]?.marketplaceName,
              sellerId: context.state.userInformation.user?.store[0]?.storeId,
              salesDate: sortedDays[0],
              salesDate2: "",
              pageSize: 9999,
              pageNumber: 1,
              isDaysCompare: false,
            },
            {
              headers: {
                Authorization: "Bearer " + VueCookies.get("token"),
              },
            }
          );
          let salesSKU2;
          if (sortedDays[1]) {
            salesSKU2 = await axios.post(
              ENDPOINT_URLS.salesSku,
              {
                marketplace:
                  context.state.userInformation.user?.store[0]?.marketplaceName,
                sellerId: context.state.userInformation.user?.store[0]?.storeId,
                salesDate: sortedDays[1],
                salesDate2: "",
                pageSize: 9999,
                pageNumber: 1,
                isDaysCompare: false,
              },
              {
                headers: {
                  Authorization: "Bearer " + VueCookies.get("token"),
                },
              }
            );
          }

          const refundRateResponse = await axios.post(
            ENDPOINT_URLS.refundRate,
            {
              marketplace:
                context.state.userInformation.user?.store[0]?.marketplaceName,
              sellerId: context.state.userInformation.user?.store[0]?.storeId,
              requestedDay: 60,
              skuList: salesSKU.data.Data.item.skuList.map((item) => item.sku),
            },
            {
              headers: {
                Authorization: "Bearer " + VueCookies.get("token"),
              },
            }
          );
          const refundRateResponseData = refundRateResponse.data.Data;
          const salesSKUData = salesSKU.data.Data;
          const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
          });
          context.state.skuList = salesSKUData.item.skuList.map((item) => {
            if (salesSKU2) {
              const otherDay = salesSKU2.data.Data.item.skuList.find(
                (item2) => item2.sku === item.sku
              );
              const amount2 = otherDay ? otherDay?.amount : 0;
              const qty2 = otherDay ? otherDay?.qty : 0;
              return [
                item.sku,
                item.productName,
                `${formatter.format(item.amount)} / ${item.qty} / ${
                  isNaN(item.amount / item.qty)
                    ? 0
                    : formatter.format(item.amount / item.qty)
                }`,
                `${formatter.format(amount2)} / ${qty2} / ${
                  isNaN(amount2 / qty2) ? 0 : formatter.format(amount2 / qty2)
                } ${item.amount < amount2 ? "🔼" : "🔽"}`,
                `${
                  refundRateResponseData.find((item2) => item2.sku === item.sku)
                    .refundRate
                }%`,
              ];
            } else {
              return [
                item.sku,
                item.productName,
                `${formatter.format(item.amount)} / ${item.qty} / ${
                  isNaN(item.amount / item.qty)
                    ? "-"
                    : formatter.format(item.amount / item.qty)
                }`,
                `${
                  refundRateResponseData.find((item2) => item2.sku === item.sku)
                    .refundRate
                }%`,
              ];
            }
          });
        } else {
          context.state.skuList = [];
        }
        context.state.skuListRange = sortedDays;
      } catch (error) {
        console.log(error);
        return {};
      }
    },
  },
});

export default store;
