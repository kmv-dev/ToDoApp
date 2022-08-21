import { createStore } from "vuex";
import user from "./user/index.js";
import tasks from "./tasks/index.js";

const store = createStore({
  modules: {
    user,
    tasks,
  },
});

export default store;
