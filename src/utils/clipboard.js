import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$hMessage.success('复制成功')
}

function clipboardError() {
  Vue.prototype.$hMessage.error('复制失败')
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.currentTarget, {
    text: () => text,
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
