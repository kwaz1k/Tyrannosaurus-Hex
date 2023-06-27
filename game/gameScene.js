const gameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'gameScene' });
  },

  preload() {
  },

  create() {
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('tHex', { start: 3, end: 3 }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('tHex', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('tHex', { start: 2, end: 2 }),
      frameRate: 10,
    });

    const { width, height } = this.sys.game.config;

    // Задний фон игры
    this.backgroundImage = this.add
      .tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'backgroundGame')
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setScale(3160 / width, 2140 / height);

    this.tHex = this.physics.add.sprite(1080, this.sys.game.config.height - 200, 'tHex'); // персонаж

    this.grounds = this.physics.add.staticGroup();
    for (let i = 0; i < 3; i += 1) {
      const ground = this.grounds.create(1080 + i * 1080, this.sys.game.config.height, 'ground');
      this.physics.add.collider(this.tHex, ground);
    }

    this.tHex.setGravityY(800); // гравитация по вертикали
    this.tHex.setScale(0.5); // масштабирование персонажа

    const cursors = this.input.keyboard.createCursorKeys(); // объект, содержащий клавиши управления
    const jump = () => {
      if (this.tHex.body.touching.down) {
        this.tHex.setVelocityY(-500);
        this.tHex.setVelocityX(300);
        this.isRunning = true;
        this.score += 10; // начисление 10 баллов за прыжок
        this.scoreText.setText(`Score: ${this.score}`); // обновление текста счета
        this.tHex.anims.play('jump'); // текстура прыжка
      }
    };

    cursors.up.on('down', jump); // прыжок по стрелке вверх
    cursors.space.on('down', jump); // прыжок по пробелу
    this.input.on('pointerdown', jump); // прыжок по нажатию экрана

    this.speed = 5; // скорость перемещения персонажа
    this.isRunning = false;

    this.cameras.main.startFollow(this.tHex, true, 0.5, 0.5, 0, 150);

    this.score = 0; // переменная для хранения текущего счета
    this.scoreText = this.add
      .text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff', fontFamily: 'MinecraftiaRegular' }) // текст счета
      .setScrollFactor(0);

    this.obstacles = this.physics.add.group({ immovable: true }); // Препятствие и их логика
    this.time.addEvent({
      delay: 3000, // время в миллисекундах между каждым спавном
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });
    // функция обновления, перемещающая персонажа вперед
    this.update = () => {
      if (this.isRunning) {
        this.tHex.x += this.speed;
        this.backgroundImage.tilePositionX = this.cameras.main.scrollX * 0.3; // медленное движение
      }
      if (this.tHex.body.touching.down && this.tHex.anims.currentAnim && this.tHex.anims.currentAnim.key === 'jump') {
        this.tHex.anims.play('run'); // Воспроизведение обычной анимации персонажа
      }
      if (this.tHex.x > this.grounds.getChildren()[0].x + 1080) {
        // Удалить старую землю
        this.grounds.getChildren()[0].destroy();

        // Добавить новую землю
        const newGround = this.grounds.create(this.grounds.getChildren()[this.grounds.getChildren().length - 1].x + 1080, this.sys.game.config.height, 'ground');
        this.physics.add.collider(this.tHex, newGround);
      }
    };
  },
  spawnObstacle() {
    const obstacleNumber = Phaser.Math.Between(1, 4);
    const preRandomX = this.tHex.x + Phaser.Math.Between(1000, 1500);
    const randomX = Phaser.Math.Between(preRandomX, this.tHex.x + 3000);
    this.physics.world.setBounds(0, 0, randomX + 2000, this.sys.game.config.height);
    const obstacle = this.obstacles.create(randomX, this.sys.game.config.height - 100, `obstacle${obstacleNumber}`).setScale(0.2);
    obstacle.setDepth(1);
    obstacle.setCollideWorldBounds(true);
    obstacle.setVelocityX(-this.speed);
    this.physics.add.collider(this.tHex, obstacle, () => {
      this.scene.start('gameOver');
    }, null, this);
    this.grounds.children.iterate((child) => {
      this.physics.add.collider(obstacle, child);
    });
  },
});
export { gameScene };
