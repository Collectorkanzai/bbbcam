// Global variables
let videoElement = document.getElementById('videoElement');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let currentOverlay = null;

// Function to change overlay based on button click
function changeOverlay(filename) {
  clearCanvas(); // Clear previous overlay
  loadOverlay(filename); // Load new overlay image
}

// Function to load overlay image onto canvas
function loadOverlay(filename) {
  let img = new Image();
  img.onload = function() {
    // Resize canvas to match video dimensions
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw video and overlay onto canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
    loadOverlay(currentOverlay.src); // Reload current overlay to fit new canvas size
  }
}

// Handle window resize event
window.addEventListener('resize', resizeCanvas);

// Setup webcam streaming on page load
window.onload = function() {
  // Check if getUserMedia is supported
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch(function(error) {
        console.error('Error accessing webcam:', error);
      });
  } else {
    console.error('getUserMedia is not supported');
  }

  resizeCanvas(); // Resize canvas to match initial window size
};

