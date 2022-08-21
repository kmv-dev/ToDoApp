<template>
  <transition name="fade">
    <div v-if="isShow" class="base-modal" @click="modalHide">
      <div class="base-modal__content" @click.stop>
        <div class="base-modal__header header">
          <span class="header__title">{{ title }}</span>
          <span class="header__close" @click="modalHide" />
        </div>
        <div class="base-modal__inner">
          <slot />
        </div>
        <div class="base-modal__buttons">
          <BaseButton @click="modalHide" class="base-modal__cancel">
            Отмена
          </BaseButton>
          <slot name="buttonAction" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    modalHide() {
      this.$emit("update:isShow", false);
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style lang="scss" scoped>
.base-modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  z-index: 10000;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    margin: 0 15px;
    background: white;
    width: 400px;
    height: 300px;
    border: 0.5px solid #e2e0e0;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
  }
  &__header {
    position: relative;
    display: flex;
    margin-bottom: 10px;
  }
  .header {
    &__close {
      position: absolute;
      top: 0;
      right: 0;
      width: 16px;
      height: 16px;
      opacity: 0.2;
      cursor: pointer;
      transition: opacity ease 0.5s;
      &:hover {
        opacity: 1;
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 10px;
        display: block;
        width: 16px;
        height: 2px;
        background: #000;
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
  &__inner {
    flex-grow: 1;
  }
  &__buttons {
    display: flex;
    justify-content: flex-end;
  }
  &__cancel {
    margin-right: 10px;
  }
}
</style>
