export function create() {

  this.gameState = {};
  this.player  = {};

  const map = this.make.tilemap({key: 'background' })

  this.physics.world.setBounds(
    0, // x
    0, // y
    map.widthInPixels, // width of the tilemap
    map.heightInPixels // height of the tilemap
  );


  const tileset = map.addTilesetImage('Ski','img')

  this.gameState.layer1 = map.createLayer('Ground',tileset,0,0)
  this.gameState.objects = map.createLayer('Objects',tileset,0,0)
  this.gameState.jumps = map.createLayer('Jumps',tileset,0,0)

  // Create player sprite with physics enabled
  this.player = this.physics.add.sprite(200, 50, 'player');
  this.player.setCollideWorldBounds(true); // Prevent player from going out of bounds

  this.physics.add.sprite(100, 50, 'player1');


  // Set camera to follow the player
  this.cameras.main.roundPixels = true;

  // sounds
  this.gameState.jumpSFX = this.sound.add('jumpSFX');
  this.gameState.landSFX = this.sound.add('landSFX');


  // Collider setup for Objects
  this.gameState.objects.setCollisionByProperty( {collides : true })
  this.player.setCollideWorldBounds(true);

  // Debug Collider
  const debugCollider = true;
  if (debugCollider){
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.gameState.objects.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    // Spielerwerte für smoothes Handling
    this.player.setDamping(true);
    this.player.setDragX(500); // Trägheit – je höher, desto schneller wird gestoppt
    this.player.setMaxVelocity(150); // Max Speed
    this.player.body.setSize(32, 48); // Match collision box to sprite size


  }


  // Create Cursor Key
  this.gameState.cursors = this.input.keyboard.createCursorKeys();

}
