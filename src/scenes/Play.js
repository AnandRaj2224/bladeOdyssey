import * as Phaser from "phaser";

class Play extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
  }
  createMap() {
    const map = this.make.tilemap({ key: "map" });
    map.addTilesetImage("main_lev_build_1", "tiles-1");
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset("main_lev_build_1");
    const environment =map.createLayer("environment",tileset);
    const platforms = map.createLayer("platforms",tileset);
    return {environment,platforms};
  }
}

export default Play;
