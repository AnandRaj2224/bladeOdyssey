import * as Phaser from "phaser";
import Player from "../entities/Player";

class Play extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const player = this.createPlayer();
    player.addcollider(layers.platformsColliders);
  }

  createMap() {
    const map = this.make.tilemap({ key: "map" });
    map.addTilesetImage("main_lev_build_1", "tiles-1");
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset("main_lev_build_1");
    const platformsColliders = map.createLayer("platforms_colliders", tileset);
    const environment = map.createLayer("environment", tileset);
    const platforms = map.createLayer("platforms", tileset);

    platformsColliders.setCollisionByProperty({ collides: true });

    return { environment, platforms, platformsColliders };
  }
  createPlayer() {
    return new Player(this, 100, 250);
  }
}

export default Play;
