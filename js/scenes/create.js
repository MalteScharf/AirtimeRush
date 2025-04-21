import { crash } from '/js/playerActions.js';

export function create() {


  this.gameState = {};
  this.player  = {};
  this.lift = {};

  // Create Map
  const map = this.make.tilemap({key: 'background' })

  this.physics.world.setBounds(
    0, // x
    0, // y
    map.widthInPixels, // width of the tilemap
    map.heightInPixels // height of the tilemap
  );

  // Load Tilesets

  const tileset = map.addTilesetImage('Ski','img')
  // Ground and Objects
  this.gameState.layer1 = map.createLayer('Ground',tileset,0,0)
  this.gameState.objects = map.createLayer('Objects',tileset,0,0)
  this.gameState.jumps = map.createLayer('Jumps',tileset,0,0)
  this.gameState.railShadow = map.createLayer('Rail Shadows',tileset,0,0)



  // Create player sprite with physics enabled
  this.player = this.physics.add.sprite(200, 50, 'player');
  this.player.setCollideWorldBounds(true); // Prevent player from going out of bounds

  // Rail
  this.gameState.rail = map.createLayer('Rail',tileset,0,0)

  // Lift
  const firstGid = tileset.firstgid;

  const objectLayer = map.getObjectLayer('Lift');

  objectLayer.objects.forEach((object) => {
    if (object.gid !== undefined) {
      const frameIndex = object.gid - firstGid;

      this.lift = this.physics.add.sprite(object.x, object.y, 'img', frameIndex);
     // liftSprite.setVelocityX(-50)

    }
    //this.liftSprite.setVelocityX(50)

  });





    // Set camera to follow the player
  this.cameras.main.roundPixels = true;

  // sounds
  this.gameState.jumpSFX = this.sound.add('jumpSFX');
  this.gameState.landSFX = this.sound.add('landSFX');
  this.gameState.liftSFX  = this.sound.add('chairlift', {loop: true, volume: 0});
  this.gameState.liftSFX.play();
  this.gameState.currentVolume =0;



  // Collider setup for Objects
  this.gameState.objects.setCollisionByProperty( {collides : true })
  this.player.setCollideWorldBounds(true);

      // Collider between player and Objects
  this.physics.add.collider(this.player, this.gameState.objects,crash);

  // Create Cursor Key
  this.gameState.cursors = this.input.keyboard.createCursorKeys();


  // Spieler.onLayer initialisieren
  this.player.onLayer = false;

  // Debug Collider
  const debugCollider = false;
  if (debugCollider){
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.gameState.objects.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }

}

