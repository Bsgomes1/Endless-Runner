class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // Display starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0)

        // Create player sprite
        this.player = this.physics.add.sprite(game.config.width / 2, (game.config.height / 2) + 300, 'character', 1).setOrigin(0.5, 0.5).setScale(0.05)
    
        this.player.body.setSize(800, 800).setOffset(0, 0) // Adjust hitbox
        this.player.body.setCollideWorldBounds(true) // Prevent player from moving off-screen


        // // flying animation (fire out of bottom of ship)
        // this.anims.create({
        //     key: 'fly',
        //     frameRate: 5,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('character', { 
        //         start: 2, 
        //         end: 0   
        //     })
        // })
        
        if (!this.anims.exists('fly')) {
            this.anims.create({
                key: 'fly',
                frameRate: 5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('character', { start: 2, end: 0 })
            })
        }

        // Keyboard input
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })

        this.asteroids = this.physics.add.group()
        this.spawnAsteroid()
        this.asteroidSpawnEvent = this.time.addEvent({
            delay: 500,
            callback: this.spawnAsteroid,
            callbackScope: this,
            loop: true
        })
            
        this.input.on('pointerdown', this.shootAsteroid, this)
        //console.log(this.anims)
        this.player.play('fly')
        //console.log(this.anims.getTotalFrames)

        // Add collision detection between player and asteroids
        this.physics.add.collider(this.player, this.asteroids, this.gameOver, null, this)

        this.timeAlive = 0 // Start the timer
        this.timeAliveText = this.add.text(20, 20, 'Time: 0s', {
            fontSize: '24px',
            color: '#fff'
        })

        this.gameOverFlag = false // Track if the game is over

    
    }

    update() {
        if (this.gameOverFlag) return

        let playerVelocity = new Phaser.Math.Vector2(0, 0)
        let moving = false

        // Apply movement based on keys
        if (this.cursors.left.isDown) {
            playerVelocity.x = -1
            moving = true
        } else if (this.cursors.right.isDown) {
            playerVelocity.x = 1
            moving = true
        }

        if (this.cursors.up.isDown) {
            playerVelocity.y = -1
            moving = true
        } else if (this.cursors.down.isDown) {
            playerVelocity.y = 1
            moving = true
        }

        // Normalize to prevent diagonal speed boost
        playerVelocity.normalize()
        this.player.setVelocity(playerVelocity.x * 200, playerVelocity.y * 200)

        // Play animation when moving, otherwise idle
        // if (moving) {
        //     this.player.play('fly', true)
        // } else {
        //     this.player.play('idle', true)
        // }
        
        
        //console.log(this.anims.currentFrame)
       
       
        // Move starfield
        this.starfield.tilePositionY -= 4

        // Remove off-screen asteroids
        this.asteroids.children.iterate((asteroid) => {
            if (asteroid && asteroid.y > game.config.height) {
                asteroid.destroy()
            }
        })

        if (!this.gameOverFlag) {
            this.timeAlive += this.game.loop.delta / 1000 // Convert milliseconds to seconds
            this.timeAliveText.setText(`Time: ${this.timeAlive.toFixed(1)}s`)
        }
        
    }

    // spawnAsteroid() {
    //     let x = Phaser.Math.Between(50, game.config.width - 50)
    //     let asteroid = this.asteroids.create(x, 0, 'astroid' + Phaser.Math.Between(1, 8))
    //     asteroid.setVelocityY(Phaser.Math.Between(300, 700))
    //     asteroid.setScale(Phaser.Math.FloatBetween(0.5, 1.5))
    // }
    
    spawnAsteroid() {
        let x = Phaser.Math.Between(50, game.config.width - 50)
        let asteroidType = Phaser.Math.Between(1, 8)
        let asteroid = this.asteroids.create(x, 0, `astroid${asteroidType}`)
    
        asteroid.setVelocityY(Phaser.Math.Between(100, 700))
        asteroid.setScale(Phaser.Math.FloatBetween(0.5, 1.5))
    
        // Adjust hitboxes based on asteroid type
        switch (asteroidType) {
            case 1:
                asteroid.body.setSize(60, 60)
                break
            case 2:
                asteroid.body.setSize(80, 80).setOffset(5, 5)
                break
            // case 3:
            //     asteroid.body.setSize(45, 45).setOffset(8, 8)
            //     break
            case 4:
                asteroid.body.setSize(40, 40).setOffset(20, 25)
                break
            case 5:
                asteroid.body.setSize(40, 40)
                break
            case 6:
                asteroid.body.setSize(70, 70)
                break
            case 7:
                asteroid.body.setSize(40, 70).setOffset(20, 25)
                break
            case 8:
                asteroid.body.setSize(65, 40).setOffset(25, 20)
                break
        }
    }
    



    shootAsteroid(pointer) {
        this.asteroids.children.iterate((asteroid) => {
            this.sound.play('laser')
            if (asteroid && Phaser.Geom.Intersects.RectangleToRectangle(asteroid.getBounds(), new Phaser.Geom.Rectangle(pointer.x, pointer.y, 1, 1))) {
                asteroid.destroy()
                this.randomNum = Math.floor(Math.random() * 3)
                if (this.randomNum == 0) {
                    this.sound.play('explosion0')
                }
                if (this.randomNum == 1) {
                    this.sound.play('explosion1')
                }
                if (this.randomNum == 2) {
                    this.sound.play('explosion2')
                }
                if (this.randomNum == 3) {
                    this.sound.play('explosion3')
                }
            }
        })
    }

    gameOver() {
        this.physics.pause() // Stop physics
        this.player.setTint(0xff0000) // Change player color to red
        this.gameOverFlag = true // Prevent timer from updating

        this.asteroidSpawnEvent.remove() // Stop asteroid spawning

        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', {
            fontSize: '48px',
            color: '#ff0000'
        }).setOrigin(0.5)

        // Display final time below "Game Over" text
        this.add.text(game.config.width / 2, game.config.height / 2 + 50, `Final Time: ${this.timeAlive.toFixed(1)}s`, {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5)


        let restartText = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Press R to restart or Left Click to return to menu', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5)

        this.input.keyboard.once('keydown-R', () => {
            this.scene.restart()
        })

        this.input.once('pointerdown', () => {
            this.scene.start('menuScene')
        })

    }


}
