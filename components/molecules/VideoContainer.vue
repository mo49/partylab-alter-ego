<template>
  <div id="video-container" class="nohide">
    <video id="videoel" width="600" height="400" preload="auto" playsinline autoplay></video>
    <canvas id="canvasel" width="600" height="400" class="hide"></canvas>
    <canvas id="overlay" width="600" height="400"></canvas>
  </div>
</template>

<style lang="scss" scoped>
#video-container {
  position : relative;
  width : 600px;
  /*margin : 0px auto;*/
  // margin: 100px auto 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .wrapper[data-is-start] & {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: scale(0.5);
    transform-origin: left bottom;
  }
}
#videoel {
  -o-transform : scaleX(-1);
  -webkit-transform : scaleX(-1);
  transform : scaleX(-1);
  -ms-filter : fliph; /*IE*/
  filter : fliph; /*IE*/
}
#overlay, #canvasel {
  position: absolute;
  top: 0px;
  left: 0px;
  -o-transform : scaleX(-1);
  -webkit-transform : scaleX(-1);
  transform : scaleX(-1);
  -ms-filter : fliph; /*IE*/
  filter : fliph; /*IE*/
}
</style>
