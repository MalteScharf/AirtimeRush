export function preload() {

  // Tilemap
  this.load.spritesheet('img', 'resources/TileMap/tilemap.png', {
    frameWidth: 16,
    frameHeight: 16
  });

  this.load.tilemapTiledJSON('background','resources/TileMap/Skigame.json')

  // Load player sprite
  this.load.image('player', 'resources/img/player4848.png'); // defalt
  this.load.image('crash', 'resources/img/crash4848.png'); //crash
  this.load.image('leftTurn', 'resources/img/leftTurn4848.png'); //left Turn
  this.load.image('rightTurn', 'resources/img/rightTurn4848.png'); //right Turn
  this.load.image('playerJump', 'resources/img/jump4848.png'); // jump



  // Audio
  this.load.audio('jumpSFX','resources/sound/jump01.wav');
  this.load.audio('landSFX','resources/sound/landing02.mp3');
  this.load.audio('chairlift','resources/sound/chairlift.mp3');


}
