console.log("probando");

/* Screen */ 
const splashScreenNode = document.querySelector("#splashscreen")
const gameScreenNode = document.querySelector("#game-screen")

/* Buttons */
const startBtnNode = document.querySelector("#startButton")

/* Game box */
const gameBoxNode = document.querySelector("#game-box")


/* VARIABLES GLOBALES DEL JUEGO */
let pulpitoObj = null; // es para poder agregar el obj del pulpito aqui, pero que en TODO mi codigo pueda acceder a ella
 // let trashOjb = null;
 let trashArr = []

/* GLOBAL FUNCTIONS OF THE GAME */

function startGame() {
    //1. ocultar la pantalla inicial
    splashScreenNode.style.display = "none";
        
    //2. mostrar la pantalla de juego
    gameScreenNode.style.display = "flex";

    //3. Añadimos los elements iniciados del juego
    pulpitoObj = new Pulpito ()
    


    //4. Iniciamos intervalo principal del juego
    setInterval (() => {
        gameLoop ()
    }, Math.round(1000/60))

    //5. Iniciamos otros intervalos del juego
    setInterval (() =>{
    let trashObj = new Trash ()
    trashArr.push(trashObj)
    }, 2000)

}

function gameLoop () {
   // console.log ("60fps")
   trashArr.forEach((eachTrashObj) => {
    eachTrashObj.automaticMovement()
   })
}


function trashAppear () {
/* let cupObj = new Trash ("cup")
trashArr.push(cupObj)

let canObj = new Trash ("can")
trashArr.push(canObj) */

}


/* EVENT LISTENERS */ 

startBtnNode.addEventListener ("click", () => {
    startGame()
})

/* gameBoxNode.addEventListener("click", () => {
    pulpitoObj.moveRight()
}) */

document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            pulpitoObj.moveRight()  
        } if (event.key === "ArrowLeft") {
            pulpitoObj.moveLeft()  
        }
    })