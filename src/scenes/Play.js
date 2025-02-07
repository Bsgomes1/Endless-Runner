// class Play extends Phaser.Scene {
//     constructor() {
//         super("playScene")
//     }
//     create() {
//         // Display starfield
//         this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0)
    
//         // Green rectangle (UI border)
//         this.add.rectangle(0, 0, game.config.width, borderUISize, 0x00FF00).setOrigin(0, 0)
        
//         // Fix: Use game.config.width & game.config.height instead of undefined width & height
//         this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'character', 1).setScale(2)
//         this.player.body.setCollideWorldBounds(true)
//         this.player.body.setSize(32, 32).setOffset(8, 16)

//         // Keyboard input
//         this.cursors = this.input.keyboard.addKeys({
//             up: Phaser.Input.Keyboard.KeyCodes.W,
//             down: Phaser.Input.Keyboard.KeyCodes.S,
//             left: Phaser.Input.Keyboard.KeyCodes.A,
//             right: Phaser.Input.Keyboard.KeyCodes.D
//         })

//         this.asteroids = this.physics.add.group()
//         this.time.addEvent({ delay: 1000, callback: this.spawnAsteroid, callbackScope: this, loop: true })


//     }

//     update() {
//         // move starfield
//         this.starfield.tilePositionY -= 4

//         // Player movement
//         if (this.cursors.left.isDown) {
//             this.player.x -= 5
//         } else if (this.cursors.right.isDown) {
//             this.player.x += 5
//         }

//         if (this.cursors.up.isDown) {
//             this.player.y -= 5
//         } else if (this.cursors.down.isDown) {
//             this.player.y += 5
//         }

//         this.asteroids.children.iterate((asteroid) => {
//             asteroid.update()
//         })
        

//     }

//     spawnAsteroid() {
//         let x = Phaser.Math.Between(50, game.config.width - 50)
//         let textureKey = 'astroid' + Phaser.Math.Between(1, 8) // Random texture
    
//         // Create the asteroid
//         let asteroid = new Asteroid(this, x, 0, textureKey)
    
//         // Enable physics after creation (if not already done)
//         this.physics.world.enable(asteroid)
    
//         // Apply velocity to the asteroid after physics is enabled
//         asteroid.setInitialVelocity()
    
//         // Add asteroid to the physics group
//         this.asteroids.add(asteroid)
//     }
    
// }


// class Play extends Phaser.Scene {
//     constructor() {
//         super("playScene")
//     }
//     create() {
//         // Display starfield
//         this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0)
    
//         // Green rectangle (UI border)
//         //this.add.rectangle(0, 0, game.config.width, borderUISize, 0x00FF00).setOrigin(0, 0)
        
//         // Fix: Use game.config.width & game.config.height instead of undefined width & height
//         this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'character', 1)
//         .setOrigin(0.5, 0.5)  // Ensure sprite is centered properly
    
//         this.player.body.setSize(100, 100).setOffset(0, 0)  // Adjust hitbox to match sprite
//         this.player.body.setCollideWorldBounds(true)
        


        


//         // Keyboard input
//         this.cursors = this.input.keyboard.addKeys({
//             up: Phaser.Input.Keyboard.KeyCodes.W,
//             down: Phaser.Input.Keyboard.KeyCodes.S,
//             left: Phaser.Input.Keyboard.KeyCodes.A,
//             right: Phaser.Input.Keyboard.KeyCodes.D
//         })

//         this.asteroids = this.physics.add.group()
//         this.spawnAsteroid()
//         this.time.addEvent({ delay: 1000, callback: this.spawnAsteroid, callbackScope: this, loop: true })
        
//         this.input.on('pointerdown', this.shootAsteroid, this)

//     }

//     update() {
//         let moving = false

//         // move starfield
//         this.starfield.tilePositionY -= 4;

//         this.player.play('player_anim', true);
    
//         // Player movement
//         if (this.cursors.left.isDown) {
//             this.player.x -= 5
//             moving = true
//         } else if (this.cursors.right.isDown) {
//             this.player.x += 5
//             moving = true
//         }
    
