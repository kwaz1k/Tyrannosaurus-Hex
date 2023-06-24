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
  this.load.image('defaultPlayButtonImage', 'https://i.postimg.cc/BbdPBjZ6/play-Button-Image.png'); // обычное изображение
  this.load.image('defaultSelectButtonImage', 'https://i.postimg.cc/ncVgpLw4/select-Button-Image.png');
  this.load.image('defaultAutorButtonImage', 'https://i.postimg.cc/PqfQ8LYy/autor-Button-Image.png');
}
// функция create - создает сцену
function create() {
  this.add.image(700, 250, 'background');

  const defaultPlayButtonImage = this.add.image(466, 360, 'defaultPlayButtonImage')
    .setInteractive()
    .on('pointerdown', startGame.bind(this)); // Вот здесь мы привязываем контекст
  defaultPlayButtonImage.on('pointerover', () => {
    defaultPlayButtonImage.setScale(1.05); // Увеличение размера при наведении
  });

  defaultPlayButtonImage.on('pointerout', () => {
    defaultPlayButtonImage.setScale(1); // Возврат к обычному размеру при уходе указателя
  });
  // тут пока ничего не делаем
  const leveChoiceButton = this.add.image(696, 360, 'defaultSelectButtonImage')
    .setInteractive()
    .on('pointerdown', () => levelChoice());
  leveChoiceButton.on('pointerover', () => {
    leveChoiceButton.setScale(1.05); // Увеличение размера при наведении
  });

  leveChoiceButton.on('pointerout', () => {
    leveChoiceButton.setScale(1); // Возврат к обычному размеру при уходе указателя
  });
  // тут пока ничего не делаем
  const creditsButton = this.add.image(926, 360, 'defaultAutorButtonImage')
    .setInteractive()
    .on('pointerdown', () => credits());
  creditsButton.on('pointerover', () => {
    creditsButton.setScale(1.05); // Увеличение размера при наведении
  });

  creditsButton.on('pointerout', () => {
    creditsButton.setScale(1); // Возврат к обычному размеру при уходе указателя
  });

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
