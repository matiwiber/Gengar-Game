"use strict";

class BigEnemy {
  constructor(canvas, y, speed, source) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 130;
    this.x = y;
    this.y = 0;
    this.speed = speed;
    this.bigEnemyImage = new Image();
    this.bigEnemyImage.src = source;
  }
}

BigEnemy.prototype.draw = function () {
  this.ctx.drawImage(this.bigEnemyImage, this.x, this.y, this.size, this.size);
};

BigEnemy.prototype.updatePosition = function () {
  this.y = this.y + this.speed;
};

BigEnemy.prototype.isInsideScreen = function () {
  return this.y + this.size > 0 && this.x + this.size < this.canvas.width;
};
