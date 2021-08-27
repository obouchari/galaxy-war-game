import Phaser from "phaser";
import Entity from "./entity";
import PlayerLaser from "./player-laser";

class Player extends Entity {
  constructor(scene, x, y, key, laser) {
    super(scene, x, y, key, "Player");

    this.setData("speed", 500);
    this.setData("isShooting", false);
    this.setData("timerShootDelay", 10);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    this.laser = laser;
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }

  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }

  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }

  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  update() {
    this.body.setVelocity(0, 0);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else {
        // when the "manual timer" is triggered:
        var playerLaser = new PlayerLaser(
          this.scene,
          this.x,
          this.y - this.height,
          this.laser.key
        );
        this.scene.playerLasers.add(playerLaser);

        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData("timerShootTick", 0);
      }
    }
  }
}

export default Player;
