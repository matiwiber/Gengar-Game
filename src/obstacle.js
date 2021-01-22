// add obstacles
var currentBlocks = [];

var blocks = setInterval(function () {
  var blockLast = document.getElementById("block" + (counter - 1));
  var holeLast = document.getElementById("hole" + (counter - 1));
  if (counter > 0) {
    var blockLastTop = parseInt(
      window.getComputedStyle(blockLast).getPropertyValue("top")
    );
    var holeLastTop = parseInt(
      window.getComputedStyle(holeLast).getPropertyValue("top")
    );
  }
  if (blockLastTop < 400 || counter == 0) {
    // cambiar 400 a dimension
    var block = document.createElement("canvas");
    var hole = document.createElement("div");
    block.setAttribute("class", "block");
    block.setAttribute("src", "/img/goldBlock.png");
    hole.setAttribute("class", "hole");
    block.setAttribute("id", "block" + counter);
    hole.setAttribute("id", "hole" + counter);
    block.style.top = blockLastTop + 100 + "px";
    hole.style.top = holeLastTop + 100 + "px";
    var random = Math.floor(Math.random() * 360); //360 * 445
    hole.style.left = random + "px";
    game.appendChild(block);
    game.appendChild(hole);
    currentBlocks.push(counter);
    counter++;
  }
  var characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  var characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  var drop = 0;
  if (characterTop <= 0) {
    alert("Game Over. Score: " + (counter - 9));
    clearInterval(blocks);
    location.reload();
  }

  for (var i = 0; i < currentBlocks.length; i++) {
    let current = currentBlocks[i];
    let iblock = document.getElementById("block" + current);
    let ihole = document.getElementById("hole" + current);
    let iblockTop = parseFloat(
      window.getComputedStyle(iblock).getPropertyValue("top")
    );
    let iholeLeft = parseFloat(
      window.getComputedStyle(ihole).getPropertyValue("left")
    );

    iblock.style.top = iblockTop - 0.5 + "px";
    ihole.style.top = iblockTop - 0.5 + "px";
    if (iblockTop < -20) {
      currentBlocks.shift();
      iblock.remove();
      ihole.remove();
    }
    //gravity
    if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
      drop++;
      if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
        drop = 0;
      }
    }
  }
  if (drop == 0) {
    if (characterTop < 630) {
      character.style.top = characterTop + 2 + "px";
    }
  } else {
    character.style.top = characterTop - 0.5 + "px";
  }
}, 1);

// window.onload = function () {
//   var imageCanvas = document.getElementById("block");
//   var ctx = imageCanvas.getContext("2d");
//   ctx.drawImage(block, 500, 15);
// };

// block.addEventListener("load", function () {
//   ctx.drawImage(block, 500, 15);
// });
