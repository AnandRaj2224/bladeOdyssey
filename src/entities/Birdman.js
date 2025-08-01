import Phaser from "phaser";
import collidable from "../mixins/collidable";

class Birdman extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "birdman");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);

    this.init();
  }
  init() {
    this.gravity = 500;
    this.speed = 150;
    this.setGravityY(this.gravity);
    this.setSize(20,24)
    this.setOffset(7,20);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);
  }
}

export default Birdman;
