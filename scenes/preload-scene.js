import Phaser from "phaser";
import assets from "../assets";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    const { width, height } = this.game.config;

    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    this.progressBarDim = {
      w: 300,
      h: 30,
      x: width * 0.5 - 300 * 0.5,
      y: height * 0.5 - 30 * 0.5,
    };
    const progressBar = new Phaser.Geom.Rectangle(
      this.progressBarDim.x,
      this.progressBarDim.y,
      this.progressBarDim.w,
      this.progressBarDim.h
    );
    const progressBarFill = new Phaser.Geom.Rectangle(
      this.progressBarDim.x,
      this.progressBarDim.y,
      this.progressBarDim.w,
      this.progressBarDim.h
    );

    this.graphics.fillStyle(0x333333, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x573280, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    var loadingText = this.add
      .text(width * 0.5, height * 0.5, "", {
        fontSize: 16,
        color: "#FFFFFF",
        align: "center",
      })
      .setOrigin(0.5);

    this.loadAssets();

    this.load.on("progress", this.updateBar, {
      progressBarDim: this.progressBarDim,
      newGraphics: this.newGraphics,
      loadingText: loadingText,
    });

    this.load.on("complete", this.complete, { scene: this.scene });
  }

  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x573280, 1);

    percentage = parseInt(percentage * 100);

    this.newGraphics.fillRectShape(
      new Phaser.Geom.Rectangle(
        this.progressBarDim.x,
        this.progressBarDim.y,
        percentage * (this.progressBarDim.w / 100),
        this.progressBarDim.h
      )
    );

    this.loadingText.setText(percentage + "%");
  }

  complete() {
    this.scene.start("MainMenuScene");
  }

  loadAssets() {
    // Load background image
    this.load.image("space", assets.bg.space);
    this.load.image("small-stars", assets.bg.smallStars);
    this.load.image("big-stars", assets.bg.bigStars);

    // load game logo
    this.load.image("game-logo", assets.gameLogo);

    // Game over text
    this.load.image("game-over", assets.gameOver);

    this.load.image("main-bg", assets.bg.mainScreen);

    // load buttons
    this.load.image("play-btn", assets.ui.buttons.play);
    this.load.image("replay-btn", assets.ui.buttons.replay);
    this.load.image("menu-btn", assets.ui.buttons.menu);
    this.load.image("muted-btn", assets.ui.buttons.muted);
    this.load.image("unmuted-btn", assets.ui.buttons.unmuted);

    this.load.audio("intro", assets.music.intro);

    // Load players and their lasers
    this.load.image("blue-ship", assets.player.ship1, {
      frameWidth: 40,
      frameHeight: 100,
    });
    this.load.image("blue-ship-laser", assets.player.laser1);
    this.load.image("yellow-ship", assets.player.ship2, {
      frameWidth: 40,
      frameHeight: 100,
    });
    this.load.image("yellow-ship-laser", assets.player.laser2);
    this.load.image("red-ship", assets.player.ship3, {
      frameWidth: 40,
      frameHeight: 100,
    });
    this.load.image("red-ship-laser", assets.player.laser3);

    // load explosion effect
    this.load.spritesheet("explosion", assets.effects.explosion, {
      frameWidth: 96,
      frameHeight: 93,
    });

    // TODO: add asteroids

    // load level 1 enemies and laser
    this.load.image("enemy-lvl1-1", assets.enemies.enemy1.ship);
    this.load.image("laser-lvl1-1", assets.enemies.enemy1.laser);
    this.load.image("enemy-lvl1-2", assets.enemies.enemy2.ship);
    this.load.image("laser-lvl1-2", assets.enemies.enemy2.laser);
    this.load.image("enemy-lvl1-3", assets.enemies.enemy3.ship);
    this.load.image("laser-lvl1-3", assets.enemies.enemy3.laser);

    // load chaser enemy
    this.load.image("chaser-enemy", assets.enemies.chaser);

    // TODO: add different enemy levels

    // load collectibles
    this.load.image("life", assets.collectibles.life);

    this.load.spritesheet("hp", assets.stats.hp, {
      frameWidth: 180,
      frameHeight: 31,
    });

    // load audio
    this.load.audio("tap-sound", assets.sfx.tap);
    this.load.audio("explode-sound", assets.sfx.explosion);
    this.load.audio("laser-sound", assets.sfx.laser);
    this.load.audio("collect-sound", assets.sfx.collect);
    this.load.audio("lose-sound", assets.sfx.lose);
    this.load.audio("game-over-sound", assets.sfx.gameOver);
  }
}

export default PreloadScene;
