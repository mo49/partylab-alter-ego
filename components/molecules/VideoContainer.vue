<template>
  <div id="video-container" class="nohide">
    <video id="videoel" width="600" height="400" preload="auto" playsinline autoplay></video>
    <canvas id="canvasel" width="600" height="400" class="hide"></canvas>
    <canvas id="overlay" width="600" height="400"></canvas>
  </div>
</template>

<style lang="scss" scoped>
#video-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include pc-layout{
    width : 600px;
  }
  @include sp-layout{
    width : 100%;
    max-height: 300px;
    video, canvas{
      width: 100%;
      height: auto;
      max-height: 300px;
    }
  }
  .wrapper[data-is-start] & {
    position: absolute;
    transform: scale(0.5);
    transform-origin: left bottom;
    bottom: 0;
    @include pc-layout{
      left: 0;
    }
    @include sp-layout{
      right: 0;
    }
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
