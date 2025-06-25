import { Core } from "./core/Core";

document.body.appendChild(createStartButton(loadSounds()));

// -----------------------------------------------------------

type SoundsLoaded = {
    soundJump: HTMLAudioElement,
    soundAou: HTMLAudioElement,
    soundBip: HTMLAudioElement,
    soundBop: HTMLAudioElement,
    soundDududili: HTMLAudioElement,
    music: HTMLAudioElement
}


function loadSounds(): SoundsLoaded {

    const audioElementJump: HTMLAudioElement = document.createElement('audio');
    audioElementJump.id = "jumpSound"
    audioElementJump.controls = false;
    audioElementJump.autoplay = false;
    audioElementJump.loop = false;
    audioElementJump.muted = false;
    audioElementJump.preload = 'auto';
    audioElementJump.src = './assets/sounds/yop.mp3';
    audioElementJump.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementJump);

    const audioElementAou: HTMLAudioElement = document.createElement('audio');
    audioElementAou.id = "aouSound"
    audioElementAou.controls = false;
    audioElementAou.autoplay = false;
    audioElementAou.loop = false;
    audioElementAou.muted = false;
    audioElementAou.preload = 'auto';
    audioElementAou.src = './assets/sounds/aou.mp3';
    audioElementAou.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementAou);

    const audioElementBip: HTMLAudioElement = document.createElement('audio');
    audioElementBip.id = "bipSound"
    audioElementBip.controls = false;
    audioElementBip.autoplay = false;
    audioElementBip.loop = false;
    audioElementBip.muted = false;
    audioElementBip.preload = 'auto';
    audioElementBip.src = './assets/sounds/bip.mp3';
    audioElementBip.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementBip);

    const audioElementBop: HTMLAudioElement = document.createElement('audio');
    audioElementBop.id = "bopSound"
    audioElementBop.controls = false;
    audioElementBop.autoplay = false;
    audioElementBop.loop = false;
    audioElementBop.muted = false;
    audioElementBop.preload = 'auto';
    audioElementBop.src = './assets/sounds/bop.mp3';
    audioElementBop.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementBop);

    const audioElementDududili: HTMLAudioElement = document.createElement('audio');
    audioElementDududili.id = "dududiliSound"
    audioElementDududili.controls = false;
    audioElementDududili.autoplay = false;
    audioElementDududili.loop = false;
    audioElementDududili.muted = false;
    audioElementDududili.preload = 'auto';
    audioElementDududili.src = './assets/sounds/dududili.mp3';
    audioElementDududili.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementDududili);

    const audioElementMusic: HTMLAudioElement = document.createElement('audio');
    audioElementMusic.id = "musicSound"
    audioElementMusic.controls = false;
    audioElementMusic.autoplay = false;
    audioElementMusic.loop = false;
    audioElementMusic.muted = false;
    audioElementMusic.preload = 'auto';
    audioElementMusic.src = './assets/sounds/mario2-theme-V1.mp3';
    audioElementMusic.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementMusic);

    return { soundJump: audioElementJump, soundAou: audioElementAou, soundBip: audioElementBip, soundBop: audioElementBop, soundDududili: audioElementDududili, music: audioElementMusic }

}

function createStartButton(soundsLoaded: SoundsLoaded): HTMLButtonElement {

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
        fullscreenButton.style.display = 'none'; // Cacher le bouton après activation
        soundsLoaded.soundBip.volume = 0.0
        soundsLoaded.soundBip.play()
        soundsLoaded.soundAou.volume = 0.0
        soundsLoaded.soundAou.play()
        soundsLoaded.music.loop = true
        soundsLoaded.music.volume = 0.2
        soundsLoaded.music.play()
        new Core(soundsLoaded);
    });

    return fullscreenButton

}
