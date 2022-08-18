export default {
    setProjectData(state, data ) {
        state.projectData = data;
    },
    setTasks(state, data ) {
        state.tasks = data.reverse();
    },
};
