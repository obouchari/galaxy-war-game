import Phaser from "phaser";
import assets from "../assets";

class MainScene extends Phaser.Scene {
  constructor(scene) {
    super(scene);
  }

  create() {
    const { width, height } = this.game.config;

    // Parallax backgrounds
    this.space = this.add.tileSprite(
      width * 0.5,
      height * 0.5,
      width,
      height,
      "space"
    );
    this.smallStars = this.add.tileSprite(
      width * 0.5,
      height * 0.5,
      width,
      height,
      "small-stars"
    );
    this.bigStars = this.add.tileSprite(
      width * 0.5,
      height * 0.5,
      width,
      height,
      "big-stars"
    );
  }

  update() {
    this.space.tilePositionY -= 0.25;
    this.smallStars.tilePositionY -= 0.5;
    this.bigStars.tilePositionY -= 0.75;
  }
}

export default MainScene;
