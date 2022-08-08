<template>
  <div class="content">
    <div class="content__inner">
      <div class="content__projects">
        fffffff
      </div>
      <div>
        gdfgdfgd
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.content {
  background-color: #f8f8ff;
  &__inner {
    @include container;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 20%);
    grid-gap: 30px;
  }
  &__projects {
    padding-top: 30px;
    border-right: 1px solid white;
    height: 100vh;
  }
}
</style>
