var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;

document.addEventListener("keyup", (event) => {
  clearInterval(interval);
  both = 0;
}); //stop moving
