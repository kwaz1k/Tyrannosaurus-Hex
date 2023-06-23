import { gameScene } from './game/gameScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [{ preload, create }, gameScene], // Передаем в конструктор массив сцен
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
// функция preload отвечает за ассеты которые игра должна подтянуть для себя)
function preload() {
  this.load.image('background', 'https://i.postimg.cc/xnf9kMsf/background2.jpg?dl=1');
}
// функция create - создает сцену
function create() {
  this.add.image(700, 250, 'background');

  const playButton = this.add.text(460, 300, 'Новая игра', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', startGame.bind(this)); // Вот здесь мы привязываем контекст
  // тут пока ничего не делаем
  const leveChoiceButton = this.add.text(660, 300, 'Выбор уровня', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => levelChoice());
  // тут пока ничего не делаем
  const creditsButton = this.add.text(890, 300, 'Авторы', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => credits());

  function startGame() {
    console.log('Игра начинается...');
    // Здесь вы можете переключиться на другую сцену, которая запускает игру
    this.scene.start('gameScene');
  }

  function levelChoice() {
    console.log('Открытие выбора уровня...');
    // тут пропишем переключение на сцену для уровней(если все-таки будем их делать)
  }

  function credits() {
    console.log('Открытие титров...');
    // тут пропишем переключение на сцену для титров
  }
}