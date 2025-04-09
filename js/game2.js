
import { MainScene } from '/scenes/mainScene.js';

// Basic Phaser.js Game Setup

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  pixelArt: true, // <-- das ist wichtig
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // Apply gravity to pull the player down
      debug: false, // Set to true to see physics debug info
      fixedStep: true // consistent physics steps
    }
  },
  scene: [MainScene]
};

let player;
let backgroundLayer;
let player1;
const gameState ={};



function preload() {

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

function create() {
  const map = this.make.tilemap({key: 'background' })

  this.physics.world.setBounds(
    0, // x
    0, // y
    map.widthInPixels, // width of the tilemap
    map.heightInPixels // height of the tilemap
  );


  const tileset = map.addTilesetImage('Ski','img')

  gameState.layer1 = map.createLayer('Ground',tileset,0,0)
  gameState.objects = map.createLayer('Objects',tileset,0,0)
  gameState.jumps = map.createLayer('Jumps',tileset,0,0)

  // Create player sprite with physics enabled
  player = this.physics.add.sprite(200, 50, 'player');
  player.setCollideWorldBounds(true); // Prevent player from going out of bounds

  player1 = this.physics.add.sprite(100, 50, 'player1');


  // Set camera to follow the player
  this.cameras.main.roundPixels = true;

  // sounds
  gameState.jumpSFX = this.sound.add('jumpSFX');
  gameState.landSFX = this.sound.add('landSFX');


  // Collider setup for Objects
  gameState.objects.setCollisionByProperty( {collides : true })
  player.setCollideWorldBounds(true);

  // Debug Collider
  const debugCollider = true;
  if (debugCollider){
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    gameState.objects.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    // Spielerwerte für smoothes Handling
    player.setDamping(true);
    player.setDragX(500); // Trägheit – je höher, desto schneller wird gestoppt
    player.setMaxVelocity(150); // Max Speed
    player.body.setSize(32, 48); // Match collision box to sprite size


  }


  // Create Cursor Key
  gameState.cursors = this.input.keyboard.createCursorKeys();

}

function update() {

  // Add this at the start:
  console.log('FPS:', this.game.loop.actualFps.toFixed(1));


  player.setVelocityY(50);

  // player.x = Math.round(player.x);
  player.y = Math.round(player.y);

  // Kamera folgt nur der Y-Position des Spielers
  this.cameras.main.scrollY = player.y - this.cameras.main.height / 2;
  this.cameras.main.scrollX = 0;



  // Controls

  // Weiche Links-/Rechts-Steuerung
  if (gameState.cursors.left.isDown) {
    player.setAccelerationX(-200);
  } else if (gameState.cursors.right.isDown) {
    player.setAccelerationX(200);
  } else {
    player.setAccelerationX(0); // Keine Eingabe = keine zusätzliche Beschleunigung
  }

  }

const game = new Phaser.Game(config);
