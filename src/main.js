"use strict";

// Creates DOM elements from a string representation
function buildDom(htmlstring) {
  var div = document.createElement("div");
  div.innerHTML = htmlstring;
  return div.children[0];
}

// Runs on initial start and contains calls all other functions that manage the game

let game; // instance of the Game
let splashScreen; // Start Screen
let gameScreen;
let gameOverScreen;
// let youWonScreen;
let splashScreenMusic = new Audio("songs/pokemonSong.mp3");
let gameOverSound = new Audio("");
let gameOverMusic = new Audio("");

// -- splash screen

function createSplashScreen() {
  removeGameOverScreen();
  gameOverMusic.pause();
  gameOverSound.pause();

  splashScreen = buildDom(`
		<main class="splash-screen-container">
			<h1>Gengar Run!!</h1>
			<img src="/img/gengar-f.png" style="width: 100px;" style="height: 100px;"/>
			<button>Start game</button>

			<div class = 'instructions-div'>
				<p class = 'instructions' >Use left/right arrows to move the player</p>
				<p class = 'instructions' >Use down arrow to stop the player</p>
			</div>

		</main>
	`);

  splashScreenMusic.currentTime = 0;
  splashScreenMusic.volume = 0.4;
  splashScreenMusic.play("songs/pokemonSong.mp3");

  document.body.appendChild(splashScreen);

  var startButton = splashScreen.querySelector("button");
  // startButton.addEventListener('click', function() {
  // });
  startButton.addEventListener("click", startGame);
  //Game started
}

function removeSplashScreen() {
  // remove() is the DOM element that removes the Node from the page
  splashScreen.remove();
  splashScreenMusic.pause();
}

// -- create game screen

function createGameScreen() {
  gameScreen = buildDom(`
			<main class="game-container">
				<header>
					<div class="lives">
						<span class="label">Lives:</span>
						<span class="value"></span>
					</div>
					<div class="score">
						<span class="label">Score:</span>
						<span class="value"></span>
					</div>
				</header>
				<div class="canvas-container">
					<canvas></canvas>
				</div>
			</main>
		`);

  document.body.appendChild(gameScreen);

  return gameScreen;
}

function removeGameScreen() {
  game.removeGameScreen();
}

// -- game over screen

function createGameOverScreen(score) {
  gameOverScreen = buildDom(`
			<main class= 'gameOver-screen-container'>
				<h1>You have been catch</h1>
				<p class= 'game-score'>Your score: <span></span></p>
				<button>Restart</button>
				<p class = 'instructions'>Press button to go to the main screen</p>
			</main>			  
		`);

  // gameOverMusic.play();
  gameOverMusic.currentTime = 0;
  gameOverMusic.volume = 0.3;

  // gameOverSound.play();
  gameOverSound.currentTime = 0;
  gameOverSound.volume = 0.4;

  const button = gameOverScreen.querySelector("button");
  button.addEventListener("click", createSplashScreen);

  const scoreSpan = gameOverScreen.querySelector(".game-score span");
  scoreSpan.textContent = score;

  document.body.appendChild(gameOverScreen);
}

function removeGameOverScreen() {
  if (gameOverScreen !== undefined) {
    gameOverScreen.remove();
  }
}

// -- you win screen

// function createyouWinScreen(score) {}

// function removeyouWinScreen() {}

// -- Setting the game state

function startGame() {
  removeSplashScreen();
  removeGameOverScreen();

  game = new Game();
  game.gameScreen = createGameScreen();
  // var gameScreen = createGameScreen();
  game.start();
}

function gameOver(score) {
  clearInterval(game.intervalId);
  removeGameScreen();
  createGameOverScreen(score);
}

// function youWin() {}

//splashScreenMusic.play();
splashScreenMusic.currentTime = 0;
splashScreenMusic.volume = 0.4;

// -- initialize Splash screen on initial start
window.addEventListener("load", createSplashScreen);
