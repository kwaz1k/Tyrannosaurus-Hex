const gameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'gameScene' });
  },

  preload() { // опять же, в прилоаде ассеты для игры
    this.load.image('background', 'https://i.postimg.cc/xnf9kMsf/background2.jpg?dl=1');
    this.load.spritesheet('tHex', 'https://i.postimg.cc/7Pn95fxc/1-bu.png', {
      frameWidth: 243,
      frameHeight: 370,
    });
    this.load.image('ground', 'https://upload.wikimedia.org/wikipedia/commons/2/22/Chromium_T-Rex-offline-trex.png');
  },

  create() {
  // Add a background image
    const backgroundImage = this.add.image(700, 250, 'background'); // тут надо придумать как сделать обои и землю бесконечными
    const tHex = this.physics.add.sprite(100, 100, 'tHex'); // непосредственно чубрик наш.
    tHex.setGravityY(800); // гравитация по вертикали для братца нашего
    tHex.setScale(0.5); // масштабируем чубрика(он слишком здоровый в оригинале)
    const ground = this.physics.add.staticImage(400, 720, 'ground'); // тут надо придумать как сделать обои и землю бесконечными
    ground.setScale(2).refreshBody();
    this.physics.add.collider(tHex, ground); // тут мы заставляем чубрика падать именно на землю.
  },

  update() {
    // Обновление игровой сцены
  },
});

export { gameScene };
