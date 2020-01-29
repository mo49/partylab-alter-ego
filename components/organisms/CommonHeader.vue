<template>
  <header class="header">
    <div class="inner">
    </div>
  </header>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
.header__logo{
  @include image(50,50);
  background-image: url('~assets/image/logo.png');
  display: inline-block;
}
</style>
