<template>
    <h3>loading is {{loa}}</h3>
    <el-button v-on:click="testCount">点击测试</el-button>
    <el-button v-on:click="flushLoading">刷新Loading</el-button>
</template>

<script>
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
    import { useStore } from 'vuex' // 与调用this.$store等效
    import { computed } from 'vue'

    export default {
        name: "vuexModulesComponent",
        components: {},
        data() {
            return {
                // loading: this.$store.state.view.loading
            }
        },
        setup() {
            // 可以通过调用 useStore 函数，来在 setup 钩子函数中访问 store。这与在组件中使用选项式 API 访问 this.$store 是等效的。
            const store = useStore();
            console.log(store);
            return {
                // 在 computed 函数中访问 state
                count: computed(() => store.state.count),

                // 在 computed 函数中访问 getter
                double: computed(() => store.getters.getAdminRouter),

                // 使用 mutation
                increment: () => store.commit('increment'),

                // 使用 action
                asyncIncrement: () => store.dispatch('asyncIncrement')
            }
        },
        computed: {
            ...mapState({
                loa: state => {
                    console.log(state);
                    return state.view.loading;
                },
            }),
            // namespace:false的情况下 多个模块能够对同一个 action 或 mutation 作出响应
            ...mapGetters(['getAdminRouter'])
        },
        methods: {
            testCount() {
                console.log(this.getAdminRouter);
            },
            flushLoading() {
                this.$store.commit('setLoading', true);
            },
            ...mapMutations(['setLoading'])
        }
    }
</script>

<style scoped>

</style>