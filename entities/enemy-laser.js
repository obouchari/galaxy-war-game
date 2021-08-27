import Entity from "./entity";

class EnemyLaser extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.body.velocity.y = 200;
  }
}

export default EnemyLaser;
