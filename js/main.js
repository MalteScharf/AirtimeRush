// main.js
import Phaser from 'phaser';

import { MainScene } from './scenes/mainScene.js';

WebFont.load({
  google: {
    families: ['Jersey 15']
  },
  active: () => {
    // Font is loaded, now start Phaser
    const config = {
      type: Phaser.AUTO,
      width: 450,
      height: 400,
      antialias: true,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
      },
      scene: [MainScene]
    };

    new Phaser.Game(config);
  }

});

/*
const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 400,
  antialias: true, // Smooths edges
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

//const game = new Phaser.Game(config);
*/
