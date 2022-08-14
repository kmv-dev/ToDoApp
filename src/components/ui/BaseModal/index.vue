<template>
  <transition name="fade">
    <div
        v-if="isShow"
        class="base-modal"
        @click="modalHide"
    >
      <div class="base-modal__content" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    modalHide(){
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  &__content {
    margin: 0 auto;
    background: white;
    width: 300px;
    height: 300px;
  }
}
</style>
