const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  /*physics: {
    default: 'arcade',
    arcade: {
      gravity: {y:0},
      debug: true
    }
  },*/
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    zoom:2
  }
};
const gameState ={};
let player = {};
let jump = false;


function preload() {
  this.load.image('img', 'resources/TileMap/tilemap.png')
  this.load.tilemapTiledJSON('background','resources/TileMap/Skigame.json')
  this.load.image('player', 'resources/img/player.png')
  this.load.image('playerJump', 'resources/img/playerJump.png')
}

function create() {



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
  player = this.add.image(150, 40, 'player');
  //player = this.add.physics.sprite(150, 40, 'player');


  // Create Cursor Key
  gameState.cursors = this.input.keyboard.createCursorKeys();

}


function playerJump(){
  player.setTexture('playerJump')
 this.add.time.addEvent({
    delay:300,
    callback: () => {
      player.setTexture('player');
      },
    loop: false
  });
}

function land(){
  this.player.setTexture('player')
}


function update(){
  // Define Speed
  let speed = 1;
  const maxSpeed = 2;

  if (speed<maxSpeed){
    speed +=1;
  }

  // Controls
  if(gameState.cursors.right.isDown){
    player.x += speed;
    speed -=0.1;
  }
  if(gameState.cursors.left.isDown){
    player.x -= speed;
    speed -=0.1;

  }

  // Make background move

  gameState.layer1.y -= speed;
  gameState.objects.y -= speed;
  gameState.jumps.y -= speed;

  // Check if Player is leaving a Jump

  const tile = gameState.jumps.getTileAtWorldXY(player.x,player.y)

  if (tile){
    player.onLayer = true;
  } else {
    if (player.onLayer){
      player.setTexture('playerJump')
      this.time.delayedCall(400, () => {
        player.setTexture('player');
      }, null, this);      player.onLayer = false;

    }
  }
}

const game = new Phaser.Game(config);
