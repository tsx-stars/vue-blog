<template>
  <div class="stars-tips-parent">
    <h-icon name="feedback"></h-icon>
    <div class="star-tips">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'STips',
}
</script>

<style scoped lang="scss">
.stars-tips-parent {
  position: relative;
  display: inline-block;
  &:hover .star-tips {
    display: block;
  }
  > .h-icon {
    font-size: 19px;
    color: #e7c51d;
    vertical-align: middle;
  }
  .star-tips {
    display: none;
    position: absolute;
    top: 34px;
    left: -18px;
    width: 500px;
    transform-origin: center top;
    z-index: 2036;
    box-shadow: 0 1px 6px 0.5px #d8d6d6;
    border: none;
    border-radius: 6px;
    padding: 10px;
    color: #606060;
    font-size: 14px;
    letter-spacing: 0.21px;
    line-height: 24px;
    background: #fff;
    &:after,
    &:before {
      content: '';
      box-sizing: content-box;
      width: 0;
      height: 0;
      position: absolute;
    }
    &:after {
      top: -14px;
      left: 20px;
      border-bottom: 7px solid #cccccc;
      border-top: 7px solid transparent;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      z-index: 10;
    }
    &:before {
      display: block;
      top: -12px;
      left: 21px;
      border-bottom: 6px solid #ffffff;
      border-top: 6px solid transparent;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      z-index: 12;
    }
  }
}
</style>
