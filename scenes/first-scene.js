import Phaser from "phaser";
import { random } from "lodash";

import Player from "../entities/player";
import GunShipEnemy from "../entities/gun-ship-enemy";
import ChaserEnemy from "../entities/chaser-enemy";
import Life from "../entities/life";

import playerStats from "../player-stats";

import MainScene from "./main-scene";

class FirstScene extends MainScene {
  constructor() {
    super({ key: "FirstScene" });
  }

  init(data) {
    this.selectedShip = data.ship;
  }

  // Create the scene
  create() {
    super.create.call(this);

    // create hp indicator
    this.hp = this.add.sprite(40, 40, "hp", 20).setOrigin(0);

    // Create explosion animation
    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
    });

    // Add sound effects
    this.sfx = {
      explosion: this.sound.add("explode-sound"),
      laser: this.sound.add("laser-sound"),
      collect: this.sound.add("collect-sound"),
    };

    // Add player
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.85,
      this.selectedShip,
      {
        key: `${this.selectedShip}-laser`,
      }
    );

    // Define control keys
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    // this.input.mouse.onMouseMove
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Add enemies
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    this.lives = this.add.group();

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        const randEnemyIndex = random(1, 3);
        let enemy;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShipEnemy(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
            `enemy-lvl1-${randEnemyIndex}`,
            {
              key: `laser-lvl1-${randEnemyIndex}`,
              delay: 2000,
            }
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("ChaserEnemy").length < 5) {
            enemy = new ChaserEnemy(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
              "chaser-enemy"
            );
          }
        } else {
          // TODO: Add carrier ships
        }

        if (enemy) {
          // enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },

      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 10000,
      callback: () => {
        let life;
        if (Phaser.Math.Between(0, 10) === 5) {
          life = new Life(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
            "life"
          );
        }

        if (life) {
          this.lives.add(life);
        }
      },
      callbackScope: this,
      loop: true,
    });

    // detect collision between player's laser and enemies
    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      function (playerLaser, enemy) {
        if (enemy) {
          if (enemy.onDestroy) {
            enemy.onDestroy();
          }

          enemy.explode(true);
          playerLaser.destroy();
        }
      }
    );

    // detect collision between player and life
    this.physics.add.overlap(this.player, this.lives, function (player, life) {
      if (!player.getData("isDead") && !life.getData("isDead")) {
        if (playerStats.hp < 100) {
          playerStats.updateHp(5);
        }
        life.destroy();
      }
    });

    // detect collision between player and enemy's laser
    this.physics.add.overlap(
      this.player,
      this.enemyLasers,
      function (player, enemyLaser) {
        if (!player.getData("isDead") && !enemyLaser.getData("isDead")) {
          if (playerStats.hp > 0) {
            playerStats.updateHp(-5);
          }
          enemyLaser.destroy();
        }
      }
    );

    // detect collision between player and enemies
    this.physics.add.overlap(
      this.player,
      this.enemies,
      function (player, enemy) {
        if (!player.getData("isDead") && !enemy.getData("isDead")) {
          player.explode(false);
          player.onDestroy();
          enemy.explode(true);
        }
      }
    );
  }

  updateHpUI() {
    this.hp.setFrame(playerStats.hp * 0.2);
    if (playerStats.hp === 0 && !this.player.getData("isDead")) {
      this.player.explode(false);
      this.player.onDestroy();
    }
  }

  //  Update the scene
  update() {
    super.update.call(this);

    this.updateHpUI();

    if (!this.player.getData("isDead")) {
      this.player.update();

      // Hook control keys to player (spaceship) movements
      if (this.keyW.isDown) this.player.moveUp();
      else if (this.keyS.isDown) this.player.moveDown();
      if (this.keyA.isDown) this.player.moveLeft();
      else if (this.keyD.isDown) this.player.moveRight();

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      } else {
        this.player.setData(
          "timerShootTick",
          this.player.getData("timerShootDelay") - 1
        );
        this.player.setData("isShooting", false);
      }

      for (const enemy of this.enemies.getChildren()) {
        enemy.update();
        this.destroyOutOffDisplay(enemy);
      }
    }

    for (const enemyLaser of this.enemyLasers.getChildren()) {
      enemyLaser.update();
      this.destroyOutOffDisplay(enemyLaser);
    }

    for (const playerLaser of this.playerLasers.getChildren()) {
      playerLaser.update();
      this.destroyOutOffDisplay(playerLaser);
    }
  }

  // find enemies by type (Gun Ship, Chaser, Carrier Ship)
  getEnemiesByType(type) {
    return this.enemies
      .getChildren()
      .filter((enemy) => enemy.getData("type") === type);
  }

  // Destroy objects out of display view to prevent lagging
  destroyOutOffDisplay(object) {
    if (
      object.x < -object.displayWidth ||
      object.x > this.game.config.width + object.displayWidth ||
      object.y < -object.displayHeight * 4 ||
      object.y > this.game.config.height + object.displayHeight
    ) {
      if (object) {
        if (object.onDestroy !== undefined) {
          object.onDestroy();
        }

        object.destroy();
      }
    }
  }
}

export default FirstScene;
