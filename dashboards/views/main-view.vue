<template>
    <el-container style="height: 100%;">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import { ElContainer, ElHeader, ElAside, ElMain, ElFooter } from "element-plus";
    export default {
        name: "main-view",
        components: { ElContainer, ElHeader, ElAside, ElMain, ElFooter },
        data() {

        },
    }
</script>

<style scoped lang="scss">
    .el-header, .el-footer {
        background-color: #3e423d;
        color: white;
        text-align: center;
        /*line-height: 60px;*/
    }

    .el-aside {
        background-color: #D3DCE6;
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