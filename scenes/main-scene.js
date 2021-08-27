import Phaser from "phaser";

class MainScene extends Phaser.Scene {
  constructor(scene) {
    super(scene);
  }

  preload() {
    // Load background image
    this.load.image("space", "../assets/backgrounds/nebula-blue.png");
    this.load.image("small-stars", "../assets/backgrounds/stars-small_1.png");
    this.load.image("big-stars", "../assets/backgrounds/stars-big_1_1_pc.png");

    // Load player and laser
    this.load.image("player", "../assets/ships/ship-1.png", {
      frameWidth: 40,
      frameHeight: 100,
    });
    this.load.image("player-laser", "../assets/laser/blue/short-ray.png");

    // load explosion effect
    this.load.spritesheet(
      "explosion",
      "../assets/effects/space-ship-explosion.png",
      { frameWidth: 96, frameHeight: 93 }
    );

    // TODO: add asteroids
    // load chaser asteroid
    // this.load.spritesheet("asteroid", "../assets/enemies/level1/asteroid.png", {
    //   frameWidth: 64,
    //   frameHeight: 64,
    // });

    // load level 1 enemies and laser
    this.load.image("enemy-lvl1-1", "../assets/enemies/level1/1.png");
    this.load.image("laser-lvl1-1", "../assets/laser/blue/round.png");
    this.load.image("enemy-lvl1-2", "../assets/enemies/level1/2.png");
    this.load.image("laser-lvl1-2", "../assets/laser/yellow/round.png");
    this.load.image("enemy-lvl1-3", "../assets/enemies/level1/3.png");
    this.load.image("laser-lvl1-3", "../assets/laser/pink/round.png");

    // load chaser enemy
    this.load.image("chaser-enemy", "../assets/enemies/chaser.png");

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
    this.load.image("play-btn", "../assets/buttons/unpressed/play.png");
    this.load.image("play-btn-pressed", "../assets/buttons/pressed/play.png");

    // load audio
    this.load.audio("explode-sound", "../assets/sounds/sfx_explosion.wav");
    this.load.audio("laser-sound", "../assets/sounds/sfx_laser.ogg");
    this.load.audio("collect-sound", "../assets/sounds/sfx_collect.wav");
    this.load.audio("tap-sound", "../assets/sounds/sfx_tap.ogg");
    this.load.audio("lose-sound", "../assets/sounds/sfx_lose.ogg");
    this.load.audio("intro", "../assets/sounds/sfx_tap.ogg");
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
