<template>
  <div class="edit-view">
    <section class="widget-panel">widget</section>
    <section class="main">main</section>
    <section class="attr-panel">attr</section>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.edit-view {
  width: 100%;
  height: 100%;
  background: paleturquoise;
  display: flex;

  .widget-panel {
    width: 240px;
    height: 100%;
    background: papayawhip;
  }

  .main {
    flex: 1;
    width: calc(100% - 240px - 360px);
    height: 100%;
  }

  .attr-panel {
    width: 360px;
    height: 100%;
    background: plum;
  }
}
</style>
