const container = document.getElementById('container');
const canvas = document.getElementById('canvasA');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4;
ctx.globalCompositeOperation = 'difference';
let audioSrc;
let analyser;

    document.onkeydown = function (e) {
        var keyCode = e.keyCode;
        const audio = new Audio();
        audio.crossOrigin = "anonymous";
        if(keyCode == 74) {
            //J
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/snare.wav";
            
        }
        if(keyCode == 66) {
            //J
            
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/kick.wav";
        }
        if(keyCode == 86) {
            //V
            ;
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/kick.wav";
        }
        if(keyCode == 72) {
            //H
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/tom-high.wav";
        }
        if(keyCode == 71) {
            //G
            
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/tom-mid.wav";
        }
        if(keyCode == 70) {
            //F
            
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/tom-low.wav";
        }
        if(keyCode == 69) {
            //E
            
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/crash.wav";
        }
        if(keyCode == 82) {
            //R
            
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/ride.wav";
        }
        if(keyCode == 73) {
            //I
            
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/hihat-open.wav";
        }
        if(keyCode == 75) {
            //K
            
            audio.src = "https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/hihat-close.wav";
        }
        audio.play();
        const audioCtx = new (window.AudioContext)();
        audioSrc = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        audioSrc.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
    
        const barWidth = 15;
        let barHeight;
        let x;
    
        function animate() {
            x = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);
            drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray)
            requestAnimationFrame(animate);
        }
        animate();

    // container.addEventListener('click', function(){
    //     const audioA = audio;
    //     const audioCtx = new (window.AudioContext)();
    //     audioA.play();
    //     audioSrc = audioCtx.createMediaElementSource(audioA);
    //     analyser = audioCtx.createAnalyser();
    //     audioSrc.connect(analyser);
    //     analyser.connect(audioCtx.destination);
    //     analyser.fftSize = 512;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);
    
    //     const barWidth = 15;
    //     let barHeight;
    //     let x;
    
    //     function animate() {
    //         x = 0;
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         analyser.getByteFrequencyData(dataArray);
    //         drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray)
    //         requestAnimationFrame(animate);
    //     }
    //     animate();
    // });
    
    // file.addEventListener('change', function() {
    //     const files = this.files;
    //     audioA.src = URL.createObjectURL(files[0]);
    //     audioA.load();
    //     audioA.play();
    
    //     audioSrc = audioCtx.createMediaElementSource(audioA);
    //     analyser = audioCtx.createAnalyser();
    //     audioSrc.connect(analyser);
    //     analyser.connect(audioCtx.destination);
    //     analyser.fftSize = 512;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);
    
    //     const barWidth = 15;
    //     let barHeight;
    //     let x;
    
    //     function animate(){
    //         x = 0;
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         analyser.getByteFrequencyData(dataArray);
    //         drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray)
    //         requestAnimationFrame(animate);
    
    //     }
    //     animate();
    // });
    
    function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
        for (let i = 0; i < bufferLength; i++){
            barHeight = dataArray[i];
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i + 4.184);
            const hue = i * 5;
            ctx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight/1 + '%)';
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(0, barHeight);
            ctx.arc(0, barHeight + barHeight/2, barHeight/10, 0, Math.PI * 2);
            ctx.stroke();
            x += barWidth;
            
            if (i > bufferLength * 0.6){
                ctx.beginPath();
                ctx.rotate(i + 1.184);
                ctx.stroke();
            }
            ctx.restore();
        }
    }
}