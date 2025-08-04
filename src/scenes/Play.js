import * as Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from '../groups/Enemies';

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
    const enemies  = this.createEnemies(layers.enemySpawns);

    this.createPlayerColliders(player, {
      colliders : {
        platformsColliders : layers.platformsColliders,
      }
    });

    this.createEnemyColliders(enemies, {
      colliders : {
        platformsColliders : layers.platformsColliders,
        player
      }
    });


    this.createEndOfLevel(playerZones.end,player);
    this.setupFollowupCameraOn(player);

    this.plotting = false;
    this.graphics = this.add.graphics();
    this.line = new Phaser.Geom.Line();
    this.graphics.lineStyle(1, 0x00ff00);

    this.input.on('pointerdown', this.startDrawing, this);
    this.input.on('pointerup', pointer => 
    this.finishDrawing(pointer, layers.platforms),this);  
  }

  startDrawing(pointer) {
    this.line.x1 = pointer.worldX;
    this.line.y1 = pointer.worldY;
    this.plotting = true;
  }

  finishDrawing(pointer, layer) {
    this.line.x2 = pointer.worldX;
    this.line.y2 = pointer.worldY;

    this.graphics.clear();
    this.graphics.strokeLineShape(this.line);
     this.tileHits = layer.getTilesWithinShape(this.line);

    if (this.tileHits.length > 0) {
      this.tileHits.forEach(tile => {
        tile.index !== -1 && console.log('I have hit the platform!');
      })
    }
    
    this.plotting = false;  
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
    const enemySpawns = map.getObjectLayer("enemy_spawns");

    platformsColliders.setCollisionByProperty({ collides: true });

    return { environment, platforms, platformsColliders, playerZones, enemySpawns };

  }

  createPlayer(start) {
    return new Player(this, start.x, start.y);

  }

  
createEnemies(spawnLayer) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();

    spawnLayer.objects.forEach(spawnPoint => {
      const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
      enemies.add(enemy);
    })
    return enemies;
}


  createPlayerColliders(player, {colliders}) {
    player
      .addCollider(colliders.platformsColliders);

  }

  createEnemyColliders(enemies, {colliders}) {
      enemies
        .addCollider(colliders.platformsColliders)
        .addCollider(colliders.player);
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
  
  update() {
    if (this.plotting) {
      const pointer = this.input.activePointer;

      this.line.x2 = pointer.worldX;
      this.line.y2 = pointer.worldY;
      this.graphics.clear();
      this.graphics.strokeLineShape(this.line);
    }
  }

}

export default Play;
