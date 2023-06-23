const gameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'gameScene' });
  },

  preload() { // опять же, в прилоаде ассеты для игры
    this.load.image('backgroundGame', 'https://i.postimg.cc/ncCJCFZ6/wallpaperbetter-com-3840x2160-1.jpg');
    this.load.spritesheet('tHex', 'https://i.postimg.cc/7Pn95fxc/1-bu.png', {
      frameWidth: 243,
      frameHeight: 370,
    });
    this.load.image('ground', 'https://i.postimg.cc/05FFQpQq/2.png');
  },

  create() {
  // Add a background image
    const backgroundImage = this.add.image( 640, 360, 'backgroundGame'); // тут надо придумать как сделать обои и землю бесконечными
    const tHex = this.physics.add.sprite(100, 100, 'tHex'); // непосредственно чубрик наш.
    tHex.setGravityY(800); // гравитация по вертикали для братца нашего
    tHex.setScale(0.5); // масштабируем чубрика(он слишком здоровый в оригинале)
    const ground = this.physics.add.staticImage(900, 800, 'ground'); // тут надо придумать как сделать обои и землю бесконечными
    ground.setScale(2).refreshBody();
    this.physics.add.collider(tHex, ground); // тут мы заставляем чубрика падать именно на землю.
  },

  update() {
    // Обновление игровой сцены
  },
});

export { gameScene };