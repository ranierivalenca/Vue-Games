class Player extends MoveableElement {
  constructor(w, h) {
    super(10, 400, w, h);
  }

  jump() {
    this.vel[1] = 30
  }

  moveBy(vel) {
    this.vel[0] = vel
  }

  accelerateBy(acc) {
    this.acc[0] = acc
  }

  style() {
    return {
      width: this.width,
      height: this.height,
    }
  }
}