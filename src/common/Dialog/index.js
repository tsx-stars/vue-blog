import Vue from 'vue'
import Toast from './Dialog.vue'

const ToastCtor = Vue.extend(Toast)

const InitToast = opt => {
  const duration = opt.autoClose !== false && (opt.duration || 2000)
  let i = new ToastCtor({
    data: opt
  }).$mount()

  document.body.appendChild(i.$el)

  duration &&
    setTimeout(() => {
      document.body.removeChild(i.$el)
    }, duration)
}

const toast = opt => {
  return InitToast(opt)
}
const alert = opt => {
  return InitToast({
    ...opt,
    isAlert: true,
    autoClose: false
  })
}
const confirm = opt => {
  return InitToast({
    ...opt,
    autoClose: false
  })
}

const install = () => {
  Vue.prototype.$dialog = { toast, alert, confirm }
}

export default install
