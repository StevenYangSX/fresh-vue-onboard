<template>
  <div class="container">
    <Alert>首页组件</Alert>
    
    <!-- TODO -->
    <i-switch />
    <div v-if="showRegisterForm">
      <RegisterForm @submit-register="TestCall"/>
    </div>
    <div v-if="showLoginForm">
      <LoginForm @submit-login="TestCall"/>
    </div>
  </div>
</template>

<script>
/*  调用接口 示范  1.  引入api */
import iSwitch from './i-switch.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import { userRegisterApi } from "@/api/user";

export default {
  name: "home",
  components:{
    iSwitch,
    LoginForm,
    RegisterForm
  },
  mounted() {
    this.ApiCall();
  },
  data() {
    return {
      showLoginForm: false,
      showRegisterForm: true
    }
  },
  methods: {
    ApiCall() {
      let payload = {
        name: "tese",
        password: "123123",
        email: "test@gmail.com",
      };
      userRegisterApi(payload)
        .then((res) => {
          // TODO 调用api 成功  数据处理
          console.log(res);
        })
        .catch((err) => {
          // TODO 调用api 失败  数据处理
          this.$Message.error(err.errors ? err.errors[0].msg : "未知错误");
        });
    },
    TestCall(data) {
      console.log(data)
    }
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
