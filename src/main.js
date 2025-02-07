let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 1000,
    render: {
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3