"use strict";

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    // this.bullets = [];
    // this.shooterBullets = [];
    this.enemies = [];
    this.bigEnemies = [];
    this.obstacles = [];
    this.player = null;
    // this.shooter = null;
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
    this.backImg1 = new Image(); // Create new <img> elementgit
    this.backImg1.src = "Presentation/NuYQWdw.png"; // Set source path
    this.printBigEnemy = true;
    this.counter = 0;
    // this.bonusSound = new Audio("");
    this.crashSoundBig = new Audio("");
    this.crashSound = new Audio("");
    // this.bulletSound = new Audio("s");
    // this.gameOverSound = new Audio ('s');
    // this.gameOverMusic = new Audio ('');
    this.splasScreenMusic = new Audio("songs/pokemonSong.mp3");
  }
}

Game.prototype.start = function () {
  // this.splasScreenMusic.volume = 0.2;
  // this.splasScreenMusic.play("songs/pokemonSong.mp3");
  // this.crashSound.currentTime = 0;
  // this.crashSound.volume = 0.4;
  // this.crashSound.play();
  console.log("in start()");

  // Save reference to canvas and container. Create ctx
  this.canvasContainer = document.querySelector(".canvas-container");
  this.gameContainer = document.querySelector(".game-container");

  this.canvas = this.gameScreen.querySelector("canvas");
  this.ctx = this.canvas.getContext("2d");

  // Save reference to the score and lives elements
  this.livesElement = this.gameContainer.querySelector(".lives .value");
  this.scoreElement = this.gameContainer.querySelector(".score .value");

  // Set the canvas dimensions to match the parent
  this.containerWidth = this.canvasContainer.offsetWidth;
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute("width", this.containerWidth);
  this.canvas.setAttribute("height", this.containerHeight);

  // Create a new player for the current game
  this.player = new Player(this.canvas, 1);
  // // Create a new shooter for the current game
  // this.shooter = new Shooter(this.canvas);

  // Add event listener for moving the player.Event listener callback function
  this.handleKeyDown = function (event) {
    if (event.key === "ArrowRight") {
      console.log("RIGHT");
      this.player.setDirection("right");
    } else if (event.key === "ArrowLeft") {
      console.log("LEFT");
      this.player.setDirection("left");
    } else if (event.key === "ArrowDown") {
      console.log("STOP");
      this.player.setDirection("stop");
      // } else if (event.key === "s") {
      //   console.log("SHOOT");
      //   this.createBullet();
      // }
    }
  };

  /*this.bigEnemies.forEach(function (bigEnemy) {
    if (this.player.didCollideBig(bigEnemy)) {
      this.player.removeLife();
      console.log("lives", this.player.lives);
      //Move the enemy offscreen
      bigEnemy.x = 0 - bigEnemy.size;

      if (this.player.lives > 0) {
        this.crashSoundBig.currentTime = 0;
        this.crashSoundBig.volume = 0.2;
        // this.crashSoundBig.play();
      } else if (this.player.lives === 0) {
        this.gameOver();
      }
    }
  }, this);*/

  document.body.addEventListener("keydown", this.handleKeyDown.bind(this));

  // Start the canvas requestAnimationFrame loop
  this.startLoop();
};

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

Game.prototype.createObstacle = function () {
  // var randomX = this.canvas.width * Math.random();

  const startRange = 100;
  const endRange = this.canvas.width - 200;
  const holeX = getRandomNumber(startRange, endRange);
  const HOLE_WIDTH = 100;

  const leftBlockX = 0;
  const leftBlockWidth = holeX;

  const rightBlockX = holeX + HOLE_WIDTH;
  const rightBlockWidth = this.canvas.width - (holeX + HOLE_WIDTH);

  const newBlockLeft = new Obstacle(this.canvas, 2, leftBlockX, leftBlockWidth);
  const newBlockRight = new Obstacle(
    this.canvas,
    2,
    rightBlockX,
    rightBlockWidth
  );

  //const newBlock = new Obstacle(this.canvas, 5, randomX, width);
  this.obstacles.push(newBlockLeft, newBlockRight);

  //remove blocks
};

