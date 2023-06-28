class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' });
    this.speed = 5;
    this.score = 0;
  }

  create() {
    this.createAnimations();
    this.createBackground();
    this.createCharacter();
    this.createGround();
    this.createControlKeys();
    this.createCamera();
    this.createScoreText();
    this.createObstacles();
    this.resetScore();
  }

  update() {
    this.moveCharacter();
  }

  createAnimations() {
    const animations = [
      { key: 'jump', frames: { start: 3, end: 3 } },
      { key: 'run', frames: { start: 0, end: 1 }, repeat: -1 },
      { key: 'idle', frames: { start: 2, end: 2 } },
    ];
    animations.forEach((anim) => this.anims.create({
      key: anim.key,
      frames: this.anims.generateFrameNumbers('tHex', anim.frames),
      frameRate: 10,
      repeat: anim.repeat,
    }));
  }

  createBackground() {
    const { width, height } = this.sys.game.config;
    this.backgroundImage = this.add
      .tileSprite(0, 0, width, height, 'backgroundGame')
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setScale(3160 / width, 2140 / height);
  }

  resetScore() {
    this.score = 0;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  createCharacter() {
    const { height } = this.sys.game.config;
    this.tHex = this.physics.add.sprite(1080, height - 200, 'tHex');
    this.tHex.setGravityY(800);
    this.tHex.setScale(0.5);
  }

  createGround() {
    const { height } = this.sys.game.config;
    this.grounds = this.physics.add.staticGroup();
    for (let i = 0; i < 3; i += 1) {
      const ground = this.grounds.create(1080 + i * 1080, height, 'ground');
      this.physics.add.collider(this.tHex, ground);
    }
  }

  createControlKeys() {
    const jump = () => {
      if (this.tHex.body.touching.down) {
        this.tHex.setVelocityY(-500);
        this.tHex.setVelocityX(300);
        this.isRunning = true;
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        this.tHex.anims.play('jump');
      }
    };

    const cursors = this.input.keyboard.createCursorKeys();
    cursors.up.on('down', jump);
    cursors.space.on('down', jump);
    this.input.on('pointerdown', jump);
  }

  createCamera() {
    this.cameras.main.startFollow(this.tHex, true, 0.5, 0.5, 0, 150);
  }

  createScoreText() {
    this.scoreText = this.add
      .text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff', fontFamily: 'MinecraftiaRegular' })
      .setScrollFactor(0);
  }

  createObstacles() {
    this.obstacles = this.physics.add.group({ immovable: true });
    this.time.addEvent({
      delay: 3000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });
  }

  moveCharacter() {
    if (this.isRunning) {
      this.tHex.x += this.speed;
      this.backgroundImage.tilePositionX = this.cameras.main.scrollX * 0.3;
    }

    if (this.tHex.body.touching.down && this.tHex.anims.currentAnim && this.tHex.anims.currentAnim.key === 'jump') {
      this.tHex.anims.play('run');
    }

    if (this.tHex.x > this.grounds.getChildren()[0].x + 1080) {
      this.grounds.getChildren()[0].destroy();
      const newGround = this.grounds.create(
        this.grounds.getChildren()[this.grounds.getChildren().length - 1].x + 1080,
        this.sys.game.config.height,
        'ground',
      );
      this.physics.add.collider(this.tHex, newGround);
    }
  }

  spawnObstacle() {
    const obstacleNumber = Phaser.Math.Between(1, 4);
    const preRandomX = this.tHex.x + Phaser.Math.Between(1000, 1500);
    const randomX = Phaser.Math.Between(preRandomX, this.tHex.x + 3000);
    this.physics.world.setBounds(0, 0, randomX + 2000, this.sys.game.config.height);

    const obstacle = this.obstacles.create(randomX, this.sys.game.config.height - 100, `obstacle${obstacleNumber}`).setScale(0.3);
    obstacle.setDepth(1);
    obstacle.setCollideWorldBounds(true);
    obstacle.setVelocityX(-this.speed);

    this.physics.add.collider(this.tHex, obstacle, () => {
      this.scene.start('gameOver');
    }, null, this);

    this.grounds.children.iterate((child) => {
      this.physics.add.collider(obstacle, child);
    });
  }
}

export { GameScene };
