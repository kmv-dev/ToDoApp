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
    <div class="tasks__items">
      <TransitionGroup name="list">
        <div
            v-if="getTasks"
            v-for="(item, index) in getTasks"
            :key="item.taskId"
            class="tasks__item item"
            :class="{'tasks__item_active': item.done}"
        >
          <BaseCheckbox
              v-model="checked"
              :value="item.taskId"
              :id="item.taskId"
              :checked="item.done"
              @change="changeTask(item, item.projectId)"
              class="tasks__checkbox"
          >
          </BaseCheckbox>
          <div class="item__header">
            <span class="item__title">{{ item.name }}</span>
            <div class="item__action">
              <span class="icon-trash_full"></span>
              <span class="icon-trash_full"></span>
            </div>
          </div>
          <div class="item__body">
            <span class="item__description">{{ item.description }}</span>
            <span class="item__date">{{ item.createDate }}</span>
          </div>
        </div>
      </TransitionGroup>
      <div
          v-if="!getTasks?.[0]"
          class="tasks__empty empty"
      >
        <span class="empty__text">В списке {{ getProjectData[0]?.name }} нет текущих задач</span>
        <span class="empty__icon icon-orders"></span>
      </div>
    </div>
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
      isActive: null,
      checked: [],
      taskName: '',
      description: '',
      modalVisible: false,
      clear: false,
      dateOptions: {
        date: {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'short',
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
    this.getCurrentTasks();
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
      this.getCurrentTasks(projectId)
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
      this.getCurrentTasks(id)
      this.modalVisible = false
    },
    getCurrentTasks(id){
      const data = getDataFromLocalStorage('tasks')
      const filteredTasks = data?.filter(obj => obj.projectId === id);
      this.handleAddTasks(filteredTasks)
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
  &__items {
    position: relative;
    display: flex;
    padding-right: 25px;
    flex-direction: column;
    max-height: 615px;
    overflow-y: auto;
  }
  &__item {
    position: relative;
    padding: 5px 5px 5px 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    background: linear-gradient(90deg, #FFEDE6 0.01%, rgba(255, 241, 236, 0.49) 0.02%, #F2F0F2 100%);
    border-radius: 10px;
    transition: 0.3s ease-in-out;
    border: 1px solid transparent;
    &_active {
      background: linear-gradient(90deg, #E1FFD3 0%, #DCEEFF 100%);
    }
    &:hover {
      border: 1px solid #5787A4;
    }
  }
  .item {
    &__title {
      color: #5787A4;
      font-weight: bold;
    }
    &__date {
      position: absolute;
      right: 10px;
      bottom: 0;
      font-size: 12px;
      color: #7D859A;
      opacity: 0.6;
    }
    &__description {
      color:  #555555;
      font-size: 12px;
    }
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-right: 5px;
    }
    &__body {
      display: flex;
    }
  }
  &__checkbox {
    position: absolute;
    left: 5px;
    top: 8px;
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
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
.error-message {
  position: absolute;
  bottom: -18px;
  left: 0;
  font-size: 12px;
  color: red;
}
</style>
