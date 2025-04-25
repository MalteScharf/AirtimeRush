import {playerJump} from "../playerActions";


export function update() {
  if (this.gameState.hasEnded){
    //this.player.setVelocityX(0);
    if (this.player.body.velocity.y >0){
      this.player.setAccelerationY(-30);
      if (this.player.body.velocity.x >0) {this.player.setAccelerationX(-40);}
      if (this.player.body.velocity.x <0) {this.player.setAccelerationX(40);}

    } else {
      this.player.setAccelerationY(0)
      this.player.setVelocityX(0)
      this.player.setAccelerationX(0)


    }
  }
  // Normal Game Velocity
  else {
    this.player.setVelocityY(70); // Default: 70
  }


  // player.x = Math.round(player.x);
  this.player.y = Math.round(this.player.y);

  // Kamera folgt nur der Y-Position des Spielers
  this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;
  this.cameras.main.scrollX = 0;


  // Controls

  // Weiche Links-/Rechts-Steuerung
  if (this.player.active) {
    if (this.gameState.cursors.left.isDown) {
      this.player.setAccelerationX(-200);

      // Setze ein Tween, um die Textur weich zu ändern
      this.tweens.add({
        targets: this.player,
        duration: 200, // Übergangszeit in Millisekunden
        onStart: () => {
          this.player.setTexture('leftTurn');
        },
        onComplete: () => {
          // Wenn der Übergang abgeschlossen ist, bleibt die Textur
          this.player.setTexture('leftTurn');
        }
      });



    } else if (this.gameState.cursors.right.isDown) {
      this.player.setAccelerationX(200);
      // Ähnliches Tween für die rechte Richtung
      this.tweens.add({
        targets: this.player,
        duration: 200,
        onStart: () => {
          this.player.setTexture('rightTurn');
        },
        onComplete: () => {
          this.player.setTexture('rightTurn');
        }
      });


    } else {
      this.player.setAccelerationX(0); // Keine Eingabe = keine zusätzliche Beschleunigung
      if (this.player.isIdle){
        this.player.setTexture('player');  // Standard-Textur nach Übergang
      }

    }
  }

  // Jump Animation
 if (Phaser.Input.Keyboard.JustDown(this.gameState.spaceBar)) {
   this.player.isIdle = false;
   this.player.play    ('takeoff')
 }

  // Jumping
  // Check if Player is leaving a Jump
  const tile = this.gameState.jumps.getTileAtWorldXY(this.player.x,this.player.y)

  if (tile){
    this.player.onLayer = true;
  } else {
    if (this.player.onLayer){
      playerJump(this, this.player, this.gameState);
      this.player.onLayer = false;
    }
  }

  // Finish

  const finish = this.gameState.finish.getTileAtWorldXY(this.player.x,this.player.y)
  if (finish){
    this.gameState.hasEnded = true;
    this.player.active =false;
  }


  // Chairlift Sound
   // calc distance to Chairlift
  let distance = Phaser.Math.Distance.Between(0, this.player.y+100, 0, this.lift.y);

  // lift Threshold
  let liftThreshold = 150;

  // Volume Setting

  let maxVolume = 1.5;
  let fadeSpeed = 0.01; // Adjust for faster/slower fade



  if (distance < liftThreshold) {
    // Fade in
    if (this.gameState.currentVolume < maxVolume) {
      this.gameState.currentVolume = Math.min(maxVolume, this.gameState.currentVolume + fadeSpeed);
      this.gameState.liftSFX.setVolume(this.gameState.currentVolume);
    }
  } else {
    // Fade out
    if (this.gameState.currentVolume > 0) {
      this.gameState.currentVolume = Math.max(0, this.gameState.currentVolume - fadeSpeed);
      this.gameState.liftSFX.setVolume(this.gameState.currentVolume);
    }
  }

  // Scoring
  if (this.player.isJumping){
    this.gameState.score += 1;
    this.gameState.scoreText.setText('Airtime: '+ this.gameState.score)
  }





}
