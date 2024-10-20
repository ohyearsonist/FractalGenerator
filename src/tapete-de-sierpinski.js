var MAX_ITERATION = 0;
const OVERALL_MAX_ITERATION = 4;

let s = (sketch) => {
  const CANVAS_SIZE = 300;

  let currentIteration = 0;
  let nodeArray = [];
  let nodeSize = CANVAS_SIZE;

  let colorPalette = [];
  let fractalRules = [];

  class Node {
    constructor(number, position) {
      this.number = number;
      this.position = position;
    }

    render() {
      sketch.noStroke();
      sketch.fill(colorPalette[this.number]);
      sketch.rect(this.position.x, this.position.y, nodeSize, nodeSize);
    }

    breakUp(newNodeSize) {
      let rule = fractalRules[this.number];
      let nodes = [];

      for (let i in rule) {
        nodes.push(
          new Node(
            rule[i],
            sketch.createVector(
              this.position.x + (i % 3) * newNodeSize,
              this.position.y + Math.floor(i / 3) * newNodeSize
            )
          )
        );
      }
      return nodes;
    }
  }

  function fractal() {
    if (currentIteration >= MAX_ITERATION) {
      return;
    }

    let newNodeArray = [];
    let newNodeSize = nodeSize / 3;

    for (let i in nodeArray) {
      newNodeArray = newNodeArray.concat(nodeArray[i].breakUp(newNodeSize));
    }

    nodeArray = newNodeArray;
    nodeSize = newNodeSize;
    currentIteration++;
    fractal();
  }

  sketch.setup = () => {
    sketch.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    // createColorPalette();
    colorPalette[1] = sketch.color(0, 0, 0);
    colorPalette[0] = sketch.color(255, 255, 255);
    // generateFractalRules();
    fractalRules[0] = [0, 0, 0, 0, 1, 0, 0, 0, 0];
    fractalRules[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1];

    nodeArray.push(new Node(0, sketch.createVector(0, 0)));

    fractal();
  };

  sketch.draw = () => {
    sketch.background(220);

    for (let i in nodeArray) {
      nodeArray[i].render();
    }
  };
};

function submitForm() {
  document.getElementById("sketch-container").innerHTML = "";
  if (MAX_ITERATION < OVERALL_MAX_ITERATION - 1) {
    MAX_ITERATION++;
  } else {
    MAX_ITERATION++;
    document.getElementById("submitButton").setAttribute("disabled", true);
  }
  p5js = new p5(s, document.getElementById("sketch-container"));
}
