import * as Phaser from "phaser";
import Player from "../entities/Player";
import { platform } from "process";

class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones);

    this.createPlayerColliders(player, {
      colliders : {
        platformsColliders : layers.platformsColliders,
      }
    });

    this.createEndOfLevel(playerZones.end,player);
    this.setupFollowupCameraOn(player);
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
    const playerZones = map.getObjectLayer("player_zones");

    platformsColliders.setCollisionByProperty({ collides: true });

    return { environment, platforms, platformsColliders, playerZones };
  }
  createPlayer(start) {
    return new Player(this, start.x, start.y);
  }
  createPlayerColliders(player, {colliders}) {
    player
      .addCollider(colliders.platformsColliders);
  }
  setupFollowupCameraOn(player) {
    const {height,width,mapOffset} = this.config;
    this.physics.world.setBounds(0,0,width + mapOffset,height+200)
    this.cameras.main.setBounds(0,0,width + mapOffset,height).setZoom(1.5)
    this.cameras.main.startFollow(player);
  }
  getPlayerZones(playerZoneLayer) {
    const playerZones = playerZoneLayer.objects;
    const zones = playerZoneLayer.objects;

    return {
      start: zones.find(obj => obj.name === "startZone"),
      end: zones.find(obj => obj.name === "endZone")    
    }

  }
  createEndOfLevel(end,player) {
    const  endOfLevel = this.physics.add.sprite(end.x,end.y,"end")
    .setSize(5,this.config.height)
    .setOrigin(0.5,1);

    const eofOverlap = this.physics.add.overlap(player,endOfLevel, () => {
      eofOverlap.active = false;
      console.log("pLayer has won!!\n");
    })
  }
}

export default Play;
