class Player extends MoveableElement {
  // col = false
  jumping = false
  lastVelY = 0

  constructor(w, h) {
    super(10, 400, w, h);
    this.lastVelY = 0
    this.jumping = false
  }

  //override
  maxVel() {
    return [
      {
        'min': 8,
        'max': 8
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
    // console.log(this.lastVelY, this.vel[1], this.vel[1] == this.lastVelY)
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