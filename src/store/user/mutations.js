export default {
    setNewUserData( state, { name, isAuth }) {
        state.user.name = name;
        state.user.isAuth = isAuth;
    },
    setEditStatus( state, isEdit ) {
        state.user.isEditStatus = isEdit;
    },
};
