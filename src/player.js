"use strict";

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.lives = lives;
    this.size = 90;
    this.x = canvas.width / 2; //x;
    this.y = canvas.height - 300; //y;
    this.direction = 0; // x - left to right
    this.directionY = 0; // y - top to bottom
    this.speedX = 6;
    this.speedY = 4;
    this.isStanding = false;
    //for gravity
    // this.obstacle = obs;

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

Player.prototype.updatePositionX = function () {
  this.x = this.x + this.direction * this.speedX;
};

Player.prototype.updatePositionY = function () {
  this.y = this.y + this.directionY * this.speedY;
  if (this.y > this.canvas.height) {
    this.y = this.canvas.height - this.size + 10;
  }
};

// Player.prototype.updatePosition = function () {
//   if (this.y <= 0) {
//   }
// };

Player.prototype.handleScreenCollision = function () {
  var screenLeft = 15;
  var screenRight = this.canvas.width - 105;

  if (this.x < screenLeft) {
    this.direction = 0;
    this.x = 0 + 15;
  } else if (this.x > screenRight) {
    this.direction = 0;
    this.x = this.canvas.width - this.size - 15;
  }

  if (this.y <= 0) {
    this.y += this.size + 5;
  }
};

Player.prototype.setDirectionY = function (direction, obstacle) {
  const obsTop = obstacle.y;

  if (direction === "up") {
    this.isStanding = true;
    this.directionY = -1;
    this.speedY = 2;
    this.y = obsTop - this.size; // reset the player to be on the obstacle
  } else if (direction === "down") {
    this.isStanding = false;
    this.directionY = 1;
    this.speedY = 1;
  }
};

Player.prototype.didCollideObstacle = function (obs) {
  // check if player is touching (standing on) obstacle
  // and use this to make him fall

  const obsTop = obs.y;
  const obsLeft = obs.x;
  const obsRight = obs.x + obs.width;
  const obsBottom = obs.y + obs.height;

  const playerBottom = this.y + this.size;
  const playerLeft = this.x;
  const playerRight = this.x + this.size;

  const crossTop = playerBottom >= obsTop && playerBottom <= obsBottom;
  const playerIsInside = playerLeft >= obsLeft && playerRight <= obsRight;

  const isNowStanding = crossTop && playerIsInside;

  if (isNowStanding) {
    console.log("\n UP \n");
    return true;
  } else if (!isNowStanding) {
    // if falling
    return false;
  }
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
