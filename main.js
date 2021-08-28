import Phaser from "phaser";
import MainMenuScene from "./scenes/scene-main-menu";
import FirstScene from "./scenes/first-scene";
import GameOverScene from "./scenes/scene-game-over";
import screenSize from "./utils/screen-size";

import "normalize.css";
import "./style.css";

// Set the configuration of the game
const config = {
  type: Phaser.AUTO,
  width: screenSize.vw,
  height: screenSize.vh,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [MainMenuScene, FirstScene, GameOverScene],
};

export default new Phaser.Game(config);
