import * as Phaser from 'phaser/dist/phaser.esm.js';
export default (anims) => {
  if (!anims.exists("birdman-idle")) {
    anims.create({
      key: "birdman-idle",
      frames: anims.generateFrameNumbers("birdman", { start: 0, end: 12 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  if (!anims.exists("birdman-hurt")) {
    anims.create({
      key: "birdman-hurt",
      frames: anims.generateFrameNumbers("birdman", { start: 25, end: 26 }),
      frameRate: 10,
      repeat: 0,
    });
  }
};
