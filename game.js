const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    zoom:2
  }
};


function preload() {
  this.load.image('img', 'TileMap/tilemap.png');
  this.load.tilemapTiledJSON('background','TileMap/Skigame.json')

}

function create() {

  // Setup Tileset (Background)
  const map = this.make.tilemap({key: 'background' })
  const tileset = map.addTilesetImage('Ski','img')
  gameState.layer1 = map.createLayer('Tile Layer 1',tileset,0,0)
  gameState.layer2 = map.createLayer('Objects',tileset,0,0)


  //this.add.image(200,200,'img')

  const redHexCode = 0x7ED321;
  gameState.player = this.add.circle(150,40,10,redHexCode);

  // Create Cursor Keys
  gameState.cursors = this.input.keyboard.createCursorKeys();

}

function update(){
  // Define Speed
  const speed = 1;

  // Controls
  if(gameState.cursors.right.isDown){
    gameState.player.x += speed;
  }
  if(gameState.cursors.left.isDown){
    gameState.player.x -= speed;
  }
  gameState.layer1.y -= speed;
  gameState.layer2.y -= speed;

}

const gameState ={};
const game = new Phaser.Game(config);
