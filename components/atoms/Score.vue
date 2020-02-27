<template>
  <p id="score"></p>
</template>

<style lang="scss">
#score{
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  @include pc-layout{
    margin-top: 60px;
  }
  @include sp-layout{
    font-size: 28px;
    opacity: 0.8;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    font-weight: bold;
    text-shadow: 3px 3px 5px #333;
  }
}
</style>
