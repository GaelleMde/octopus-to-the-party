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
const shrimpcounterNode = document.querySelector("#shrimp-counter span");

/* Audio */
const musicGame = new Audio("./Audio/Deep Sea Antics.mp3");
const shrimpSound = new Audio("./Audio/eatShrimpsSounds.mp3");
const startSound = new Audio("./Audio/startTheGameSounds.mp3");
const punchSound = new Audio("./Audio/punch.mp3");

/* Game Over */
const scoreNode = document.querySelector("#game-over-screen span");

/* VARIABLES GLOBALES DEL JUEGO */
let pulpitoObj = null; // es para poder agregar el obj del pulpito aqui, pero que en TODO mi codigo pueda acceder a ella
// let trashOjb = null;
let trashArr = [];
let gameIntervalId = null;
let trashIntervalId = null;
let lives = 5;
let shrimpArr = [];
let shrimpIntervalid = null;
let shrimpcounter = 0;

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

  //5. Iniciamos intervalo de caida de los elementos de basura
  trashIntervalId = setInterval(() => {
    let trashObj = new Trash();
    trashArr.push(trashObj);
  }, 600);

  //6- Iniciamos intervalo de caida de los shrimps
  shrimpIntervalid = setInterval(() => {
    let shrimpObj = new Shrimp();
    shrimpArr.push(shrimpObj);
  }, Math.floor(Math.random() * 2000) + 3000);

  playStartSound();
  playMusicGame();
}

function gameLoop() {
  // console.log ("60fps")
  trashArr.forEach((eachTrashObj) => {
    eachTrashObj.automaticMovement();
  });
  shrimpArr.forEach((eachshrimpObj) => {
    eachshrimpObj.automaticMovement();
  });
  trashDestroy();
  shrimpDestroy();
  checkCollision();
  checkCollisionShrimp();
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

function shrimpDestroy() {
  if (shrimpArr.length > 0 && shrimpArr[0].y >= 450) {
    shrimpArr[0].node.remove();
    shrimpArr.shift();
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
      playPunchSound();

      // console.log(lives);
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
  musicGame.pause();
  scoreNode.innerText = shrimpcounter;
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
  updatesLives();
  // resetear number of shrimps
  shrimpcounter = 0;
  shrimpcounterNode.innerText = 0;
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

function checkCollisionShrimp() {
  shrimpArr.forEach((eachshrimpObj, index) => {
    if (
      pulpitoObj.x < eachshrimpObj.x + eachshrimpObj.w &&
      pulpitoObj.x + pulpitoObj.w > eachshrimpObj.x &&
      pulpitoObj.y < eachshrimpObj.y + eachshrimpObj.h &&
      pulpitoObj.y + pulpitoObj.h > eachshrimpObj.y
    ) {
      // Collision detected!
      //console.log("Te has comido el shrimp");

      // removemos el shrimp
      eachshrimpObj.node.remove();
      shrimpArr.splice(index, 1);
      updatesNumberShrimp();
      playShrimpSound();
    }
  });
}

function updatesNumberShrimp() {
  shrimpcounter++;
  shrimpcounterNode.innerText = shrimpcounter;
}

/* MUSIC FONCTIONS */

function playMusicGame() {
  musicGame.currentTime = 0;
  musicGame.loop = true;
  musicGame.volume = 0.1;
  musicGame.play();
}

function playShrimpSound() {
  shrimpSound.currentTime = 0;
  shrimpSound.volume = 0.3;
  shrimpSound.play();
}

function playStartSound() {
  startSound.currentTime = 0;
  startSound.volume = 0.3;
  startSound.play();
}

function playPunchSound() {
  punchSound.currentTime = 0;
  punchSound.volume = 0.3;
  punchSound.play();
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
  if (event.key === "ArrowUp") {
    pulpitoObj.moveUp();
  }
  if (event.key === "ArrowDown") {
    pulpitoObj.moveDown();
  }
});

Math.floor(Math.random() * 10000) + 2000;
