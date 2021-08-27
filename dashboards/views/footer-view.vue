<template>
    <span>{{info}}</span>
</template>

<script lang="ts">
    import {defineComponent, PropType} from "vue"
    export default defineComponent({
        name: "footer-view",
        data() {
            return {
                info: "大森林的早晨 知识体系 ©2021 Created by 大森林的早晨"
            }
        }
    })
</script>

<style scoped>

</style>