




const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const socket = io();  // Connect to the server
const clearBtn = document.getElementById("clearBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ensure the canvas is cleared when it is initialized
if (localStorage.getItem("canvasCleared") === "true") {
  clearCanvas();  // Clear the canvas if the state says it's cleared
}

let drawing = false;
let x = 0, y = 0;

// Draw events on the canvas
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  x = e.clientX;
  y = e.clientY;
  ctx.moveTo(x, y);

  socket.emit("draw", { type: "moveTo", x, y });
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  x = e.clientX;
  y = e.clientY;
  ctx.lineTo(x, y);
  ctx.stroke();

  socket.emit("draw", { type: "lineTo", x, y });
});

// Listen for draw data from other tabs
socket.on("draw", (data) => {
  if (data.type === "moveTo") {
    ctx.moveTo(data.x, data.y);
  } else if (data.type === "lineTo") {
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
  }
});

// Clear button click
clearBtn.addEventListener("click", () => {
  clearCanvas();  // Clear the current tab immediately
  socket.emit("clear");  // Notify server to clear all tabs
  localStorage.setItem("canvasCleared", "true");  // Persist clear state in localStorage
});

// Clear canvas function
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Listen for clear command from the server (to clear all tabs)
socket.on("clear", () => {
  clearCanvas();  // Clear canvas on all tabs
  localStorage.setItem("canvasCleared", "true");  // Persist clear state in localStorage
});

// Reset the canvas to be ready for a new drawing after clearing
socket.on("reset", () => {
  // Reset any ongoing drawing behavior if needed
  drawing = false;
});
