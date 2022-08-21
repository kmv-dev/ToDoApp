export default {
  addProjectData({ commit }, data) {
    commit("setProjectData", data);
  },
  addTask({ commit }, data) {
    commit("setTasks", data);
  },
};
