import * as Phaser from 'phaser/dist/phaser.esm.js';
export default (anims) => {
  if (!anims.exists("snaky-walk")) {
    anims.create({
      key: "snaky-walk",
      frames: anims.generateFrameNumbers("snaky", { start: 0, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  if (!anims.exists("snaky-hurt")) {
    anims.create({
      key: "snaky-hurt",
      frames: anims.generateFrameNumbers("snaky", { start: 21, end: 22 }),
      frameRate: 10,
      repeat: 0,
    });
  }
};
