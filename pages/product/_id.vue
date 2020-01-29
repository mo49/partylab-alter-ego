<template>
  <div data-page="product">
  </div>
</template>

<script>
import Meta from '~/assets/js/mixins/meta'
export default {
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: `Product ${this.$nuxt.$route.params.id}`,
        // description: `product page ${this.$nuxt.$route.params.id}, description`,
        // url: `/${this.$nuxt.$route.params.id}`,
        // image: `/${this.$nuxt.$route.params.id}/ogp.jpg`,
      }
    }
  },
}
</script>
