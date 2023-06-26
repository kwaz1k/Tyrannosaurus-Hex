const gameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'gameScene' });
  },

  preload() {
    // Загрузка ассетов игры
    this.load.image('backgroundGame', 'https://i.postimg.cc/ncCJCFZ6/wallpaperbetter-com-3840x2160-1.jpg');
    this.load.spritesheet('tHex', 'https://i.postimg.cc/SsRRc797/spritesheet.png', {
      frameWidth: 243,
      frameHeight: 370,
    });
    this.load.image('ground', 'https://i.postimg.cc/8c9BWznw/ground.png');
    this.load.image('obstacle1', 'https://i.postimg.cc/ZRfh2H7N/car.png');
    this.load.image('obstacle2', 'https://i.postimg.cc/zXH12nnL/container.png');
    this.load.image('obstacle3', 'https://i.postimg.cc/Zn9XgSyk/mahina.png');
    this.load.image('obstacle4', 'https://i.postimg.cc/X7krqSzc/trash-ready.png');
  },

  create() {
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('tHex', { start: 1, end: 1 }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('tHex', { start: 0, end: 0 }),
      frameRate: 10,
    });

    const { width, height } = this.sys.game.config;

    // Задний фон игры
    this.backgroundImage = this.add
      .tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'backgroundGame')
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setScale(1920 / width, 1200 / height);

    const tHex = this.physics.add.sprite(1080, this.sys.game.config.height - 200, 'tHex'); // персонаж

    this.grounds = this.physics.add.staticGroup();
    for (let i = 0; i < 3; i += 1) {
      const ground = this.grounds.create(1080 + i * 1080, this.sys.game.config.height, 'ground');
      this.physics.add.collider(tHex, ground);
    }

    tHex.setGravityY(800); // гравитация по вертикали
    tHex.setScale(0.5); // масштабирование персонажа

    const cursors = this.input.keyboard.createCursorKeys(); // объект, содержащий клавиши управления
    const jump = () => {
      if (tHex.body.touching.down) {
        tHex.setVelocityY(-500);
        this.isRunning = true;
        this.score += 10; // начисление 10 баллов за прыжок
        this.scoreText.setText(`Score: ${this.score}`); // обновление текста счета
        tHex.anims.play('jump'); // текстура прыжка
      }
    };

    cursors.up.on('down', jump); // прыжок по стрелке вверх
    cursors.space.on('down', jump); // прыжок по пробелу
    this.input.on('pointerdown', jump); // прыжок по нажатию экрана

    this.speed = 5; // скорость перемещения персонажа
    this.isRunning = false;

    this.cameras.main.startFollow(tHex, true, 0.5, 0.5, 0, 150);

    this.score = 0; // переменная для хранения текущего счета
    this.scoreText = this.add
      .text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff', fontFamily: 'MinecraftiaRegular' }) // текст счета
      .setScrollFactor(0);

    this.obstacles = this.physics.add.group({ immovable: true }); // Препятствие и их логика

    for (let i = 0; i < 4; i++) {
      const obstacleNumber = Phaser.Math.Between(1, 4);
      const obstacleX = Phaser.Math.Between(2000, 4000);
      const obstacle = this.obstacles.create(obstacleX, this.sys.game.config.height - 300, `obstacle${obstacleNumber}`).setScale(0.5);
      obstacle.setCollideWorldBounds(true);
      obstacle.setVelocityX(-this.speed);
      this.physics.add.collider(tHex, obstacle, () => {
        this.scene.restart();
      }, null, this);
    }

    // функция обновления, перемещающая персонажа вперед
    this.update = () => {
      if (this.isRunning) {
        tHex.x += this.speed;
        this.backgroundImage.tilePositionX = this.cameras.main.scrollX * 0.3; // медленное движение
      }
      if (tHex.body.touching.down && tHex.anims.currentAnim && tHex.anims.currentAnim.key === 'jump') {
        tHex.anims.play('idle'); // Воспроизведение обычной анимации персонажа
      }
      if (tHex.x > this.grounds.getChildren()[0].x + 1080) {
        // Удалить старую землю
        this.grounds.getChildren()[0].destroy();

        // Добавить новую землю
        const newGround = this.grounds.create(this.grounds.getChildren()[this.grounds.getChildren().length - 1].x + 1080, this.sys.game.config.height, 'ground');
        this.physics.add.collider(tHex, newGround);

        //  новые препятствия
        for (let i = 0; i < 4; i++) {
          const obstacleNumber = Phaser.Math.Between(1, 4);
          const obstacleX = Phaser.Math.Between(this.grounds.getChildren()[this.grounds.getChildren().length - 1].x + 2000, this.grounds.getChildren()[this.grounds.getChildren().length - 1].x + 4000);
          const obstacle = this.obstacles.create(obstacleX, this.sys.game.config.height - 300, `obstacle${obstacleNumber}`).setScale(0.5);
          obstacle.setCollideWorldBounds(true);
          obstacle.setVelocityX(-this.speed);
          this.physics.add.collider(tHex, obstacle, () => {
            this.scene.restart();
          }, null, this);
        }
      }
    };
  },
});

export { gameScene };
