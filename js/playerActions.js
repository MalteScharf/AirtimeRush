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
  const jumpingBonus = calculateJumpingBonus(difference)


  scene.time.delayedCall(800 + jumpingBonus, () => {
    console.log('Landing!');
    player.setTexture('player');
    gameState.landSFX.play();
    player.active = true;
    player.isJumping = false;

  }, null, scene);
}

// Helper function to calculate Jumping Bonus

function calculateJumpingBonus(difference){
  const perfectScore = 25; //upper boundary for perfect score
  const goodScore = 50; // upper boundary for perfect score
  let jumpingBonus =0;
  if (difference>=0 && difference <= perfectScore){
    console.log("Perfect Jump!")
    jumpingBonus = 100;
  }

  if (difference>perfectScore && difference<goodScore){
    console.log("Good Jump!")
    jumpingBonus = 50;
  }

  console.log("Jumping Bonus: "+ jumpingBonus)
  return jumpingBonus;
}


// Crash
export function crash(player,object){
  player.setTexture('crash')
  player.active = false;
  player.body.setEnable(false);
  console.log("Crash")
}


