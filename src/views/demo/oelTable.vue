<template>
  <Oel-screen>
    <ImgClipping
      @cutDown="cutDown"
    />
  </Oel-screen>
</template>

<script>
import ImgClipping from 'vue-img-clipping'

export default {
  name: '',
  components: {
    ImgClipping
  },
  data() {
    return {
     
    }
  },

  computed: {
   
  },
  mounted() {
  
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
