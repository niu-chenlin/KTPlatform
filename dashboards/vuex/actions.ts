
const routerAction = {

};

const viewAction = {
    getRouterView(context: any) {
        context.commit('setLoading', true);
        setTimeout(() => {
            context.commit('setLoading', false);
        }, 1000);
    }
};

export {routerAction, viewAction}