<template>
  <div class="chart-container">
    <div class="sales">
      <span>Sales Day :</span>
      <select
        class="form-select select"
        v-model="$store.state.selectedDayRange"
      >
        <option value="60">Last 60 days</option>
        <option value="30">Last 30 days</option>
        <option value="14">Last 14 days</option>
        <option value="7">Last 7 days</option>
      </select>
    </div>
    <highcharts v-if="!!chartOptions" :options="chartOptions"></highcharts>
    <div v-else class="loading-container">
      <loading />
    </div>

    <sku-table />
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      chartOptions: null,
    };
  },
  async mounted() {},
  computed: mapState(["userInformation", "salesData"]),
  watch: {
    "$store.state.selectedDayRange": {
      handler(newValue) {
        this.$store.dispatch("fetchDailySalesOverview");
      },
      immediate: true,
    },
    userInformation(newValue, oldValue) {
      if (newValue.user?.userId) {
        this.$store.dispatch("fetchDailySalesOverview");
      }
    },
    salesData(newValue, oldValue) {
      if (newValue) {
        const globalThis = this;
        this.chartOptions = {
          chart: {
            type: "column",
          },
          title: {
            text: "Sales Datas",
          },
          xAxis: {
            categories: newValue.item.map((item) => item.date),
            labels: {
              formatter: function () {
                return moment(this.value).format("dddd DD-MM-YYYY");
              },
            },
            plotBands: [],
          },
          yAxis: [
            {
              min: 0,
              title: {
                text: `Amount (${newValue.Currency})`,
              },
            },
          ],
          credits: {
            enabled: false,
          },
          exporting: {
            enabled: false,
          },
          tooltip: {
            shared: true,
          },
          plotOptions: {
            column: {
              stacking: "normal",
            },
            series: {
              cursor: "pointer",
              point: {
                events: {
                  click: function () {
                    if (globalThis?.$store?.state?.salesData) {
                      if (
                        globalThis.chartOptions.xAxis.plotBands.some(
                          (item) => item.category === this.category
                        )
                      ) {
                        globalThis.chartOptions.xAxis.plotBands =
                          globalThis.chartOptions.xAxis.plotBands.filter(
                            (item) => item.category !== this.category
                          );
                      } else {
                        if (
                          globalThis?.chartOptions.xAxis.plotBands?.length < 2
                        ) {
                          globalThis.chartOptions.xAxis.plotBands.push({
                            color: "#EEEEEE",
                            from:
                              globalThis?.$store?.state?.salesData?.item?.findIndex(
                                (item) => item.date === this.category
                              ) - 0.5,
                            to:
                              globalThis?.$store?.state?.salesData?.item?.findIndex(
                                (item) => item.date === this.category
                              ) + 0.5,
                            category: this.category,
                          });
                        }
                      }
                      globalThis.$store.dispatch(
                        "fetchDailySalesSkuList",
                        globalThis.chartOptions.xAxis.plotBands.map(
                          (item) => item.category
                        )
                      );
                    }
                  },
                },
              },
            },
          },
          series: [
            {
              name: "Profit",
              color: "#70ecc5",
              data: newValue.item.map((item, key) => ({
                y: item.profit,
                backgroundColor: "red",
              })),
              tooltip: {
                valuePrefix: newValue.Currency,
              },
            },
            {
              name: "FBA Sales",
              color: "#7f85e9",
              data: newValue.item.map((item, key) => ({
                y: item.fbaAmount,
                backgroundColor: "red",
              })),
              tooltip: {
                valuePrefix: newValue.Currency,
              },
            },
            {
              name: "FBM Sales",
              color: "#5d33eb",
              data: newValue.item.map((item, key) => ({
                y: item.fbmAmount,
                backgroundColor: "red",
              })),
              tooltip: {
                valuePrefix: newValue.Currency,
              },
            },
          ],
        };
      } else {
        this.chartOptions = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 36px;
}

.form-select {
  width: 200px;
  &.select {
    &:focus {
      outline: none;
      box-shadow: none;
      border: 1px solid rgb(108, 215, 108);
    }
  }
}
.chart-container {
  margin-top: 20px;
}

.sales {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 20px;
  span {
    font-size: 14px;
    color: gray;
    margin-right: 15px;
  }
}
</style>
