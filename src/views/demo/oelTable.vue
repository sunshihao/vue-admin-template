<template>
  <Oel-screen>
    <Oel-table
      :api="APIgetList"
      :table-header="tableHeader"
    />
  </Oel-screen>
</template>

<script>
import { getList } from '@/api/demo'

export default {
  data() {
    return {
      APIgetList: getList,
      tableHeader: [
        { field: 'createDate', name: '广告主题' },
        { field: 'createdBy', name: '总点击次数' },
        { field: 'deleteFlag', name: '0-2时' },
        { field: 'dictCode', name: '2-4时' },
        { field: 'dictDesc', name: '4-6时' },
        { field: 'dictName', name: '6-8时' },
        { field: 'dictOrder', name: '8-10时' },
        { field: 'dictTypeCode', name: '10-12时' },
        { field: 'dictTypeName', name: '12-14时' },
        { field: 'lastUpdateDate', name: '14-16时' },
        { field: 'lastUpdatedBy', name: '16-18时' },
        { field: 'objectVersionNumber', name: '18-20时' }
      ]
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
