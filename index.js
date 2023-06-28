import { GameScene } from './game/gameScene.js';
import { GameOverScene } from './game/gameOver.js';
import { AuthorsScene } from './game/authors.js';

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'mainMenu' });
  }

  preload() {
    this.load.image('background', 'https://i.postimg.cc/W1j6zxMm/wallpaperbetter-com-3840x2160-3.jpg');
    this.load.image('logo', 'https://i.postimg.cc/8Cn1XJDy/image.png');
    this.load.image('defaultPlayButtonImage', 'https://i.postimg.cc/154HV439/11.png');
    this.load.image('defaultAutorButtonImage', 'https://i.postimg.cc/fRKLWdbT/author-Button.png');
    this.load.image('playAgainButton', 'https://i.postimg.cc/pXnr4zVQ/4.png');
    this.load.image('gameOverPicture', 'https://i.postimg.cc/13rq7wMC/image.png');
    this.load.image('backgroundGame', 'https://i.postimg.cc/ncCJCFZ6/wallpaperbetter-com-3840x2160-1.jpg');
    this.load.spritesheet('tHex', 'https://i.postimg.cc/qppVhH9z/sritttttttes.png?dl=1', {
      frameWidth: 243,
      frameHeight: 370,
    });
    this.load.image('ground', 'https://i.postimg.cc/74RDL6w6/1.png?dl=1');
    this.load.image('obstacle1', 'https://i.postimg.cc/ZRfh2H7N/car.png');
    this.load.image('obstacle2', 'https://i.postimg.cc/zXH12nnL/container.png');
    this.load.image('obstacle3', 'https://i.postimg.cc/Zn9XgSyk/mahina.png');
    this.load.image('obstacle4', 'https://i.postimg.cc/X7krqSzc/trash-ready.png');
    this.load.image('mainMenuButton', 'https://i.postimg.cc/8s80RcTg/5-2-1.png');
  }

  create() {
    const { width, height } = this.sys.game.config;

    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.logo = this.add.image(width / 2, height / 2 - 130, 'logo');

    this.scale.on('resize', this.resizeImages.bind(this));
    this.resizeImages();

    this.createButton('defaultPlayButtonImage', (height / 2) + 50, 'gameScene');
    this.createButton('defaultAutorButtonImage', height / 2 + 160, 'authors');
  }

  resizeImages() {
    this.resizeImage(this.background);
    this.resizeLogo(this.logo, this.sys.game.config.width);
  }

  resizeImage(image) {
    if (this.cameras.main) {
      const scaleX = this.cameras.main.width / image.width;
      const scaleY = this.cameras.main.height / image.height;
      const scale = Math.max(scaleX, scaleY);
      image.setScale(scale).setScrollFactor(0);
    }
  }

  resizeLogo(logo, width) {
    const scale = width / 1300;
    logo.setScale(scale);
  }

  createButton(buttonImage, buttonHeight, targetScene) {
    const { width, height } = this.sys.game.config;
    const button = this.add.image(width / 2, buttonHeight, buttonImage)
      .setInteractive()
      .on('pointerdown', () => this.startScene(targetScene));

    button.on('pointerover', () => {
      button.setScale(1.05); // Increase size on hover
    });

    button.on('pointerout', () => {
      button.setScale(1); // Reset to normal size on mouse out
    });
  }

  startScene(targetScene) {
    console.log(`Starting scene: ${targetScene}...`);
    this.scene.start(targetScene);
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  scene: [MainMenuScene, GameOverScene, GameScene, AuthorsScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
