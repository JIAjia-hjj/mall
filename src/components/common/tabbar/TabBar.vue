<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar{
    z-index: 999;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #f6f6f6;
    box-shadow:0 -1px 7px 1px rgba(100,100,100,0.1);
    max-width: 750px;
    margin: 0 auto;
  }

</style>
