import BaseScene from "./BaseScene";
import * as Phaser from 'phaser/dist/phaser.esm.js';
class CreditsScene extends BaseScene {
  constructor(config) {
    super("CreditsScene", { ...config, canGoBack: true });

    this.menu = [
      { scene: null, text: "Thank you for playing" },
      { scene: null, text: "Author: Anand" },
    ];
  }

  create() {
    super.create();
    this.createMenu(this.menu, () => {});
  }
}

export default CreditsScene;

// Create ScoreScene
// Display Best score, you can get from the local storage
