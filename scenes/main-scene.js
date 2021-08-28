import Phaser from "phaser";
import assets from "../assets";

class MainScene extends Phaser.Scene {
  constructor(scene) {
    super(scene);
  }

  preload() {
    // Load background image
    this.load.image("space", assets.bg.space);
    this.load.image("small-stars", assets.bg.smallStars);
    this.load.image("big-stars", assets.bg.bigStars);

    // Load player and laser
    this.load.image("player", assets.player.ship1, {
      frameWidth: 40,
      frameHeight: 100,
    });
    this.load.image("player-laser", assets.player.laser1);

    // load explosion effect
    this.load.spritesheet("explosion", assets.effects.explosion, {
      frameWidth: 96,
      frameHeight: 93,
    });

    // TODO: add asteroids
    // load chaser asteroid
    // this.load.spritesheet("asteroid", "../assets/enemies/level1/asteroid.png", {
    //   frameWidth: 64,
    //   frameHeight: 64,
    // });

    // load level 1 enemies and laser
    this.load.image("enemy-lvl1-1", assets.enemies.enemy1.ship);
    this.load.image("enemy-lvl1-2", assets.enemies.enemy1.laser);
    this.load.image("laser-lvl1-1", assets.enemies.enemy2.ship);
    this.load.image("laser-lvl1-2", assets.enemies.enemy2.laser);
    this.load.image("enemy-lvl1-3", assets.enemies.enemy3.ship);
    this.load.image("laser-lvl1-3", assets.enemies.enemy3.laser);

    // load chaser enemy
    this.load.image("chaser-enemy", assets.enemies.chaser);

    // TODO: add different enemy levels
    // load level 2 enemies
    // this.load.image("enemy-lvl2-1", "../assets/enemies/level2/1.png");
    // this.load.image("enemy-lvl2-2", "../assets/enemies/level2/2.png");
    // this.load.image("enemy-lvl2-3", "../assets/enemies/level2/3.png");

    // load level 3 enemies
    // this.load.image("enemy-lvl3-1", "../assets/enemies/level3/1.png");
    // this.load.image("enemy-lvl3-2", "../assets/enemies/level3/2.png");
    // this.load.image("enemy-lvl3-3", "../assets/enemies/level3/3.png");

    // load Enemy laser
    // this.load.image("enemy-laser", "../assets/laser/pink/short-ray.png");

    // load buttons
    this.load.image("play-btn", assets.ui.buttons.play.default);
    this.load.image("play-btn-pressed", assets.ui.buttons.play.pressed);

    // load audio
    this.load.audio("explode-sound", assets.sfx.explosion);
    this.load.audio("laser-sound", assets.sfx.laser);
    this.load.audio("collect-sound", assets.sfx.collect);
    this.load.audio("tap-sound", assets.sfx.tap);
    this.load.audio("lose-sound", assets.sfx.lose);
    this.load.audio("intro", assets.music.intro);

    // load game logo
    this.load.image("game-logo", assets.gameLogo);
    // load main menu screen characters
    this.load.image("alien", assets.characters.aliens);
    this.load.image("space-soldier", assets.characters.soldiers);
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
