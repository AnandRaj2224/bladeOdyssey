export default (anims) => {
  this.scene.anims.create({
    key: "idle",
    frames: anims.generateFrameNumbers("player", {
      start: 0,
      end: 8,
    }),
    frameRate: 8,
    repeat: -1,
  });

  this.scene.anims.create({
    key: "run",
    frames: anims.generateFrameNumbers("player", {
      start: 11,
      end: 16,
    }),
    frameRate: 8,
    repeat: -1,
  });
};
