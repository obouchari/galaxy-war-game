import { random } from "lodash";

import Entity from "./entity";
import EnemyLaser from "./enemy-laser";

class GunShipEnemy extends Entity {
  constructor(scene, x, y, key, laser) {
    super(scene, x, y, key, "GunShipEnemy");

    this.body.velocity.y = Phaser.Math.Between(20, 80);

    this.shootTimer = this.scene.time.addEvent({
      delay: laser.delay,
      callback: function () {
        const enemyLaser = new EnemyLaser(
          this.scene,
          this.x,
          this.y + this.height,
          laser.key
        );
        enemyLaser.setScale(this.scaleX);
        this.scene.enemyLasers.add(enemyLaser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer) {
      this.shootTimer.remove(false);
    }
  }
}

export default GunShipEnemy;
