class MoveableElement extends Element {
  acc = [0, 0]
  vel = [0, 0]

  lastPos = [0, 0]

  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.lastPos = [x, y]
  }

  last() {
    let clone = new Player(this.width, this.height)
    clone.x = this.lastPos[0]
    clone.y = this.lastPos[1]
    clone.lastPos = this.lastPos
    clone.acc = this.acc
    clone.vel = this.vel
    return clone
  }

  fwx() {
    this.lastPos[0] = this.x
    this.x += this.vel[0]
    return this
  }

  fwy() {
    this.lastPos[1] = this.y
    this.y += this.vel[1]
    return this
  }

  rwx(by) {
    this.x -= by
    return this
  }

  rwy(by) {
    this.y -= by
    return this
  }

  fw() {
    this.fwx()
    this.fwy()
    return this
  }

  stopx() {
    this.vel[0] = 0
    return this
  }
  stopy() {
    this.vel[1] = 0
    return this
  }

  updateVel() {
    this.vel = this.vel.map((v, i) => v + this.acc[i])
    this.vel[0] = this.vel[0] > this.width ? this.width : this.vel[0]
    this.vel[0] = this.vel[0] < -this.width ? -this.width : this.vel[0]
    this.vel[1] = this.vel[1] > this.height ? this.height : this.vel[1]
    this.vel[1] = this.vel[1] < -this.height ? -this.height : this.vel[1]
  }
}