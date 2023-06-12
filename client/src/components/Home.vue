<template>
  <div class="container">
    <Alert>首页组件</Alert>
    
    <!-- TODO -->
    <RadioGroup @on-change="changeForm" v-model="form">
      <Radio label="Register"></Radio>
      <Radio label="Login"></Radio>
    </RadioGroup>
    <div v-if="showRegisterForm">
      <RegisterForm />
    </div>
    <div v-if="showLoginForm">
      <LoginForm />
    </div>
  </div>
</template>

<script>
/*  调用接口 示范  1.  引入api */
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import { userRegisterApi } from "@/api/user";

export default {
  name: "home",
  components:{
    LoginForm,
    RegisterForm
  },
  mounted() {
    this.ApiCall();
  },
  data() {
    return {
      showLoginForm: false,
      showRegisterForm: true,
      form: 'Register'
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
    changeForm() {
        this.showLoginForm = !this.showLoginForm
        this.showRegisterForm = !this.showRegisterForm
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
