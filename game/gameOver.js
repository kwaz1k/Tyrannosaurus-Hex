const gameOver = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'gameOver' });
  },

  preload() {
    this.load.image('playAgainButton', 'https://i.postimg.cc/pXnr4zVQ/4.png');
    this.load.image('gameOverPicture', 'https://i.postimg.cc/13rq7wMC/image.png');
    this.load.audio('gameOverSound', 'https://archive.org/download/NIntendo-sounds/Mario%201%20-%20Game%20Over.ogg');
  },

  create() {
    const sound = this.sound.add('gameOverSound');
    sound.play();
    const { width } = this.sys.game.config;
    const { height } = this.sys.game.config;
    const background = this.add.image(0, 0, 'gameOverPicture').setOrigin(0, 0);
    const resizeBackground = () => {
      const scaleX = this.cameras.main.width / background.width;
      const scaleY = this.cameras.main.height / background.height;
      background.setScale(scaleX, scaleY).setScrollFactor(0);
    };
    resizeBackground();

    const playAgainButton = this.add.image(width / 2, (height / 2) + 100, 'playAgainButton')
      .setInteractive()
      .on('pointerdown', playAgain.bind(this)) // Вот здесь мы привязываем контекст
      .setScale(0.4);

    playAgainButton.on('pointerover', () => {
      playAgainButton.setScale(0.45); // Увеличение размера при наведении
    });

    playAgainButton.on('pointerout', () => {
      playAgainButton.setScale(0.4); // Возврат к обычному размеру при уходе указателя
    });

    function playAgain() {
      this.scene.start('gameScene');
    }
  },
});

export { gameOver };
