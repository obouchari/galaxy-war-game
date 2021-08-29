import ShipOption from "../entities/ship-option";
import MainScene from "../scenes/main-scene";

class MainMenuScene extends MainScene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  // Create the scene
  create() {
    super.create.call(this);

    const { width, height } = this.game.config;

    this.add.image(width * 0.5, height * 0.5, "main-bg");

    this.sfx = {
      tap: this.sound.add("tap-sound"),
      bgMusic: this.sound.add("intro"),
    };

    // Play intro music
    this.sfx.bgMusic.play({
      loop: -1,
      volume: 0.2,
    });

    // Play button
    this.playBtn = this.add.sprite(width * 0.5, height * 0.5 + 100, "play-btn");
    this.playBtn.setInteractive();
    // play button on pressed event
    this.playBtn.on("pointerdown", () => this.sfx.tap.play(), this);
    // play button on release event
    this.playBtn.on("pointerup", this.startGame, this);

    // Selection of ships
    this.shipOptions = [
      new ShipOption(this, width * 0.5 - 200, 120, "blue-ship"),
      new ShipOption(this, width * 0.5, 120, "yellow-ship"),
      new ShipOption(this, width * 0.5 + 200, 120, "red-ship"),
    ];

    for (const option of this.shipOptions) {
      option.create();
    }

    this.selectedIndex = 0;
    this.handleSelectShip();

    this.input.keyboard.on(
      "keydown-LEFT",
      () => {
        if (this.selectedIndex > 0) {
          this.selectedIndex -= 1;
          this.handleSelectShip();
        }
      },
      this
    );

    this.input.keyboard.on(
      "keydown-RIGHT",
      () => {
        if (this.selectedIndex < this.shipOptions.length - 1) {
          this.selectedIndex += 1;
          this.handleSelectShip();
        }
      },
      this
    );

    // Space key down also lunch the game
    this.input.keyboard.once("keydown-SPACE", this.startGame, this);

    // Mute button
    this.muteBtn = this.add.sprite(50, 50, "unmuted-btn");
    this.muteBtn.setInteractive();
    // mute button on pressed event
    this.muteBtn.on("pointerdown", () => this.sfx.tap.play(), this);
    // play button on release event
    this.muteBtn.on("pointerup", this.toggleMuteState, this);

    // Add logo to main menu
    this.add.image(width * 0.5, 150, "game-logo");
  }

  handleSelectShip() {
    for (const option of this.shipOptions) {
      option.deselect();
    }

    this.selectedOption = this.shipOptions[this.selectedIndex];
    this.selectedOption.select();
    this.selectedKey = this.selectedOption.selected;
  }

  toggleMuteState() {
    if (this.sfx.bgMusic.isPlaying) {
      this.muteBtn.setTexture("muted-btn");
      this.sfx.bgMusic.pause();
    } else {
      this.muteBtn.setTexture("unmuted-btn");
      this.sfx.bgMusic.resume();
    }
  }

  startGame() {
    this.sfx.bgMusic.stop();
    this.scene.start("FirstScene", { ship: this.selectedKey });
  }

  //  Update the scene
  update() {
    super.update.call(this);
  }
}

export default MainMenuScene;
