<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="Email" prop="email">
      <Input type="text" v-model="formCustom.email"></Input>
    </FormItem>
    <FormItem label="Password" prop="password">
      <Input type="password" v-model="formCustom.password"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
      <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>
<script>
import { userLoginApi } from "@/api/user";
import { mapState } from "vuex";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please enter your email"));
      }
      // 模拟异步验证效果
      else {
        {
          if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            callback();
          }
          callback(new Error("invalid email address"));
        }
      }
    };

    return {
      formCustom: {
        email: "",
        password: "",
      },
      ruleCustom: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({
      products: (state) => {
        console.log("%cstate------>", "background: #222; color: #bada55;font-size: 14px", state);
      },
    }),
  },

  watch: {
    userNameOjb: {
      handler(newV, oldV) {
        console.log("someData changed!", newV, oldV);
        this.formCustom.email = newV.email;
        this.formCustom.password = newV.password;
      },
      deep: true,
      immediate: true,
    },
  },

  props: ["userNameOjb"],
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          userLoginApi(this.formCustom)
            .then((res) => {
              //请求成功  使用返回数据
              //TODO  res.data......  显示token
              this.$Message.success(res.token);

              // use Vuex

              this.$store.commit("setToken", res.token);

              // emit token to Home component
              this.$emit("gotToken", res.token);
            })
            .catch((err) => {
              this.$Message.error(err.msg);
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>
