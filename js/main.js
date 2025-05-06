console.log("probando");

/* Screen */
const splashScreenNode = document.querySelector("#splashscreen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreen = document.querySelector("#game-over-screen");

/* Buttons */
const startBtnNode = document.querySelector("#startButton");
const resetBtn = document.querySelector("#resetButton");

/* Game box */
const gameBoxNode = document.querySelector("#game-box");
const hearts = document.querySelectorAll("#life-counter img");

/* VARIABLES GLOBALES DEL JUEGO */
let pulpitoObj = null; // es para poder agregar el obj del pulpito aqui, pero que en TODO mi codigo pueda acceder a ella
// let trashOjb = null;
let trashArr = [];
let gameIntervalId = null;
let trashIntervalId = null;
let lives = 5;

/* GLOBAL FUNCTIONS OF THE GAME */

function startGame() {
  //1. ocultar la pantalla inicial
  splashScreenNode.style.display = "none";

  //2. mostrar la pantalla de juego
  gameScreenNode.style.display = "flex";

  //3. Añadimos los elements iniciados del juego
  pulpitoObj = new Pulpito();

  //4. Iniciamos intervalo principal del juego
  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));

  //5. Iniciamos otros intervalos del juego
  trashIntervalId = setInterval(() => {
    let trashObj = new Trash();
    trashArr.push(trashObj);
  }, 2000);
}

function gameLoop() {
  // console.log ("60fps")
  trashArr.forEach((eachTrashObj) => {
    eachTrashObj.automaticMovement();
  });
  trashDestroy();
  checkCollision();
}

function trashDestroy() {
  // verificar si existen trash en el array la primera tuberia que fue añadida ya ha salido de la caja de nuevo
  if (trashArr.length > 0 && trashArr[0].y >= 450) {
    //.1 destruir el nodo
    trashArr[0].node.remove();
    //2.remover del array
    trashArr.shift();
  }
}

function checkCollision() {
  trashArr.forEach((eachTrashObj, index) => {
    if (
      pulpitoObj.x < eachTrashObj.x + eachTrashObj.w &&
      pulpitoObj.x + pulpitoObj.w > eachTrashObj.x &&
      pulpitoObj.y < eachTrashObj.y + eachTrashObj.h &&
      pulpitoObj.y + pulpitoObj.h > eachTrashObj.y
    ) {
      // Collision detected!
      //console.log("El pulpito se ha colisionadoooooo")
      lives--;
      updatesLives();
      // removemos el trash
      eachTrashObj.node.remove();
      trashArr.splice(index, 1);

      console.log(lives);
      if (lives === 0) {
        gameOver();
      }
    }
  });
}

function gameOver() {
  // 1. detener los intervalos
  clearInterval(gameIntervalId);
  clearInterval(trashIntervalId);
  // 2. ocultar la pantalla de juego
  gameScreenNode.style.display = "none";
  // 3. mostrar pantalla final
  gameOverScreen.style.display = "flex";
}

function restart() {
  // ocultar pantalla de gameover
  gameOverScreen.style.display = "none";
  // mostrar pantalla de juego
  gameScreenNode.style.display = "flex";
  // resetear vidas
  lives = 5;
  // vaciar trash
  trashArr = [];
  // bora todo lo que hay en la caja de juego
  gameBoxNode.innerHTML = "";
  startGame();
}

function updatesLives() {
  hearts.forEach((heart, index) => {
    if (index < lives) {
      heart.classList.remove("lost");
    } else {
      heart.classList.add("lost");
    }
  });
}

/* EVENT LISTENERS */

startBtnNode.addEventListener("click", () => {
  startGame();
});

gameOverScreen.addEventListener("click", () => {
  restart();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    pulpitoObj.moveRight();
  }
  if (event.key === "ArrowLeft") {
    pulpitoObj.moveLeft();
  }
});
