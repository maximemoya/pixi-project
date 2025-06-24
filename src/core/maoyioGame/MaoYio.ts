import { Application, Assets, Container, FillGradient, Graphics, Rectangle, Sprite, Text, Texture, Ticker } from "pixi.js"
import { Player } from "./player/Player"
import { Coin } from "./coin/Coin"
import { Shell } from "./enemies/shell/Shell"
import { TextService } from "./pixiService/textService/TextService"
import { BackgroundSky } from "./background/skies/sky/BackgroundSky"
import { BackgroundSkies } from "./background/skies/BackgroundSkies"
import { BackgroundGrounds } from "./background/grounds/BackgroundGrounds"
import { BackgroundGround } from "./background/grounds/ground/BackgroundGround"

type Sounds = { soundJump: HTMLAudioElement, soundBip: HTMLAudioElement, soundAou: HTMLAudioElement }

export class MaoYio {

    // ------------------------------------------

    public backGroundSkies: BackgroundSkies
    // private readonly skyPath = "./assets/land-spritesheet-alpha.png"
    // private readonly spriteLocationSky = { x: 0, y: 16, w: 256, h: 208 }

    // ------------------------------------------

    public backGroundGrounds: BackgroundGrounds
    // private readonly groundPath = "./assets/land-spritesheet-alpha.png"
    // private readonly spriteLocationGround = { x: 0, y: 224, w: 256, h: 32 }

    // ------------------------------------------

    public player: Player
    // private readonly marioPath = "./assets/mario-spritesheet-alpha.png"
    // private readonly spriteLocationMarioIdle1 = { x: 3, y: 9, w: 17, h: 31 }
    // private readonly spriteLocationMarioIdle2 = { x: 23, y: 9, w: 17, h: 31 }
    // private readonly spriteLocationMarioJump = { x: 63, y: 9, w: 17, h: 31 }

    // ------------------------------------------

    public shell: Shell
    // private readonly koopaPath = "./assets/koopa-spritesheet-alpha.png"
    // private readonly spriteLocationKoopaMoving1 = { x: 1, y: 1, w: 16, h: 16 }
    // private readonly spriteLocationKoopaMoving2 = { x: 18, y: 1, w: 16, h: 16 }
    // private readonly spriteLocationKoopaMoving3 = { x: 35, y: 1, w: 16, h: 16 }
    // private readonly spriteLocationKoopaMoving4 = { x: 52, y: 1, w: 16, h: 16 }

    // ------------------------------------------

    public coin: Coin
    // private readonly spriteLocationCoinIdle1 = { x: 2, y: 2, w: 16, h: 24 }
    // private readonly spriteLocationCoinIdle2 = { x: 2, y: 30, w: 16, h: 24 }
    // private readonly spriteLocationCoinIdle3 = { x: 2, y: 58, w: 16, h: 24 }

    // ------------------------------------------

    public previousScore = 0
    public score = { value: 0 }
    public scoreTextContainer: Text = new Text({
        text: this.score.value + " $",
        style: {
            fontFamily: 'Arial',
            fontSize: 32,
            fill: new FillGradient({
                end: { x: 1, y: 1 },
                colorStops: [
                    { offset: 0, color: 0x44FF22 },
                    { offset: 1, color: 0x11AA44 }
                ]
            }),
            stroke: { color: '#4a1850', width: 5 },
            dropShadow: {
                color: '#000000',
                blur: 4,
                distance: 6
            },
            align: 'center'
        },
    })

    // ------------------------------------------

    public distance = { value: 0 }
    public messageDistanceTrigger = { value: 5 }
    public distanceTextContainer: Text = new Text({
        text: this.distance.value + " m",
        style: {
            fontFamily: 'Arial',
            fontSize: 32,
            fill: new FillGradient({
                end: { x: 1, y: 1 },
                colorStops: [
                    { offset: 0, color: 0xFFFF00 },
                    { offset: 1, color: 0x00FFFF }
                ]
            }),
            stroke: { color: '#4a1850', width: 5 },
            dropShadow: {
                color: '#000000',
                blur: 4,
                distance: 6
            },
            align: 'center'
        },
    })

    // ------------------------------------------

    private readonly sounds: Sounds;
    private readonly getWidthScreen: () => number;
    private readonly getHeightScreen: () => number;

