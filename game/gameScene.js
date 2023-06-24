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
    const backgroundImage = this.add.image(640, 360, 'backgroundGame'); // тут надо придумать как сделать обои и землю бесконечными
    const tHex = this.physics.add.sprite(100, 100, 'tHex'); // непосредственно чубрик наш.
    tHex.setGravityY(800); // гравитация по вертикали для братца нашего
    tHex.setScale(0.5); // масштабируем чубрика(он слишком здоровый в оригинале)
    const ground = this.physics.add.staticImage(900, 800, 'ground'); // тут надо придумать как сделать обои и землю бесконечными
    ground.setScale(2).refreshBody();
    this.physics.add.collider(tHex, ground);
    const cursors = this.input.keyboard.createCursorKeys(); // объект содержащий стрелки и пробел
    const jump = () => {
      if (tHex.body.touching.down) {
        tHex.setVelocityY(-800);
        this.isRunning = true;
      }
    };
    cursors.up.on('down', jump); // прыжок на стрелку вверх
    cursors.space.on('down', jump); // прыжок на пробел
    this.input.on('pointerdown', jump); // прыжок на нажатие экрана
    this.speed = 5; // Adjust the running speed as needed
    this.isRunning = false;
    this.cameras.main.startFollow(tHex);
    // Update function to move the character forward
    this.update = function () {
      if (this.isRunning) {
        tHex.x += this.speed;
        if (ground.x + ground.width <= 0) {
          ground.x += ground.width * 2;
        }
      }
    };
  },

  update() {
    // Обновление игровой сцены
  },
});

export { gameScene };// тут мы заставляем чубрика падать именно на землю.
