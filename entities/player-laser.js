import Entity from "./entity";

class PlayerLaser extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.body.velocity.y = -200;
  }
}

export default PlayerLaser;
