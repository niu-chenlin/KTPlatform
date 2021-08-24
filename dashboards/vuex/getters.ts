
const routerGetters = {
    getAdminRouter: (state: any) => (state.menus.filter((menu: any) => {
        console.log(menu);
        return menu.role.includes(0)
    })),
    getAgentRouter: (state: any) => (state.menus.filter((menu: any) => menu.role.includes(1)))
};

const viewGetters = {

};

export {routerGetters, viewGetters}