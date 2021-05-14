<template>
  <div class="dashboard-container">
    <ImgClipping
      @cutDown="cutDown"
    >
    </ImgClipping>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ImgClipping from 'vue-img-clipping'

export default {
  name: 'Dashboard',
  components: {
    ImgClipping
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
