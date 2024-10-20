let INPUT_NAME = "";

let s = (sketch) => {
  const CANVAS_SIZE = 300;
  const MAX_ITERATION = 4;
  const AGE = 0;

  let currentIteration = 0;
  let nameNumberArray = [];
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

  function countUnique(iterable) {
    return new Set(iterable).size;
  }

  function nameProcessor(name) {
    let processedName = name.replace(/\s/g, "");

    let charArray = [];
    let counter = 0;

    for (let c in processedName) {
      if (!charArray.includes(processedName.charAt(c))) {
        charArray.push(processedName.charAt(c));
        nameNumberArray.push(counter);
        counter++;
      } else {
        nameNumberArray.push(
          charArray.findIndex((e) => {
            return e == processedName.charAt(c);
          })
        );
      }
    }
  }

  function createColorPalette() {
    colorPalette[0] = sketch.color(
      (INPUT_NAME.charCodeAt(0) * nameNumberArray.length) % 360,
      80,
      60
    );

    for (let i = 0; i < countUnique(nameNumberArray) - 1; i++) {
      colorPalette[i + 1] = sketch.color(
        (sketch.hue(colorPalette[i]) + 30) % 360,
        sketch.saturation(colorPalette[0]),
        sketch.lightness(colorPalette[0])
      );
    }
  }

  function generateFractalRules() {
    for (let i = 0; i < countUnique(nameNumberArray); i++) {
      let newRule = [];

      for (let j = 0; j < 9; j++) {
        newRule.push(nameNumberArray[(j + i + AGE) % nameNumberArray.length]);
      }

      fractalRules.push(newRule);
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

    setTimeout(() => {
      nodeArray = newNodeArray;
      nodeSize = newNodeSize;
      currentIteration++;
      fractal();
    }, 900);
  }

  sketch.setup = () => {
    sketch.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    sketch.colorMode(sketch.HSL);
    nameProcessor(INPUT_NAME);
    createColorPalette();
    generateFractalRules();

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
  INPUT_NAME = document.getElementById("nameInput").value;
  document.getElementById("sketch-container").innerHTML = '';
  p5js = new p5(s, document.getElementById("sketch-container"));
}
