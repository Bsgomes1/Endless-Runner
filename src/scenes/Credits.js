class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Credits', {
            fontFamily: 'Ink Free',
            fontSize: '50px',
            color: '#FFFFFF'
        }).setOrigin(0.5)

        let creditsText = `
        Game Developer: Ben Gomes
        Art & Assets: Open Source / Custom
        Sound Effects: kenny.nl
        Game Engine: Phaser 3
        `

        this.add.text(game.config.width / 2, game.config.height / 2, creditsText, {
            fontFamily: 'Ink Free',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5)

        this.add.text(game.config.width / 2, game.config.height / 2 + 150, 'Spacebar to return to menu', {
            fontFamily: 'Ink Free',
            fontSize: '28px',
            color: '#FF0000'
        }).setOrigin(0.5)

        // Left-click returns to the menu
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('menuScene')
        })
    }
}
