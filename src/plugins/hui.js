import Vue from 'vue'
import hui from 'h_ui'
import 'h_ui/dist/h_ui.min.css'

//重写hui默认值后再挂载
// console.log(hui)

hui.Button.props.type.default = 'ghost' //颜色 白色
// hui.Button.props.shape.default = 'circle' //椭圆

hui.Input.props.filterRE.default = () => /^\s+/ //不允许首位空格

hui.Table.props.border.default = true //加垂直边框
hui.Table.props.stripe.default = true //斑马纹

hui.MsgBox.props.loading.default = true //确认按钮异步关闭
hui.MsgBox.props.maskClosable.default = false //点阴影不让关闭
hui.MsgBox.props.allowCopy.default = true //可复制

hui.Typefield.props.min.default = 0.0 //设置输入框最小值 (v1.0.49)

Vue.use(hui)
