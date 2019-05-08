// constants
const body = document.querySelector('body');
const MAX_ALPHA = 180;
const MIN_ALPHA = 10;
// global variables
let NUMBER_OF_PARTICLES = Math.floor((body.clientWidth * body.clientHeight) / 2000);
let PARTICLES = [];
let BACKGROUND_COLOR = [255, 255, 255];

// create particles
function generateParticle() {
  const size = 6 + random(-4, 4);
  const color = generateParticleColor();
  const alpha = 60 + random(-60, 120);
  const alphaShiftDirection = alpha > ((MAX_ALPHA + MIN_ALPHA) / 2) ? 1 : -1;
  const position = [random(0, windowWidth), random(0, windowHeight)];
  const angle = TWO_PI / random(5,13);
  
  return {
    x: position[0], 
    y: position[1], 
    alpha,
    alphaShiftDirection,
    size,
    color,
    angle,
  };
}

function populateParticles() {
  // reset
  PARTICLES = [];
  
  for(let i = 0; i < NUMBER_OF_PARTICLES; i++) {
    PARTICLES.push(generateParticle());
  }
}

// handle position updates
function jiggleParticles() {
  PARTICLES = PARTICLES.map(p => {
    return {
      ...p,
      x: p.x + random(-2, 2),
      y: p.y + random(-2, 2),
    }
  });
}

// handle particle color updates
function generateParticleColor() {
  const red = Math.round(random(20, 90));
  const green = Math.round(random(140, 250));
  const blue = Math.round(random(70, 190));
  
  const palette = [red, green, blue];
  const white = [250, 250, 250];
  const bright = [random(200, 250), random(20, 220), random(10, 20)];
  
  if (random(100) > 98) return bright;
  if (random(100) > 90) return white;
  return palette;
}

// handle background color updates
function generateCanvasColor() {
  const red = Math.round(random(20, 150));
  const green = Math.round(random(90, 200));
  const blue = Math.round(random(140, 250));
  
  return [red, green, blue];
}

function shiftParticlesAlpha() {
  PARTICLES = PARTICLES.map((p) => {
    const { alpha, alphaShiftDirection } = p;
    let shiftValue = alphaShiftDirection * random(0, 3);
    let newAlpha = alpha + shiftValue;
    let newShiftDirection = alphaShiftDirection;

    if (newAlpha >= MAX_ALPHA) {
      newShiftDirection = -1;  
    } else if (newAlpha <= MIN_ALPHA) {
      newShiftDirection = 1;
    }

    return {
      ...p,
      alpha: newAlpha,
      alphaShiftDirection: newShiftDirection,
    };
  });
}

// render particles on canvas
function drawParticles() {
  PARTICLES.map(p => {
    fill(p.color[0], p.color[1], p.color[2], p.alpha);
    
    beginShape();
    for (let a = 0; a < TWO_PI; a += p.angle) {
      let sx = p.x + cos(a) * p.size;
      let sy = p.y + sin(a) * p.size;
      vertex(sx, sy);
    }

    endShape(CLOSE);
  });
}

function backgroundHue() {
  const newColor = BACKGROUND_COLOR;

  BACKGROUND_COLOR = newColor;
  background(
    newColor[0],
    newColor[1],
    newColor[2],
    40
  );
}

function initBackgroundCanvas() {
  // create a full-screen canvas
  createCanvas(windowWidth, windowHeight);
  stroke(0, 0, 0, 0);
  BACKGROUND_COLOR = generateCanvasColor();
  background(
    BACKGROUND_COLOR[0], 
    BACKGROUND_COLOR[1], 
    BACKGROUND_COLOR[2], 
    200
  );
}

function setup() {
  // create canvas
  initBackgroundCanvas();
  // add particles
  populateParticles();
}

function draw() {
  clear();
  drawParticles();
  jiggleParticles();
  shiftParticlesAlpha();
  backgroundHue();
}
// handle resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, true);
  NUMBER_OF_PARTICLES = Math.floor((windowWidth * windowHeight) / 2000);
  populateParticles();
}