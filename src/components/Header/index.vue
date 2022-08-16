<template>
  <header class="header">
    <div class="header__inner">
      <HeaderLogo class="header__logo"/>
      <DateInfo class="header__info"/>
      <div class="header__action">
        <Form
            v-if="!isAuth"
            class="header__form"
            @submit="addUser"
        >
          <Field
              v-model="name"
              name="name"
              type="text"
              class="header__input"
              :rules="validateName"
              placeholder="Введите имя"
          />
          <ErrorMessage
              name="name"
              class="error-message"
          />
          <BaseButton>
            Get started
          </BaseButton>
        </Form>
        <HelloUser/>
        <button
            v-if="isAuth"
            class="header__button header__button_logout"
            @click="removeData"
        >
          Log out
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import HeaderLogo from "@/components/HeaderLogo/index.vue";
import DateInfo from "@/components/DateInfo/index.vue";
import HelloUser from "@/components/HelloUser/index.vue";
import { mapActions, mapGetters } from "vuex"
import { Form, Field, ErrorMessage } from 'vee-validate';
import { addUserDataToLocalStorage, removeDataToLocalStorage } from "../../utils/api/user";
export default {
  components: {
    DateInfo,
    HeaderLogo,
    HelloUser,
    Form,
    Field,
    ErrorMessage
  },
  data(){
    return {
      name: '',
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'getAuthStatus'
    }),
  },
  methods: {
    ...mapActions({
      handleAddUser: 'addUser',
      handleAddEditStatus:'addEditStatus',
    }),
    addUser(){
      const payload = {
        name: this.name,
        isAuth: true
      }
      addUserDataToLocalStorage('userData', payload);
      this.handleAddUser(payload);
      this.name = ''
    },
    removeData(){
      if (confirm('Все данные будут удалены! Выйти и очистить?')) {
        removeDataToLocalStorage('userData')
        removeDataToLocalStorage('projects')
        removeDataToLocalStorage('tasks')
        removeDataToLocalStorage('check')
        const payload = {
          name: '',
          isAuth: false
        }
        this.handleAddUser(payload);
        const status = {
          isEdit: false
        }
        this.handleAddEditStatus(status)
        location.reload();
      }
    },
    validateName(values) {
      if (values) {
        return true;
      }
      return 'Введите ваше имя';
    },
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 0 15px rgb(0, 0, 0, 12%);
  z-index: 1000;
  &__inner {
    @include container;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }
  &__info {
    display: flex;
    justify-content: center;
  }
  &__action {
    display: flex;
    justify-content: flex-end;
    align-items: end;
  }
  &__form {
    position: relative;
    display: flex;
    align-items: center;
  }
  &__input {
    border: none;
    border-bottom: 1px solid #d9dbe9;
    margin-right: 15px;
    font-size: 14px;
  }
  &__button {
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 18px;
    background: #fdc344;
    color: #ffffff;
    font-weight: 500;
    transition: 0.1s ease-in-out;
    box-shadow: 0 4px 5px 0 rgb(0 0 0 / 10%), 0 1px 10px 0 rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 20%);
    &:hover {
      transform: translatey(1px);
      box-shadow: none;
    }
    &_logout {
      background-color: #F3F3F3;
      color: #5787A4;
      margin-left: 20px;
      &:hover {
        background: #7D859A;
        color: white;
      }
    }
  }
}
.error-message {
  position: absolute;
  bottom: -15px;
  left: 0;
  font-size: 12px;
  color: red;
}
</style>
