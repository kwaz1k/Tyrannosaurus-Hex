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
  this.load.image('background', 'https://i.postimg.cc/W1j6zxMm/wallpaperbetter-com-3840x2160-3.jpg');
  this.load.image('logo', 'https://i.postimg.cc/8Cn1XJDy/image.png');
  this.load.image('defaultPlayButtonImage', 'https://i.postimg.cc/154HV439/11.png'); // обычное изображение
  this.load.image('defaultAutorButtonImage', 'https://i.postimg.cc/fRKLWdbT/author-Button.png');
}
// функция create - создает сцену
function create() {
  this.add.image(640, 360, 'background');
  this.add.image(640, 230, 'logo');

  const defaultPlayButtonImage = this.add.image(640, 370, 'defaultPlayButtonImage')
    .setInteractive()
    .on('pointerdown', startGame.bind(this)); // Вот здесь мы привязываем контекст
  defaultPlayButtonImage.on('pointerover', () => {
    defaultPlayButtonImage.setScale(1.05); // Увеличение размера при наведении
  });

  defaultPlayButtonImage.on('pointerout', () => {
    defaultPlayButtonImage.setScale(1); // Возврат к обычному размеру при уходе указателя
  });
  // тут пока ничего не делаем
  const creditsButton = this.add.image(640, 470, 'defaultAutorButtonImage')
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

  function credits() {
    console.log('Открытие титров...');
    // тут пропишем переключение на сцену для титров
  }
}
