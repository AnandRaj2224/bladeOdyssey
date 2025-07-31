import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene,x,y) {
    super(scene,x,y,'player');

    scene.add.exisiting(this);
    scene.physics.add.exisiting(this);

  }

}