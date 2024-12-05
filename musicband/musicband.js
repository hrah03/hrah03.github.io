const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
const audio1 = document.getElementById('audio1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioContext;
let audioSource;
let analyser;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function drawVisualizer(bufferLength, barWidth, dataArray) {
    const radius = 70;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 0.6;
        const angle = (i / bufferLength) * Math.PI * 18;

        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `hsl(${i * 5}, 70%, 50%)`);
        gradient.addColorStop(1, `hsl(${i * 5}, 70%, 200%)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = barWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

function animate() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = 2;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualizer(bufferLength, barWidth, dataArray);
        requestAnimationFrame(draw);
    }
    draw();
}

function setupAnalyser() {
    if (!audioSource) {
        audioSource = audioContext.createMediaElementSource(audio1);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 60;
    }
}

container.addEventListener('click', function () {
    initAudioContext();
    setupAnalyser();
    audio1.play();
    animate();
});

file.addEventListener('change', function () {
    initAudioContext();
    const files = this.files;
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();
    setupAnalyser();
    animate();
    audio1.style.display = 'block';
});