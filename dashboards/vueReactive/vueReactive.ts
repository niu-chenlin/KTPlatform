// vue3.0响应式对象reactive 替换掉vuex

import {createApp, reactive, ref} from "vue"

const sourceOfTruth = reactive({ // 当 sourceOfTruth 发生变更，appA 和 appB 都将自动地更新它们的视图。
    message: 'Hello'
});
const appA = createApp({
    data() {
        // return sourceOfTruth
        return {
            privateState: {},
            sharedState: store.state
        }
    }
}).mount('#app-a');

const appB = createApp({
    data() {
        // return sourceOfTruth
        return {
            privateState: {},
            sharedState: store.state
        }
    },
    mounted() {
        // 调试将是一场噩梦。应用的任何部分都可以随时更改任何数据，而不会留下变更过的记录。
        sourceOfTruth.message = 'Goodbye' // both apps will render 'Goodbye' message now
    }
}).mount('#app-b');

// 为了方便调试，使数据源可被追踪 可以采用简单的store模式
const store = {
    debug: true,
    state: reactive({
        message: 'Hello!'
    }),
    setMessageAcion(newValue) {
        if(this.debug) {
            console.log('setMessageAction triggered with', newValue);
        }
        this.state.message = newValue;
    },
    clearMessage() {
        if (this.debug) {
            console.log('clearMessageAction triggered');
        }
        this.state.message = '';
    }
};

const count = ref(0); // ref 会返回一个可变的响应式对象，该对象作为一个响应式的引用维护着它内部的值
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1