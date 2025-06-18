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

// Créer un bouton plein écran
const fullscreenButton = document.createElement('button');
fullscreenButton.innerText = 'Plein écran';
fullscreenButton.style.position = 'fixed';
fullscreenButton.style.top = '10px';
fullscreenButton.style.right = '10px';
fullscreenButton.style.zIndex = '1000';
fullscreenButton.style.padding = '10px';
fullscreenButton.style.backgroundColor = '#007acc';
fullscreenButton.style.color = 'white';
fullscreenButton.style.border = 'none';
fullscreenButton.style.borderRadius = '5px';
fullscreenButton.style.cursor = 'pointer';

fullscreenButton.addEventListener('click', () => {
    requestFullscreen();
    fullscreenButton.style.display = 'none'; // Cacher le bouton après activation
});

document.body.appendChild(fullscreenButton);

new Core();
