<i18n>
{
  "ja": {
    "title": "alter-ego"
  },
  "en": {
    "title": "alter-ego"
  }
}
</i18n>

<template>
  <div data-page="top" class="container">
    <div class="inner">
      <!-- <p>{{ $t('title') }}</p> -->
      <reverse-emotion />
      <video-container />
      <webgl-container />
      <buttons />
      <score />
      <gUMMessage />
      <emotion />
      <lefttime />
    </div>
    <qr />
  </div>
</template>

<script>
import Qr from '~/components/atoms/Qr'
import gUMMessage from '~/components/atoms/gUMMessage'
import Score from '~/components/atoms/Score'
import ReverseEmotion from '~/components/atoms/ReverseEmotion'
import Lefttime from '~/components/atoms/Lefttime'
import Buttons from '~/components/molecules/Buttons'
import Emotion from '~/components/molecules/Emotion'
import VideoContainer from '~/components/molecules/VideoContainer'
import WebglContainer from '~/components/molecules/WebglContainer'

import Face from '~/assets/js/Face'

export default {
  components: {
    Qr,
    gUMMessage,
    Score,
    ReverseEmotion,
    Lefttime,
    Buttons,
    Emotion,
    VideoContainer,
    WebglContainer
  },
  computed: {
    isFromTablet() {
      return this.$ua.isFromTablet() || this.$isFromIpad()
    }
  },
  mounted() {
    new Face()
  }
}
</script>

<style lang="scss">
.inner{
  // position: relative;
}
</style>
