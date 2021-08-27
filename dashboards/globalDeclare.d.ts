declare module "*.vue" { // ts声明模块类型 由于 TypeScript 默认并不支持 *.vue 后缀的文件
    import { defineComponent } from "vue"
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}