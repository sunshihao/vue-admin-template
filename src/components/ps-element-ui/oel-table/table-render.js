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
      row: ctx.props.row,
      index: ctx.props.index || 1
    }
    if (ctx.props.column) params.column = ctx.props.column
    return ctx.props.render(h, params)
    // return <div domPropsInnerHTML={ctx.props.render(h, params)} />
  }
}
