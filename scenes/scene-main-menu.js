import Phaser from "phaser";
import MainScene from "../scenes/main-scene";

class MainMenuScene extends MainScene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  // Create the scene
  create() {
    super.create.call(this);

    const { width, height } = this.game.config;

    this.sfx = {
      tap: this.sound.add("tap-sound"),
    };

    this.playBtn = this.add.sprite(width * 0.5, height * 0.5, "play-btn");
    this.playBtn.setInteractive();

    // button on pressed event
    this.playBtn.on(
      "pointerdown",
      function () {
        this.playBtn.setTexture("play-btn-pressed");
        this.sfx.tap.play();
      },
      this
    );

    // button on release event
    this.playBtn.on(
      "pointerup",
      function () {
        this.playBtn.setTexture("play-btn");
        this.scene.start("FirstScene");
      },
      this
    );

    // Add title to main menu
    this.title = this.add.text(width * 0.5, 128, "Galaxy Defenders", {});
  }

  //  Update the scene
  update() {
    super.update.call(this);
  }
}

export default MainMenuScene;
