<template>
    <p>this is count {{count}}</p>
    <el-button v-on:click="increment()" type="primary">加加</el-button>
    <el-button v-on:click="decrement()" type="primary">减减</el-button>

    <p>this is test count {{testCount}}</p>
    <el-button v-on:click="testCountFunc1()" type="primary">加加1</el-button>
    <el-button v-on:click="testCountFunc2()" type="primary">减减1</el-button>
</template>

<script>
    // 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。
    // 为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

    export default {
        name: "vuexComponent",
        data() {
            return {
                testCount: 0
                // count: this.$store.state.count // 此处vuex赋值不会随着state的修改而修改data count 应该在computed中赋值
            }
        },
        computed: {
            ...mapState({ // 使用...对象展开符与局部计算属性合并
                // 箭头函数可使代码更简练
                count: state => state.count,

                // 传字符串参数 'count' 等同于 `state => state.count`
                countAlias: 'count',

                // 为了能够使用 `this` 获取局部状态，必须使用常规函数
                countPlusLocalState (state) {
                    // 111  替换成this.本地属性
                    return state.count + 111
                }

            }),
            // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
            ...mapGetters({ // 可以是数组
                getTop2: 'getTop2'
            })
        },
        // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
        // computed: mapState([
        //     // 映射 this.count 为 store.state.count
        //     'count'
        // ])
        components:{

        },
        methods: {
            increment: function () { // methods不能是用箭头函数，会导致this指向错误
                // getters setters属性会暴漏给store
                console.log(this.$store.getters.getTop2);
                console.log(this.getTop2);

                // 直接调用mutations
                // this.$store.commit('increment');
                // this.increment();

                // 分发action 在action中调用mutations
                // this.$store.dispatch('increment'); // 存在异步调用或额外的操作时使用action，以保证mutations的纯洁 即mutations只负责更新State
                // 以载荷形式分发-额外的参数
                // this.$store.dispatch('increment', {e: 100});
                // // 以对象形式分发
                // this.$store.dispatch({
                //     type: 'increment',
                //     amount: 10
                // });
                this.actionIncrement();
            },
            decrement: function() {
                // this.$store.commit('decrement');
                this.decrement();
            },
            testCountFunc1: function() {
                this.testCount++
            },
            testCountFunc2: function() {
                this.testCount--
            },
            ...mapActions({
                'actionIncrement': 'increment'
            }),
            // ...mapMutations(['increment', 'decrement'])
        }
    }
</script>

<style scoped>

</style>