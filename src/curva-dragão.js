const WIDTH = 300;
const HEIGHT = WIDTH;
const ANGLE = 90;
let LENGTH = 50;
let MAX_ITERATIONS = 0;
let OVERALL_MAX_ITERATIONS = 15;

let s = (sketch) => {
  let rules = new Map([
    ["+", "+"],
    ["-", "-"],
    ["[", "["],
    ["]", "]"],
  ]);
  let sentence = "F";

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT);
    sketch.angleMode(sketch.DEGREES);
    sketch.background(sketch.color("#FFF"));

    sketch.translate(WIDTH / 2, HEIGHT / 2);
    // genRules();
    rules.set("F", "F+G");
    rules.set("G", "F-G");
    for (let i = 0; i < MAX_ITERATIONS; i++) {
      updateSentence();
    }
    turtle(sentence);
  };

  function updateSentence() {
    let nextSentence = "";

    for (let c = 0; c < sentence.length; c++) {
      if (rules.has(sentence.charAt(c))) {
        nextSentence += rules.get(sentence.charAt(c));
      }
    }

    sentence = nextSentence;
  }

  function turtle(sentence) {
    for (let c = 0; c < sentence.length; c++) {
      switch (sentence.charAt(c)) {
        case "+":
          sketch.rotate(ANGLE);
          break;
        case "-":
          sketch.rotate(-ANGLE);
          break;
        case "[":
          sketch.push();
          break;
        case "]":
          sketch.pop();
          break;
        default:
          sketch.line(0, 0, LENGTH, 0);
          sketch.translate(LENGTH, 0);
          break;
      }
    }
  }
};

function submitForm() {
  LENGTH = document.getElementById("lengthSlider").value;
  document.getElementById("sketch-container").innerHTML = "";
  p5js = new p5(s, document.getElementById("sketch-container"));
}

function buttonClick() {
  if (OVERALL_MAX_ITERATIONS - 1 > MAX_ITERATIONS) {
    MAX_ITERATIONS++;
  } else {
    MAX_ITERATIONS++;
    document.getElementById("submitButton").setAttribute("disabled", "disabled");
  }
  document.getElementById("sketch-container").innerHTML = "";
  p5js = new p5(s, document.getElementById("sketch-container"));
}

window.addEventListener("load", () => {
  document.getElementById("lengthSlider").oninput = submitForm;
  document.getElementById("lengthSlider").value = 50;
});
