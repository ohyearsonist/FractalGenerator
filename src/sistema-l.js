const WIDTH = 300;
const HEIGHT = WIDTH;
const ANGLE = 90;
let LENGTH = 0.5;
let MAX_ITERATIONS = 5;
let INPUT_NAME = "".toUpperCase().replaceAll(" ", "");

let s = (sketch) => {
  let rules = new Map([
    ["+", "+"],
    ["-", "-"],
    ["[", "["],
    ["]", "]"],
  ]);
  let sentence = INPUT_NAME.charAt(0);

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT);
    sketch.angleMode(sketch.DEGREES);
    sketch.background(sketch.color("#FFF"));

    sketch.translate(WIDTH / 2, HEIGHT / 2);
    genRules();
    for (let i = 0; i < MAX_ITERATIONS; i++) {
      updateSentence();
    }
    turtle(sentence);
  };

  function genRules() {
    for (let c = 0; c < INPUT_NAME.length; c++) {
      if (rules.has(INPUT_NAME.charAt(c))) {
        continue;
      }

      let rule = INPUT_NAME.charAt(c);
      for (let d = 1; d < INPUT_NAME.length - c; d++) {
        rule += "+";
        rule += INPUT_NAME.charAt(d + c);
      }
      if (c > 0) {
        rule += parseInt(c) == c ? "[" : "]";
        rule += INPUT_NAME.charAt(0);
        for (let d = 1; d < c; d++) {
          rule += "-";
          rule += INPUT_NAME.charAt(d);
        }
      }
      rules.set(INPUT_NAME.charAt(c), rule);
    }
  }

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
  INPUT_NAME = document
    .getElementById("nameInput")
    .value.toUpperCase()
    .replaceAll(" ", "");
  LENGTH = document.getElementById("lengthSlider").value;
  document.getElementById("sketch-container").innerHTML = "";
  p5js = new p5(s, document.getElementById("sketch-container"));
}

window.addEventListener("load", () => {
  document.getElementById("lengthSlider").oninput = submitForm;
});
