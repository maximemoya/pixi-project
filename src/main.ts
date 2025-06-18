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
fullscreenButton.innerText = 'Jouer';
fullscreenButton.style.position = 'fixed';
fullscreenButton.style.top = '50%';
fullscreenButton.style.left = '50%';
fullscreenButton.style.transform = 'translate(-50%, -50%)';
fullscreenButton.style.zIndex = '1000';
fullscreenButton.style.padding = '20px 40px';
fullscreenButton.style.fontSize = '24px';
fullscreenButton.style.backgroundColor = '#007acc';
fullscreenButton.style.color = 'white';
fullscreenButton.style.border = 'none';
fullscreenButton.style.borderRadius = '10px';
fullscreenButton.style.cursor = 'pointer';
fullscreenButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';

fullscreenButton.addEventListener('click', () => {
    requestFullscreen();
    fullscreenButton.style.display = 'none'; // Cacher le bouton après activation

});

document.body.appendChild(fullscreenButton);
new Core();