Game.prototype.createBigEnemy = function (source) {
  var randomX = this.canvas.width * Math.random();
  var newBigEnemy = new BigEnemy(this.canvas, randomX, 1, source);
  this.bigEnemies.push(newBigEnemy);
};

Game.prototype.createEnemy = function (source) {
  var randomX = this.canvas.width * Math.random();
  var newEnemy = new Enemy(this.canvas, randomX, 2, source);
  this.enemies.push(newEnemy);
};

// Game.prototype.createFastEnemy = function (source) {
//   var randomX = this.canvas.width * Math.random();
//   var newFastEnemy = new Enemy(this.canvas, randomX, 4, source);
//   this.enemies.push(newFastEnemy);
// };

Game.prototype.startLoop = function () {
  console.log("In startLoop");
  var loop = function () {
    // 1. Create new Big enemies with set time intervals
    this.counter++;
    // console.log(this.counter);

    // if (this.counter % 200 === 0) {
    //   // 60times/sec ==> 3.2sec
    //   console.log("shooter bullet");
    //   // this.createShooterBullet("");

    /*} else*/ if (this.counter % 300 === 0) {
      console.log(this.counter);
      this.createBigEnemy("img/pokeball.png");
    } /*else if (this.counter % 450 === 0) {*/
    //   console.log(this.counter);
    //   // this.createBigEnemy("");
    // } else if (this.counter % 500 === 0) {
    //   console.log(this.counter);
    //   // this.createBigEnemy("");
    // }

    //speed of the obstacle
    if (this.counter % 80 === 0) {
      this.createObstacle();

      // this.createFastEnemy("./img/pokeball.png");
    } /*else if (Math.random() > 0.997) {
      //   this.createFastEnemy("");
      // } else if (Math.random() > 0.993) {
      //   this.createEnemy("");
      // } else if (Math.random() > 0.998) {
      //   this.createEnemy("");
    }*/
    //change color if lives is < 4
    if (this.player.lives <= 3) {
      document
        .querySelector(".lives")
        .setAttribute("style", "color: rgb(196, 41, 41)");
    } else if (this.player.lives >= 4) {
      document
        .querySelector(".lives")
        .setAttribute("style", "color: rgb(34, 228, 34)");
    }

    //Checks if enemies hit the player
    this.checkCollisions();
    this.checkTopCollide();
    //Checks if bullets hits the enemies
    // if (this.bullets.length > 0 && this.enemies.length > 0) {
    //   this.checkbulletEnemyCollisions();
    // }

    //Keeps player inside the frame
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];

      if (this.player.didCollideObstacle(obstacle)) {
        this.player.setDirectionY("up", obstacle);
        break;
      } else {
        this.player.setDirectionY("down", obstacle);
      }
    }

    // this.player.updatePosition();
    this.player.updatePositionY();
    this.player.updatePositionX();
    this.player.handleScreenCollision();
    //Keeps player inside the frame
    // this.shooter.handleScreenCollision();

    //Check if any enemy is going off the screen
    this.obstacles = this.obstacles.filter(function (obstacle) {
      obstacle.updatePosition();
      //return obstacle.isInsideScreen();
      return true;
    });

    this.enemies = this.enemies.filter(function (enemy) {
      enemy.updatePosition();
      return enemy.isInsideScreen();
    });

    this.bigEnemies = this.bigEnemies.filter(function (bigEnemy) {
      bigEnemy.updatePosition();
      return bigEnemy.isInsideScreen();
    });

    // this.bullets = this.bullets.filter(function (bullet) {
    //   bullet.update();
    //   // return bullet;
    //   return bullet.isInsideScreen();
    // });

    // this.shooterBullets = this.shooterBullets.filter(function (shooterBullet) {
    //   shooterBullet.update();
    //   // return shooterBullet;
    //   return shooterBullet.isInsideScreen();
    // });

    // 2. CLEAR CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 3. UPDATE CANVAS
    //draw background
    this.ctx.drawImage(
      this.backImg1,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.player.draw();

    this.obstacles.forEach(function (oneObstacle) {
      oneObstacle.draw();
    });
    // console.log("Im here!");
    // this.enemies.forEach(function (enemy) {
    //   enemy.draw();
    // });

    this.bigEnemies.forEach(function (bigEnemy) {
      bigEnemy.draw();
    });

    // this.bullets.forEach(function (bullet) {
    //   bullet.draw();
    // });

    // this.shooterBullets.forEach(function (shooterBullet) {
    //   shooterBullet.draw();
    // });

    // 4. TERMINATE LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    } else gameOver(score);

    this.updateGamesStats();
  }.bind(this);

  // As loop function will be continuously invoked by
  // the `window` object- `window.requestAnimationFrame(loop)`
  // we have to bind the function so that value of `this` is
  // pointing to the `game` object, like this:
  // var loop = (function(){}).bind(this);

  window.requestAnimationFrame(loop);
};

