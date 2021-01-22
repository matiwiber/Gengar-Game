var character = document.getElementById("img");

function moveLeft() {
  var left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );

  if (left > 0) {
    character.style.left = left - 2 + "px";
  }
}

function moveRight() {
  var left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );

  if (left < 475) {
    character.style.left = left + 2 + "px";
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
