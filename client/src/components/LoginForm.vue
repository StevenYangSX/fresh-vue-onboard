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
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                } else {
                    callback();
                }
            };
            const validateEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Please enter your email'));
                }
                // 模拟异步验证效果
                else {
                    {
                        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
                        {
                            callback()
                        }
                            callback(new Error('invalid email address'))
                        }
                }
            };
            
            return {
                formCustom: {
                    email: '',
                    password: ''
                },
                ruleCustom: {
                    email: [
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        userLoginApi(this.formCustom)
                        .then(res => console.log(res))
                        .catch(err => err.errors ? err.errors[0].msg : "未知错误")
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
