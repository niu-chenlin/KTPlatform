<template>
    <span>{{ count }}</span>
    <el-button @click="count ++">Increment count</el-button>
    <el-button @click="nested.count.value ++">Nested Increment count</el-button>
    <el-button @click="nestedReactive.count ++">Nested Increment count</el-button>
</template>

<script>
    import { ref, reactive, toRefs, readonly } from 'vue'
    export default {
        name: "vue-reactive",
        setup() {
            const count = ref(0);
            return { // 渲染上下文
                count,
                nested: {
                    // Ref 解包
                    // 当 ref 作为渲染上下文 (从 setup() 中返回的对象) 上的 property 返回并可以在模板中被访问时，
                    // 它将自动浅层次解包内部值。只有访问嵌套的 ref 时需要在模板中添加 .value：
                    count
                },
                // 如果你不需要访问实际的对象实例，可将其用 reactive 包裹:
                nestedReactive: reactive({count})
            }
        },
        methods: {
            getRef() {
                // ref和reactive 都是用来创建响应式数据 ref用来创建独立的响应式值，reactive用来创建响应式状态-替换vuex
                // Ref解包
                //当 ref 作为响应式对象的 property 被访问或更改时，为使其行为类似于普通 property，它会自动解包内部值：
                const count = ref(0);
                const state = reactive({
                    count
                });
                console.log(state.count); // 0
                state.count = 1;
                console.log(count.value); // 1

                // 如果将新的 ref 赋值给现有 ref 的 property，将会替换旧的 ref：
                const otherCount = ref(2);
                state.count = otherCount;
                console.log(state.count); // 2
                console.log(count.value); // 1

                // Ref 解包仅发生在被响应式 Object 嵌套的时候。当从 Array 或原生集合类型如 Map访问 ref 时，不会进行解包：
                const books = reactive([ref('Vue 3 Guide')]);
                // 这里需要 .value
                console.log(books[0].value);
                const map = reactive(new Map([['count', ref(0)]]));
                // 这里需要 .value
                console.log(map.get('count').value);
            },
            getReactive() {
                const book = reactive({
                    author: 'Vue Team',
                    year: '2020',
                    title: 'Vue 3 Guide',
                    description: 'You are reading this book right now ;)',
                    price: 'free'
                });
                // let { author, title } = book; // 使用解构的两个 property 的响应性都会丢失
                // 对于这种情况，我们需要将我们的响应式对象转换为一组 ref。这些 ref 将保留与源对象的响应式关联：
                let { author, title } = toRefs(book);
                title.value = 'Vue 3 Detailed Guide'; // 我们需要使用 .value 作为标题，现在是 ref
                console.log(book.title); // 'Vue 3 Detailed Guide'
            },
            protectedReactive() {
                // 创建只读的响应式对象（ref|reactive）
                const original = reactive({ count: 0 });
                const copy = readonly(original);
                // 通过 original 修改 count，将会触发依赖 copy 的侦听器
                original.count++;
                // 通过 copy 修改 count，将导致失败并出现警告
                // copy.count++ // 警告: "Set operation on key 'count' failed: target is readonly."
            }
        }
    }
</script>

<style scoped>

</style>