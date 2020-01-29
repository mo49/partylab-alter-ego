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
      <p>{{ $t('title') }}</p>
      <video-container />
      <webgl-container />
      <buttons />
      <score />
      <gUMMessage />
      <emotion />
    </div>
  </div>
</template>

<script>
import gUMMessage from '~/components/atoms/gUMMessage'
import Score from '~/components/atoms/Score'
import Buttons from '~/components/molecules/Buttons'
import Emotion from '~/components/molecules/Emotion'
import VideoContainer from '~/components/molecules/VideoContainer'
import WebglContainer from '~/components/molecules/WebglContainer'

import Face from '~/assets/js/Face'

export default {
  components: {
    gUMMessage,
    Score,
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
  position: relative;
}
</style>
