<template>
  <div class="tasks">
    <BaseModal
        v-model:isShow="modalVisible"
        class="tasks__modal modal"
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
            placeholder="Заголовок задачи"
            name="taskName"
            :rules="validateName"
        />
        <ErrorMessage
            name="taskName"
            class="error-message"
        />
        <textarea
            v-model="description"
            placeholder="Описание"
            class="modal__textarea"
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
    <div class="tasks__current">
      <TransitionGroup name="list">
        <div
            v-if="notcompleted"
            v-for="item in notcompleted"
            :key="item.taskId"
            class="tasks__item"
        >
          <BaseCheckbox
              v-model="checked"
              :value="item.taskId"
              :id="item.taskId"
              @change="changeTask(item, item.projectId)"
          >
          </BaseCheckbox>
          <div class="item__inner">
            <span>{{ item }}</span>
          </div>
        </div>
        <div
            v-else
            v-for="item in getTasks"
            :key="item.taskId"
            class="tasks__item"
        >
          <BaseCheckbox
              v-model="checked"
              :value="item.taskId"
              :id="item.taskId"
              @change="changeTask(item, item.projectId)"
          >
          </BaseCheckbox>
          <div class="item__inner">
            <span>{{ item }}</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div class="tasks__completed">
      completed
      <TransitionGroup name="list">
        <div
            v-if="completed"
            v-for="item in completed"
            :key="item.taskId"
            class="tasks__item"
        >
          <BaseCheckbox
              v-model="checked"
              :value="item.taskId"
              :id="item.taskId"
              @change="changeTask(item, item.projectId)"
          >
          </BaseCheckbox>
          <div class="item__inner">
            <span>{{ item }}</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div
        v-if="!getTasks?.[0]"
        class="tasks__empty empty"
    >
      <span class="empty__text">В списке {{ getProjectData[0]?.name }} нет текущих задач</span>
      <span class="empty__icon icon-orders"></span>
    </div>
    {{ checked }}
  </div>
</template>

<script>
import { addDataToLocalStorage, getDataFromLocalStorage, changeCompleteTask } from "../../utils/api/projects";
import { mapActions, mapGetters } from "vuex";
import { ErrorMessage, Field, Form } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data(){
    return {
      checked: [],
      completed: [],
      notcompleted: [],
      taskName: '',
      description: '',
      modalVisible: false,
      clear: false,
      dateOptions: {
        date: {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          timezone: 'UTC',
        },
        time: {
          timezone: 'UTC',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }
      }
    }
  },
  mounted() {
    this.updateTasks();
    this.checked = JSON.parse(localStorage.getItem('completed')) || [];
  },
  computed: {
    ...mapGetters({
      getProjectData: 'getProjectData',
      getTasks: 'getTasks',
      isAuth: 'getAuthStatus'
    }),
    createDate(){
      const date = new Date().toLocaleDateString('ru-Ru', this.dateOptions.date);
      const time = new Date().toLocaleTimeString('ru-Ru', this.dateOptions.time);
      return date + ' ' + time
    }
  },
  methods: {
    ...mapActions({
      handleAddTasks: 'addTask'
    }),
    async changeTask(item, projectId){
      await changeCompleteTask(item)
      this.updateTasks(projectId)
    },
    addTask(id){
      function getRandomId(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      const payload = {
        name: this.taskName,
        description: this.description,
        createDate: this.createDate,
        projectId: id,
        taskId: getRandomId(0, 8987699988876).toString()
      }
      addDataToLocalStorage('tasks', payload)
      this.updateTasks(id)
      this.modalVisible = false
    },
    updateTasks(id){
      const data = getDataFromLocalStorage('tasks')
      this.completed = getDataFromLocalStorage('completed')
      this.notcompleted = getDataFromLocalStorage('tasksCheck')
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
      return 'Название задачи обязательное поле';
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
  &__current {
    height: 200px;
  }
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
  &__modal:deep .base-modal__content {
    width: 500px;
    height: 450px;
  }
  &__item {
    padding-left: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
      margin-bottom: 15px;
    }
    &__textarea {
      width: 100%;
      padding: 10px 5px;
      border: 1px solid #27b5fe;
      border-radius: 8px;
      min-height: 200px;
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
      font-size: 58px;
    }
  }
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
  pointer-events: none;
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
