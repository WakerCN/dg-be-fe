<!--
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-07-07 14:28 周5
 * @Description  : 
-->
<template>
  <div class="snow-view">
    <div></div>
  </div>
</template>

<script setup lang="ts">
import confetti from 'canvas-confetti'

const duration = 5 * 1000
const animationEnd = Date.now() + duration
let skew = 1

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function frame() {
  const timeLeft = animationEnd - Date.now()
  const ticks = Math.max(300, 500 * (timeLeft / duration))
  skew = Math.max(0.8, skew - 0.001)

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      // since particles fall down, skew start toward the top
      y: Math.random() * skew - 0.2
    },
    colors: ['#ffffff'],
    shapes: ['circle'],
    gravity: randomInRange(0.4, 0.6),
    scalar: randomInRange(0.4, 1),
    drift: randomInRange(-0.4, 0.4)
  })

  if (timeLeft > 0) {
    requestAnimationFrame(frame)
  }
}
frame()
</script>

<style scoped></style>
