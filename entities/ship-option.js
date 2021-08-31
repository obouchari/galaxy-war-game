class ShipOption {
  constructor(scene, x, outlineWidth, key) {
    this.scene = scene;
    this.x = x;
    this.outlineWidth = outlineWidth;
    this.padding = {
      x: 20,
      y: 20,
    };
    this.key = key;
  }

  create() {
    const { height } = this.scene.game.config;
    this.y = height * 0.5 - 100;
    this.image = this.scene.add.sprite(this.x, this.y, this.key);
    const outline = this.scene.add.graphics();
    outline.lineStyle(4, 0x573280, 1);
    outline.strokeRoundedRect(
      this.x - (this.outlineWidth * 0.5 + this.padding.x),
      this.y - (this.image.height * 0.5 + this.padding.y),
      this.outlineWidth + this.padding.x * 2,
      this.image.height + this.padding.y * 2,
      16
    );
  }

  select() {
    this.selectOutline = this.scene.add.graphics();
    this.selectOutline.lineStyle(4, 0xffffff, 1);
    this.selectOutline.strokeRoundedRect(
      this.x - (this.outlineWidth * 0.5 + this.padding.x),
      this.y - (this.image.height * 0.5 + this.padding.y),
      this.outlineWidth + this.padding.x * 2,
      this.image.height + this.padding.y * 2,
      16
    );
  }

  deselect() {
    if (this.selectOutline) this.selectOutline.destroy();
  }

  get selected() {
    return this.key;
  }
}

export default ShipOption;
