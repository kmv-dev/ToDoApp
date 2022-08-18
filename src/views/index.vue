<template>
  <div class="content">
    <div class="content__inner">
      <ProjectsList />
      <TasksList />
    </div>
  </div>
</template>

<script>
import ProjectsList from '@/components/ProjectsList/index.vue'
import TasksList from '@/components/TasksList/index.vue'
export default {
  components: {
    ProjectsList,
    TasksList
  }
}
</script>

<style lang="scss">
.content {
  background: linear-gradient(115.67deg, #f2f2f2 7.14%, #d9dbde 170.42%);
  overflow: hidden;
  &__inner {
    @include container;
    margin: 0 auto;
    padding-top: 30px;
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 20px;
  }
  &__projects {
    padding-top: 30px;
    border-right: 1px solid white;
    height: 100vh;
  }
}
</style>
