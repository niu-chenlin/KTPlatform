<template>
    
</template>

<script lang="ts">
    import {defineComponent, PropType} from "vue"
    // 使用defineComponent让 TypeScript 正确推断 Vue 组件选项中的类型
    interface Book { // 如果你有一个复杂的类型或接口，你可以使用 type assertion 对其进行指明：
        title: string
        author: string
        year: number
    }
    export default defineComponent({
        // 已启用类型推断
        name: 'about-view',
        data() {
            return {
                book: {
                    title: 'Vue 3 Guide',
                    author: 'Vue Team',
                    year: 2020
                } as Book,
                count: 0
            }
        },
        props: { // 注解 Props
            // Vue 对定义了 type 的 prop 执行运行时验证。要将这些类型提供给 TypeScript，我们需要使用 PropType 指明构造函数：
            // 在 setup() 函数中，不需要将类型传递给 props 参数，因为它将从 props 组件选项推断类型。
            // 但是没有关于 MyModal 及其可用方法的类型信息。为了解决这个问题，你应该在创建引用时使用 InstanceType：
            // const modal = ref<InstanceType<typeof MyModal>>() - 防止modal作为子组件属性传递给子组件时缺少modal相关类型信息
            // 可选链操作符 ?. modal.value?.open() 判断modal.value是不是可用
            bookA: {
                type: Object as PropType<Book>,
                // 请务必使用箭头函数
                default: () => ({
                    title: 'Arrow Function Expression'
                }),
                validator: (book: Book) => !!book.title
            },
            bookB: {
                type: Object as PropType<Book>,
                // 或者提供一个明确的 this 参数
                default(this: void) {
                    return {
                        title: 'Function Expression'
                    }
                },
                validator(this: void, book: Book) {
                    return !!book.title
                }
            }
        },
        mounted() {
            const result = this.count.split('') // => Property 'split' does not exist on type 'number'
        }
    })
</script>

<style scoped>

</style>