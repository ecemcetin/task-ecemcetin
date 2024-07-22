<template>
  <app-header />
  <app-chart />
</template>
<script>
import VueCookies from "vue-cookies";
export default {
  name: "Logout",
  async mounted() {
    if (VueCookies.get("token")) {
      const response = await this.$store.dispatch("fetchUserInformation");
      if (!response?.user?.email) {
        this.$router.push({ path: "/" });
      }
    } else {
      this.$router.push({ path: "/" });
    }
  },
};
</script>
