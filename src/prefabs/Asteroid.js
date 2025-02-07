class Asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        // Add asteroid to scene and apply physics
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // Set asteroid's physics properties
        this.body.setImmovable(false)  // Allow velocity to affect the body
        this.body.setAllowGravity(false) // Prevent gravity from affecting the asteroid
        this.setScale(Phaser.Math.FloatBetween(0.5, 1.5)) // Randomize size
    }

    // Apply initial random velocity when asteroid is created
    setInitialVelocity() {
        // Apply random vertical velocity (between 150 and 300)
        this.body.setVelocityY(Phaser.Math.Between(150, 300))
    }

    update() {
        // Destroy asteroid when it moves off-screen
        if (this.y > game.config.height) {
            this.destroy()
        }
    }
}
