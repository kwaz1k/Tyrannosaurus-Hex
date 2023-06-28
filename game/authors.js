const authors = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'authors' });
  },

  preload() {
  },

  create() {
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    const resizeBackground = () => {
      if (this.cameras.main) {
        const scaleX = this.cameras.main.width / background.width;
        const scaleY = this.cameras.main.height / background.height;
        const scale = Math.max(scaleX, scaleY);
        background.setScale(scale).setScrollFactor(0);
      }
    };
    resizeBackground();
    const text = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height,
      'Authors:\nKirillov Timofey\nKuchmenko Dmitriy\nEnyaev Boris\nVladimirova Alena\nShebanov Oleg',
      {
        fontSize: '40px',
        fontFamily: 'MinecraftiaRegular',
        align: 'center',
        color: '#ffff00',
        wordWrap: { width: 800, useAdvancedWrap: true },
      },
    );
    text.setOrigin(0.5);

    this.tweens.add({
      targets: text,
      y: -text.displayHeight,
      scaleX: 0.01,
      scaleY: 0.01,
      duration: 5000, // adjust as needed
      ease: 'Linear',
    });
  },
});

export { authors };
