<template>
  <el-card class="box-card">
    <slot />
  </el-card>
</template>

<script>

/**
 * 全局嵌套页面 以便整体性调整展示区页面效果
*/
export default {
  name: 'OelScreen',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
    // height: calc(100% - 20px);
    width: auto;
    margin: 10px;
    padding: 10px;
    overflow: auto;
  }
</style>
