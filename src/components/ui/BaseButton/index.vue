<template>
    <button
        class="base-btn"
        :class="btnClass"
        :type="type"
        @click="$emit('click')"
    >
      <span
          v-if="isIcon"
          class="base-btn__icon"
          :class="iconClass"
      />
      <slot />
    </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    iconClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    btnClass() {
      const {
        mode,
        disabled,
      } = this;
      return [
        {
          'base-btn_disabled': disabled,
          'base-btn_bordered': mode === 'bordered',
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.base-btn {
  display: flex;
  align-items: center;
  padding: 4px 15px;
  border-radius: 18px;
  background: linear-gradient(115.67deg, #27b5fe 7.14%, #0078f6 170.42%);
  color: white;
  font-size: 14px;
  box-shadow: 0 4px 5px 0 rgb(0 0 0 / 10%), 0 1px 10px 0 rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 20%);
  transition: 0.3s ease-in-out;
  &__icon {
    margin-right: 5px;
  }
  &_disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
