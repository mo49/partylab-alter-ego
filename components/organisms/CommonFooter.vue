<template>
  <footer class="footer">
    <div class="inner">
      <Copyright />
    </div>
  </footer>
</template>

<script>
import Copyright from '~/components/atoms/Copyright'
export default {
  components: {
    Copyright,
  }
}
</script>

<style lang="scss" scoped>
.footer{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
}
</style>
