<template>
  <header class="header">
    <div class="inner">
      <LinkToTop class="header__logo" />
    </div>
  </header>
</template>

<script>
import LinkToTop from '~/components/atoms/LinkToTop'
export default {
  components: {
    LinkToTop,
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
