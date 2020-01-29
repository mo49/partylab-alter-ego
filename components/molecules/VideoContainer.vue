<template>
  <div id="video-container" class="nohide">
    <video id="videoel" width="370" height="288" preload="auto" playsinline autoplay></video>
    <canvas id="canvasel" width="370" height="288" class="hide"></canvas>
    <canvas id="overlay" width="370" height="288"></canvas>
  </div>
</template>

<style lang="scss" scoped>
#video-container {
  position : relative;
  width : 370px;
  /*margin : 0px auto;*/
  margin: 100px auto 0;
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
