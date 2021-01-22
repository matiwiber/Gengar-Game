var character = document.getElementById("img");
var game = document.getElementById("game");
var interval;
var both = 0;
// var counter = 0;
// var currentBlocks = [];
// var gengar = document.createElement("img");
// gengar.setAttribute("class", "character");
// gengar.setAttribute("id", "gengar");

function moveLeft() {
  var left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );

  if (left > 0) {
    character.style.left = left - 1 + "px";
  }
}

function moveRight() {
  var left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );

  if (left < 475) {
    character.style.left = left + 1 + "px";
  }
}

document.addEventListener("keydown", (event) => {
  if (both == 0) {
    both++;

    if (event.key === "ArrowLeft") {
      interval = setInterval(moveLeft, 1);
    }
    if (event.key === "ArrowRight") {
      interval = setInterval(moveRight, 1);
    }
  }
});

document.addEventListener("keyup", (event) => {
  clearInterval(interval);
  both = 0;
});

// add obstacles
var block = document.createElement("img");
var hole = document.createElement("div");
block.setAttribute("class", "block");
block.setAttribute("src", "/img/goldBlock.png");
hole.setAttribute("class", "hole");
block.setAttribute("id", "block");
hole.setAttribute("id", "hole");
game.appendChild(block);
game.appendChild(hole);
