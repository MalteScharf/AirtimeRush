export function preload() {

  // Tilemap
  this.load.image('img', 'resources/TileMap/tilemap.png')
  this.load.tilemapTiledJSON('background','resources/TileMap/Skigame.json')
  // Load player sprite
  this.load.image('player', 'resources/img/player4848.png'); // Replace with your image path
  this.load.image('player1', 'resources/img/player4848.png'); // Replace with your image path

  // Audio
  this.load.audio('jumpSFX','resources/sound/jump01.wav');
  this.load.audio('landSFX','resources/sound/landing02.mp3');

}
