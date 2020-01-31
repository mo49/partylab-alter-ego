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
  top: 20px;
  left: 20px;
  z-index: index($z, modal);
  color: #fff;
}

#current-emotion{
  color: skyblue;
  margin-top: 10px;
  font-size: 2rem;
}
</style>
