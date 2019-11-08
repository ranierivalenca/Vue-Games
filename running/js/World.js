class World {
  width = 0
  height = 0

  viewport = null
  player = null

  surfaces = []
  platforms = []

  gravity = -4

  constructor(window, w = Infinity, h = Infinity) {
    // this.width = Math.min(window.innerWidth, w)
    this.width = Infinity
    this.height = Math.min(window.innerHeight, h)

    this.setViewportFor(window)
    this.player = new Player(30, 30)
    this.player.acc[1] = this.gravity

    this.addBoundaries()
    this.addPlatforms()
  }

  setViewportFor(window) {
    this.viewport = new Viewport(
        Math.min(window.innerWidth, this.width),
        Math.min(window.innerHeight, this.height)
    )
  }

  adapt() {
    if (this.platforms[this.platforms.length - 2].isVisibleOn(this.viewport)) {
      this.addPlatforms(2)
    }
  }

  addPlatforms(n = 4) {
    let vw = this.viewport.width
    let maxw = vw / 3
    let x = maxw * this.platforms.length
    for (let i = 0; i < n; i++) {
      let y = 50 + Math.round(Math.random() * 200)
      let w = maxw - 100 + Math.round(Math.random() * 100)
      let platform = new Platform(x, y, w)
      this.platforms.push(platform)
      this.surfaces.push(platform)
      x += maxw
    }
  }

  addBoundaries() {
    // floor
    this.surfaces.push(
      new Platform(0, 0, Infinity)
    )
    // roof
    this.surfaces.push(
      new Platform(0, this.height - 10, Infinity)
    )
    // left wall
    this.surfaces.push(
      new Wall(0, 0, this.height)
    )
  }

  addWalls(n) {
    [...Array(n)].map(_ => {
      let x = Math.round(Math.random() * this.width)
      let y = Math.round(Math.random() * this.height)
      let h = 100 + (50 - Math.round(Math.random() * 100))
      this.walls.push(
        new Wall(x, y, w)
      )
    })
    // left
    this.walls.push(
      new Wall(0, 0, this.height)
    )
    // roof
    this.walls.push(
      new Wall(0, this.height - 10, this.height)
    )
  }



  visibleSurfaces() {
    return this.surfaces.filter(s => s.isVisibleOn(this.viewport))
  }

  detectPlayerCollisions() {
    return this.visibleSurfaces().filter(platform => this.player.inCollisionWith(platform))
  }

  resolvePlayerCollisions(collisionElements) {
    let player = this.player
    collisionElements.map(element => {
      let collidedInX = player.last().fwx().inCollisionWith(element) &&
                        !player.last().fwy().inCollisionWith(element)
      let collidedInY = player.last().fwy().inCollisionWith(element) &&
                        !player.last().fwx().inCollisionWith(element)
      let dx = player.vel[0] > 0 ? player.coord('r') - element.coord('l') : player.coord('l') - element.coord('r')
      let dy = player.vel[1] > 0 ? player.coord('t') - element.coord('b') : player.coord('b') - element.coord('t')
      // console.log(player)
      // console.log(player.last())
      // console.log(player.last().fwy())
      // console.log(element, dx, dy, collidedInX, collidedInY)
      if (collidedInX) {
        player.rwx(dx).stopx()
        player.stopx()
      } else if (collidedInY) {
        player.rwy(dy).stopy()
      } else {
        player.rwx(dx).rwy(dy).stopx().stopy()
      }
    })
  }

  move() {
    this.player.fw()
    let collisionElements = this.detectPlayerCollisions()
    this.resolvePlayerCollisions(collisionElements)
    this.player.updateVel()
    this.viewport.centralizeIn(this.player, this)
    this.adapt()
  }


}