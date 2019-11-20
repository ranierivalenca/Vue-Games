class Player extends MoveableElement {
  // col = false
  jumping = false
  lastVelY = 0

  constructor(w, h) {
    super(10, 400, w, h);
    this.lastVelY = 0
    this.jumping = false
    console.log(this.acc)
  }

  //override
  maxVel() {
    return [
      {
        'min': -10,
        'max': 15
      },
      {
        'min': -10,
        'max': 20
      }
    ]
  }

  jump() {
    if (!this.jumping) {
      this.vel[1] = 20
      this.jumping = true
    }
  }

  updateVel() {
    super.updateVel()
    // this.acc[1] = Math.min(-1, -parseFloat((this.vel[0] / 3).toFixed(2)))
    // console.log(this.lastVelY, this.vel[1], this.vel[1] == this.lastVelY)
    // console.log(this.vel[0], this.vel[1], this.acc[1])
    if (this.vel[1] == this.lastVelY && this.lastVelY != this.maxVel()[1]['min']) {
      this.jumping = false
    }
    this.lastVelY = this.vel[1]
  }

  moveBy(vel) {
    this.vel[0] = vel
  }

  accelerateBy(acc) {
    this.acc[0] = acc
  }

  style() {
    return {
      // background: this.col ? '#f00' : '#0f0',
      width: this.width,
      height: this.height,
    }
  }
}