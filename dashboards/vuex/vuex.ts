import {createStore} from 'vuex'
import {TYPES} from "./mutation-types";

const store = createStore({
    state: { // vuex核心一  唯一数据源state
        count: 100,
        mapState: {
            id: "1001",
            name: "mapState"
        },
        list: [
            {id: 0, name: 'list0'},
            {id: 1, name: 'list1'},
            {id: 2, name: 'list2'},
            {id: 3, name: 'list3'},
            {id: 4, name: 'list4'},
            {id: 5, name: 'list5'},
        ]
    },
    getters: { // vuex核心二 getters setters 可以理解为vuex的计算属性
        getTop2: state => { // 注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
            return state.list.filter(item => item.id < 2)
        },
        getTop1ByTop2: (state, getters, rootState, rootGetters) => { //可接受的参数  这里的root指向根节点-根节点只有在使用模块化后才能体现出来
            return getters.getTop2.filter((item: any) => item.id < 2)
        }
    },
    mutations: { // vuex核心三 变更方法 类似于事件 提供一个事件名称和回调方法
        // devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的
        // mutations的函数只能是同步函数 不能存在异步操作
        increment (state) {
            // setTimeout(() => { // setTimeout可以 异步请求不确定 从现阅资料看 应该是为了保证能够被Devtools捕获
            //     state.count++
            // }, 2000);
            // 在 mutation 中混合异步调用会导致你的程序很难调试。例如，当你调用了两个包含异步回调的 mutation 来改变状态，
            // 你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 Vuex 中，mutation 都是同步事务：
            // 包含异步的操作，最好放到Actions中
            state.count++
        },
        decrement (state) {
            state.count--
        },
        payload (state, pay) { // 调用store.commit('payload', 10) 用于传入额外的参数
            state.count+= pay
        },
        [TYPES.TEST] () { // 动态事件名

        }
    },
    actions: { // vuex核心四 action - 用于调用mutations
        increment(context) {
            setTimeout(() => { // 异步操作移动到action中
                context.commit('increment')
            }, 1000);
        },
        complexAction({commit, dispatch}) { // 使用action处理更复杂的异步操作
            // action组合其它action - dispatch返回promise
            return dispatch('increment').then(() => { // action本质上也是返回一个promise
                commit('success')
            })
        },
        async es7({commit, dispatch}) {
            await dispatch('increment');
            commit('success');
        }
    }
});

export default store;