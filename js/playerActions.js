// Jump
export function playerJump(scene, player, gameState){
  player.setTexture('playerJump')
  player.active = false;
  player.isJumping = true;
  gameState.jumpSFX.play();
  console.log('Jumping!');


  scene.time.delayedCall(1000, () => {
    console.log('Landing!');
    player.setTexture('player');
    gameState.landSFX.play();
    player.active = true;
    player.isJumping = false;

  }, null, scene);
}


// Crash
export function crash(player,object){
  player.setTexture('crash')
  player.active = false;
  player.body.setEnable(false);
  console.log("Crash")
}


