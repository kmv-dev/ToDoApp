<template>
  <div class="projects">
    <BaseModal
        v-model:isShow="modalVisible"
        class="projects__modal modal"
        :title="'Добавить новый список'"
    >
      <Form
          id="modal-project"
          class="modal__form"
          @submit="addProject"
      >
        <Field
            v-model="projectName"
            type="text"
            class="modal__input"
            placeholder="Название списка"
            name="projectName"
            :rules="validateName"
        />
        <ErrorMessage
            name="projectName"
            class="error-message"
        />
      </Form>
      <template #buttonAction>
        <BaseButton
            form="modal-project"
            :type="'submit'"
            class="modal__btn"
        >
          Добавить
        </BaseButton>
      </template>
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
          :disabled="!isAuth"
      />
    </div>
    <div
        class="projects__items"
    >
      <TransitionGroup name="list">
        <div
            class="projects__item item"
            v-for="(item, i) in projects"
            :key="item.id"
            :class="{ item_active: i === activeItem }"
        >
          <div
              class="item__inner"
              @click="getProjectData(item.id, i)"
          >
            <span class="item__arrow icon-long_right"></span>
            <span class="item__name">{{ item.name }}</span>
          </div>
          <span
              class="item__icon icon-trash_full"
              @click="deleteProject(item.id)"
          />
        </div>
      </TransitionGroup>
      <div
          v-if="!this.projects?.[0]"
          class="projects__empty empty"
      >
        <span class="empty__title">Нет списков</span>
        <span class="empty__icon icon-sad"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import {
  addDataToLocalStorage,
  getDataFromLocalStorage,
  removeProjectToLocalStorage,
  removeTasksToLocalStorage
} from "../../utils/api/projects";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data(){
    return {
      projectName: '',
      projects: [],
      modalVisible: false,
      activeItem: 0
    }
  },
  watch: {
    modalVisible(){
      this.projectName = ''
    },
  },
  async mounted() {
    try {
      await this.updateProjectsList();
      if (this.projects) {
        this.getProjectData(this.projects[0]?.id)
      }
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'getAuthStatus',
    }),
  },
  methods: {
    ...mapActions({
      addProjectDataToStore: 'addProjectData',
      addTaskDataToStore: 'addTask',
    }),
    updateProjectsList(){
      this.projects = getDataFromLocalStorage('projects')?.reverse()
    },
    addProject(){
      if(this.projectName) {
        function getRandomId(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        }
        const payload = {
          name: this.projectName,
          id: getRandomId(0, 89755738883)
        }
        addDataToLocalStorage('projects', payload)
        this.updateProjectsList();
        this.getProjectData(this.projects[0]?.id)
        this.projectName = ''
        this.modalVisible = false
      }
    },
    async deleteProject(id){
      if(confirm('Уверен?')){
        await removeProjectToLocalStorage('projects', id)
        await removeTasksToLocalStorage('tasks', id)
        const data = await getDataFromLocalStorage('projects')
        const tasks = await getDataFromLocalStorage('tasks')
        const newArr = data.filter(obj => obj.id === id);
        await this.addProjectDataToStore(newArr)
        if(tasks !== null) {
          const filterTasks = tasks.filter(obj => obj.projectId === id);
          await this.addTaskDataToStore(filterTasks)
        }
        this.updateProjectsList();
        this.getProjectData(this.projects[0]?.id)
      }
    },
    getProjectData(id, i){
      const data = getDataFromLocalStorage('projects')
      const tasks = getDataFromLocalStorage('tasks')
      if (data.length){
        const newArr = data.filter(obj => obj.id === id);
        this.addProjectDataToStore(newArr)
      }
      if (tasks?.length){
        const filterTasks = tasks.filter(obj => obj.projectId === id);
        this.addTaskDataToStore(filterTasks)
      }
      this.selectItem(i || 0)
    },
    selectItem(i) {
      this.activeItem = i;
    },
    openModalAddProject(){
      this.modalVisible = true
      document.body.style.overflow = 'hidden';
    },
    validateName(values) {
      if (values) {
        return true;
      }
      return 'Заполните поле';
    },
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
  &__empty{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .empty {
    padding-top: 200px;
    color: #d9dbde;
    &__title {
      font-size: 20px;
    }
    &__icon {
      font-size: 28px;
    }
  }
  &__items {
    max-height: 430px;
    min-height: 430px;
    overflow-y: auto;
    padding-right: 8px;
    &::-webkit-scrollbar {
      height: 3px;
      width: 4px;
      border-radius: 100px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(125, 133, 154, 0.3);
      border-radius: 100px;
    }
  }
  &__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
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
      padding: 5px 0;
    }
    &__icon {
      flex-grow: 0;
      color: #7D859A;
      cursor: pointer;
    }
    &__arrow {
      position: absolute;
      left: -20px;
      top: 7px;
      color: #339966;
      font-size: 18px;
      font-weight: bold;
      transition: 0.2s ease-in-out;
    }
    &__name {
      color: rgba(125, 133, 154, 0.8);
      font-size: 14px;
      transition: 0.2s ease-in-out;
      font-weight: 500;
    }
    &_active .item__arrow {
      font-size: 18px;
      display: inline-block;
      transform: translateX(22px);
    }
    &_active .item__name {
      color: #1a1a1a;
      display: inline-block;
      transform: translateX(18px);
      font-weight: bold;
    }
  }
  .modal {
    &__form {
      position: relative;
    }
    &__input {
      width: 100%;
      padding: 10px 5px;
      background: transparent;
      border: 1px solid #27b5fe;
      border-radius: 8px;
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
.error-message {
  position: absolute;
  bottom: -18px;
  left: 0;
  font-size: 12px;
  color: red;
}
</style>
