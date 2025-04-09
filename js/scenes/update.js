export function update() {

  // Add this at the start:
  if (this.time.frameCount % 60 === 0) { // Log every second (60 frames)
    console.log('FPS:', Math.floor(this.game.loop.actualFps));
  }

  this.player.setVelocityY(50);

  // player.x = Math.round(player.x);
  this.player.y = Math.round(this.player.y);

  // Kamera folgt nur der Y-Position des Spielers
  this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;
  this.cameras.main.scrollX = 0;



  // Controls

  // Weiche Links-/Rechts-Steuerung
  if (this.gameState.cursors.left.isDown) {
    this.player.setAccelerationX(-200);
  } else if (this.gameState.cursors.right.isDown) {
    this.player.setAccelerationX(200);
  } else {
    this.player.setAccelerationX(0); // Keine Eingabe = keine zusätzliche Beschleunigung
  }

}
