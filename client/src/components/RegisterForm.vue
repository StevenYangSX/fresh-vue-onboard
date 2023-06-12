<template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="Username" prop="name">
            <Input type="text" v-model="formCustom.name"></Input>
        </FormItem>
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
    import { userRegisterApi } from "@/api/user";
    export default {
        data () {
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter a username'));
                } else {
                    callback();
                }
            };
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
                    name: '',
                    password: '',
                    email: ''
                },
                ruleCustom: {
                    name: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
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
                        userRegisterApi(this.formCustom)
                        .then(res => console.log(res))
                        .catch(err => err.errors ? err.errors[0].msg : "未知错误")
                        this.$emit('submit-register', this.formCustom)
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
