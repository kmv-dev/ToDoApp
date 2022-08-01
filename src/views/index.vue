<template>
  <div class="main">
    <h1>{{ users }}</h1>
    <span class="icon-activity"></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      users: "getUsers",
    }),
  },
};
</script>

<style lang="scss">
.main {
  @include container;
  margin: 0 auto;
}
.icon-activity {
  color: #2196f3;
}
</style>
