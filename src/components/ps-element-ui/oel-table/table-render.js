export default {
  name: 'TableRender',
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row, // 当前行数据
      index: ctx.props.index // 当前行索引
    }
    if (ctx.props.column) params.column = ctx.props.column
    return ctx.props.render({ ...params })
    // return <div domPropsInnerHTML={ctx.props.render(h, params)} />
  }
}
