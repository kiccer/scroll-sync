<script setup lang="ts">
import { ScrollSync } from '@171h/scroll-sync'

const left = ref<HTMLElement>()
const mid = ref<HTMLElement>()
const right = ref<HTMLElement>()

onNuxtReady(() => {
  const leftEl = left.value as HTMLElement
  const midEl = mid.value as HTMLElement
  const rightEl = right.value as HTMLElement
  // X/Y轴同步、相对滚动
  const ss = new ScrollSync({
    doms: [leftEl, midEl, rightEl],
    x: false,
  })
})
</script>

<template>
  <div class="main">
    <div ref="left" class="left">
      <img src="~/assets//demo.jpg" alt="">
    </div>
    <div ref="mid" class="right">
      <img src="~/assets//demo.jpg" alt="">
    </div>
    <div ref="right" class="right">
      <img src="~/assets//demo2.jpg" alt="">
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.main {
  width: 100%;
  height: 800px;
  overflow: hidden;
  display: flex;
}
.left, .right {
  overflow: auto;
  height: 100%;
}
</style>
