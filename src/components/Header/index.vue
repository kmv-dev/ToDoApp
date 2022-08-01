<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  background: #2196f3;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
    0 1px 5px 0 rgb(0 0 0 / 20%);
  &__inner {
    @include container;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: aliceblue;
      padding: 15px;
      &:hover {
        color: black;
        transition: 0.3s ease-in-out;
      }
    }
  }
}
</style>
