class Platform extends Element {
  constructor(x, y, w) {
    super(x, y, w, 10)
  }

  style() {
    return {
      width: this.width,
      height: this.height,
    }
  }
}