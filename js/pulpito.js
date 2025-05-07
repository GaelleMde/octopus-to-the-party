class Pulpito {
  constructor() {
    // todas las propriedades/caracteristicas
    this.node = document.createElement("img");
    this.node.src = "../Images/Pulpito.png";

    gameBoxNode.append(this.node); // coge el nodo imagen y lo inserta en el juego

    this.x = 275;
    this.y = 175;
    this.w = 50;
    this.h = 40;

    // definimos dimensiones iniciales
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    // definimos posicion initial
    this.node.style.position = "absolute"; // poder posicionarlo de forma exacta
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.moveright = 10;
    this.moveleft = 10;
    this.moveup = 10;
    this.movedown = 10;
  }

  // todos los metodos/acciones del pulpito
  moveRight() {
    if (this.x < 550) {
      this.x += this.moveright;
      this.node.style.left = `${this.x}px`;
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.moveleft;
      this.node.style.left = `${this.x}px`;
    }
  }

  moveUp() {
    if (this.y > 4) {
      this.y -= this.moveup;
      this.node.style.top = `${this.y}px`;
    }
  }

  moveDown() {
    if (this.y < 360) {
      this.y += this.movedown;
      this.node.style.top = `${this.y}px`;
    }
  }
}
