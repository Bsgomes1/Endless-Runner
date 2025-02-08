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
        this.add.text(20, 20, "Rocket Patrol Menu")
    }

    update() {
        // this.anims.create({
        //     key: 'player_anim', // Name the animation
        //     frameRate: 5,       // Correct property name
        //     repeat: -1,         // Loop animation
        //     frames: this.anims.generateFrameNumbers('character', { 
        //         start: 0, 
        //         end: 2,
        //         first: 0 
        //     })
        // })


            this.time.delayedCall(500, () => {
                this.scene.start('playScene');
            });

        
        this.scene.start('playScene')
    }
}
