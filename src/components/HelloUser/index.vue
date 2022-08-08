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
          :rules="validateName"
          class="greet__input"
          type="text"
          placeholder="Введите новое имя"
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
        <span class="greet__icon greet__icon_btn icon-refresh_02"></span>
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
    },
    editName(){
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
      return 'Недопустимое значение';
    },
  }
};
</script>

<style lang="scss">
.greet {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d9dbe9;
  &:hover {
    .greet__icon {
      display: block;
    }
  }
  &__form {
    position: relative;
    display: flex;
  }
  &__input {
    background: transparent;
    border: none;
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
    color: #5868ff;
  }
  &__icon {
    display: none;
    font-size: 16px;
    color: #8f8f8f;
    margin-left: 10px;
    cursor: pointer;
    &_btn {
      font-size: 20px;
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
