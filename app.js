// Global variables
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let currentOverlay = null;

// Function to change overlay based on button click
function changeOverlay(filename) {
  clearCanvas(); // Clear previous overlay
  loadImage(filename); // Load new overlay image
}

// Function to load and draw image on canvas
function loadImage(filename) {
  let img = new Image();
  img.onload = function() {
    // Resize canvas to match image dimensions
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw image onto canvas
    ctx.drawImage(img, 0, 0);
    currentOverlay = img;
  };
  img.src = filename;
}

// Function to clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentOverlay = null;
}

// Function to resize canvas to match window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Redraw current overlay if exists
  if (currentOverlay) {
    ctx.drawImage(currentOverlay, 0, 0, canvas.width, canvas.height);
  }
}

// Handle window resize event
window.addEventListener('resize', resizeCanvas);

// Initial canvas setup on page load
window.onload = function() {
  resizeCanvas(); // Resize canvas to match initial window size
};
