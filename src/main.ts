// Initialize canvas and rendering context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;

// Position of rocket
let rocketX = canvas.width / 2;
let rocketY = (canvas.height * 3) / 4;

// Movement of rocket
let rocketAngle = -Math.PI / 2; // Straight up
let rocketVX = 0;
let rocketVY = 0;

const render = () => {
  requestAnimationFrame(render);

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

  // Draw rocket
  ctx.fillStyle = "gray";
  ctx.fillRect(rocketX - 10, rocketY - 50, 20, 50);

  // Update rocket movement
  rocketX += rocketVX;
  rocketY += rocketVY;
};

// Start render loop
requestAnimationFrame(render);
