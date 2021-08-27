<template>
    <div id="login-view">
        <div class="left">
            <h2><i class="iconlogo"></i>任务发布系统</h2>
            <span>©2021 朝森科技有限公司. All rights reserved. </span>
        </div>
        <div class="right">
            <div class="login-chunk">
                <div class="title-chunk">
                    <span class="title">学习VUE系统</span>
                    <div class="setting" @mouseover="settingShow(true)" @mouseout="settingShow(false)">
                        <i class="iconsetting"></i>
                        <div class="g-setting-row" :style="{display: (isShowSetting ? 'block' : 'none'), width: '100px'}">
                            <el-row justify="start">
                                <i class="iconzhuce"></i><span>注册</span>
                            </el-row>
                            <el-row justify="start">
                                <i class="iconmima"></i><span>修改密码</span>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="content-chunk g-input-retain-border-bottom">
                    <el-input v-model="username" placeholder="用户名" size="large" suffix-icon="iconyonghu"></el-input>
                    <el-input v-model="password" placeholder="密码" size="large" show-password
                              :suffix-icon="isShowPassword" @focus="pwdFocus(true)" @blur="pwdFocus(false)"></el-input>
                    <el-button class="g-button-color" type="primary" round plain size="large" :loading="btnLoading" :disabled="btnDisabled">登录</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    // : 是v-bind缩写 @是v-on缩写
    import {defineComponent} from "vue";
    export default defineComponent({
        name: "main-view",
        components: { },
        data() {
            return {
                username: "",
                password: "",
                isPwdFocus: false,
                btnLoading: false,
                btnDisabled: false,
                isShowSetting: false
            }
        },
        computed: { // 使用函数同样能达到计算属性的作用，但是计算属性会缓存-除非计算属性一栏得知发生改变否则不会重新计算
            isShowPassword() { // 可通过对象表示法定义getter|setter v-bind(缩写:)含义：为元素添加attribute 并和当前活跃实例的 property 保持一致”。
                return this.isPwdFocus ? "" : "iconmima";
            }
            // 适合做筛选，不可异步
            // 1、支持缓存，只有依赖数据发生改变，才会重新进行计算
            // 2、不支持异步，当computed内有异步操作时无效，无法监听数据的变化
            // 3、computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值
            // 4、如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
            // 5、如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。
        },
        methods: { // 方法不会对返回的结果进行缓存-每次都会重新执行以获得最新值
            pwdFocus(v) {
                console.log(v);
                this.isPwdFocus = v;
            },
            settingShow(v) {
                console.log(v);
                this.isShowSetting = v;
            }
        },
        watch: { // watch和computed的区别
            // 适合做执行异步或开销较大的操作 immediate：组件加载立即触发回调函数执行， deep: 深度监听
            // 1、不支持缓存，数据变，直接会触发相应的操作；
            // 2、watch支持异步；
            // 3、监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
            // 4、当一个属性发生变化时，需要执行对应的操作；一对多；
            // 5、监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，
        }
    })
</script>

<style scoped lang="scss">
    #login-view {
        width: 100%;
        height: 100%;
        display: flex;
        .left {
            visibility: hidden;
            color: white;
            height: 100%;
            width: 20%;
            background-image: linear-gradient(135deg, #49FFF8, #7542FF);
            h2 {
                i {
                    padding-right: 1rem;
                    font-size: 22px;
                    color: green;
                    vertical-align: top;
                }
                text-align: center;
                margin-top: 1rem;
            }
            span {
                position: absolute;
                bottom: 20px;
                left: 1rem;
            }
        }
        .right {
            height: 100%;
            width: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            .login-chunk {
                box-shadow: 0 0 15px #888888;
                border-radius: 10px;
                width: 40%;
                height: 50%;
                text-align: center;
                .title-chunk {
                    position: relative;
                    /*line-height: 5rem;*/
                    text-align: center;
                    padding: 2rem 0;
                    .title {
                        background: linear-gradient(to right, #d06a6a, #704cd8);
                        -webkit-background-clip: text;
                        color: transparent;
                        font-size: 2.3rem;
                        &:after {
                            width: 100%;
                            bottom: 0;
                            left: 0;
                            content: "";
                            height: 10px;
                            position: absolute;
                            /*border-radius: 10px;*/
                            background-image: linear-gradient(45deg, transparent, #6D48D7);
                            animation: slide 1.5s linear;
                        }
                    }
                    .setting {
                        position: absolute;
                        right: 15px;
                        top: 10px;
                        > i {
                            cursor: pointer;
                            font-size: 26px;
                            color: #a088e5;
                            &:hover {
                                color: #724ed8;
                            }
                        }
                    }
                }
                .content-chunk {
                    margin: 2rem auto;
                    width: 65%;
                    line-height: 6rem;
                    .el-button--primary {
                        width: 10rem;
                    }
                }

            }
        }
    }
</style>