<template>
  <ul id="emotion">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li id="current-emotion"></li>
  </ul>
</template>

<style lang="scss" scoped>
#emotion{
  position: fixed;
  z-index: index($z, modal);
  color: #fff;
  @include pc-layout{
    top: 20px;
    left: 20px;
  }
  @include sp-layout{
    font-size: 14px;
    bottom: 20px;
    left: 15px;
  }
}

#current-emotion{
  color: skyblue;
  margin-top: 10px;
  font-size: 2rem;
  @include sp-layout{
    font-size: 20px;
  }
}
</style>
