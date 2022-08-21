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
        <ErrorMessage name="taskName" class="error-message" />
        <textarea
          v-model="description"
          placeholder="Описание"
          class="modal__textarea"
        />
      </Form>
      <template #buttonAction>
        <BaseButton form="modal-tasks" :type="'submit'" class="modal__btn">
          Добавить
        </BaseButton>
      </template>
    </BaseModal>
    <div class="tasks__header">
      <h4 class="tasks__name">#{{ getProjectData[0]?.name }}</h4>
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
          v-for="item in getTasks"
          :key="item.taskId"
          class="tasks__item item"
          :class="{ tasks__item_active: item.done }"
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
              <span
                class="item__icon icon-trash_full"
                @click="deleteTask(item.taskId, item.projectId)"
              />
            </div>
          </div>
          <div class="item__body">
            <span class="item__description">{{ item.description }}</span>
            <span class="item__date">{{ item.createDate }}</span>
          </div>
        </div>
      </TransitionGroup>
      <div v-if="!getTasks?.[0]" class="tasks__empty empty">
        <span v-if="!getProjectData[0]?.name" class="empty__text">
          Создайте список задач
        </span>
        <span v-else class="empty__text">
          В списке {{ getProjectData[0]?.name }} нет текущих задач
        </span>
        <span class="empty__icon icon-orders"></span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addDataToLocalStorage,
  getDataFromLocalStorage,
  changeCompleteTask,
  removeTask,
} from "../../utils/api/projects";
import { OPTIONS } from "@/utils/constants/dateOptions.js";
import { mapActions, mapGetters } from "vuex";
import { ErrorMessage, Field, Form } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      isActive: null,
      checked: [],
      taskName: "",
      description: "",
      modalVisible: false,
      clear: false,
      taskId: null,
    };
  },
  mounted() {
    this.getCurrentTasks();
  },
  computed: {
    ...mapGetters({
      getProjectData: "getProjectData",
      getTasks: "getTasks",
      isAuth: "getAuthStatus",
    }),
  },
  methods: {
    ...mapActions({
      handleAddTasks: "addTask",
    }),
    async changeTask(item, projectId) {
      await changeCompleteTask(item);
      this.getCurrentTasks(projectId);
    },
    addTask(id) {
      OPTIONS.date.weekday = "short";
      const date = new Date().toLocaleDateString("ru-Ru", OPTIONS.date);
      const time = new Date().toLocaleTimeString("ru-Ru", OPTIONS.time);
      function getRandomId(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      const payload = {
        name: this.taskName,
        description: this.description,
        createDate: date + " " + time,
        projectId: id,
        taskId: getRandomId(0, 8987699988876).toString(),
      };
      addDataToLocalStorage("tasks", payload);
      this.getCurrentTasks(id);
      this.modalVisible = false;
      this.taskName = "";
      this.description = "";
      document.body.style.overflow = "auto";
    },
    getCurrentTasks(id) {
      const data = getDataFromLocalStorage("tasks");
      const filteredTasks = data?.filter((obj) => obj.projectId === id);
      this.handleAddTasks(filteredTasks);
    },
    deleteTask(taskId, projectId) {
      removeTask("tasks", taskId);
      this.getCurrentTasks(projectId);
    },
    openModalAddTask() {
      this.modalVisible = true;
      document.body.style.overflow = "hidden";
    },
    validateName(values) {
      if (values) {
        return true;
      }
      return "Название задачи обязательное поле";
    },
  },
};
</script>

<style lang="scss" scoped>
.tasks {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    border-bottom: 1px solid #d9dbe9;
    margin-bottom: 10px;
  }
  &__name {
    max-width: 400px;
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
    padding-right: 12px;
    flex-direction: column;
    max-height: 615px;
    min-height: 615px;
    overflow-y: auto;
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
    padding: 5px 5px 5px 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    background: linear-gradient(
      90deg,
      #ffede6 0.01%,
      rgba(255, 241, 236, 0.49) 0.02%,
      #f2f0f2 100%
    );
    border-radius: 10px;
    transition: 0.3s ease-in-out;
    border: 1px solid transparent;
    &_active {
      background: linear-gradient(90deg, #e1ffd3 0%, #dceeff 100%);
    }
    &:hover {
      border: 1px solid #5787a4;
    }
  }
  .item {
    &__icon {
      cursor: pointer;
      color: #7d859a;
      transition: 0.2s ease-in-out;
      &:hover {
        color: #1a1a1a;
      }
    }
    &__title {
      color: #5787a4;
      font-weight: bold;
    }
    &__date {
      position: absolute;
      right: 10px;
      bottom: 0;
      font-size: 12px;
      color: #7d859a;
      opacity: 0.6;
    }
    &__description {
      color: #555555;
      font-size: 12px;
    }
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      padding-right: 5px;
    }
    &__body {
      display: flex;
      margin-left: -22px;
      padding-bottom: 12px;
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
  &__empty {
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
    &__text {
      text-align: center;
    }
  }
  @include _767 {
    &__header {
      flex-direction: column;
      align-items: center;
    }
    &__name {
      text-align: center;
      max-width: none;
      margin-bottom: 5px;
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
  transform: translateY(20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
  z-index: 10;
  width: calc(100% - 30px);
}
</style>
