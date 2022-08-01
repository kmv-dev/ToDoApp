<template>
  <header class="header">
    <div class="header__inner">
      <HeaderLogo />
      <DateInfo />
      <button class="header__button">Начать</button>
    </div>
  </header>
</template>

<script>
import HeaderLogo from "@/components/HeaderLogo/index.vue";
import DateInfo from "@/components/DateInfo/index.vue";
export default {
  components: {
    DateInfo,
    HeaderLogo
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 0 15px rgb(88, 104, 255, 15%);
  z-index: 1000;
  &__inner {
    @include container;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__button {
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 18px;
    background: #48b7ff;
    color: #ffffff;
    transition: 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 30%);
    }
  }
}
</style>
