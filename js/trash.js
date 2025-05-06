class Trash {
  constructor(type) {
    const trashImages = [
      "../Images/Cup.png",
      "../Images/Cigarette.png",
      "../Images/can.png",
      "../Images/plastic bag.png",
      "../Images/shoe.png",
    ];

    const randomIndex = Math.floor(Math.random() * trashImages.length);
    const randomImages = trashImages[randomIndex];

    // todas las propriedades/caracteristicas
    this.node = document.createElement("img");
    this.node.src = randomImages;

    gameBoxNode.append(this.node); // coge el nodo imagen y lo inserta en el juego

    this.x = Math.random() * 550;
    this.y = -40;
    this.w = 25;
    this.h = 40;

    // definimos dimensiones iniciales
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    // definimos posicion initial
    this.node.style.position = "absolute"; // poder posicionarlo de forma exacta
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.speed = 1.5;
  }

  automaticMovement() {
    if (this.y < 450) this.y += this.speed;
    this.node.style.top = `${this.y}px`;
  }
}
