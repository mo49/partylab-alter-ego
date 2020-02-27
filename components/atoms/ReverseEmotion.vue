<template>
  <div id="reverse-emotion"></div>
</template>

<style lang="scss" scoped>
#reverse-emotion{
  position: fixed;
  width: 100vw;
  height: 100vh;
  line-height: 100vh;
  top: 0;
  left: 0;
  color: orange;
  opacity: 0.8;
  text-align: center;
  transform: rotate(15deg);
  transform-origin: center;
  font-size: 15rem;
  @include sp-layout{
    font-size: 80px;
  }
}
</style>
