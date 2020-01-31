<template>
  <div id="buttons">
    <input class="btn" type="button" value="wait, loading video" id="trackingButton" />
    <input class="btn hide" type="button" value="START" id="animationButton" />
    <input class="btn hide" type="button" value="RESET" id="resetButton" @click="reset" />
  </div>
</template>

<script>
export default {
  methods: {
    reset() {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
#buttons{
  z-index: index($z, button);
  position: fixed;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);
}
input {
  font-family: 'Lato';
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0 auto 30px;
  font-size: 3rem;
  border-radius: 10px;
  padding: 5px 30px;
}
#animationButton{
}
#resetButton{
  font-size: 2rem;
}
</style>

