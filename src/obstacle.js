"use strict";

class Obstacle {
  constructor(canvas, ctx, speed, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.color = color;
    this.x = x;
    this.y = this.canvas.height + 30;
    this.speed = speed;
    this.width = width;
    this.height = 20;
    this.size = this.width * this.height;
  }
}

Obstacle.prototype.draw = function () {
  this.imgObstacle = new Image();
  this.imgObstacle.src = "/img/goldBlock.png";
  this.ctx.fillStyle = this.color;
  this.ctx.drawImage(this.imgObstacle, this.x, this.y, this.width, this.height);

  //this was for DOM
  // var block = document.createElement("div");
  // var hole = document.createElement("div");
  // block.setAttribute("class", "block");
  // hole.setAttribute("class", "hole");
  // block.setAttribute("id", "block");
  // hole.setAttribute("id", "hole");
};

Obstacle.prototype.updatePosition = function () {
  this.x = this.x - this.speed;
};

Obstacle.prototype.isInsideScreen = function () {
  return this.y + this.size > 0 && this.x + this.size < this.canvas.width;
};
