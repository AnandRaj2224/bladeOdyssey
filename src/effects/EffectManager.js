import SpriteEffect from "./SpriteEffect";

class EffectManager {
  constructor(scene) {
    this.scene = scene;
  }

  playEffectOn(effectName, target, impactPosition) {
    if (!target) {
      console.warn('EffectManager: missing target for effect:', effectName);
      return;
    }
    if (!impactPosition) {
      // Fallback to target center if impactPosition is missing
      impactPosition = target.getCenter();
    }

    const effect = new SpriteEffect(
      this.scene,
      0,
      0,
      effectName,
      impactPosition
    );
    effect.playOn(target);
  }
}

export default EffectManager;
