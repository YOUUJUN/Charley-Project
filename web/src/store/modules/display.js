const state = {
    displayRow : 'X8',
    userInfo : []
};

const mutations = {
    changeDisplayRow (state, payload){
        state.displayRow = payload;
    },

    initUserInfo (state, payload){
        state.userInfo = payload;
    }
};

const actions = {
    getUserInfo ({commit}, payload){
        commit('initUserInfo', payload);
    }
}

export default {
    namespaced : true,
    state,
    mutations,
    actions
}