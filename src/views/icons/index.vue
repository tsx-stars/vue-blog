<template>
  <div class="icons-container">
    <h2>单色图标</h2>
    <div class="content">
      <div
        class="icon-item"
        v-for="item of svg"
        :key="item"
        @click="handleClipboard(generateIconCode(item), $event)"
      >
        <svg-icon :icon-class="item" />
        <p class="p1 text-ellipsis" @click.stop="handleClipboard(item, $event)">
          {{ item }}
        </p>
        <p class="p2 ellipsisMultiline2">{{ generateIconCode(item) }}</p>
      </div>
    </div>
    <h2>多色图标</h2>
    <div
      class="icon-item"
      v-for="item of multicolorSvg"
      :key="item"
      @click="handleClipboard(generateIconCode(item), $event)"
    >
      <svg-icon :icon-class="item" />
      <p class="p1 text-ellipsis" @click.stop="handleClipboard(item, $event)">
        {{ item }}
      </p>
      <p class="p2 ellipsisMultiline2">{{ generateIconCode(item) }}</p>
    </div>
    <img
      @click="$jump('401')"
      style="position: absolute; bottom: 0; right: 0"
      :src="require('@/assets/401click.gif') + '?' + +new Date()"
      alt=""
    />
    <div id="leafContainer"></div>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import { svg, multicolorSvg } from './svg-icons'

export default {
  name: 'Icons',
  data() {
    return {
      svg,
      multicolorSvg,
    }
  },
  created() {
    console.log(svg)

    const NUMBER_OF_LEAVES = 50

    function init() {
      var container = document.getElementById('leafContainer')

      for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
        container.appendChild(createALeaf())
      }
    }

    function randomInteger(low, high) {
      return low + Math.floor(Math.random() * (high - low))
    }

    function randomFloat(low, high) {
      return low + Math.random() * (high - low)
    }

    function pixelValue(value) {
      return value + 'px'
    }

    function durationValue(value) {
      return value + 's'
    }

    function createALeaf() {
      var leafDiv = document.createElement('div')

      var image = document.createElement('img')

      image.src = require('./snow' + randomInteger(1, 5) + '.png')

      leafDiv.style.top = '-10px'

      leafDiv.style.left = pixelValue(randomInteger(0, 1400))

      var spinAnimationName =
        Math.random() < 0.5 ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip'

      leafDiv.style.webkitAnimationName = 'fade, drop'

      image.style.webkitAnimationName = spinAnimationName

      var fadeAndDropDuration = durationValue(randomFloat(5, 11))

      var spinDuration = durationValue(randomFloat(4, 8))

      leafDiv.style.webkitAnimationDuration =
        fadeAndDropDuration + ', ' + fadeAndDropDuration

      var leafDelay = durationValue(randomFloat(0, 5))

      leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay

      image.style.webkitAnimationDuration = spinDuration

      leafDiv.appendChild(image)

      return leafDiv
    }

    window.addEventListener('load', init)
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    },
  },
}
</script>

<style lang="scss" scoped>
.icons-container {
  min-height: 100vh;
  background: rgb(117 167 218 / 42%);
  padding: 10px 20px 0;
  overflow: hidden;
  background-size: 100% 100%;
  .content:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
  }
  .icon-item {
    position: relative;
    z-index: 99;
    background: #93aade8f;
    text-align: center;
    width: 140px;
    margin: 10px;
    height: 140px;
    border-radius: 10px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 6px;
    &:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      transform: translate3d(0, -2px, 0);
    }
    .p1 {
      width: 100%;
      font-size: 16px;
      margin-top: 10px;
    }
    .p2 {
      width: 100%;
      font-size: 12px;
    }
  }
}
</style>
<style>
#leafContainer > div {
  position: absolute;
  max-width: 100px;
  max-height: 100px;
  z-index: 100;
  animation-iteration-count: infinite, infinite;
  animation-direction: normal, normal;
  animation-timing-function: linear, ease-in;
}
#leafContainer > div > img {
  width: 100%;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  transform-origin: 50% -100%;
}

@-webkit-keyframes fade {
  0% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes drop {
  0% {
    transform: translate(0px, -50px);
  }
  100% {
    transform: translate(0px, 650px);
  }
}
@-webkit-keyframes clockwiseSpin {
  0% {
    transform: rotate(-50deg);
  }
  100% {
    transform: rotate(50deg);
  }
}
@-webkit-keyframes counterclockwiseSpinAndFlip {
  0% {
    transform: scale(-1, 1) rotate(50deg);
  }
  100% {
    transform: scale(-1, 1) rotate(-50deg);
  }
}
</style>
