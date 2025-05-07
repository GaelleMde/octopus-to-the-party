class Shrimp {
  constructor() {
    this.node = document.createElement("img"); // crear una img
    this.node.src = "./Images/shrimp.png"; // fuente imagen

    gameBoxNode.append(this.node); // añadirlo a al gamebox

    this.x = Math.random() * 550;
    this.y = -40;
    this.w = 25;
    this.h = 25;

    // definimos dimensiones iniciales
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    // definimos posicion initial
    this.node.style.position = "absolute"; // poder posicionarlo de forma exacta
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.speed = 3;
  }

  automaticMovement() {
    if (this.y < 450) this.y += this.speed;
    this.node.style.top = `${this.y}px`;
  }
}
