export default {
  getUserName: (state) => state.user.name,
  getAuthStatus: (state) => state.user.isAuth,
  getEditNameStatus: (state) => state.user.isEditStatus,
  getClearLocalDataStatus: (state) => state.isClearLocalData
};
