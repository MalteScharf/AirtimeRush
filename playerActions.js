// Jump
export function playerJump(scene, player, gameState){
  player.setTexture('playerJump')
  gameState.jumpSFX.play();

  scene.time.delayedCall(400, () => {
    player.setTexture('player');
    gameState.landSFX.play();
  }, null, scene);
}
