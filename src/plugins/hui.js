import Vue from 'vue'
import hui from 'h_ui'
import 'h_ui/dist/h_ui.min.css'

//重写hui默认值后再挂载
// console.log(hui)

hui.Button.props.type.default = 'ghost' //颜色 白色
// hui.Button.props.shape.default = 'circle' //椭圆

hui.Input.props.filterRE.default = () => /^\s+/ //不允许首位空格
hui.Input.props.placeholder.default = '请填写'

hui.Select.props.filterable.default = true //是否支持搜索
hui.SimpleSelect.props.filterable = {
  default: true,
  type: Boolean,
} //是否支持搜索

hui.Table.props.border.default = true //加垂直边框
hui.Table.props.stripe.default = true //斑马纹

hui.Page.props.showElevator.default = true //显示电梯，可以快速切换到某一页

hui.MsgBox.props.loading.default = true //确认按钮异步关闭
hui.MsgBox.props.maskClosable.default = false //点阴影不让关闭
hui.MsgBox.props.allowCopy.default = true //可复制

hui.Typefield.props.nonNegative.default = true //只允许非负数，即正数和 0(v1.0.36)
hui.Typefield.props.notFillin.default = true //格式化金额时，当小数点少于指定位数是否不需要补 0 ( type 为 money 时专用) ( isround 优先级大于 notFillin )

Vue.use(hui)