//         if (this.cursors.up.isDown) {
//             this.player.y -= 5;
//         } else if (this.cursors.down.isDown) {
//             this.player.y += 5;
//         }


//         // Iterate through asteroids
//         this.asteroids.children.iterate((asteroid) => {
//             // Ensure asteroid exists
//             if (asteroid) {
//                 if (asteroid.y > game.config.height) {
//                     asteroid.destroy();
//                 }
//             }
//         });
//     }
    

//     spawnAsteroid() {
//         let x = Phaser.Math.Between(50, game.config.width - 50)
//         let asteroid = this.asteroids.create(x, 0, 'astroid' + Phaser.Math.Between(1, 8))
//         asteroid.setVelocityY(Phaser.Math.Between(150, 300))
//         asteroid.setScale(Phaser.Math.FloatBetween(0.5, 1.5))
//     }
    
//     shootAsteroid(pointer) {
//         this.asteroids.children.iterate((asteroid) => {
//             // Check if asteroid is valid and exists
//             if (asteroid && Phaser.Geom.Intersects.RectangleToRectangle(asteroid.getBounds(), new Phaser.Geom.Rectangle(pointer.x, pointer.y, 1, 1))) {
//                 asteroid.destroy()
//             }
//         })
//     }
    
    
// }


class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // Display starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // Create player sprite
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'character', 1).setOrigin(0.5, 0.5).setScale(0.05);
    
        this.player.body.setSize(800, 800).setOffset(0, 0); // Adjust hitbox
        this.player.body.setCollideWorldBounds(true); // Prevent player from moving off-screen

        // idle animation (not used currently)
        this.anims.create({
            key: 'idle',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        });

        // flying animation (fire out of bottom of ship)
        this.anims.create({
            key: 'fly',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', { 
                start: 2, 
                end: 0   
            })
        });
        

        // Keyboard input
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.asteroids = this.physics.add.group();
        this.spawnAsteroid();
        this.time.addEvent({ delay: 1000, callback: this.spawnAsteroid, callbackScope: this, loop: true });
        
        this.input.on('pointerdown', this.shootAsteroid, this);
        //console.log(this.anims)
        this.player.play('fly')
        //console.log(this.anims.getTotalFrames)
    }

    update() {
        let playerVelocity = new Phaser.Math.Vector2(0, 0);
        let moving = false;

        // Apply movement based on keys
        if (this.cursors.left.isDown) {
            playerVelocity.x = -1;
            moving = true;
        } else if (this.cursors.right.isDown) {
            playerVelocity.x = 1;
            moving = true;
        }

        if (this.cursors.up.isDown) {
            playerVelocity.y = -1;
            moving = true;
        } else if (this.cursors.down.isDown) {
            playerVelocity.y = 1;
            moving = true;
        }

        // Normalize to prevent diagonal speed boost
        playerVelocity.normalize();
        this.player.setVelocity(playerVelocity.x * 200, playerVelocity.y * 200);

        // Play animation when moving, otherwise idle
        // if (moving) {
        //     this.player.play('fly', true);
        // } else {
        //     this.player.play('idle', true);
        // }
        
        
        //console.log(this.anims.currentFrame)
       
       
        // Move starfield
        this.starfield.tilePositionY -= 4;

        // Remove off-screen asteroids
        this.asteroids.children.iterate((asteroid) => {
            if (asteroid && asteroid.y > game.config.height) {
                asteroid.destroy();
            }
        });
    }

    spawnAsteroid() {
        let x = Phaser.Math.Between(50, game.config.width - 50);
        let asteroid = this.asteroids.create(x, 0, 'astroid' + Phaser.Math.Between(1, 8));
        asteroid.setVelocityY(Phaser.Math.Between(150, 300));
        asteroid.setScale(Phaser.Math.FloatBetween(0.5, 1.5));
    }
    
    shootAsteroid(pointer) {
        this.asteroids.children.iterate((asteroid) => {
            if (asteroid && Phaser.Geom.Intersects.RectangleToRectangle(asteroid.getBounds(), new Phaser.Geom.Rectangle(pointer.x, pointer.y, 1, 1))) {
                asteroid.destroy();
            }
        });
    }
}
