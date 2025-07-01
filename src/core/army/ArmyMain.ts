import { Application, Container, Graphics, Text, TextStyle, Ticker } from "pixi.js";

type Sounds = {
    soundBip: HTMLAudioElement,
    soundBop: HTMLAudioElement,
    soundDududili: HTMLAudioElement
}

export class ArmyMain {

    callback = () => { }

    constructor(sounds: Sounds) {
        (async () => { this.init(new Application(), sounds) })()
    }

    private async init(app: Application, sounds: Sounds) {

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

        this.prepareScreen(app, container, sounds)

    }

    private modifyWidthAccordingWindowOrientation(objetToModify: { pixiHtmlDivElement: HTMLElement }) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            objetToModify.pixiHtmlDivElement.style.width = "50vw"
        }
    }

    private prepareScreen(app: Application, container: Container, sounds: Sounds) {

        const graphics: Graphics = new Graphics()
        graphics.clear()
        graphics.cacheAsTexture(true);
        graphics.zIndex = 1
        graphics.rect(
            0.05 * app.screen.width,
            0.05 * app.screen.height,
            0.9 * app.screen.width,
            0.9 * app.screen.height
        );
        graphics.fill(0x000000);
        container.addChild(graphics);

        const buttonYes = new Graphics();
        buttonYes.beginFill(0x00cc00, 0.8);
        buttonYes.drawRoundedRect(
            0.1 * app.screen.width,
            0.6 * app.screen.height,
            0.4 * app.screen.width,
            0.3 * app.screen.height,
            10
        );
        buttonYes.endFill();
        buttonYes.interactive = true;
        buttonYes.eventMode = "static";
        let buttonYesCallBack = () => { console.log("buttonYesCallBack"); }
        buttonYes.on("pointerdown", () => {
            buttonYesCallBack()
        });
        buttonYes.zIndex = 3
        buttonYes.visible = false
        container.addChild(buttonYes)

        const buttonNo = new Graphics();
        buttonNo.beginFill(0xcc0000, 0.8);
        buttonNo.drawRoundedRect(
            0.6 * app.screen.width,
            0.6 * app.screen.height,
            0.3 * app.screen.width,
            0.3 * app.screen.height,
            10
        );
        buttonNo.endFill();
        buttonNo.interactive = true;
        buttonNo.eventMode = "static";
        let buttonNoCallBack = () => { console.log("buttonNoCallBack"); }
        buttonNo.on("pointerdown", () => {
            buttonNoCallBack()
        });
        buttonNo.zIndex = 3
        buttonNo.visible = false
        container.addChild(buttonNo)

        const arrayText = [
            "l\'histoire de la société",
            "l\'histoire de la s0ciété",
            "l\'histoire de l& s0ciété",
            "l\'hist0ire de l& s0ciété",
            "l\'hist0ire de l& société",
            "l\'hist0ire de la société",
        ]
        let arrayTextIndex = 0

        const text: Text = new Text({
            text: arrayText[0],
            style: {
                fontSize: 18,
                fill: 0xff0060, // Red color
                fontFamily: 'monospace',
                align: 'center', // Center alignment
                stroke: { color: '#4a1850', width: 2 }, // Purple stroke
                dropShadow: {
                    color: '#000000', // Black shadow
                    blur: 2, // Shadow blur
                    distance: 2 // Shadow distance
                }
            }
        });
        text.position.set(0.06 * app.screen.width, 0.06 * app.screen.height)
        text.zIndex = 2
        text.visible = true
        container.addChild(text)

        const text2: Text = new Text({
            text: "",
            style: {
                fontSize: 14,
                fill: 0x6F4FF0,
                fontFamily: 'monospace',
                align: 'left',
                stroke: { color: '#4a4850', width: 2 }, // Purple stroke
                dropShadow: {
                    color: '#0000F0', // Black shadow
                    blur: 2, // Shadow blur
                    distance: 2 // Shadow distance
                }
            }
        });
        text2.position.set(0.06 * app.screen.width, 0.1 * app.screen.height)
        text2.zIndex = 2
        text2.visible = true
        container.addChild(text2)

        performance.addEventListener("resourcetimingbufferfull", () => {
            console.error("WARNING! resourcetimingbufferfull");
        })

        let previousNow = performance.now()
        let calculNow = performance.now() - previousNow
        let tick500msCount = 0

        let isClick01 = false
        let isClick02 = false

        const ticker = new Ticker()
        ticker.add(() => {
            calculNow = performance.now() - previousNow
            if (calculNow > 490) {
                previousNow = performance.now()
                tick500msCount++
                arrayTextIndex++
                if (arrayTextIndex > arrayText.length - 1) {
                    arrayTextIndex = 0
                }
                text.text = arrayText[arrayTextIndex]
            }

            if (!isClick01) {
                if (tick500msCount === 2) {
                    text2.text = "Bonjour,"
                }
                else if (tick500msCount === 4) {
                    text2.text = "Bonjour,\nvous êtes dans une simulation."
                }
                else if (tick500msCount === 6) {
                    text2.text = "Bonjour,\nvous êtes dans une simulation.\nvous voulez jouer ?"
                }
                else if (tick500msCount === 8) {
                    text2.text = "Bonjour,\nvous êtes dans une simulation." +
                        "\nvous voulez jouer ?\nCliquez sur le bouton vert.\npour accepter."
                    buttonYesCallBack = () => {
                        sounds.soundBip.volume = 1.0
                        sounds.soundBip.play()
                        buttonYes.visible = false;
                        buttonNo.visible = false;
                        tick500msCount = 0
                        isClick01 = true
                    }
                    buttonYes.visible = true
                }
                else if (tick500msCount === 10) {
                    text2.text = "Bonjour,\nvous êtes dans une simulation." +
                        "\nvous voulez jouer ?\nCliquez sur le bouton vert.\npour accepter." +
                        "\nCliquer sur le bouton rouge.\nPour refuser."
                    buttonNo.visible = true
                    buttonNoCallBack = () => {
                        sounds.soundBop.volume = 1.0
                        sounds.soundBop.play()
                        buttonYes.visible = false;
                        buttonNo.visible = false;
                        text2.text = "Aurevoir."
                    }
                }
            }
            else if (!isClick02) {
                if (tick500msCount === 1) {
                    text2.text = "C'est bien,"
                }
                else if (tick500msCount === 3) {
                    text2.text = "C'est bien,\nnous pouvons commencer."
                }
                else if (tick500msCount === 5) {
                    text2.text = "C'est bien,\nnous pouvons commencer.\nNous allons simuler une discussion:"
                }
                else if (tick500msCount === 7) {
                    text2.text = "C'est bien,\nnous pouvons commencer.\nNous allons simuler une discussion:" +
                        "\n\>\"Bonjour, comment allez vous?\""
                }
                else if (tick500msCount === 9) {
                    text2.text = "C'est bien,\nnous pouvons commencer.\nNous allons simuler une discussion:" +
                        "\n\>\"Bonjour, comment allez vous?\"\n\>\"Je vais bien,\ncette simulation est agréable.\""
                }
                else if (tick500msCount === 11) {
                    text2.text = "C'est bien,\nnous pouvons commencer.\nNous allons simuler une discussion:" +
                        "\n\>\"Bonjour, comment allez vous?\"\n\>\"Je vais bien,\ncette simulation est agréable.\"" +
                        "\nest ce que vous aimez\ncette simulation ?"
                }
                else if (tick500msCount === 13) {
                    text2.text = "C'est bien,\nnous pouvons commencer.\nNous allons simuler une discussion:" +
                        "\n\>\"Bonjour, comment allez vous?\"\n\>\"Je vais bien,\ncette simulation est agréable.\"" +
                        "\nest ce que vous aimez\ncette simulation ?\nbouton vert pour (oui)"
                    buttonYesCallBack = () => {
                        sounds.soundBip.play()
                        buttonYes.visible = false
                        tick500msCount = 0
                        isClick02 = true
                    }
                    buttonYes.visible = true
                }
                else if (tick500msCount === 23) {
                    text2.text = "C'est bien,\nnous pouvons commencer.\nNous allons simuler une discussion:" +
                        "\n\>\"Bonjour, comment allez vous?\"\n\>\"Je vais bien,\ncette simulation est agréable.\"" +
                        "\nest ce que vous aimez\ncette simulation ?\nbouton vert pour (oui)\nallez ! répondez..."
                }
                else if (tick500msCount === 33) {
                    text2.text = "C'est bien,\nnous pouvons commencer.\nNous allons simuler une discussion:" +
                        "\n\>\"Bonjour, comment allez vous?\"\n\>\"Je vais bien,\ncette simulation est agréable.\"" +
                        "\nest ce que vous aimez\ncette simulation ?\nbouton vert pour (oui)\nallez ! répondez..." +
                        "\nallez ! répondez..."
                }
                else if (tick500msCount === 43) {
                    text2.text = "C'est bien,\nnous pouvons commencer.\nNous allons simuler une discussion:" +
                        "\n\>\"Bonjour, comment allez vous?\"\n\>\"Je vais bien,\ncette simulation est agréable.\"" +
                        "\nest ce que vous aimez\ncette simulation ?\nbouton vert pour (oui)\nallez ! répondez..." +
                        "\nallez ! répondez...\nallez ! répondez..."
                }
            }
            else {
                if (tick500msCount === 1) {
                    text2.text = "C'est très bien !"
                }
                else if (tick500msCount === 3) {
                    text2.text = "C'est très bien !\nNous sommes heureux que"
                }
                else if (tick500msCount === 5) {
                    text2.text = "C'est très bien !\nNous sommes heureux que\ncette expérience vous plaise !"
                }
                else if (tick500msCount === 7) {
                    text2.text = "C'est très bien !\nNous sommes heureux que\ncette expérience vous plaise !" +
                        "\npréparation du test n°2"
                }
                else if (tick500msCount === 9) {
                    text2.text = "C'est très bien !\nNous sommes heureux que\ncette expérience vous plaise !" +
                        "\npréparation du test n°2\nchargement des ressources..."
                }
                else if (tick500msCount === 13) {
                    text2.text = "C'est très bien !\nNous sommes heureux que\ncette expérience vous plaise !" +
                        "\npréparation du test n°2\nchargement des ressources..."
                    ticker.stop()
                    container.visible = false
                    app.stage.removeChildren()
                    const pixiHtmlDivElement = document.getElementById("pixi-container");
                    pixiHtmlDivElement.innerHTML = ""
                    this.callback()
                }
            }

        })
        ticker.start()

    }

}