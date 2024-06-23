navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas');
      canvas.id = 'canvas';
      document.body.appendChild(canvas);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const context = canvas.getContext('2d');

      const overlay = new Image();
      overlay.src = 'images/BBB.png';
      overlay.onload = () => {
        const overlaySize = { width: 200, height: 200 };
        let overlayPos = { x: canvas.width / 2 - overlaySize.width / 2, y: canvas.height / 2 - overlaySize.height / 2 };

        function update() {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          context.drawImage(overlay, overlayPos.x, overlayPos.y, overlaySize.width, overlaySize.height);
          requestAnimationFrame(update);
        }
        update();

        let initialDistance = 0;
        let initialOverlaySize = { width: overlaySize.width, height: overlaySize.height };

        canvas.addEventListener('touchstart', (event) => {
          if (event.touches.length === 2) {
            initialDistance = getDistance(event.touches[0], event.touches[1]);
            initialOverlaySize = { width: overlaySize.width, height: overlaySize.height };
          }
        });

        canvas.addEventListener('touchmove', (event) => {
          if (event.touches.length === 2) {
            const newDistance = getDistance(event.touches[0], event.touches[1]);
            const scaleChange = newDistance / initialDistance;
            overlaySize.width = initialOverlaySize.width * scaleChange;
            overlaySize.height = initialOverlaySize.height * scaleChange;
          }
        });

        canvas.addEventListener('touchend', (event) => {
          if (event.touches.length < 2) {
            initialDistance = 0;
          }
        });

        canvas.addEventListener('touchmove', (event) => {
          if (event.touches.length === 1) {
            const touch = event.touches[0];
            overlayPos = { x: touch.clientX - overlaySize.width / 2, y: touch.clientY - overlaySize.height / 2 };
          }
        });

        function getDistance(touch1, touch2) {
          const dx = touch1.clientX - touch2.clientX;
          const dy = touch1.clientY - touch2.clientY;
          return Math.sqrt(dx * dx + dy * dy);
        }
      };

      window.changeOverlay = function(image) {
        overlay.src = 'images/' + image;
      };
    });
  })
  .catch(err => console.error("Error accessing the camera: ", err));
