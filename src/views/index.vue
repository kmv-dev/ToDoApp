<template>
  <div class="main">
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
  background-color: #f8f8ff;
  background-image: url("public/time-bg.svg");
  background-position: left;
  background-repeat: no-repeat;
  opacity: 0.5;
}
.icon-activity {
  color: #2196f3;
}
</style>
