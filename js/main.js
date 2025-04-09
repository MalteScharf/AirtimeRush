// main.js
import { MainScene } from './scenes/mainScene.js';

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [MainScene] // Use your scene class
};
let player;
let backgroundLayer;
let player1;
const gameState ={};

const game = new Phaser.Game(config);
