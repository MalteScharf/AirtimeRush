// Imports
import { playerJump } from './js/playerActions.js';


const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render:{
    antialias: false,
    roundPixels: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y:0},
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  /*scale: {
    zoom:2
  }*/
};
const gameState ={};
let player = {};
let jump = false;


function preload() {
  // Images

  this.load.image('img', 'resources/TileMap/tilemap.png')
  this.load.tilemapTiledJSON('background','resources/TileMap/Skigame.json')
  this.load.image('player', 'resources/img/player4848.png');
  this.load.once('complete', ()=>{
    this.textures.get('player').setFilter(Phaser.Textures.FilterMode.NEAREST);
  });
  this.load.image('playerJump', 'resources/img/jump4848.png')

  // Audio
  this.load.audio('jumpSFX','resources/sound/jump01.wav');
  this.load.audio('landSFX','resources/sound/landing02.mp3');

}

function create() {


  // sounds
  gameState.jumpSFX = this.sound.add('jumpSFX');
  gameState.landSFX = this.sound.add('landSFX');



  // Setup Tileset (Background)
  const map = this.make.tilemap({key: 'background' })
  const tileset = map.addTilesetImage('Ski','img')

  gameState.layer1 = map.createLayer('Ground',tileset,0,0)
  gameState.objects = map.createLayer('Objects',tileset,0,0)
  gameState.jumps = map.createLayer('Jumps',tileset,0,0)


  // Collider setup for Objects
  gameState.objects.setCollisionByProperty( {collides : true })
  //player.setCollideWorldBounds(true);

      // Debug Collider
  const debugCollider = false;
  if (debugCollider){
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    gameState.objects.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }

  // Setup Player
  //player = this.add.image(150, 40, 'player');
  //player.setScale(0.8)
  player = this.add.physics.sprite(150, 40, 'player');
  player.setCollideWorldBounds(true); // Prevent the player from going out of bounds
  player.setOrigin(0.5, 0.5);  // Set origin to the center of the player sprite
  player.setScale(1);
  player.setTint(0x00ff00); // Green tint for visibility test


// Set up gravity for the player
  this.physics.world.gravity.y = 500; // Adjust gravity as needed

  // Create Cursor Key
  gameState.cursors = this.input.keyboard.createCursorKeys();

  // Camera
  this.cameras.main.startFollow(player);  // Camera will follow the player, move background with it
  this.cameras.main.setZoom(1);

  gameState.speed = 1;

}

function update(){
  // Define Speed
  const maxSpeed = 2;
  const breaking = 0.4;

  if (gameState.speed<maxSpeed){
    gameState.speed +=0.5;
  }

  // Controls
  if(gameState.cursors.right.isDown){
    player.setVelocityX(gameState.speed * 100); // Apply speed to the player horizontally
    gameState.speed -= breaking;
  }
  if(gameState.cursors.left.isDown){
    player.setVelocityX(-gameState.speed * 100); // Apply speed to the player horizontally
    gameState.speed -= breaking;
  }

  // Make background move
/*
  gameState.layer1.y -= gameState.speed;
  gameState.objects.y -= gameState.speed;
  gameState.jumps.y -= gameState.speed;
*/
  // Check if Player is leaving a Jump

  const tile = gameState.jumps.getTileAtWorldXY(player.x,player.y)

  if (tile){
    player.onLayer = true;
  } else {
    if (player.onLayer){
      playerJump(this, player, gameState);
      player.onLayer = false;

    }
  }
}

const game = new Phaser.Game(config);
