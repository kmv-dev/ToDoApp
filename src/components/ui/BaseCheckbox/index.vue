<template>
  <label class="checkbox" :class="{ checkbox_checked: checked }">
    <transition name="bounce">
      <span v-if="checked" class="checkbox__icon icon-check" />
    </transition>
    <input
      class="checkbox__input"
      type="checkbox"
      :value="value"
      :checked="checked"
      @change="(evt) => onChange(evt.target.value)"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    value: {
      type: String,
      default: null,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(value) {
      if (this.modelValue.includes(this?.value)) {
        this.$emit(
          "update:modelValue",
          this.modelValue.filter((cv) => cv !== value)
        );
      } else {
        this.$emit("update:modelValue", this.modelValue.concat(value));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  display: block;
  text-align: left;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &::before {
    content: "";
    background-color: #ffffff;
    border: 1px solid #d9dbde;
    display: inline-block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    flex-grow: 0;
    border-radius: 100%;
    transition: 0.1s ease-in-out;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  &_checked::before {
    border: 2px solid #339966;
  }
  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  &__icon {
    position: absolute;
    top: -5px;
    left: -1px;
    font-size: 26px;
    color: #373435;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.2s ease-in-out;
}

@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
