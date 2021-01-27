"use strict";

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.lives = lives;
    this.size = 90;
    this.x = canvas.width / 2;
    this.y = canvas.height - 90;
    this.direction = 0;
    this.speed = 6;
    // this.canShootBullet = true;
  }
}

Player.prototype.setDirection = function (direction) {
  // +1 down -1 up
  if (direction === "right") this.direction = 1;
  else if (direction === "left") this.direction = -1;
  else if (direction === "stop") this.direction = 0;
};

Player.prototype.didCollideBig = function (bigEnemy) {
  const playerLeft = this.x;
  const playerRight = this.x + this.size;
  const playerTop = this.y;
  const playerBottom = this.y + this.size;

  const bigEnemyLeft = bigEnemy.x;
  const bigEnemyRight = bigEnemy.x + bigEnemy.size;
  const bigEnemyTop = bigEnemy.y;
  const bigEnemyBottom = bigEnemy.y + bigEnemy.size;
  // Check if the Big enemy intersects any of the player's sides
  const bigCrossLeft =
    bigEnemyLeft <= playerRight && bigEnemyLeft >= playerLeft;
  const bigCrossRight =
    bigEnemyRight >= playerLeft && bigEnemyRight <= playerRight;
  const bigCrossBottom =
    bigEnemyBottom >= playerTop && bigEnemyBottom <= playerBottom;
  const bigCrossTop = bigEnemyTop <= playerBottom && bigEnemyTop >= playerTop;

  if ((bigCrossLeft || bigCrossRight) && (bigCrossTop || bigCrossBottom)) {
    return true;
  }
  return false;
};

Player.prototype.handleScreenCollision = function () {
  var screenLeft = 15;
  var screenRight = this.canvas.width - 105;
  this.x = this.x + this.direction * this.speed;

  if (this.x < screenLeft) this.direction = 0;
  else if (this.x > screenRight) this.direction = 0;
};

Player.prototype.removeLife = function () {
  this.lives -= 1;
};

Player.prototype.draw = function () {
  // this.ctx.fillStyle = 'red';
  // this.ctx.fillRect(this.x, this.y, this.size, this.size);
  this.imgChar = new Image(); // Create new <img> element
  this.imgChar.src = "img/gengar-f.png"; // Set source path
  this.ctx.drawImage(this.imgChar, this.x, this.y, this.size, this.size);
};
