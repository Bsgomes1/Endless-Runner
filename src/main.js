// Name: Ben Gomes
// Title: Endless runner/ Asteroid Shooter
// Time: 30ish hours

// Sources: ChatGPT for when I was stuck, 
// kenney.nl for sounds, 


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 900,
    render: {
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    scene: [ Menu, Play, Credits ]
  }

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3