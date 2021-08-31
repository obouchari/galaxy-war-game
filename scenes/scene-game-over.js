import MainScene from "./main-scene";
import playerStats from "../player-stats";

class GameOverScene extends MainScene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  // Create the scene
  create() {
    super.create.call(this);

    const { width, height } = this.game.config;

    this.add.image(width * 0.5, 150, "game-over");

    this.sfx = {
      gameOver: this.sound.add("game-over-sound"),
      tap: this.sound.add("tap-sound"),
    };

    this.sfx.gameOver.play({
      volume: 0.5,
    });

    this.replayBtn = this.add.sprite(width * 0.5, height * 0.5, "replay-btn");
    this.replayBtn.setInteractive();

    // button on pressed event
    this.replayBtn.on(
      "pointerdown",
      function () {
        this.sfx.tap.play();
      },
      this
    );

    // button on release event
    this.replayBtn.on("pointerup", this.restartGame, this);
  }

  restartGame() {
    playerStats.resetHp();
    this.sfx.gameOver.stop();
    this.scene.start("FirstScene");
  }
}

export default GameOverScene;
