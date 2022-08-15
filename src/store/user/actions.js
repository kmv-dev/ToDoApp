export default {
    addUser({ commit }, { name, isAuth }) {
        commit('setNewUserData', { name, isAuth })
    },
    addEditStatus({ commit }, { isEdit } ) {
        commit('setEditStatus', isEdit)
    },
};