Game.prototype.checkCollisions = function () {
  // this.enemies.forEach(function (enemy) {
  //   if (this.player.didCollide(enemy)) {
  //     this.player.removeLife();
  //     console.log("lives", this.player.lives);
  //     //Move the enemy offscreen
  //     enemy.x = 0 - enemy.size;

  //     if (this.player.lives > 0) {
  //       // this.crashSound.currentTime = 0;
  //       // this.crashSound.volume = 0.4;
  //       // this.crashSound.play();
  //     } else if (this.player.lives === 0) {
  //       this.gameOver();
  //     }
  //   }
  // }, this);

  this.bigEnemies.forEach(function (bigEnemy) {
    if (this.player.didCollideBig(bigEnemy)) {
      this.player.removeLife();
      console.log("lives", this.player.lives);
      //Move the enemy offscreen
      bigEnemy.x = 0 - bigEnemy.size;

      if (this.player.lives > 0) {
        this.crashSoundBig.currentTime = 0;
        this.crashSoundBig.volume = 0.2;
        // this.crashSoundBig.play();
      } else if (this.player.lives === 0) {
        this.gameOver();
      }
    }
  }, this);

  // this.shooterBullets.forEach(function (shooterBullet) {
  //   if (this.player.didCollideShooterBullet(shooterBullet)) {
  //     this.player.removeLife();
  //     console.log("lives", this.player.lives);
  //     //Move the shooterBullet offscreen
  //     shooterBullet.x = 0 - shooterBullet.size;

  // We have to pass `this` value as the second argument
  // as array method callbacks have a default `this` of undefined.
};

// 6. Check if bullets hit enemies
// Game.prototype.checkbulletEnemyCollisions = function () {
//   this.enemies.forEach(function (enemy) {
//     this.bullets.forEach(function (bullet) {
//       if (bullet.didCollide(enemy)) {
//         enemy.y = this.canvas.height + 2000;
//         bullet.y = 0 - 2000;
//         this.score = this.score + 10;
//         console.log("this is the", this.score);
//       }
//     }, this);
//   }, this);
// };

Game.prototype.updateGamesStats = function () {
  this.livesElement.innerHTML = this.player.lives;
  this.scoreElement.innerHTML = this.score;
  this.score = this.score + 1;
};

// Game.prototype.createBullet = function () {
//   if (this.player.canShootBullet) {
//     var playerPositionX = this.player.x;
//     var newBullet = new Bullet(this.canvas, playerPositionX);
//     this.bullets.push(newBullet);

//     this.bulletSound.currentTime = 0;
//     this.bulletSound.volume = 0.05;
//     this.bulletSound.play();

//     //can shoot or not
//     this.player.canShootBullet = false;

//     //timeout for shooting
//     setTimeout(
//       function () {
//         this.player.canShootBullet = true;
//       }.bind(this),
//       300
//     );
//   }
//   // console.log("bullet created");
// };

Game.prototype.gameOver = function () {
  this.gameIsOver = true;

  gameOver(game.score);
};

Game.prototype.removeGameScreen = function () {
  this.gameScreen.remove();
};

Game.prototype.checkTopCollide = function () {
  if (this.player.y <= 0) {
    this.gameOver();
  }
};