    // ------------------------------------------

    private ispaused = true
    private textState = 0

    // ------------------------------------------

    private container: Container
    private textService: TextService
    private textContainer: Container

    // ------------------------------------------

    constructor(container: Container, sounds: Sounds, app: Application) {

        this.getWidthScreen = () => { return app.screen.width }
        this.getHeightScreen = () => { return app.screen.height }
        this.container = container
        container.removeChildren();

        const backgroundSky01 = new BackgroundSky(
            { x: -0.5, y: 0.0, w: 1.5, h: 1.0 },
            this.container,
            this.getWidthScreen,
            this.getHeightScreen
        )
        const backgroundSky02 = new BackgroundSky(
            { x: 1.0, y: 0.0, w: 1.5, h: 1.0 },
            this.container,
            this.getWidthScreen,
            this.getHeightScreen
        )
        this.backGroundSkies = new BackgroundSkies(
            backgroundSky01, backgroundSky02
        )

        const backgroundGround01 = new BackgroundGround(
            { x: -0.5, y: 0.9, w: 1.5, h: 0.1 },
            this.container,
            this.getWidthScreen,
            this.getHeightScreen
        )
        const backgroundGround02 = new BackgroundGround(
            { x: 1.0, y: 0.9, w: 1.5, h: 0.1 },
            this.container,
            this.getWidthScreen,
            this.getHeightScreen
        )
        this.backGroundGrounds = new BackgroundGrounds(
            backgroundGround01, backgroundGround02
        )

        this.player = new Player(this.container, this.getWidthScreen, this.getHeightScreen)

        this.shell = new Shell(this.container, this.getWidthScreen, this.getHeightScreen)

        this.coin = new Coin(this.container, this.getWidthScreen, this.getHeightScreen)

        this.textService = new TextService(app);
        this.textContainer = this.textService.createContinuePopup("Appuyer\npour\ncommencer", this.container)

        container.eventMode = "static"
        container.onpointerdown = () => {
            if (this.textState === 0) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 2) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 4) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 6) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 8) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 10) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 12) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 14) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 16) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 18) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 20) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 22) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 24) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 26) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 28) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 30) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 32) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 34) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            else if (this.textState === 36) {
                this.textContainer.destroy(true)
                this.ispaused = false
                this.textState++
                return
            }
            this.player.jump(sounds.soundJump)
        }

        this.sounds = sounds
        setTimeout(() => {
            this.sounds.soundAou.volume = 1.0
            this.sounds.soundBip.volume = 1.0
            this.sounds.soundJump.volume = 1.0
        }, 1000);

        this.scoreTextContainer.x = 25
        this.scoreTextContainer.y = 25
        this.scoreTextContainer.zIndex = 7

        this.distanceTextContainer.x = 25
        this.distanceTextContainer.y = 75
        this.distanceTextContainer.zIndex = 7

        container.addChild(this.scoreTextContainer, this.distanceTextContainer);

        const tickerRender = new Ticker()
        tickerRender.minFPS = 20
        tickerRender.maxFPS = 30
        tickerRender.add(() => {
            if (this.ispaused) {
                return
            }
            this.backGroundSkies.action()
            this.backGroundGrounds.action()
            this.distanceAction()
            this.player.playerAction()
            this.shell.shellAction()
            this.coin.coinAction()
            this.player.interactionBetweenPlayerAndShell(this.shell, this.sounds.soundAou, this.score)
            this.player.interactionBetweenPlayerAndCoin(this.coin, this.sounds.soundBip, this.score)
            this.render()
        })
        tickerRender.start()

        const tickerAnimation = new Ticker()
        tickerAnimation.minFPS = 5
        tickerAnimation.maxFPS = 6
        tickerAnimation.add(() => {

            this.player.image.updateIndexSprite()
            this.shell.image.updateIndexSprite()
            this.coin.image.updateIndexSprite()

        })
        tickerAnimation.start()

    }

    // ------------------------------------------

    private distanceAction() {
        this.distance.value += 0.025
        if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 2) {
            this.textContainer = this.textService.createContinuePopup("Bravo\nvous avez\nfait 5m", this.container)
            this.textState = 2
            this.ispaused = true
            this.messageDistanceTrigger.value = 10
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 4) {
            this.textContainer = this.textService.createContinuePopup("les carapaces\nvous font\nperdre 1$", this.container)
            this.textState = 4
            this.ispaused = true
            this.messageDistanceTrigger.value = 15
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 6) {
            this.textContainer = this.textService.createContinuePopup("les pièces\nvous font\ngagner 1$", this.container)
            this.textState = 6
            this.ispaused = true
            this.messageDistanceTrigger.value = 20
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 8) {
            this.textContainer = this.textService.createContinuePopup("je n'ai\npas\nd'ami ...", this.container)
            this.textState = 8
            this.ispaused = true
            this.messageDistanceTrigger.value = 25
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 10) {
            this.textContainer = this.textService.createContinuePopup("tu veux\nêtre\nmon ami ?", this.container)
            this.textState = 10
            this.ispaused = true
            this.messageDistanceTrigger.value = 30
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 12) {
            this.textContainer = this.textService.createContinuePopup("on fait\nun\nmarathon ?", this.container)
            this.textState = 12
            this.ispaused = true
            this.messageDistanceTrigger.value = 50
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 14) {
            this.textContainer = this.textService.createContinuePopup("la vie\nc'est comme\nune boite\nde chocolat", this.container)
            this.textState = 14
            this.ispaused = true
            this.messageDistanceTrigger.value = 100
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 16) {
            this.textContainer = this.textService.createContinuePopup("tu connais\nles crevettes\nde booba ?", this.container)
            this.textState = 16
            this.ispaused = true
            this.messageDistanceTrigger.value = 200
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 18) {
            this.textContainer = this.textService.createContinuePopup("un jour\nje suis allé\nau Vietnam.", this.container)
            this.textState = 18
            this.ispaused = true
            this.messageDistanceTrigger.value = 210
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 20) {
            this.textContainer = this.textService.createContinuePopup("mais c'était\npas comme\ndans les films", this.container)
            this.textState = 20
            this.ispaused = true
            this.messageDistanceTrigger.value = 300
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 22) {
            this.textContainer = this.textService.createContinuePopup("j'ai joué dans\nla ligue de\nbaseball ^^", this.container)
            this.textState = 22
            this.ispaused = true
            this.messageDistanceTrigger.value = 310
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 24) {
            this.textContainer = this.textService.createContinuePopup("on me disait\ntout le temps\n\"cours Forest !\"", this.container)
            this.textState = 24
            this.ispaused = true
            this.messageDistanceTrigger.value = 400
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 26) {
            this.textContainer = this.textService.createContinuePopup("j'aimais bien\ncourir\nmoi :)", this.container)
            this.textState = 26
            this.ispaused = true
            this.messageDistanceTrigger.value = 500
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 28) {
            this.textContainer = this.textService.createContinuePopup("je suis\nfatigué\non arrête ?", this.container)
            this.textState = 28
            this.ispaused = true
            this.messageDistanceTrigger.value = 510
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 30) {
            this.textContainer = this.textService.createContinuePopup("je suis\nfatigué\nil faut arrêter", this.container)
            this.textState = 30
            this.ispaused = true
            this.messageDistanceTrigger.value = 515
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 32) {
            this.textContainer = this.textService.createContinuePopup("je suis\nfatigué\nallé stop !", this.container)
            this.textState = 32
            this.ispaused = true
            this.messageDistanceTrigger.value = 517
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 34) {
            this.textContainer = this.textService.createContinuePopup("j'ai\nmal\ns'il te plait !", this.container)
            this.textState = 34
            this.ispaused = true
            this.messageDistanceTrigger.value = 519
        }
        else if (this.distance.value >= this.messageDistanceTrigger.value && this.textState < 36) {
            this.textContainer = this.textService.createContinuePopup("je ne me sens\npas bien du\ntout ...", this.container)
            this.textState = 36
            this.ispaused = true
            this.messageDistanceTrigger.value = 521
        }

    }

    // ------------------------------------------

    private render() {

        this.backGroundSkies.render()
        this.backGroundGrounds.render()

        this.player.image.render()

        this.shell.image.render()

        this.coin.image.render()

        if (this.previousScore !== this.score.value) {
            this.previousScore = this.score.value
            this.scoreTextContainer.text = `${this.score.value} $`
        }

        this.distanceTextContainer.text = `${this.distance.value.toFixed(1)} m`

    }

    // ------------------------------------------

}