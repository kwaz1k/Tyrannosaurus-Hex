import background from './resources/images/background2.jpg';
import { gameScene } from './game/gameScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [{ preload, create }, gameScene],
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('background', background);
}

function create() {
  this.add.image(700, 250, 'background');

  const playButton = this.add.text(460, 300, 'Новая игра', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', startGame.bind(this)); // Вот здесь мы привязываем контекст

  const leveChoiceButton = this.add.text(660, 300, 'Выбор уровня', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => levelChoice());

  const creditsButton = this.add.text(890, 300, 'Авторы', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => credits());

  function startGame() {
    console.log('Игра начинается...');
    // Здесь вы можете переключиться на другую сцену, которая запускает игру
    this.scene.start('gameScene');
  }

  function levelChoice() {
    console.log('Открытие настроек...');
    // Здесь вы можете переключиться на другую сцену с настройками
  }

  function credits() {
    console.log('Открытие настроек...');
    // Здесь вы можете переключиться на другую сцену с настройками
  }
}
