/* eslint-disable vue/no-reserved-keys */
<template>
  <div>
    <!-- 表格设置 -->
    <el-table
      v-loading="pri_loading"
      stripe
      border
      fit
      highlight-current-row
      style="width: 100%"
      :data="tableData"
      :cell-style="cellStyle"
      :max-height="tableHeight"
      :header-row-style="{ height: '30px' }"
      :row-style="{ height: '30px' }"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @select="select"
      @select-all="selectAll"
      @cell-click="cellClick"
      @current-change="clickChange"
      @selection-change="selectionChange"
    >
      <!--复选框-->
      <el-table-column
        v-if="checkboxColumn"
        type="selection"
        fixed="left"
        :width="checkboxWidth"
        :label="checkboxLable"
        align="center"
      />
      <!--单选框-->
      <el-table-column
        v-if="radioColumn"
        fixed="left"
        :width="checkboxWidth"
        :label="radioLable"
        align="center"
      >
        <template slot-scope="scope">
          <el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio>
        </template>
      </el-table-column>
      <!--序号-->
      <el-table-column
        v-if="firstColumn"
        type="index"
        :width="numberWidth"
        :label="firstColumnLable"
        align="center"
        fixed="left"
      />
      <!-- 渲染表头 也就同时渲染表格数据 -->
      <template v-for="(x, idx) in tableHeader">

        <el-table-column
          v-if="x.render"
          :key="idx"
          :show-overflow-tooltip="tdWrap"
          stripe
          :align="x.align || 'center'"
          :formatter="x.formatter"
          :header-align="x.headerAlign"
          :label="x.name"
          :prop="x.sortModel"
          :width="x.width"
          :min-width="x.minWidth"
          :fixed="x.fixed ? x.fixed : false"
          :sortable="x.sort === true ? 'custom' : false"
        >
          <template slot-scope="scope">
            <TableRender :row="scope.row" :render="x.render" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="idx"
          :show-overflow-tooltip="tdWrap"
          stripe
          :align="x.align || 'center'"
          :formatter="x.formatter"
          :header-align="x.headerAlign"
          :label="x.name"
          :prop="x.sortModel"
          :width="x.width"
          :min-width="x.minWidth"
          :fixed="x.fixed ? x.fixed : false"
          :sortable="x.sort === true ? 'custom' : false"
        >
          <template slot-scope="scope">
            <template v-if="x.operation && constructOperation(x.operation, scope.row).length <= 5">
              <el-button
                v-for="(y, idxBtn) in constructOperation(x.operation, scope.row)"
                :key="idxBtn"
                type="text"
                size="mini"
                :style="y.style || ''"
                @click.native.prevent="y.handle(scope.row)"
              >
                {{ y.name }}
              </el-button>
            </template>
            <template v-else-if="x.operation && constructOperation(x.operation, scope.row).length > 5">
              <span
                v-for="(y, idxBtn) in pri_lodashSlice(constructOperation(x.operation, scope.row), 0, 2)"
                :key="idxBtn"
                class="btnPadding"
              >
                <template>
                  <el-button
                    :key="idxBtn"
                    size="mini"
                    plain
                    :style="y.style || ''"
                    type="text"
                    @click.native.prevent="y.handle(scope.row)"
                  >
                    {{ y.name }}
                  </el-button>
                </template>
              </span>
              <span class="btnPadding">
                <el-dropdown placement="bottom-end" trigger="click">
                  <el-button plain icon="el-icon-more" type="text" size="mini">
                    更多<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(z, zIndex) in pri_lodashSlice(
                        constructOperation(x.operation, scope.row),
                        2
                      )"
                      :key="zIndex"
                      @click.native.prevent="z.handle(scope.row)"
                    >{{ z.name }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </template>
            <template v-if="x.hasOwnProperty('filter') && x.filter">
              <template v-if="x.handle">
                <a style="color: #4a88ea !important" @click.prevent="x.handle(scope.row)">{{
                  x.filter(scope.row[x.field], scope.row)
                }}</a>
              </template>
              <template v-else>
                <span>{{ x.filter(scope.row[x.field], scope.row) }}</span>
              </template>
            </template>
            <template v-else>
              <template v-if="x.handle">
                <a style="color: #4a88ea !important" @click.prevent="x.handle(scope.row)">{{
                  scope.row[x.field]
                }}</a>
              </template>
              <template v-else-if="x.formatter">
                <span>
                  {{ x.formatter(scope.row[x.field]) }}
                </span>
              </template>
              <template v-else-if="x.editable">
                <span v-if="scope.row.isEdit">
                  <div v-if="x.editType == 'select'">
                    <el-select v-model="scope.row[x.field]" size="small" placeholder="请选择">
                      <div v-if="x.selectOptionList">
                        <el-option
                          v-for="(item, index) in x.selectOptionList()"
                          :key="index"
                          :value="item.value"
                          :label="item.label"
                        >{{ item.label }}</el-option>
                      </div>
                      <div v-else>
                        <el-option value="1">1</el-option>
                      </div>
                    </el-select>
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row[x.field]"
                      size="small"
                      placeholder="请输入"
                    />
                  </div>
                </span>
                <span v-else>
                  <div v-if="x.editType == 'select'">
                    {{ fmtSelect(scope.row[x.field], x.selectOptionList()) }}
                  </div>
                  <div v-else>{{ scope.row[x.field] }}</div>
                </span>
              </template>
              <template v-else>
                <span
                  :style="{ color: typeof x.color == 'function' ? x.color(scope.row) : x.color }"
                >{{ scope.row[x.field] }}</span>
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页设置 -->
    <el-pagination
      v-if="showPageable"
      background
      class="pagination-custom"
      :page-count="4"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size.sync="size"
      :current-page.sync="page"
      :layout="layout"
      :total="totalNum"
      :disabled="pri_loading"
      @size-change="priSizeChange"
      @current-change="priCurrentChange"
    />
  </div>
</template>

<script>
/**
 * table ele常用组件封装升级 2.0 by sssh
*/
import _ from 'lodash'
import TableRender from './table-render.js'

export default {
  components: { TableRender },
  props: {
    // API 接口
    api: {
      type: Function,
      required: true
    },
    // 查询条件
    queryParams: {
      type: Object,
      required: false
    },
    // 列名
    tableHeader: {
      type: Array,
      required: true
    },
    // 是否显示序号列
    firstColumn: {
      type: Boolean,
      default: false
    },
    // 序号列列名
    firstColumnLable: {
      type: String,
      default: '序号'
    },
    // 序号列宽度
    numberWidth: {
      type: Number,
      default: 50
    },
    // 是否显示复选框
    checkboxColumn: {
      type: Boolean,
      default: false
    },
    // 显示的标题
    checkboxLable: {
      type: String,
      default: ' '
    },
    // 复选框宽度
    checkboxWidth: {
      type: Number,
      default: 50
    },
    // 是否显示单选框
    radioColumn: {
      type: Boolean,
      default: false
    },
    // 单选框标题
    radioLable: {
      type: String,
      default: '选择'
    },
    // 是否显示分页
    showPageable: {
      type: Boolean,
      default: true
    },
    // 超长是否缩率显示
    tdWrap: {
      type: Boolean,
      default: true
    },
    // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style 详见element-ui
    cellStyle: {
      type: Function
    },
    // 列是否固定在左侧或者右侧，true 表示固定在左侧
    fixed: {
      type: String || Boolean,
      default: false
    },
    // 表格高度
    tableHeight: {
      type: Number
    },
    // 分页样式 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: 'total, sizes, prev, pager,next,jumper'
    }
  },
  data() {
    return {
      pri_lodashSlice: _.slice,
      pri_loading: false,
      tableData: [],
      page: 1, // 分页信息
      size: 10,
      totalNum: 0,
      tableRadio: ''
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    /** 获取表格数据 */
    getTableData() {
      const that = this
      that.pri_loading = true
      this.api({
        curPage: this.page,
        pageSize: this.size,
        ...this.queryParams
      }).then(res => {
        that.pri_loading = false
        const { data: {
          records,
          total,
          current,
          size
        }, success } = res
        if (success) {
          that.tableData = records
          that.page = current
          that.size = size
          that.totalNum = total
        }
      }).catch(err => {
        console.log(err)
        that.pri_loading = false
      })
    },
    constructOperation(operationArr, rowData) {
      // console.log('operationArr', operationArr)
      // console.log('rowData', rowData)

      const arr = []
      for (const i in operationArr) {
        if (
          operationArr[i] &&
          Object.prototype.hasOwnProperty.call(operationArr[i], 'isShow') &&
          !operationArr[i].isShow(rowData)
        ) {
          continue
        }

        const status = operationArr[i].status
        if (typeof status === 'function' ? status(rowData) : true) {
          arr.push(operationArr[i])
        }
      }
      return arr
    },
    fmtSelect(value, optionList) {
      var label = ''
      for (const i in optionList) {
        if (value === optionList[i].value) {
          label = optionList[i].label
          break
        }
      }
      return label
    },
    // 同table select
    select(row, selection) {
      this.$emit('select', selection)
    },
    clickChange(item) {
      this.tableRadio = item
    },
    // 同table selectAll
    selectAll(rows) {
      this.$emit('selectAll', rows)
    },
    // 同table rowClick
    rowClick(row) {
      this.$emit('rowClick', row)
    },
    // 同table rowDblclick
    rowDblclick(row) {
      this.$emit('rowDblclick', row)
    },
    // 同table cellClick
    cellClick(row, column, cell) {
      // 单元格点击事件
      this.$emit('cellClick', row, column, cell)
    },
    // 同table selectionChange
    selectionChange(rows) {
      this.$emit('selectionChange', rows)
    },
    // 总数变更
    priSizeChange(size) {
      this.size = size
      this.page = 1 // 重置查询首页
      this.getTableData()
    },
    priCurrentChange(page) {
      this.page = page
      this.getTableData()
    }
  }
}
</script>

<style scoped>
.table-custom {
  padding: 10px;
}

.el-button--mini {
  padding: 3px 5px;
  font-size: 12px;
  border-radius: 3px;
}

.btnPadding {
  padding-right: 5px;
}
.pagination-custom {
  margin: 10px 15px 0 0;
  float: right;
}
</style>
