class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameOver' });
  }

  create() {
    const { width, height } = this.sys.game.config;
    const background = this.add.image(0, 0, 'gameOverPicture').setOrigin(0, 0);

    const resizeBackground = () => {
      const scaleX = this.cameras.main.width / background.width;
      const scaleY = this.cameras.main.height / background.height;
      background.setScale(scaleX, scaleY).setScrollFactor(0);
    };

    resizeBackground();

    const playAgainButton = this.add.image(width / 2, (height / 2) + 100, 'playAgainButton')
      .setInteractive()
      .on('pointerdown', this.playAgain.bind(this))
      .setScale(0.4);

    playAgainButton.on('pointerover', () => {
      playAgainButton.setScale(0.45);
    });

    playAgainButton.on('pointerout', () => {
      playAgainButton.setScale(0.4);
    });

    const mainMenuButton = this.add.image(width / 2, (height / 2) + 230, 'mainMenuButton')
      .setInteractive()
      .on('pointerdown', this.mainMenu.bind(this))
      .setScale(0.4);

    mainMenuButton.on('pointerover', () => {
      mainMenuButton.setScale(0.45);
    });

    mainMenuButton.on('pointerout', () => {
      mainMenuButton.setScale(0.4);
    });
  }

  mainMenu() {
    this.scene.start('mainMenu');
  }

  playAgain() {
    this.scene.start('gameScene');
  }
}

export { GameOverScene };
