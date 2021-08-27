<template>
    <el-container style="height: 100%;">
        <el-header>
            <header-view></header-view>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <aside-view></aside-view>
            </el-aside>
            <el-container>
                <el-main>
                    <!--<router-view></router-view>-->
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-main>
                <el-footer>
                    <footer-view></footer-view>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import {defineComponent} from "vue";
    import { ElContainer, ElHeader, ElAside, ElMain, ElFooter, ElInput } from "element-plus";
    import HeaderView from "./header-view";
    import AsideView from "./aside-view";
    import FooterView from "./footer-view";
    export default defineComponent({
        name: "main-view",
        components: {ElInput, AsideView, HeaderView, ElContainer, ElHeader, ElAside, ElMain, ElFooter, FooterView },
        data() {

        },
    })
</script>

<style scoped lang="scss">
    .el-header, .el-footer {
        background-color: #314157;
        color: white;
        text-align: center;
        /*line-height: 60px;*/
    }

    .el-aside {
        background-color: #314157;
        color: #333;
        text-align: center;
        /*line-height: 200px;*/
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        /*line-height: 160px;*/
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        /*line-height: 260px;*/
    }

    .el-container:nth-child(7) .el-aside {
        /*line-height: 320px;*/
    }
</style>