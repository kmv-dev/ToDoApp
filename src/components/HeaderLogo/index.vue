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
    font-size: 18px;
    font-weight: bold;
    &_black {
      color: black;
    }
    &_blue {
      position: relative;
      color: #48b7ff;
      &:after {
        position: absolute;
        content: '';
        width: 8px;
        height: 1px;
        right: -24px;
        bottom: 2px;
        border-radius: 2px;
        background: black;
        animation: shakeing infinite ease-in-out;
        animation-duration: 1s;
      }
    }
    &_violet {
      display: inline-block;
      color: #5868ff;
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
  0% { transform: skewY(-12deg); }
  5% { transform: skewY(12deg); }
  10% { transform: skewY(-12deg); }
  15% { transform: skewY(12deg); }
  20% { transform: skewY(0deg); }
  100% { transform: skewY(0deg); }
}
</style>
