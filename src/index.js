import { Application, Graphics } from 'pixi.js'
import './index.css'

const COLORS = [
  0xfefefe, // white
  0x7a7a78, // grey
  0xfbcb00, // yellow
  0xFF6B6B, // red
  0xFF9999, // pink
  0xBDB4F0,
  0xC9BFBF
]

const PI180 = Math.PI / 180
const DROPS_PER_FRAME = 10
const TOTAL_FRAMES = 2000

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: window.devicePixelRatio || 1,
  antialias: true,
  backgroundColor: 0xf3f3f3
})

let frame = 0
let dx
let dy
const x = window.innerWidth >> 1
const y = window.innerHeight >> 1
let angle = 0
let radius = 10
let r
let drop

function draw () {
  for (var k = 0; k < DROPS_PER_FRAME; k++) {
    r = PI180 * angle
    dx = Math.sin(r) * radius + x
    dy = Math.cos(r) * radius + y

    drop = createDrop(dx, dy, COLORS[(frame / 300) >> 0], 10 + frame * 0.1)
    drop.rotation = -r
    app.stage.addChild(drop)
    angle += 50 + frame * 0.01
    radius += 0.4
    frame++
    if (frame >= TOTAL_FRAMES) {
      app.stop()
    }
  }
}

function createDrop (x, y, c, h = 100) {
  const g = new Graphics()
  g.x = x
  g.y = y
  const w = h >> 1
  // shadow
  g.beginFill(0x333333, 0.5)
  g.moveTo(0, -54)
  g.lineTo(w + 4, h)
  g.lineTo(-w - 4, h)
  // color
  g.beginFill(c)
  g.moveTo(0, -50)
  g.lineTo(w, h)
  g.lineTo(-w, h)
  return g
}

document.body.appendChild(app.view)
app.ticker.add(() => draw())
app.start()
