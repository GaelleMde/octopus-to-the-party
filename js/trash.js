class Trash {
    constructor () {
        // todas las propriedades/caracteristicas
        this.node = document.createElement("img") 
        this.node.src = "../Images/Cup.png"
        
        gameBoxNode.append(this.node) // coge el nodo imagen y lo inserta en el juego

        this.x = 50
        this.y = -50
        this.w = 40
        this.h = 30

        // definimos dimensiones iniciales
        this.node.style.width =`${this.w}px`
        this.node.style.height =`${this.h}px`

        // definimos posicion initial
        this.node.style.position = "absolute" // poder posicionarlo de forma exacta
        this.node.style.top =`${this.y}px`
        this.node.style.left =`${this.x}px`

        this.moveright = 10; 
        this.moveleft = 10;

    }
}