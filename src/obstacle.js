"use strict";
const imgObstacle = new Image();
imgObstacle.src = "img/goldblock.png";

class Obstacle {
  constructor(canvas, speed, x, width) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    // this.color = color;
    this.x = x;
    this.y = this.canvas.height + 30;
    this.speed = speed;
    this.width = width;
    this.height = 20;
    this.size = this.width * this.height;
    // this.imgObstacle = new Image();s
    // this.imgObstacle.src = "/img/goldBlock.png";
  }
}

Obstacle.prototype.draw = function () {
  // this.ctx.fillStyle = this.color;
  this.ctx.drawImage(imgObstacle, this.x, this.y, this.width, this.height);

  //this was for DOM
  // var block = document.createElement("div");
  // var hole = document.createElement("div");
  // block.setAttribute("class", "block");
  // hole.setAttribute("class", "hole");
  // block.setAttribute("id", "block");
  // hole.setAttribute("id", "hole");
};

Obstacle.prototype.updatePosition = function () {
  this.y = this.y - this.speed;
};

Obstacle.prototype.isInsideScreen = function () {
  return this.y + this.size > 0 && this.x + this.size < this.canvas.width;
};
