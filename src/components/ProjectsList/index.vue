<template>
  <div class="projects">
    <BaseModal
        v-model:isShow="modalVisible"
    >
      <h2>fsdfgdggdf</h2>
      <input
          v-model="projectName"
          type="text"
          class="projects__input"
          placeholder="Списки"
      >
      <BaseButton
          :isIcon="true"
          :iconClass="'icon-add_to_queue'"
          class="title__icon title__icon_plus"
          @click="addProject"
      />
    </BaseModal>
    <div class="projects__title-box title">
      <div class="title__inner">
        <span class="title__icon icon-List_alt"></span>
        <span class="title__text">Списки</span>
      </div>
      <BaseButton
          :isIcon="true"
          :iconClass="'icon-add_to_queue'"
          class="title__icon title__icon_plus"
          @click="openModalAddProject"
      />
    </div>
    <div
        class="projects__items"
    >
      <TransitionGroup name="list" tag="span">
        <div
            class="projects__item item"
            v-for="item in projects"
            :key="item.id"
        >
          <div
              class="item__inner"
              @click="getProjectTasks(item.id)"
          >
            <span class="item__lattice">#</span>
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
      projects: [],
      modalVisible: false
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
        function getRandomId(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }
        const payload = {
          name: this.projectName,
          id: getRandomId(0, 89755738883)
        }
        addProjectToLocalStorage('projects', payload)
        this.updateProjectsList();
        this.projectName = ''
        this.modalVisible = false
      }
    },
    deleteProject(id){
      if(confirm('Уверен?')){
        removeProjectToLocalStorage('projects', id)
        this.updateProjectsList();
      }
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
    },
    openModalAddProject(){
      this.modalVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  position: relative;
  height: 700px;
  background-image: url("./public/123.svg");
  background-size: 120%;
  background-repeat: no-repeat;
  background-position: bottom left;
  box-shadow: 0 0 15px rgba(0,0,0,.07);
  &__input {
    background: none;
    border: none;
    &::placeholder {
      color: #465a64;
      font-size: 14px;
      font-weight: bold;
    }
  }
  &__title-box {
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }
  .title {
    &__inner {
      display: flex;
      align-items: end;
    }
    &__text {
      font-size: 14px;
      font-weight: bold;
      color: #373435;
      margin-bottom: -2px;
    }
    &__icon {
      color: #339966;
      font-size: 22px;
      margin-right: 2px;
      &_plus {
        color: #ffffff;
        font-size: 18px;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    margin-bottom: 5px;
    color: #555555;
    font-size: 14px;
    cursor: pointer;
    &:before {
      position: absolute;
      content: '';
      width: 100%;
      height: 0.5px;
      left: 0;
      bottom: 0;
      background-color: #E0E0E0;
      transition: 0.1s ease-in-out;
    }
    &:hover:before{
      transform: translateX(5px);
      background-color: #7D859A;
    }
  }
  .item {
    &__inner {
      flex-grow: 1;
    }
    &__icon {
      flex-grow: 0;
      color: #7D859A;
      cursor: pointer;
    }
    &__lattice {
      color: #339966;
      font-size: 12px;
      font-weight: bold;
    }
  }
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
  width: calc(100% - 30px);
}
</style>
