<template>
  <div class="container">
    <HelloWorld />
    <Button @click="toRegister">注册</Button>
    <Button @click="toLogin">登录</Button>

    <!-- what computed and what do -->
    <!-- 获取token的过期时间 -->
    <!-- <div>{{ firstFiveChars }}</div>
    <Button @click="tokenHandler">获取token过期时间</Button> -->
    <router-view></router-view>
  </div>
</template>

<script>
/*  调用接口 示范  1.  引入api */
import HelloWorld from "./HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
  },
  mounted() {
    // this.ApiCall();
    // console.log("Main.....", this);
  },

  computed: {
    // a computed getter
    firstFiveChars: function () {
      return this.gotToken.slice(0, 5);
    },
  },

  // watch: {
  //   someData: {
  //     handler(newValue, oldValue) {
  //       // console.log(newValue, oldValue);
  //       console.log("someData changed!");
  //     },
  //     deep: true,
  //   },
  // },

  data() {
    return {
      form: "Register",
      gotToken: "",

      // props
      userName: "test123@gmail.com",
      userNameOjb: {
        email: "test123@gmail.com",
        password: "123456",
      },
    };
  },
  methods: {
    toRegister() {
      this.$router.push({ path: "register" });
    },
    toLogin() {
      this.$router.push({ path: "login" });
    },
    tokenHandler() {
      this.gotToken = 123123;
    },
    gotTokenEmit(payload) {
      console.log("%cpayload------>", "background: #222; color: #bada55;font-size: 14px", payload);
      this.gotToken = payload;
    },
    changeForm() {
      this.showLoginForm = !this.showLoginForm;
      this.showRegisterForm = !this.showRegisterForm;
    },
  },
};
</script>

<style>
.container {
  max-height: 740px;
  max-width: 1024px;
  align-items: center;
}
</style>
