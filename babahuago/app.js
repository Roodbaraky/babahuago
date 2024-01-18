document.addEventListener('DOMContentLoaded', function () {
    const videoList = document.getElementById('video-list');

    // Add your YouTube video IDs here
    const youtubeVideoIds = [
        '-nsTmSQMys4',
        'LJdkf4Ea-7A',
        'LZsH_0hHREw',
        '7iisYJEhtBM'
        // Add more video IDs as needed
    ];
    const prefix = 'https://www.youtube.com/embed/';

    youtubeVideoIds.forEach((id) => {
        // Create a new video element and append it to the video list
        const videoElement = document.createElement('div');
        const newUrl = `${prefix}${id}`;
        console.log(newUrl);
        videoElement.innerHTML = `<iframe src="${newUrl}" frameborder="0" allowfullscreen></iframe>`;
        videoList.appendChild(videoElement);
    });
});

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const TOTAL = 100;
const petalArray = [];

const petalImg = new Image();
petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png';
petalImg.addEventListener('load', () => {
  for (let i = 0; i < TOTAL; i++) {
    petalArray.push(new Petal());
  }
  render();
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petalArray.forEach(petal => petal.animate());
  window.requestAnimationFrame(render);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let mouseX = window.innerWidth / 2; // Start the cursor in the middle
let mouseY = window.innerHeight / 2; // Start the cursor in the middle
function moveHandler(e) {
  mouseX = e.clientX || e.touches[0].clientX;
  mouseY = e.clientY || e.touches[0].clientY;
}
window.addEventListener('mousemove', moveHandler);
window.addEventListener('touchmove', moveHandler);

// Petal class
class Petal {
  constructor() {
    this.x = Math.random() * window.innerWidth; // Random horizontal position
    this.y = Math.random() * window.innerHeight; // Random vertical position
    this.w = 25 + Math.random() * 15;
    this.h = 20 + Math.random() * 10;
    this.opacity = this.w / 40;
    this.flip = Math.random();

    this.baseYSpeed = 2; // Base falling speed
    this.ySpeed = this.baseYSpeed; // Initial falling speed
    this.flipSpeed = Math.random() * 0.03;
  }

  draw() {
    if (this.y > canvas.height || this.x > canvas.width) {
      this.x = Math.random() * window.innerWidth; // Reset to a random horizontal position
      this.y = Math.random() * window.innerHeight; // Reset to a random vertical position
      this.ySpeed = this.baseYSpeed; // Reset falling speed to the base speed
      this.flip = Math.random();
    }
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(
      petalImg,
      this.x,
      this.y,
      this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)),
      this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
    );
  }

  animate() {
    const mouseXNormalized = (mouseX - window.innerWidth / 2) / (window.innerWidth / 2);
    const mouseYNormalized = mouseY / window.innerHeight;
    this.ySpeed = this.baseYSpeed + mouseYNormalized * 3; // Adjust the factor to control the sensitivity
    this.x += mouseXNormalized * 5; // Adjust the factor to control the sensitivity
    this.y += this.ySpeed;
    this.flip += this.flipSpeed;
    this.draw();
  }
}
