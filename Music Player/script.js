const song = document.querySelector(".song");
const play = document.querySelector(".playBtn");
const pause = document.querySelector(".pauseBtn");
const forwardBtn = document.querySelector(".forwardBtn");
const backwardBtn = document.querySelector(".backwardBtn");
const title = document.querySelector(".title");
const artImg = document.querySelector("#artist");
const artName = document.querySelector("#name");
const playSong = document.querySelector("#playsong");
const lines = document.querySelector(".lineChild");
const progress = document.querySelector(".line");
const strt = document.querySelector("#start");
const end = document.querySelector("#end");

const artistNames = [
    'Arijit Singh, Sachin-Jigar and Amitabh Battacharya',
    'Imagine Dragons',
    'Armaan Malik and Thaman S',
    'Ajay Atul and Shreya Ghoshal',
    'Shilpa Rao, Anirudh Ravichander and Ramajogayya Sastry',
    'Lata Mangeshkar and Kumar Sanu',
    'Badshah and Neeti Mohan',
    'Anirudh Ravichander and Alisha Thomas',
    'Dhanush and Anirudh Ravichander'
];
const artistTitle = ['Apna Bana Le', 'Believer', 'Butta-Bomma', 'Chikni Chameli', 'Chuttamalle', 'Tujhe Dekha Tho', 'Bad Boy', 'Donu Donu Donu', 'Psycho', 'Kolavari'];

let x = 0;
let interval;

backwardBtn.addEventListener("click", backward);
forwardBtn.addEventListener("click", forward);
playSong.addEventListener("click", effect);

function effect() {
    if (song.duration === song.currentTime) {
        x += 1;
        console.log(x);
    }
    if (!play.classList.contains('none')) {
        song.play();
        setInterval(prog, 1000);
        setInterval(line, 1000);
        progress.addEventListener("click", (e) => {
            var widthBar2 = (e.offsetX / e.target.clientWidth)*song.duration;
            song.currentTime = widthBar2;
        })
    } else {
        song.pause();
    }
    play.classList.toggle('none');
    pause.classList.toggle('none');
    artImg.classList.toggle('round');
}

function removeEffect() {
    song.pause();
    song.currentTime = 0.01;
    play.classList.remove('none');
    pause.classList.add('none');
    artImg.classList.remove('round');
}

function backward() {
    x -= 1;
    if (x < 0) {
        x = artistNames.length - 1;
    }
    removeEffect();
    songs(x);
}

function forward() {
    x += 1;
    if (x >= artistNames.length) {
        x = 0;
    }
    removeEffect();
    songs(x);
}

function songs(x) {
    artName.innerHTML = artistNames[x];
    title.innerHTML = artistTitle[x];
    artImg.src = `./images/im${x}.jpg`;
    song.src = `./songs/s${x}.mp3`;
    
    song.addEventListener("loadedmetadata", dur);
}

songs(0);

function dur() {
    let dura = song.duration;
    let secdu = Math.floor(dura % 60);
    let mindu = Math.floor(dura / 60);
    if (secdu < 10) {
        secdu = `0${secdu}`;
    }
    end.innerHTML = `${mindu}:${secdu}`;
}

function prog() {
    let curTime = song.currentTime;
    let minCur = Math.floor(curTime / 60);
    let secCur = Math.floor(curTime % 60);
    if (secCur < 10) {
        secCur = `0${secCur}`;
    }
    strt.innerHTML = `${minCur}:${secCur}`;
}

function line() {
    var widthBar = (song.currentTime/song.duration)*100;
    lines.style.width = `${widthBar}%`;
}