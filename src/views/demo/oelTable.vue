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
        { field: 'createDate', name: '主播名称' },
        { field: 'createdBy', name: '手机号' },
        { field: 'deleteFlag', name: 'CN账号' },
        { field: 'dictCode', name: '身份' },
        { field: 'dictDesc', name: '有效期开始' },
        { field: 'dictName', name: '有效期截止' },
        { field: 'dictOrder', name: '直播权限', render: (row, column, index) => <el-switch /> },
        { field: 'dictOrder', name: '直播权限按钮', render: (row, column, index) => <el-button>默认按钮</el-button> },
        {
          fixed: 'right',
          operation: [
            {
              name: '删除',
              style: 'color:red',
              handle: function(d) {

              }
            }
          ],
          name: '操作'
        }
      ]
    }
  },
  computed: {
  },
  mounted() {
    console.log('thisthisthis', this)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
