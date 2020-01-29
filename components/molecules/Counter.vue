<template>
  <div>
    <p>Counter: {{count}}</p>
    <button class="increment-button" @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
