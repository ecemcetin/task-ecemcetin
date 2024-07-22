<template>
  <div class="navbar navbar-light bg-white border-bottom">
    <img :src="logo" class="header-logo" alt="..." />
    <button class="btn btn-outline-secondary" @click="logoutAction">
      Logout
    </button>
  </div>
</template>
<script>
import VueCookies from "vue-cookies";
import Logo from "../assets/image/eva-logo.jpeg";
export default {
  name: "Logout",
  data() {
    return {
      logo: Logo,
    };
  },
  methods: {
    logoutAction() {
      this.$store.dispatch(`logout`).then(() => {
        this.$router.push({ path: "/" });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  justify-content: space-between;
  padding: 20px;
  .header-logo {
    max-width: 50px;
  }
}
</style>
