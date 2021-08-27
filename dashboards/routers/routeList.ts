import {RouteComponent} from "vue-router"
import DashboardView from "../views/dashboard-view.vue"

interface RouteListType {
    name: string,
    path: string,
    role: number[],
    component: RouteComponent,
    components?: Object, // never完全无返回值
    children?: RouteListType[]
}

const routeList: RouteListType[] = [
    {
        name: "仪表盘",
        path: "/dashboard",
        role: [0,1,2,3],
        component: DashboardView
    },
    {
        name: "需求",
        path: "/demand",
        role: [0,1,2,3],
        component: DashboardView
    },
    {
        name: "迭代",
        path: "/iteration",
        role: [0,1,2,3],
        component: DashboardView
    },
    {
        name: "缺陷",
        path: "/flaw",
        role: [0,1,2,3],
        component: DashboardView
    },
    {
        name: "任务",
        path: "/task",
        role: [0,1,2,3],
        component: DashboardView
    },
    {
        name: "日志管理",
        path: "/log",
        role: [0,1],
        component: DashboardView
    },
    {
        name: "用户管理",
        path: "/user",
        role: [0,1],
        component: DashboardView
    },
    {
        name: "系统管理",
        path: "/system",
        role: [0,1],
        component: DashboardView
    }
];

export default routeList;

// interface 和 type 两个关键字的含义和功能都非常的接近。这里我们罗列下这两个主要的区别：
// interface：
// 同名的 interface 自动聚合，也可以跟同名的 class 自动聚合
// 只能表示 object、class、function 类型

// type:
// 不仅仅能够表示 object、class、function
// 不能重名（自然不存在同名聚合了），扩展已有的 type 需要创建新 type
// 支持复杂的类型操作

// type Record<K extends keyof any, T> = { // 泛型不能应用于类的静态成员
//     // <K extends keyof any, T> 表示泛型
//     // K extends keyof any 表示 K: any 如果是 K extends keyof RouteListType，那K: name|path|...
//     [P in K]: T; //
// };
// ts提供了一些工具泛型 Partial 把所有属性变成可选 Required 所有属性变成必填 Readonly 属性全改为已读 Record<T, K>把T中的属性转成K类型 等

// unknown被称为 top type (任何类型都是它的 subtype)   never被称为bottom type (它是任何类型的 subtype )
// any即是 top type, 又是 bottom type 这导致 any 基本上就是放弃了任何类型检查. 即不作任何约束，编译时会跳过对其的类型检查，

// void 表示无任何类型，正好与 any 相反，没有类型，如果是函数则应没有返回值或者返回 undefined
// 变量也可以申明为 void 类型，只不过只能给这个变量分配 undefined, null 和 void 类型的值（如果 ts 配置文件中设置了
//   "strictNullChecks": false，那么分配 null 类型的值也会报错）
// unknown 表示未知类型，是 typescript 3.0 中引入的新类型，即写代码的时候还不清楚会得到怎样的数据类型，如服务器接口返回的数据，
//   JSON.parse() 返回的结果等；该类型相当于 any，可以理解为官网指定的替代 any 类型的安全版本（因为不提倡直接使用 any 类型）；
//   它能被赋值为任何类型，但不能被赋值给除了 any 和 unknown 之外的其他类型，同时，不允许执行 unknown 类型变量的方法（any 可以）
//   如：let uk: unknown = "123"; uk.toString()报错
// never 同样顾名思义，表示永不存在的值的类型，是 typescript 2.0 中引入的新类型
//   永不存在返回值的2中情况 1.函数抛出一个错误 2.函数死循环
//   变量也可以直接申明为 never 类型，让它永不存在值，其实就是意思就是永远不能给它赋值，否则就会报错，这样就可以形成一种保护机制；
//   同时也没有任何类型是 never 的子类型，除了 never 自身，即除了 never 任何类型都不能赋值给 never 类型的变量（如果前提是 "strictNullChecks": true，never 也不能赋值给 never）；
