const gameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'gameScene' });
  },

  preload() {
    // Загрузка ресурсов для игры
  },

  create() {
    // Создание игровой сцены
  },

  update() {
    // Обновление игровой сцены
  },
});

export { gameScene };
