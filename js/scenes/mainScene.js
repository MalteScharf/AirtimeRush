// Scenes/MainScene.js
import { preload } from './preload.js';
import { create } from './create.js';
import { update } from './update.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    preload.call(this); // Bind scene context
  }

  create() {
    create.call(this);
  }

  update() {
    update.call(this);
  }
}
