<template>
    <h4>{{ title }}</h4>
    <el-button @click="$emit('enlargeText')">放大字体</el-button>

    <input
            :value="modelValue"
            @input="emitValue"
    >
    <slot>test slot</slot>
</template>

<script>
    export default {
        name: "customComponent",
        props: {
            title: String,
            modelValue: String, // prop验证
            modelModifiers: { // 提供给v-module的自定义修饰符 在父组件中 v-module.capitalize （capitalize是自定义的名称）
                // 当组件的 created 生命周期钩子触发时，modelModifiers prop 会包含 capitalize，且其值为 true——
                // 因为 capitalize 被设置在了写为 v-model.capitalize="myText" 的 v-model 绑定上。
                // <my-component v-model.capitalize="myText"></my-component>
                // 对于自定义的v-module，例如：v-module:customName 在调用时使用 arg + "Modifiers" this.customNameModifiers
                default: () => ({})
            }

        }, // 父组件中使用v-module:changeName时，可以更改v-module的默认值，这里将写 'changeName',"$emit('update:changeName时'
        emits: ['enlargeText'], // 列出已抛出的事件
        // 1、父组件可以使用 props 把数据传给子组件。
        // 2、子组件可以使用 $emit 触发父组件的自定义事件。
        // $event:父组件中接收子组件事件抛出的值 - 如果使用方法接收，直接写参数即可

        // v-module数控组件 - <input v-model="searchText" />
        // 等价于 <input :value="searchText" @input="searchText = $event.target.value" />

        // v-module用在组件时 - 类似如下
    //         <custom-input
    //              :model-value="searchText"
    //              @update:model-value="searchText = $event"
    //     ></custom-input>
        // 所以组件使用v-module - 必须绑定modelValue props 和事件抛出到 update:modelValue
        // props: ['modelValue'],
        // emits: ['update:modelValue'],
        computed: { // 另一种方法 - 使用计算属性 template ：<input v-model="value">
            value: {
                get() {
                    return this.modelValue
                },
                set(value) {
                    this.$emit('update:modelValue', value)
                }
            },
            // 注意那些 prop 会在一个组件实例创建之前进行验证，所以实例的 property (如 data、computed 等) 在 default 或 validator 函数中是不可用的。
            props1: { // props的验证
                // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
                // author: Person 类似instanceof 判断是否属于Person的实例
                propA: Number,
                // 多个可能的类型
                propB: [String, Number],
                // 必填的字符串
                propC: {
                    type: String,
                    required: true
                },
                // 带有默认值的数字
                propD: {
                    type: Number,
                    default: 100
                },
                // 带有默认值的对象
                propE: {
                    type: Object,
                    // 对象或数组默认值必须从一个工厂函数获取
                    default() {
                        return { message: 'hello' }
                    }
                },
                // 自定义验证函数
                propF: {
                    validator(value) {
                        // 这个值必须匹配下列字符串中的一个
                        return ['success', 'warning', 'danger'].includes(value)
                    }
                },
                // 具有默认值的函数
                propG: {
                    type: Function,
                    // 与对象或数组默认值不同，这不是一个工厂函数 —— 这是一个用作默认值的函数
                    default() {
                        return 'Default function'
                    }
                }
            }
        },
        methods: {
            emitValue(e) {
                let value = e.target.value;
                if (this.modelModifiers.capitalize) {
                    // 对于自定义的v-module，例如：v-module:customName 在调用时使用 arg + "Modifiers" this.customNameModifiers.capitalize
                    //  props: ['customName', 'customNameModifiers'], props也得定义customNameModifiers
                    value = value.charAt(0).toUpperCase() + value.slice(1)
                }
                this.$emit('update:modelValue', value)
            }
        },
        // slot插槽 - 不会被渲染出元素标签
        // <!-- 组件会在 `currentTabComponent` 改变时改变 --> 动态组件
        //     <component :is="currentTabComponent"></component>

        // 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
        // 这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。
        // 另外，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。
        // 如果你这样做了，Vue 会在浏览器的控制台中发出警告。
        // 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态

        // 非 prop 的 attribute 是指传向一个组件，默认添加到根元素中，监听事件也是 - Attribute 继承
        // 如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 inheritAttrs: false。例如：
        // 禁用 attribute 继承的常见情况是需要将 attribute 应用于根节点之外的其他元素。
        // 通过将 inheritAttrs 选项设置为 false，你可以访问组件的 $attrs property，该 property 包括组件 props 和 emits property 中未包含的所有属性 (例如，class、style、v-on 监听器等)。
        // 使用上一节中的 date-picker 组件示例，如果需要将所有非 prop attribute 应用于 input 元素而不是根 div 元素，则可以使用 v-bind 缩写来完成。
        // inheritAttrs: false, <input type="datetime-local" v-bind="$attrs" />
        // 与单个根节点组件不同，具有多个根节点的组件不具有自动 attribute 回退行为。如果未显式绑定 $attrs，将发出运行时警告。

        // 自定义事件 emits: ['inFocus', 'submit', 'click'] click将替代原生click事件
        // 与组件和prop相同，使用驼峰命名时，在模板中可以使用kebab-case (短横线分隔命名)
        // 与 prop 类型验证类似，如果使用对象语法而不是数组语法定义发出的事件，则可以验证它。
    //     emits: {
    //     // 没有验证
    //     click: null,
    //
    //         // 验证submit 事件
    //         submit: ({ email, password }) => {
    //         if (email && password) {
    //             return true
    //         } else {
    //             console.warn('Invalid submit event payload!')
    //             return false
    //         }
    //     }
    // },

        // 自定义v-module，父组件：v-module:customName 子组件：:value=customName @click=@emit('update:customName')
        // 通过自定义v-module 我们可以实现多个v-module v-model:first-name="firstName" v-model:last-name="lastName"
        // 2.x中仅支持内置的v-module修饰符：例如：v-module.trim() .number .lazy - 在“change”时而非“input”时更新
        // 在3.x中支持使用modelModifiers prop自定义修饰符


        //slot 插槽 对于组件来说开始标签和结束标签直接的内容都可通过<slot></slot>渲染到父组件
        // 插槽可以是字符串，标签，组件等任何信息
        // 父组件：<c>插槽<p>插槽P</p><d>插槽组件</d></c>  子组件中 <cc><slot>这里将渲染出 插槽<p>插槽P</p><d>插槽组件</d></slot></cc>
        // 渲染作用域 - 插槽只能访问相同的作用域，例如在父组件中只能访问父组件中的作用域

        // 作为一条规则，请记住
        // 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

        // 定义备用内容 <slot>Submit</slot> 在没有定义插槽的情况下 将一致返回Submit
        // v-slot = 'name' 指令 先<slot name = 'name'>中插入内容 v-slot 只能添加在 <template>
        // 一个不带 name 的 <slot> 出口会带有隐含的名字“default”。
        // 在子组件中定义slot时，为slot创建插槽 prop便于在父组件中访问子组件值
        // 子组件中<slot :item = item :index = index>
        // 父组件中<template v-slot:default="slotProps"> span class="green">{{ slotProps.item }}</span> slotProps指向子组件的slot prop
        // slotProps名字是可选的，即自定义随便起
        // :default 如果指向default可以省略，如果指向其它作用域不可省略，省略会造成作用域错误
        // v-slot 缩写 #
        // 要出现多个插槽，请始终为所有的插槽使用完整的基于 <template> 的语法：
        // <template v-slot:default="slotProps">
        // <i class="fas fa-check"></i>
        //     <span class="green">{{ slotProps.item }}</span>
        // </template>
        // <template v-slot:other="otherSlotProps">
        // ...
        // </template>

        // provide/inject 类似React的context山下文，用来定义父组件的全局数据，方便其所以子组件直接访问数据，而不用通过每一层的prop传递
        // provide: 在父组件中定义 provide: {name: 'testValue'}
        // inject: 在任意子组件中使用 inject:[name]
        // 在provide中想要访问当前组件的property，需要将provide定义为工厂函数 - provide() {return {在这里访问property}}
        // 实际上，你可以将依赖注入看作是“long range props” 远程props
        // 默认情况下，provide/inject 绑定并不是响应式的 - 父组件provide数据的变更不会自动渲染到子组件
        // 我们可以通过传递一个 ref property 或 reactive 对象给 provide 来改变这种行为。
        // todoLength: Vue.computed(() => this.todos.length) - 类似这种 ||  ref 或 reactive

        // setup:组合式API - mixin的一种扩展
        // Mixin 很容易发生冲突：因为每个 mixin 的 property 都被合并到同一个组件中，所以为了避免 property 名冲突，你仍然需要了解其他每个特性。
        // 可重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。
        // setup可以理解为一种开发状态逻辑高度重用的方法 - 类似React的hooks
        // vue提供了在setup中可实现组件中任何方法 - 生命钩子、data、watch watchEffect(vue3.0)等等
        // setup需要返回一个对象供组件后续的data，computed,methods等调用，setup的执行时机在组件实例化之前，因此，你只能访问以props
        // attrs slots emit 换句话说，你将无法访问以下组件选项 data computed methods

        // 自定义指令 app.directive
        // 注册一个全局自定义指令 `v-focus`
        //     app.directive('focus', { 全局指令
        //         // 当被绑定的元素挂载到 DOM 中时……
        //         mounted(el) {
        //             // 聚焦元素
        //             el.focus()
        //         }
        //     })
        //     directives: { 局部指令
        //     focus: {
        //         // 指令的定义
        //         mounted(el) {
        //             el.focus()
        //         }
        //     }
        // }

        // <teleport to="body"> teleport标签控制其内部元素渲染到指定位置 to body渲染到body元素下 模态框时使用
        // 如果 <teleport> 包含 Vue 组件，则它仍将是 <teleport> 父组件的逻辑子组件：
        // 来自父组件的注入按预期工作，并且子组件将嵌套在 Vue Devtools 中的父组件之下，而不是放在实际内容移动到的位置

        // vue2底层采用Object.defineProperty数据劫持和观察者模式 -> 发布订阅的模式（在数据劫持层设置监听函数）实现数据的双向绑定
        // 注：在数据劫持阶段发布事件，在
        // vue3底层采用es6 Proxy代理对象和Reflect实现，Proxy在源对象之前设置代理层，Reflect弥补Proxy只能代理源对象，不能代理源对象属性的缺点
        // 使用 Proxy 的一个难点是 this 绑定。我们希望任何方法都绑定到这个 Proxy，而不是目标对象，这样我们也可以拦截它们。
        // 值得庆幸的是，ES6 引入了另一个名为 Reflect 的新特性，它允许我们以最小的代价消除了这个问题：
        // const handler = {
        //     get(target, property, receiver) {
        //         return Reflect.get(...arguments) // 如果没有定义某种操作，那么这种操作会被转发到目标对象身上。
        //     }
        // }
        // defineProperty和Proxy的区别
        // defineProperty的缺陷 1 无法监听数组变化 2.只能劫持对象的属性不能劫持源对象
        //

        //  然而Vue的文档提到了Vue是可以检测到数组变化的，但是只有以下八种方法,vm.items[indexOfItem] = newValue这种是无法检测的。


        // 利用Proxy或Object.defineProperty生成的Observer针对对象/对象的属性进行"劫持",在属性发生变化后通知订阅者
        // 解析器Compile解析模板中的Directive(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染
        // Watcher属于Observer和Compile桥梁,它将接收到的Observer产生的数据变化,并根据Compile提供的指令进行视图渲染,使得数据变化促使视图变化

        // vue data  当从组件中的 data() 返回一个对象时，它在内部交由 reactive() 使其成为响应式对象。模板会被编译成能够使用这些响应式 property 的渲染函数。
    }
</script>

<style scoped>

</style>