// const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let particleArray = [];
let adjustX = 700;
let adjustY = 700;
let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x + canvas.clientLeft / 2;
    mouse.y = e.y + canvas.clientTop / 2;
    // console.log(e.y)
});

const headding = "Mini";

ctx.fillStyle = 'red';
ctx.font = '100px Verdana';
ctx.fillText(headding, 0, 100);

// const data = ctx.getImageData(0, 0, 100, 500)
const data = ctx.getImageData(0, 0, 300, 500);
ctx.clearRect(0, 0, canvas.width, canvas.height);
console.log(data);

function drawImage() {
    let imagewidth = 800;
    let imageHeight = 450;
    const scannedData = ctx.getImageData(0, 0, imagewidth, imageHeight);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(scannedData);


    class Particle {
        constructor(x, y, color) {
            this.x = x + canvas.width / 2 - png.width * 2,
                this.y = y + canvas.height / 2 - png.height * 2,
                this.color = color,
                this.size = 2,
                this.baseX = x + canvas.width / 2 - png.width * 2,
                this.baseY = y + canvas.height / 2 - png.height * 2,
                this.density = (Math.random() * 250) + 100
        };
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            ctx.fillStyle = this.color;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;

            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;


            if (force < 0) {
                force = 0;
            }
            let directionX = (forceDirectionX * force * this.density * 0.6);
            let directionY = (forceDirectionY * force * this.density * 0.6);

            if (distance < mouse.radius + this.size) {
                this.x -= directionX;
                this.y -= directionY;
            }
            else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 5;
                } if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 5;
                }
            }
            this.draw();
        }
    };

    function init() {
        particleArray = [];
        const colorDatas = [];

        for (let y = 0, y2 = scannedData.height; y < y2; y += 6) {
            for (let x = 0, x2 = scannedData.width; x < x2; x += 6) {

                if (scannedData.data[(y * 4 * scannedData.width) + (x * 4) + 3] > 128) {
                    let positionX = x + adjustX;
                    let positionY = y + adjustY;

                    let color = "rgb(" +
                        scannedData.data[(y * 4 * scannedData.width) + (x * 4)] + "," +
                        scannedData.data[(y * 4 * scannedData.width) + (x * 4) + 1] + "," +
                        scannedData.data[(y * 4 * scannedData.width) + (x * 4) + 2] + ")";

                    particleArray.push(new Particle(positionX, positionY, color));

                    colorDatas.push(color);

                }
            }
        }
        for (let y = 0, y2 = data.height; y < y2; y++) {
            for (let x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x + adjustX+120;
                    let positionY = y + adjustY+210;

                    let color = "rgb(" +
                        data.data[(y * 4 * data.width) + (x * 4)] + "," +
                        data.data[(y * 4 * data.width) + (x * 4) + 1] + "," +
                        data.data[(y * 4 * data.width) + (x * 4) + 2] + ")";

                    particleArray.push(new Particle(positionX, positionY, color));

                    colorDatas.push(color);
                }
            }
        }
        // console.log(colorDatas)
    }
    init();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    })

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0,0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }
    animate();
}

const png = new Image();
png.src = './img2.png';

window.addEventListener('load', (e) => {
    ctx.drawImage(png, 0, 0);
    drawImage();
})


