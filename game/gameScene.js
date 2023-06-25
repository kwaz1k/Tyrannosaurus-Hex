const gameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'gameScene' });
  },

  preload() { // загрузка ассетов игры
    this.load.image('backgroundGame', 'https://i.postimg.cc/ncCJCFZ6/wallpaperbetter-com-3840x2160-1.jpg');
    this.load.spritesheet('tHex', 'https://i.postimg.cc/7Pn95fxc/1-bu.png', {
      frameWidth: 243,
      frameHeight: 370,
    });
    this.load.image('ground', 'https://i.postimg.cc/05FFQpQq/2.png');
  },

  create() {
    const backgroundImage = this.add.image(640, 360, 'backgroundGame'); // фоновое изображение
    const tHex = this.physics.add.sprite(100, 100, 'tHex'); // персонаж
    tHex.setGravityY(800); // гравитация по вертикали
    tHex.setScale(0.5); // масштабирование персонажа
    const ground = this.physics.add.staticImage(900, 800, 'ground'); // земля
    ground.setScale(2).refreshBody();
    this.physics.add.collider(tHex, ground);
    const cursors = this.input.keyboard.createCursorKeys(); // объект, содержащий клавиши управления
    const jump = () => {
      if (tHex.body.touching.down) {
        tHex.setVelocityY(-800);
        this.isRunning = true;
        this.score += 10; // начисление 10 баллов за прыжок
        this.scoreText.setText('Score: ' + this.score); // обновление текста счета
      }
    };
    cursors.up.on('down', jump); // прыжок по стрелке вверх
    cursors.space.on('down', jump); // прыжок по пробелу
    this.input.on('pointerdown', jump); // прыжок по нажатию экрана
    this.speed = 5; // скорость перемещения персонажа
    this.isRunning = false;
    this.cameras.main.startFollow(tHex);
    this.score = 0; // переменная для хранения текущего счета
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' }); // текст счета

    // функция обновления, перемещающая персонажа вперед
    this.update = () => {
      if (this.isRunning) {
        tHex.x += this.speed;
        if (ground.x + ground.width <= 0) {
          ground.x += ground.width * 2;
        }
      }
    };
  },

  update() {
    // обновление игровой сцены
  },
});

export { gameScene };
