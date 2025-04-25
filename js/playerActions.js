// Jump
export function playerJump(scene, player, gameState){
  player.setTexture('playerJump')
  player.active = false;
  player.isJumping = true;
  gameState.jumpSFX.play();
  console.log('Jumping!');
  // calculate difference between last time the spacebar was released and position of leaving the jumping tile
  const difference = player.body.y - gameState.lastSpacebarReleasedY

  // Calculate Jumping bonus
  const jumpingBonus = calculateJumpingBonus(difference, gameState, scene)


  scene.time.delayedCall(800 + jumpingBonus, () => {
    console.log('Landing!');
    player.setTexture('player');
    gameState.landSFX.play();
    player.active = true;
    player.isJumping = false;

  }, null, scene);
}

// Helper function to calculate Jumping Bonus

function calculateJumpingBonus(difference, gameState,scene){
  const perfectScore = 25; //upper boundary for perfect score
  const goodScore = 50; // upper boundary for perfect score
  let jumpingBonus =0;
  if (difference>=0 && difference <= perfectScore){
    console.log("Perfect Jump!")
    jumpingBonus = 100;
    showJumpingUI(gameState.perfectImage,scene)
  }

  if (difference>perfectScore && difference<goodScore){
    console.log("Good Jump!")
    jumpingBonus = 50;
    showJumpingUI(gameState.goodImage,scene)

  }

  console.log("Jumping Bonus: "+ jumpingBonus)
  return jumpingBonus;
}

function showJumpingUI(image,scene){
  image.setVisible(true);

  image.setAlpha(1);
  // Bounce + fade
  scene.tweens.add({
    targets: image,
    scale: { from: 0.1, to: 0.2 },
    duration: 250,
    yoyo: true,
    ease: 'Quad.easeOut',
    onComplete: () => {
      scene.tweens.add({
        targets: image,
        alpha: 0,
        duration: 700,
        ease: 'Power2',
        onComplete: () => {
          image.setVisible(false);
        }
      });
    }
  });
}

// Crash
export function crash(player,object){
  player.setTexture('crash')
  player.active = false;
  player.body.setEnable(false);
  console.log("Crash")
}


