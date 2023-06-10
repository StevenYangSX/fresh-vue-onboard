<template>
  <div class="container">
    <Alert>首页组件</Alert>

    <!-- TODO -->
    <!-- <RegisterForm/> -->
    <!-- <LoginForm/> -->
  </div>
</template>

<script>
/*  调用接口 示范  1.  引入api */
import { userRegisterApi } from "@/api/user";

export default {
  name: "home",
  mounted() {
    this.ApiCall();
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
  },
};
</script>
