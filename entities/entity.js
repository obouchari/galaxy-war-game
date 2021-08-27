import Phaser from "phaser";

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  explode() {
    if (!this.getData("isDead")) {
      // Set the texture to the explosion image, then play the animation
      this.setTexture("explosion"); // this refers to the same animation key we used when we added this.anims.create previously
      this.play("explosion"); // play the animation

      // pick a random explosion sound within the array we defined in this.sfx in SceneMain
      this.scene.sfx.explosion.play();

      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on(
        "animationcomplete",
        function () {
          this.destroy();
        },
        this
      );

      this.setData("isDead", true);
    }
  }
}

export default Entity;
