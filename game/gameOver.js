class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameOver' });
  }

  preload() {
    this.load.image('playAgainButton', 'https://i.postimg.cc/pXnr4zVQ/4.png');
    this.load.image('gameOverPicture', 'https://i.postimg.cc/13rq7wMC/image.png');
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
  }

  playAgain() {
    this.scene.start('gameScene');
  }
}

export { GameOverScene };
