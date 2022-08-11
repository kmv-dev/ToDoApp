<template>
  <div class="tasks">
    <h4>#{{ getProjectData[0]?.name }}</h4>
    <div class="tasks__inner">
      <input
          v-model="taskName"
          type="text"
          class="tasks__input"
          placeholder="Добавить задачу"
      >
    </div>
    <span
        class="tasks__icon title__icon_plus icon-plus"
        @click="addTask(getProjectData[0].id)"
    />

    <div
        v-for="item in getTasks"
        :key="item.taskId"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { addTaskToProject, getProjectFromLocalStorage } from "../../utils/api/projects";
import {mapActions, mapGetters} from "vuex";

export default {
  data(){
    return {
      taskName: ''
    }
  },
  mounted() {
    this.updateTasks();
  },
  computed: {
    ...mapGetters({
      getProjectData: 'getProjectData',
      getTasks: 'getTasks'
    })
  },
  methods: {
    ...mapActions({
      handleAddTasks: 'addTask'
    }),
    addTask(id){
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
      }
      const payload = {
        name: this.taskName,
        projectId: id,
        taskId: getRandomInt(0, 8987699988876)
      }
      addTaskToProject('tasks', payload)
      this.updateTasks(id)
    },
    updateTasks(id){
      const data = getProjectFromLocalStorage('tasks')
      this.tasks = data?.filter(obj => obj.projectId === id);
      this.handleAddTasks(this.tasks)
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks {
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  background-color: rgba(255,255,255,.7);
  box-shadow: 0 0 5px rgba(0,0,0,.07);
}
</style>
