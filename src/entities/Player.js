import Phaser from "phaser";
import initAnimations from "./playerAnims";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.init();
    this.initEvents();
  }
  init() {
    this.gravity = 500;
    this.playerSpeed = 200;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.wasd = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    initAnimations(this.scene.anims);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time, delta) {
    super.preUpdate(time, delta);
    const { left, right, space} = this.cursors;
    const { left: a, right: d } = this.wasd;
    const onFloor = this.body.onFloor()
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

    if (left.isDown || a.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (right.isDown || d.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (isSpaceJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.setVelocityY(-this.playerSpeed * 1.5);
      this.jumpCount++;
    }
    if(onFloor) {
      this.jumpCount = 0;
    }
    this.body.velocity.x !== 0
      ? this.play("run", true)
      : this.play("idle", true);
  }
}

export default Player;
