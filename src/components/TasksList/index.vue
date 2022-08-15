<template>
  <div class="tasks">
    <BaseModal
        v-model:isShow="modalVisible"
        class="projects__modal modal"
        :title="'Добавить новый список'"
    >
      <Form
          id="modal-tasks"
          class="modal__form"
          @submit="addTask(getProjectData[0].id)"
      >
        <Field
            v-model="taskName"
            type="text"
            class="modal__input"
            placeholder="Название списка"
            name="taskName"
            :rules="validateName"
        />
        <ErrorMessage
            name="projectName"
            class="error-message"
        />
      </Form>
      <template #buttonAction>
        <BaseButton
            form="modal-tasks"
            :type="'submit'"
            class="modal__btn"
        >
          Добавить
        </BaseButton>
      </template>
    </BaseModal>
    <div class="tasks__header">
      <h4>#{{ getProjectData[0]?.name }}</h4>
      <BaseButton
          :isIcon="true"
          :iconClass="'icon-plus_square'"
          class="tasks__add-btn"
          :disabled="!getProjectData[0]?.name || !isAuth"
          @click="openModalAddTask"
      >
        Новая задача
      </BaseButton>
    </div>
    <div
        v-for="item in getTasks"
        :key="item.taskId"
    >
      <span>{{ item }}</span>
    </div>
    <div
        v-if="!getTasks?.[0]"
        class="tasks__empty empty"
    >
      <span class="empty__text">Тут пока ничего нет, создайте задачу</span>
      <span class="empty__icon icon-orders"></span>
    </div>
  </div>
</template>

<script>
import { addDataToLocalStorage, getProjectFromLocalStorage } from "../../utils/api/projects";
import {mapActions, mapGetters} from "vuex";
import {ErrorMessage, Field, Form} from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data(){
    return {
      taskName: '',
      modalVisible: false,
      clear: false
    }
  },
  mounted() {
    this.updateTasks();
  },
  computed: {
    ...mapGetters({
      getProjectData: 'getProjectData',
      getTasks: 'getTasks',
      isAuth: 'getAuthStatus'
    }),
  },
  methods: {
    ...mapActions({
      handleAddTasks: 'addTask'
    }),
    addTask(id){
      function getRandomId(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      const payload = {
        name: this.taskName,
        projectId: id,
        taskId: getRandomId(0, 8987699988876)
      }
      addDataToLocalStorage('tasks', payload)
      this.updateTasks(id)
      this.modalVisible = false
    },
    updateTasks(id){
      const data = getProjectFromLocalStorage('tasks')
      this.tasks = data?.filter(obj => obj.projectId === id);
      this.handleAddTasks(this.tasks)
    },
    openModalAddTask(){
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
.tasks {
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 15px rgba(0,0,0,.07);
  &__header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    border-bottom: 1px solid #d9dbe9;
  }
  &__add-btn {
    margin-bottom: 10px;
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
      font-size: 58px;
    }
  }
}
</style>
