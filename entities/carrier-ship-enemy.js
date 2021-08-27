import Entity from "./entity";

class CarrierShipEnemy extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, "CarrierShipEnemy");

    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}

export default CarrierShipEnemy;
