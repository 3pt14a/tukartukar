const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const pausePlay = document.querySelector("#pausePlay");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const currentTime = document.querySelector("#currentTime");
const durationElement = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

const songs = [
    {
        name: 'Wrong About Forever',
        file: 'music/Wrong About Forever.mp3',
        duration: '3:03'
    },
    {
        name: 'Still',
        file: 'music/Still.mp3',
        duration: '4:15'
    },
    {
        name: 'Cruel',
        file: 'music/Jeff Bernat  Cruel Official Music Video.mp3',
        duration: '3:45'
    },
    {
        name: 'Wish you well',
        file: 'music/Wish you well.mp3',
        duration: '3:30'
    }
];

const songList = document.getElementById('song-list');

songs.forEach((song, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${song.name}</td>
        <td></td>
        <td></td>
        <td>${song.duration}</td>
    `;
    songList.appendChild(row);
});

const createSourceElements = () => {
    songs.forEach(song => {
        const source = document.createElement('source');
        source.src = song.file;
        source.type = 'audio/mpeg';
        player.appendChild(source);
    });
};

createSourceElements();

let index = 0;
let isPlaying = false;

pausePlay.addEventListener('click', () => {
    if (isPlaying) {
        player.pause(); 
    } else {
        player.play(); 
    }
});

const updatePlayPauseButton = () => {
    if (isPlaying) {
        pausePlay.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Change to pause icon
    } else {
        pausePlay.innerHTML = '<i class="fa-solid fa-play"></i>'; // Change to play icon
    }
};

player.addEventListener('play', () => {
    isPlaying = true;
    updatePlayPauseButton();
});

player.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayPauseButton();
});

player.addEventListener('ended', () => {
    prevNextMusic();
});

prev.onclick = () => prevNextMusic("prev");
next.onclick = () => prevNextMusic();

const prevNextMusic = (type = "next") => {
    if ((type == "next" && index + 1 === songs.length) || type === "init") {
        index = 0;
    } else if (type == "prev" && index === 0){
        index = songs.length - 1;
    } else {
        index = type === "prev" && index ? index - 1 : index + 1;
    }

    player.src = songs[index].file;
    musicName.innerHTML = songs[index].name;
    durationElement.textContent = songs[index].duration;

    if (isPlaying) {
        player.play();
    }
};

player.addEventListener('timeupdate', () => {
    const progressPercent = (player.currentTime / player.duration) * 100;
    progressBar.style.width = progressPercent + '%';
    currentTime.textContent = formatTime(player.currentTime);
});

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

prevNextMusic("init");
