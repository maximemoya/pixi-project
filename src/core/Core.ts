import { Application, Container } from "pixi.js";
import { MaoYio } from "./maoyioGame/MaoYio";

type Sounds = {
    soundJump: HTMLAudioElement,
    soundAou: HTMLAudioElement,
    soundBip: HTMLAudioElement,
    soundBop: HTMLAudioElement,
    soundDududili: HTMLAudioElement
}

export class Core {


    constructor(sounds: Sounds) {
        (async () => { this.init(new Application(), sounds) })()
    }

    async init(app: Application, sounds: Sounds) {

        const pixiHtmlDivElement = document.getElementById("pixi-container");
        this.modifyWidthAccordingWindowOrientation({ pixiHtmlDivElement })
        await app.init({
            background: "#1099bb",
            resizeTo: pixiHtmlDivElement,
            preference: "webgl",
            powerPreference: "low-power"
        });
        pixiHtmlDivElement?.appendChild(app.canvas)

        const container = new Container();
        app.stage.addChild(container);

        new MaoYio(container, sounds, app)

    }

    private modifyWidthAccordingWindowOrientation(objetToModify: { pixiHtmlDivElement: HTMLElement }) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            objetToModify.pixiHtmlDivElement.style.width = "50vw"
        }
    }

}
