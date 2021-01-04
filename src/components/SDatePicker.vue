<template>
  <h-date-picker
    style="width: 200px"
    v-bind="{ ...$attrs, options, clearable }"
    v-on="$listeners"
    @input="_input"
  ></h-date-picker>
</template>

<script>
export default {
  name: 'SDatePicker',
  props: {
    options: {
      default() {
        if (this.$attrs.type === 'daterange') {
          return {
            disabledDate(date) {
              return date && date.valueOf() > Date.now()
            },
            shortcuts: [
              {
                text: '今天',
                value() {
                  const end = new Date()
                  const start = new Date()
                  return [start, end]
                },
              },
              {
                text: '最近一周',
                value() {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                  return [start, end]
                },
              },
              {
                text: '最近一个月',
                value() {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                  return [start, end]
                },
              },
              {
                text: '最近三个月',
                value() {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                  return [start, end]
                },
              },
            ],
          }
        }
      },
    },
    clearable: {
      default: false,
    },
    deleteNotAllClear: {
      default: true,
    },
  },
  methods: {
    _input(val) {
      //删除后，默认设置当天
      if (!this.clearable && !val.length) {
        val.push(new Date())
        val.push(new Date())
        // val = [new Date(), new Date()]
      }
      this.$emit('input', val)
    },
  },
}
</script>
