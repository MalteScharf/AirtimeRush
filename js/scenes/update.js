import {playerJump} from "../playerActions";


export function update() {

  this.player.setVelocityY(50);

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
            this.player.setTexture('player');  // Standard-Textur nach Übergang

    }
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




}
