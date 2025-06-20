import { Core } from "./core/Core";

// Fonction pour demander le plein écran
function requestFullscreen() {
    const element: any = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

let soundJump: HTMLAudioElement | null = null
let soundBip: HTMLAudioElement | null = null
let soundAou: HTMLAudioElement | null = null
let music: HTMLAudioElement | null = null
function loadAudio() {

    const audioElementJump: HTMLAudioElement = document.createElement('audio');
    audioElementJump.id = "jumpSound"
    audioElementJump.controls = false;
    audioElementJump.autoplay = false;
    audioElementJump.loop = false;
    audioElementJump.muted = false;
    audioElementJump.preload = 'auto';
    audioElementJump.src = './assets/yop.mp3';
    audioElementJump.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementJump);
    soundJump = audioElementJump

    const audioElementAou: HTMLAudioElement = document.createElement('audio');
    audioElementAou.id = "aouSound"
    audioElementAou.controls = false;
    audioElementAou.autoplay = false;
    audioElementAou.loop = false;
    audioElementAou.muted = false;
    audioElementAou.preload = 'auto';
    audioElementAou.src = './assets/aou.mp3';
    audioElementAou.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementAou);
    soundAou = audioElementAou

    const audioElementBip: HTMLAudioElement = document.createElement('audio');
    audioElementBip.id = "bipSound"
    audioElementBip.controls = false;
    audioElementBip.autoplay = false;
    audioElementBip.loop = false;
    audioElementBip.muted = false;
    audioElementBip.preload = 'auto';
    audioElementBip.src = './assets/bip.mp3';
    audioElementBip.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementBip);
    soundBip = audioElementBip

    const audioElementMusic: HTMLAudioElement = document.createElement('audio');
    audioElementMusic.id = "musicSound"
    audioElementMusic.controls = false;
    audioElementMusic.autoplay = false;
    audioElementMusic.loop = true;
    audioElementMusic.muted = false;
    audioElementMusic.preload = 'auto';
    audioElementMusic.src = './assets/mario2-theme.mp3';
    audioElementMusic.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementMusic);
    music = audioElementMusic

}

// Créer un bouton Jouer
const fullscreenButton = document.createElement('button');
fullscreenButton.innerText = 'Jouer';
fullscreenButton.style.position = 'fixed';
fullscreenButton.style.top = '50%';
fullscreenButton.style.left = '50%';
fullscreenButton.style.transform = 'translate(-50%, -50%)';
fullscreenButton.style.zIndex = '1000';
fullscreenButton.style.padding = '40px 80px';
fullscreenButton.style.fontSize = '48px';
fullscreenButton.style.backgroundColor = '#007acc';
fullscreenButton.style.color = 'white';
fullscreenButton.style.border = 'none';
fullscreenButton.style.borderRadius = '20px';
fullscreenButton.style.cursor = 'pointer';
fullscreenButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';

fullscreenButton.addEventListener('click', () => {
    // requestFullscreen();
    fullscreenButton.style.display = 'none'; // Cacher le bouton après activation
    soundBip.volume = 0.0
    soundBip.play()
    soundAou.volume = 0.0
    soundAou.play()
    music.volume = 0.5
    music.play()
    new Core({ soundJump, soundBip, soundAou });
});

loadAudio()
document.body.appendChild(fullscreenButton);
