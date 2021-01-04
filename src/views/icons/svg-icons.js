const reg = /\.\/(.*)\.svg/

const svg = require
  .context('../../icons/svg', false, /\.svg$/)
  .keys()
  .map((i) => {
    return i.match(reg)[1]
  })
const multicolorSvg = require
  .context('../../icons/multicolorSvg', false, /\.svg$/)
  .keys()
  .map((i) => {
    return i.match(reg)[1]
  })

export { svg, multicolorSvg }
