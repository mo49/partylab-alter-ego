<template>
  <div></div>
</template>

<style lang="scss" scoped>
div{
  @include image(300, 300);
  background-image: url('~assets/image/qr.png');
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include sp-layout{
    display: none;
  }
  &:after{
    content: "⬇︎ご自身のスマホで鑑賞する作品です。⬇︎";
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -100px;
    color: #fff;
    white-space: nowrap;
    font-size: 40px;
    font-weight: bold;
  }
}
</style>
