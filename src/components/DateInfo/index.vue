<template>
  <div class="time-info">
    <div>
      <span class="time-info__date">{{ formatDate }}</span>
      <span class="time-info__time">{{ formatTime }}</span>
    </div>
  </div>
</template>

<script>
import { OPTIONS } from "@/utils/constants/dateOptions.js";
export default {
  data() {
    return {
      time: null,
    };
  },
  mounted() {
    this.time = new Date().toLocaleTimeString("ru-Ru", OPTIONS.time);
    this.updateTime();
  },
  computed: {
    formatDate() {
      const date = new Date().toLocaleDateString("ru-Ru", OPTIONS.date);
      return date.charAt(0).toUpperCase() + date.slice(1);
    },
    formatTime() {
      return this.time;
    },
  },
  methods: {
    updateTime() {
      setInterval(() => {
        this.time = new Date().toLocaleTimeString("ru-Ru", OPTIONS.time);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.time-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 0;
  &__date {
    color: #6c7279;
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
  }
  &__time {
    font-size: 14px;
    font-weight: bold;
    color: #1a1a1a;
    letter-spacing: 1px;
  }
  @include _1024 {
    &__date {
      font-size: 12px;
    }
    &__time {
      font-size: 12px;
    }
  }
}
</style>
