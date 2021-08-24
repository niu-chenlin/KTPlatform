
const routerState = {
    menus: [
        {
            name: "仪表盘",
            role: [0,1],
            path: '/dashboard',
            component: '渲染的组件'
        },
        {
            name: "用户管理",
            role: [0,1],
            path: '/use',
            component: '渲染的组件',
            children: [
                {
                    name: "系统用户",
                    role: [0,1],
                    path: '/use/system',
                    component: '渲染的组件'
                },
                {
                    name: "终端用户",
                    role: [0,1],
                    path: '/use/terminal',
                    component: '渲染的组件'
                }
            ]
        },
        {
            name: "关于",
            role: [0],
            path: '/about',
            component: '渲染的组件'
        }
    ]
};

const viewStates = {
    loading: false
};

export {routerState, viewStates}