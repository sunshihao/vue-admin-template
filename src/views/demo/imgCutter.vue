<template>
  <Oel-screen>
    <!-- <ImgClipping
      @cutDown="cutDown"
    /> -->
    <Oel-table
      :table-header="tableHeader"
      :table-data="datalist"
    />
  </Oel-screen>
</template>

<script>
import { mapGetters } from 'vuex'
import ImgClipping from 'vue-img-clipping'
import { getTestTable } from '@/api/user'

export default {
  name: 'Dashboard',
  components: {
    ImgClipping
  },
  data() {
    return {
      datalist: [],
      tableHeader: [
        // 表头定义
        { align: 'center', field: 'a', name: '广告主题' },
        { align: 'center', field: 'a0', name: '总点击次数' },
        { align: 'center', field: 'a1', name: '0-2时' },
        { align: 'center', field: 'a2', name: '2-4时' },
        { align: 'center', field: 'a3', name: '4-6时' },
        { align: 'center', field: 'a4', name: '6-8时' },
        { align: 'center', field: 'a5', name: '8-10时' },
        { align: 'center', field: 'a6', name: '10-12时' },
        { align: 'center', field: 'a7', name: '12-14时' },
        { align: 'center', field: 'a8', name: '14-16时' },
        { align: 'center', field: 'a9', name: '16-18时' },
        { align: 'center', field: 'a10', name: '18-20时' },
        { align: 'center', field: 'a11', name: '20-22时' },
        { align: 'center', field: 'a12', name: '22-24时' }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    const that = this
    getTestTable().then(res => {
      that.datalist = res.data
    })
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
