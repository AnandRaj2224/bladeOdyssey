export default (anims) => {
  // Player animations
  if (!anims.exists("idle")) {
    anims.create({
      key: "idle",
      frames: anims.generateFrameNumbers("player", { start: 0, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  if (!anims.exists("run")) {
    anims.create({
      key: "run",
      frames: anims.generateFrameNumbers("player", { start: 11, end: 16 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  if (!anims.exists("jump")) {
    anims.create({
      key: "jump",
      frames: anims.generateFrameNumbers("player", { start: 17, end: 23 }),
      frameRate: 2,
      repeat: 1,
    });
  }

  if (!anims.exists("throw")) {
    anims.create({
      key: "throw",
      frames: anims.generateFrameNumbers("player-throw", { start: 0, end: 6 }),
      frameRate: 14,
      repeat: 0,
    });
  }

  if (!anims.exists("slide")) {
    anims.create({
      key: "slide",
      frames: anims.generateFrameNumbers("player-slide-sheet", {
        start: 0,
        end: 2,
      }),
      frameRate: 20,
      repeat: 0,
    });
  }
}