<template>
    <div :style="{fontSize: postFontSize + 'em'}">
        <p>测试值：{{searchText}}</p>
        <custom-component
                v-model.capitalize="searchText"
                @enlarge-text="postFontSize += 0.1"
                v-for="post in posts"
                :key="post.id"
                :title="post.title"
        ></custom-component>
    </div>

</template>

<script>
    import axios from "axios";
    import CustomComponent from "./custom-component/customComponent";
    export default {
        name: "studyBase",
        components: {CustomComponent},
        data() {
            return {
                searchText: "测试值",
                postFontSize: 1,
                firstName: 'Foo',
                lastName: 'Bar',
                fullName: 'Foo Bar',
                posts: [
                    { id: 1, title: 'My journey with Vue' },
                    { id: 2, title: 'Blogging with Vue' },
                    { id: 3, title: 'Why Vue is so fun' }
                ]
            }
        },
        beforeCreated() {
            // vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。
            // 可以做 加loading事件
        },
        created() {
            // vue实例(this)的数据对象data有了，$el还没有
            // 可以做 结束loading、请求数据为mounted渲染做准备
        },
        beforeMount() {
            // vue实例的$el和data都初始化了，但还是虚拟的dom节点，具体的data.filter还未替换。
            // 可以做
        },
        mounted() {
            // vue实例挂载完成，data.filter成功渲染
            // 配合路由钩子使用
        },
        beforeUpdate() {
            // data更新时触发
        },
        update() {
            // data更新时触发
        },
        beforeUnmount() {
            // 卸载前触发
        },
        unmounted() {
            // 卸载
        },
        methods: { // 方法和计算属性的区别：计算属性是基于它们的响应依赖关系缓存的 计算属性只在相关响应式依赖发生改变时它们才会重新求值
            // 相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。
            getAnswer() {
                this.answer = 'Thinking...';
                axios.get('https://yesno.wtf/api')
                    .then(response => {
                        this.answer = response.data.answer
                    })
                    .catch(error => {
                        this.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            setPrentClass() {
                // vue中class属性和:class为元素添加class（可同时存在），
                // :class可接受字符串或数组，可通过 :class="{ active: isActive, 'text-danger': hasError }"的形式决定是否使用
                // 最佳方案使用计算属性
                // :class="classObject"
                // 数组中可用三元符判断
                // 在数组语法中也可以使用对象语法 :class="[{ active: isActive }, errorClass]"
                // 在组件中使用 - 父组件给子组件设置class时,子组件存在当个根元素时，定义在根元素
                // 子组件存在多个根元素时，可通过:class="$attrs.class"的方式决定将class设置在那个元素上
                // 内联样式通过:style CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名
                // vue会自动添加浏览器前缀 Vue 是通过运行时检测来确定哪些样式的 property 是被当前浏览器支持的。如果浏览器不支持某个 property，Vue 会进行多次测试以找到支持它的前缀
                // 多重值
                // 可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
                // :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"
                // 这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
            },
            conditionRender() {
                // 条件渲染 v-if v-else v-else-if  v-show
                // v-show 和 v-if的区别
                // v-if 是“真正”的条件渲染，因为它会确保在切换过程中，条件块内的事件监听器和子组件适当地被销毁和重建。
                // v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
                // 不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS property display。

                // 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，
                // 则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

                // 不推荐同时使用 v-if 和 v-for。当 v-if 与 v-for 一起使用时，v-if 具有比 v-for 更高的优先级。

                // v-for: 就地更新原则，即数据位置发生变更-Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。
                // 这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。
                // 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute：

                // 就地复用策略：
                // 当在进行列表渲染的时候，vue会直接对已有的标签进行复用，不会整个的将所有的标签全部重新删除和创建,只会重新渲染数据，然后再创建新的元素直到数据渲染完为止
                // 默认行为存在一个问题 - 元素不会重用，不会重写排序 因此需要key
                // key属性可以避免数据混乱的情况出现 （如果元素中包含了有临时数据的元素，如果不用key就会产生数据混乱）

                // 数组更新检测
                // Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。
                // 当使用非变更方法时，可以用新数组替换旧数组：example1.items = example1.items.filter(item => item.message.match(/Foo/))
                // 用一个含有相同元素的数组去替换原来的数组是非常高效的操作
            }
        },
        computed: { // 计算属性
            ullName: { // 计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：
                // getter
                get() {
                    return this.firstName + ' ' + this.lastName
                }, // 现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新
                // setter
                set(newValue) {
                    const names = newValue.split(' ')
                    this.firstName = names[0]
                    this.lastName = names[names.length - 1]
                }
            },
            classObject() {
                return {
                    active: this.isActive && !this.error,
                    'text-danger': this.error && this.error.type === 'fatal'
                }
            }
        },
        watch: { // 相比计算属性 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
            // 自定义的侦听器
            // 相比计算属性 你很容易滥用 watch——特别是如果你之前使用过 AngularJS
            // 计算属性更为简洁
            question(newQuestion, oldQuestion) {
                if (newQuestion.indexOf('?') > -1) {
                    this.getAnswer() // 请求ajax
                }
            },

            firstName(val) {
                this.fullName = val + ' ' + this.lastName
            },
            lastName(val) {
                this.fullName = this.firstName + ' ' + val
            },

            fullName() {
                return this.firstName + ' ' + this.lastName
            }
        }
    }
</script>

<style scoped>

</style>