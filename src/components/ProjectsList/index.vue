<template>
  <div class="projects">
    <div class="projects__title-box title">
      <div class="title__inner">
        <span class="title__icon icon-List_alt"></span>
        <input
            v-model="projectName"
            type="text"
            class="projects__input"
            placeholder="Добавить задачу"
        >
      </div>
      <span
          class="title__icon title__icon_plus icon-plus"
          @click="addProject"
      />
    </div>
    <div
        class="projects__items"
        v-for="item in projects"
        :key="item.id"
    >
      <TransitionGroup name="fade" tag="span">
        <div
          class="projects__item item"
          :key="item.id"
          @click="getProjectTasks(item.id)"
        >
          <div class="item__inner">
            <span>#</span>
            <span>{{ item.name }}</span>
          </div>
          <span
              class="item__icon icon-trash_full"
              @click="deleteProject(item.id)"
          />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import { addProjectToLocalStorage, getProjectFromLocalStorage, removeProjectToLocalStorage } from "../../utils/api/projects";
import {mapActions, mapGetters} from "vuex";
export default {
  data(){
    return {
      projectName: '',
      projects: []
    }
  },
  mounted() {
    this.updateProjectsList();
  },
  computed: {
    ...mapGetters({
      getData: 'getProjectData'
    })
  },
  methods: {
    ...mapActions({
      addProjectDataToStore: 'addProjectData',
      addTaskDataToStore: 'addTask'
    }),
    updateProjectsList(){
      this.projects = getProjectFromLocalStorage('projects')?.reverse()
    },
    addProject(){
      if(this.projectName) {
        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }
        const payload = {
          name: this.projectName,
          id: getRandomInt(0, 89755738883)
        }
        addProjectToLocalStorage('projects', payload)
        this.updateProjectsList();
        this.projectName = ''
      }
    },
    deleteProject(id){
      removeProjectToLocalStorage('projects', id)
      this.updateProjectsList();
    },
    getProjectTasks(id){
      const data = getProjectFromLocalStorage('projects')
      const tasks = getProjectFromLocalStorage('tasks')
      if (data.length){
        const newArr = data.filter(obj => obj.id === id);
        this.addProjectDataToStore(newArr)
      }
      if (tasks.length){
        const filterTasks = tasks.filter(obj => obj.projectId === id);
        this.addTaskDataToStore(filterTasks)
      }
      this.updateProjectsList();
      console.log(this.getData)
    },
  }
}
</script>

<style lang="scss" scoped>
.projects {
  padding: 15px;
  background-color: rgba(255,255,255,.7);
  border-radius: 8px;
  position: relative;
  border-right: 2px solid white;
  height: 700px;
  background-image: url("./public/project-bg.svg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  box-shadow: 0 0 5px rgba(0,0,0,.07);
  &__input {
    background: none;
    border: none;
    &::placeholder {
      color: black;
      font-size: 14px;
    }
  }
  &__title-box {
    display: flex;
    justify-content: space-between;
    align-items: end;
    border-bottom: 1px solid #d9dbe9;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }
  .title {
    &__inner {
      display: flex;
      align-items: end;
    }
    &__text {
      font-weight: 500;
      color: black;
      margin-bottom: -2px;
    }
    &__icon {
      color: #48b7ff;
      font-size: 26px;
      margin-right: 2px;
      &_plus {
        position: relative;
        color: rgba(0,0,0, 0.5);
        cursor: pointer;
        transition: 0.2s ease-in-out;
        z-index: 10;
        &:hover {
          color: #1ea665;
        }
      }
    }
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: 1px dotted #000000;
    margin-bottom: 5px;
    font-weight: bold;
    &:hover {
      .item__icon {
        display: block;
      }
    }
  }
  .item {
    &__icon {
      display: none;
      cursor: pointer;
    }
  }
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.fade-leave-active {
  position: absolute;
}
</style>
