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
      bgMusic: this.sound.add("intro"),
    };

    // Play intro music
    this.sfx.bgMusic.play({
      loop: true,
      volume: 0.3,
    });

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
    this.playBtn.on("pointerup", this.startGame, this);

    // Add logo to main menu
    this.add.image(width * 0.5, 150, "game-logo");
    // Add characters images
    const alien = this.textures.get("alien").getSourceImage();
    this.add.image(20, height - alien.height, "alien").setOrigin(0, 0);

    const spaceSoldier = this.textures.get("space-soldier").getSourceImage();
    this.add
      .image(
        width - spaceSoldier.width,
        height - spaceSoldier.height,
        "space-soldier"
      )
      .setOrigin(0, 0);
  }

  startGame() {
    this.playBtn.setTexture("play-btn");
    this.sfx.bgMusic.stop();
    this.scene.start("FirstScene");
  }

  //  Update the scene
  update() {
    super.update.call(this);
  }
}

export default MainMenuScene;
