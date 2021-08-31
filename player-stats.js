class PlayerStats {
  constructor() {
    this.hp = 100;
    this.bestScore = 0;
    this.score = 0;
  }

  resetHp() {
    this.hp = 100;
  }

  updateHp(point) {
    this.hp += point;
  }

  updateScore(score) {
    this.score += score;
  }

  updateBestScore() {
    if (this.score > this.bestScore) this.bestScore = this.score;
  }
}

export default new PlayerStats();
