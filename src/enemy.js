"use strict";

class Enemy {
  constructor(canvas, y, speed, source) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.size = 65;
    this.x = y;
    this.y = 0;
    this.speed = speed;
    this.enemyImg = new Image();
    this.enemyImg.src = source;
  }
}

Enemy.prototype.draw = function () {
  this.ctx.drawImage(this.enemyImg, this.x, this.y, this.size, this.size);
};

Enemy.prototype.updatePosition = function () {
  this.y = this.y + this.speed;
};

Enemy.prototype.isInsideScreen = function () {
  // if y plus half of its size is smaller than 0 return

  return this.y + this.size > 0 && this.x + this.size < this.canvas.width;
};
