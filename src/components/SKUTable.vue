<script>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import moment from "moment";

DataTable.use(DataTablesCore);

export default {
  components: {
    DataTable,
  },
  methods: {
    formatTheDate(date) {
      return moment(date).format("dddd DD-MM-YYYY");
    },
  },
  data() {
    return {
      options: {
        bPaginate: true,
      },
    };
  },
};
</script>

<template>
  <div class="px-5 pb-5 mt-5">
    <DataTable
      v-if="$store?.state?.skuListRange?.length === 1"
      :data="$store?.state?.skuList"
      :options="options"
      class="table table-striped"
    >
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product Name</th>
          <th>
            {{ this.formatTheDate($store?.state?.skuListRange?.[0]) }} Sales /
            Units / Avg. Selling Price
          </th>
          <th>SKU Refund Rate</th>
        </tr>
      </thead>
    </DataTable>
    <DataTable
      v-else-if="$store?.state?.skuListRange?.length === 2"
      :data="$store?.state?.skuList"
      :options="options"
      class="table table-striped"
    >
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product Name</th>
          <th>
            {{ this.formatTheDate($store?.state?.skuListRange?.[0]) }} Sales /
            Units / Avg. Selling Price
          </th>
          <th>
            {{ this.formatTheDate($store?.state?.skuListRange?.[1]) }} Sales /
            Units / Avg. Selling Price
          </th>
          <th>SKU Refund Rate</th>
        </tr>
      </thead>
    </DataTable>
  </div>
</template>

<style>
@import "bootstrap";
@import "datatables.net-bs5";
</style>
