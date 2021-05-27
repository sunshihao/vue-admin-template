<template>
  <Oel-screen>
    <Oel-table
      ref="oelTable"
      :api="APIgetList"
      :query-params="queryObj"
      :table-header="tableHeader"
    />
  </Oel-screen>
</template>

<script>
import { getList } from '@/api/demo'

export default {
  data() {
    const that = this
    return {
      APIgetList: getList,
      queryObj: {}, // 查询条件
      tableHeader: [
        { field: 'createDate', name: '主播名称' },
        { field: 'createdBy', name: '手机号' },
        { field: 'deleteFlag', name: 'CN账号' },
        { field: 'dictCode', name: '身份' },
        { field: 'dictDesc', name: '有效期开始' },
        { field: 'dictName', name: '有效期截止' },
        { name: '直播权限', render: ({ row, index }) => <el-switch value={row.id || row.id === 1} active-color={'#13ce66'} inactive-color={'#ff4949'} onChange={() => that.onSwitchChange(row)} /> },
        { name: '选择器样例', render: ({ row, index }) =>
          <el-select value={row.dictName} filterable placeholder='请选择' onChange={(e) => that.onSelChange(e, row)} >
            {
              that.options.map(
                item =>
                  <el-option
                    key={item.value}
                    label={item.label}
                    value={item.value}>
                  </el-option>
              )
            }
          </el-select>
        },
        {
          fixed: 'right',
          operation: [
            {
              name: '删除',
              style: 'color:red',
              handle: function(d) {
                console.log('删除点击,d', d)
                that.$refs.oelTable.getTableData() // table 查询
              }
            }
          ],
          name: '操作'
        }
      ],
      options: [{
        value: '否',
        label: '黄金糕'
      }, {
        value: '是',
        label: '双皮奶'
      }, {
        value: '已创建',
        label: '蚵仔煎'
      }, {
        value: '已发放',
        label: '龙须面'
      }, {
        value: '已领取',
        label: '北京烤鸭1'
      }, {
        value: '已核销',
        label: '北京烤鸭2'
      }, {
        value: '已失效',
        label: '北京烤鸭3'
      }, {
        value: '已过期',
        label: '北京烤鸭4'
      }, {
        value: '已付款',
        label: '北京烤鸭5'
      }, {
        value: '已完成',
        label: '北京烤鸭6'
      }]
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    onSwitchChange(data) {
      console.log('onSwitchChange', data)
      data.id = !data.id
      // this.$refs.oelTable.getTableData() // table 查询
    },
    onSelChange(data, row) {
      console.log('onSelChange', data)
      row.dictName = data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
