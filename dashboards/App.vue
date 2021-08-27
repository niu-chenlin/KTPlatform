<template>
    <!--<div>This is vue diganhuo</div>-->
    <!--<ComponentA/>-->
    <!--<LoadingComponent/>-->
    <!--<vuex-component></vuex-component>-->
    <!--<vuex-modules-component/>-->
    <!--<vue-reactive/>-->
    <!--<main-view/>-->
    <!--<study-base></study-base>-->
    <router-view></router-view>
</template>

<script>

    import VuexComponent from "./vuexComponent/vuexComponent";
    import VuexModulesComponent from "./vuexComponent/vuexModulesComponent";
    import VueReactive from "./vuexComponent/vue-reactive";
    import MainView from "./views/main-view";
    import StudyBase from "./studyVue/studyBase";
    export default {
        name: "App",
        components: {StudyBase, MainView, VueReactive, VuexModulesComponent, VuexComponent},
    }

</script>

<style scoped>

</style>