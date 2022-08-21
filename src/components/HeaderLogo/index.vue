<template>
  <div class="logo">
    <span class="logo__item logo__item_black">You</span>
    <span class="logo__item logo__item_blue">To</span>
    <span class="logo__item logo__item_violet">Do</span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  &__item {
    font-size: 16px;
    font-weight: bold;
    &_black {
      color: #373435;
    }
    &_blue {
      position: relative;
      color: #f8a915;
      &:after {
        position: absolute;
        content: "";
        width: 10px;
        height: 1px;
        right: -23px;
        bottom: 2px;
        border-radius: 2px;
        background: #373435;
        animation: shakeing infinite ease-in-out;
        animation-duration: 1s;
      }
    }
    &_violet {
      display: inline-block;
      color: #dd2651;
      animation: hit infinite ease-in-out;
      animation-duration: 1s;
    }
  }
}
@keyframes hit {
  from {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(-6deg);
  }
}
@keyframes shakeing {
  0% {
    transform: skewY(-12deg);
  }
  5% {
    transform: skewY(12deg);
  }
  10% {
    transform: skewY(-12deg);
  }
  15% {
    transform: skewY(12deg);
  }
  20% {
    transform: skewY(0deg);
  }
  100% {
    transform: skewY(0deg);
  }
}
</style>
