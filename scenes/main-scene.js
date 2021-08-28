import Phaser from "phaser";
import spaceImg from "../assets/backgrounds/nebula-blue.png";
import smallStarsImg from "../assets/backgrounds/stars-small_1.png";
import bigStarsImg from "../assets/backgrounds/stars-big_1_1_pc.png";
import playerImg from "../assets/ships/ship-1.png";
import playerLaserImg from "../assets/laser/blue/short-ray.png";
import explosionImg from "../assets/effects/space-ship-explosion.png";
import enemy1Lvl1Img from "../assets/enemies/level1/1.png";
import enemy1Lvl1LaserImg from "../assets/laser/blue/round.png";
import enemy2Lvl1Img from "../assets/enemies/level1/2.png";
import enemy2Lvl1LaserImg from "../assets/laser/yellow/round.png";
import enemy3Lvl1Img from "../assets/enemies/level1/3.png";
import enemy3Lvl1LaserImg from "../assets/laser/pink/round.png";
import chaserImg from "../assets/enemies/chaser.png";
import playBtnImg from "../assets/buttons/unpressed/play.png";
import playBtnPressedImg from "../assets/buttons/pressed/play.png";
import gameLogoImg from "../assets/logo.png";
import homeScreenAliensImg from "../assets/alien.png";
import homeScreenSoldiersImg from "../assets/space-soldier.png";

import explosionSFX from "../assets/sounds/sfx_explosion.wav";
import laserSFX from "../assets/sounds/sfx_laser.ogg";
import collectSFX from "../assets/sounds/sfx_collect.wav";
import tapSFX from "../assets/sounds/sfx_tap.ogg";
import loseSFX from "../assets/sounds/sfx_lose.ogg";
import introMusic from "../assets/sounds/intro.mp3";

class MainScene extends Phaser.Scene {
  constructor(scene) {
    super(scene);
  }

  preload() {
    // Load background image
    this.load.image("space", spaceImg);
    this.load.image("small-stars", smallStarsImg);
    this.load.image("big-stars", bigStarsImg);

    // Load player and laser
    this.load.image("player", playerImg, {
      frameWidth: 40,
      frameHeight: 100,
    });
    this.load.image("player-laser", playerLaserImg);

    // load explosion effect
    this.load.spritesheet("explosion", explosionImg, {
      frameWidth: 96,
      frameHeight: 93,
    });

    // TODO: add asteroids

    // load level 1 enemies and laser
    this.load.image("enemy-lvl1-1", enemy1Lvl1Img);
    this.load.image("laser-lvl1-1", enemy1Lvl1LaserImg);
    this.load.image("enemy-lvl1-2", enemy2Lvl1Img);
    this.load.image("laser-lvl1-2", enemy2Lvl1LaserImg);
    this.load.image("enemy-lvl1-3", enemy3Lvl1Img);
    this.load.image("laser-lvl1-3", enemy3Lvl1LaserImg);

    // load chaser enemy
    this.load.image("chaser-enemy", chaserImg);

    // TODO: add different enemy levels

    // load buttons
    this.load.image("play-btn", playBtnImg);
    this.load.image("play-btn-pressed", playBtnPressedImg);

    // load audio
    this.load.audio("explode-sound", explosionSFX);
    this.load.audio("laser-sound", laserSFX);
    this.load.audio("collect-sound", collectSFX);
    this.load.audio("tap-sound", tapSFX);
    this.load.audio("lose-sound", loseSFX);
    this.load.audio("intro", introMusic);

    // load game logo
    this.load.image("game-logo", gameLogoImg);
    // load main menu screen characters
    this.load.image("alien", homeScreenAliensImg);
    this.load.image("space-soldier", homeScreenSoldiersImg);
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
