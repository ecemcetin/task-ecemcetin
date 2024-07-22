<template>
  <div class="login">
    <div class="card text-center">
      <img :src="logo" class="card-img-top logo" alt="..." />
      <div class="card-body">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">e-mail:</span>
          <input class="form-control" type="email" v-model="user.email" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">password:</span>
          <input class="form-control" type="password" v-model="user.password" />
        </div>

        <div class="alert" v-if="errorLogin">
          <span>Please check your email and password!</span>
        </div>
        <button class="btn mt-3 w-100" @click="sendForm">Login</button>
      </div>
    </div>
  </div>
</template>
<script>
import VueCookies from "vue-cookies";
import Logo from "../assets/image/eva-logo.jpeg";
export default {
  name: "Login",
  data() {
    return {
      errorLogin: false,
      user: {
        email: "",
        password: "",
      },
      logo: Logo,
    };
  },
  async mounted() {
    if (VueCookies.get("token")) {
      const response = await this.$store.dispatch("fetchUserInformation");
      if (response?.user?.email) {
        this.$router.push({ path: "/dashboard" });
      }
    }
  },
  methods: {
    sendForm() {
      this.errorLogin = false;
      this.$store
        .dispatch(`login`, this.user)
        .then(() => {
          this.$router.push({ path: "/dashboard" });
        })
        .catch(() => {
          this.errorLogin = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  width: 100%;
  height: calc(100vh - 150px);
  justify-content: center;
  align-items: center;
  .card {
    padding: 30px;
  }
  .alert {
    color: rgb(223, 27, 27);
    font-size: 12px;
  }
  .btn {
    background-image: linear-gradient(
      to right,
      #8a33fd 0%,

      #4806ac 100%
    );
    color: white;
    &:hover {
      background-position: right center;
      background-size: 300% 50%;

      -o-transition: all 0.4s ease-in-out;
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
    }
  }
  .logo {
    max-width: 350px;
  }
  h1 {
    font-size: 30px;
    margin-bottom: 20px;
    color: green;
  }
}
</style>
