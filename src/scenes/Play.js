import * as Phaser from "phaser";

class Play extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    this.player = this.createPlayer();
    this.physics.add.collider(this.player, layers.platformsColliders);
    this.playerSpeed = 200;
    this.cursors = this.input.keyboard.createCursorKeys();
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

    platformsColliders.setCollisionByProperty({collides : true});

    return { environment, platforms, platformsColliders };
  }
  createPlayer() {
    const player = this.physics.add.sprite(100, 250, "player");
    player.setGravityY(500);
    player.setCollideWorldBounds(true);
    return player;
  }
  update() {
    const {left,right} = this.cursors;

    if(left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if(right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }
  }
}

export default Play;
