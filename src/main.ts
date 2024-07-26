// Initialize canvas and rendering context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;

// Position of rocket
let rocketX = 0;
let rocketY = -25;

// Movement of rocket
let rocketAngle = 0; // Straight up
let rocketVX = 0;
let rocketVY = 0;

// Keyboard controls
let forward = false;
let left = false;
let right = false;

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) return;

  switch (event.key) {
    case "w":
    case " ":
      forward = true;
      break;
    case "a":
      left = true;
      break;
    case "d":
      right = true;
      break;
  }

  event.preventDefault;
});

window.addEventListener("keyup", function (event) {
  if (event.defaultPrevented) return;

  switch (event.key) {
    case " ":
    case "w":
      forward = false;
      break;
    case "a":
      left = false;
      break;
    case "d":
      right = false;
      break;
  }

  event.preventDefault;
});

const reDraw = () => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw sky
  ctx.fillStyle = "aqua";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw ground
  ctx.fillStyle = "green";
  ctx.fillRect(
    0,
    (canvas.height * 3) / 4,
    canvas.width,
    (canvas.height * 1) / 4
  );

  // Set translation for rocket
  ctx.translate(canvas.width / 2 + rocketX, (canvas.height * 3) / 4 + rocketY);

  // Draw rocket
  ctx.fillStyle = "gray";
  ctx.rotate(-rocketAngle);
  ctx.beginPath();
  ctx.rect(-10, -25, 20, 50);
  ctx.fill();

  // Undo rotation
  ctx.setTransform(1, 0, 0, 1, 0, 0);
};

const render = () => {
  requestAnimationFrame(render);

  // Update rocket movement
  if (forward) {
    rocketVX -= Math.sin(rocketAngle) * 0.1;
    rocketVY -= Math.cos(rocketAngle) * 0.1;
  }
  if (left && !right) {
    rocketAngle = rocketAngle + Math.PI / 50;
  } else if (right && !left) {
    rocketAngle = rocketAngle - Math.PI / 50 + 2 * Math.PI;
  }

  // Gravity
  rocketVY += 0.07;

  rocketX += rocketVX;
  rocketY += rocketVY;

  // Draw state
  reDraw();
};

// Draw initial state
reDraw();

// Wait for user to start the rocket before starting physics loop
const handleStart = () => {
  requestAnimationFrame(render);
  window.removeEventListener("keydown", handleStart);
};
window.addEventListener("keydown", handleStart);
