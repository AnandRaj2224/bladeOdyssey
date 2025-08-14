import * as Phaser from 'phaser';import Projectile from "./Projectile";
import { getTimestamp } from "../utils/functions";

class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: "iceball",
      classType: Projectile,
    });
    this.timeFromLastProjectile = null;
  }

fireProjectile(initiator,anim) {
  const projectile = this.getFirstDead(false);

  if (!projectile) {
    return;
  }
  if (
    this.timeFromLastProjectile &&
    this.timeFromLastProjectile + projectile.cooldown > getTimestamp()
  ) {
    return;
  }
  const center = initiator.getCenter();
  let centerX = center.x;  // <--- assign centerX here

  if (initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
    projectile.speed = Math.abs(projectile.speed);
    projectile.setFlipX(false);
  } else {
    projectile.speed = -Math.abs(projectile.speed);
    projectile.setFlipX(true);
  }

  projectile.fire(centerX, center.y,anim);
  this.timeFromLastProjectile = getTimestamp();
}
}

export default Projectiles;
