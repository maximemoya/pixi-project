import { ArmyMain } from "./core/army/ArmyMain";
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
    music2: HTMLAudioElement
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

    const audioElementMusic2: HTMLAudioElement = document.createElement('audio');
    audioElementMusic2.id = "musicSound"
    audioElementMusic2.controls = false;
    audioElementMusic2.autoplay = false;
    audioElementMusic2.loop = false;
    audioElementMusic2.muted = false;
    audioElementMusic2.preload = 'auto';
    audioElementMusic2.src = './assets/sounds/reloaded-short.mp3';
    audioElementMusic2.innerHTML += 'Your browser does not support the audio element.';
    document.body.appendChild(audioElementMusic2);

    return { soundJump: audioElementJump, soundAou: audioElementAou, soundBip: audioElementBip, soundBop: audioElementBop, soundDududili: audioElementDududili, music: audioElementMusic, music2: audioElementMusic2 }

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
        soundsLoaded.soundBop.volume = 0.0
        soundsLoaded.soundBop.play()
        soundsLoaded.soundBip.volume = 0.0
        soundsLoaded.soundBip.play()
        soundsLoaded.soundAou.volume = 0.0
        soundsLoaded.soundAou.play()
        soundsLoaded.music.loop = false
        soundsLoaded.music.volume = 0.0
        soundsLoaded.music.play()
        soundsLoaded.music2.loop = true
        soundsLoaded.music2.volume = 0.2
        soundsLoaded.music2.play()

        const armyMain = new ArmyMain(soundsLoaded)
        armyMain.callback = () => {
            soundsLoaded.music2.loop = false
            soundsLoaded.music2.pause()
            soundsLoaded.music.loop = true
            soundsLoaded.music.currentTime = 0.0
            soundsLoaded.music.volume = 0.3
            new Core(soundsLoaded);
        }

        // soundsLoaded.music.play()
        // new Core(soundsLoaded);

    });

    return fullscreenButton

}
