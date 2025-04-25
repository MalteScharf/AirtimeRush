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
  this.gameState.finish = map.createLayer('Finish',tileset,0,0)




  // Create player sprite with physics enabled
  const xStart = 200;
  const yStart = 50;
  const xFinishLine = 300;  // For Degugging
  const yFinishLine = 1000;  // For Degugging

  this.player = this.physics.add.sprite(xFinishLine, yFinishLine, 'player');
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
      this.lift.setVelocityX(-50)

    }

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
  this.gameState.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


  // Spieler.onLayer initialisieren
  this.player.onLayer = false;

  // Ending

  this.gameState.hasEnded = false;

  // UI

  this.gameState.scoreText = this.add.text(320, 0, 'Airtime: 0', {
    fontFamily: "'Jersey 15', sans-serif",
    fontSize: "32px",
    fill: '#00000',
    resolution: 1
  });

  //this.gameState.scoreText = this.add.bitmapText(320, 100, 'Test', 'Airtime: 0', 72)


  this.gameState.scoreText.setScrollFactor(0)

  // Initialize Score
  this.gameState.score =0;
  this.time.delayedCall(100, () => {
    this.gameState.scoreText.setText('Airtime: 0');
  });
  console.log(window.getComputedStyle(document.body).fontFamily);


  // Animations
  this.player.isIdle = true;

  this.input.keyboard.on('keyup-SPACE', function (event) {
    console.log('Spacebar released');
    this.player.playReverse('takeoff'); // TODO: Fix
    this.player.isIdle = true;
  }.bind(this));


  this.anims.create({
    key: 'takeoff',
    frames: [
      { key: 'takeoff0'},
      { key: 'takeoff1'}
    ],
    frameRate: 8,
    repeat: 0
  });


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

