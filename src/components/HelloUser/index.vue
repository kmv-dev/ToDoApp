<template>
  <div class="greet" v-if="isAuth">
    <span
        v-if="!isEdit"
        class="greet__hello-text"
    >
      Привет
    </span>
    <span
        v-if="!isEdit"
        class="greet__name"
    >
      {{ userName }}
    </span>
    <span
        v-if="!isEdit"
        class="greet__text">
      !
    </span>
    <Form
        class="greet__form"
        @submit="addNewName"
    >
      <Field
          v-if="isEdit"
          v-model="newName"
          name="name"
          type="text"
          class="greet__input"
          :rules="validateName"
          placeholder="Введите имя"
      />
      <ErrorMessage
          name="name"
          class="error-message"
      />
      <span
          v-if="!isEdit"
          class="greet__icon icon-edit"
          @click="editName"
      />
      <button
          v-else
          class="greet__button"
          type="submit"

      >
        <span class="greet__icon greet__icon_btn icon-refresh"></span>
      </button>

    </Form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addUserDataToLocalStorage, getUserDataFromLocalStorage } from "../../utils/api/user";
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data(){
    return {
      newName: '',
    }
  },
  mounted() {
    this.update();
  },
  computed: {
    ...mapGetters({
      userName: 'getUserName',
      isAuth: 'getAuthStatus',
      isEdit: 'getEditNameStatus'
    }),
  },
  methods:{
    ...mapActions({
      handleAddUser: 'addUser',
      handleAddEditStatus: 'addEditStatus'
    }),
    update(){
      const data = getUserDataFromLocalStorage('userData');
      const payload = {
        name: data?.name,
        isAuth: data?.isAuth
      }
      this.handleAddUser(payload);
      this.newName = ''
    },
    editName(){
      this.newName = ''
      const payload = {
        isEdit: true
      }
      this.handleAddEditStatus(payload)
    },
    addNewName(){
      const payload = {
        name: this.newName,
        isAuth: true
      }
      addUserDataToLocalStorage('userData', payload);
      this.handleAddUser(payload);
      this.newName = ''
      const status = {
        isEdit: false
      }
      this.handleAddEditStatus(status)
    },
    validateName(values) {
      if (values) {
        return true;
      }
      return 'Пустое значение';
    },
  }
};
</script>

<style lang="scss" scoped>
.greet {
  display: flex;
  align-items: center;
  &:hover {
    .greet__icon {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  &__form {
    position: relative;
    display: flex;
  }
  &__input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #d9dbe9;
    &::placeholder {
      font-size: 14px;
    }
  }
  &__hello-text {
    margin-right: 5px;
  }
  &__name {
    margin-right: 2px;
    font-weight: bold;
    color: #22a3fb;
  }
  &__icon {
    transform: translateX(10px);
    opacity: 0;
    font-size: 16px;
    color: #8f8f8f;
    margin-left: 10px;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    &_btn {
      opacity: 1;
      font-size: 20px;
    }
  }
  @include _1024 {
    &__hello-text {
      font-size: 14px;
    }
  }
}
.error-message {
  position: absolute;
  bottom: -18px;
  left: 2px;
  font-size: 10px;
  color: red;
}
</style>
