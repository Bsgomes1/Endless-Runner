class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('starfield', './assets/starfield.png')
        
        // this.load.spritesheet('character', './assets/ship_spritesheep.png', {frameWidth: 100})
        
        this.load.spritesheet('character', './assets/texture.png', {
            startFrame: 0,
            frameWidth: 860,
            frameHeight: 1010
        })
        

        this.load.image('fire', './assets/ship_fire.png')
        
        this.load.image('astroid1', './assets/astroid1.png')
        this.load.image('astroid2', './assets/astroid2.png')
        this.load.image('astroid3', './assets/astroid3.png')
        this.load.image('astroid4', './assets/astroid4.png')
        this.load.image('astroid5', './assets/astroid5.png')
        this.load.image('astroid6', './assets/astroid6.png')
        this.load.image('astroid7', './assets/astroid7.png')
        this.load.image('astroid8', './assets/astroid8.png')

        this.load.audio('explosion0', './assets/explosionCrunch_000.ogg')
        this.load.audio('explosion1', './assets/explosionCrunch_001.ogg')
        this.load.audio('explosion2', './assets/explosionCrunch_002.ogg')
        this.load.audio('explosion3', './assets/explosionCrunch_003.ogg')

        this.load.audio('laser', './assets/laserSmall_001.ogg')


    }
    create() {
        let menuConfig = {
            fontFamily: 'Ink Free',
            fontSize: '50px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 30,
            bottom: 30,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 90, 'Astroid Shooter', menuConfig).setOrigin(0.5)
        
        
        let secondConfig = {
            fontFamily: 'Ink Free',
            fontSize: '50px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        
        secondConfig.backgroundColor = '#0000FF'
        secondConfig.color = '#FFF'
        secondConfig.fontSize = '28px'
        this.add.text(game.config.width/2, game.config.height/2, 'use WASD to move', secondConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 40, 'left click on asteroids to destroy asteroids', secondConfig).setOrigin(0.5)

        secondConfig.backgroundColor = '#00FF99'
        secondConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 10, 'Spacebar to start', secondConfig).setOrigin(0.5)
        secondConfig.backgroundColor = '#FF0099'

  
        secondConfig.backgroundColor = '#FF0099';
        secondConfig.color = '#FFF';
        this.add.text(game.config.width / 2, game.config.height / 2 + 130, 'Press C for credits', secondConfig).setOrigin(0.5);

  

    }

    update() {
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('playScene')
        })

        this.input.keyboard.on('keydown-C', () => {
            this.scene.start('creditsScene')
        })
    }
}
