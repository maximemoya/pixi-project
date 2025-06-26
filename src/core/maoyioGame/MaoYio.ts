import { Application, Container, Ticker } from "pixi.js"
import { Player } from "./player/Player"
import { Coin } from "./coin/Coin"
import { Shell } from "./enemies/shell/Shell"
import { BackgroundSky } from "./background/skies/sky/BackgroundSky"
import { BackgroundSkies } from "./background/skies/BackgroundSkies"
import { BackgroundGrounds } from "./background/grounds/BackgroundGrounds"
import { BackgroundGround } from "./background/grounds/ground/BackgroundGround"
import { Distance } from "./ui/distance/Distance"
import { Score } from "./ui/score/Score"
import { Hearts } from "./hearts/Hearts"

type Sounds = {
    soundJump: HTMLAudioElement,
    soundAou: HTMLAudioElement,
    soundBip: HTMLAudioElement,
    soundBop: HTMLAudioElement,
    soundDududili: HTMLAudioElement
}

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

    public hearts: Hearts

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

    public score: Score

    // ------------------------------------------

    public distance: Distance

    // ------------------------------------------

    private readonly sounds: Sounds;
    private readonly getWidthScreen: () => number;
    private readonly getHeightScreen: () => number;

    // ------------------------------------------

    private isGamePause = { value: true }

    // ------------------------------------------

    private container: Container

    // ------------------------------------------

    constructor(container: Container, sounds: Sounds, app: Application) {

        this.getWidthScreen = () => { return app.screen.width }
        this.getHeightScreen = () => { return app.screen.height }
        this.container = container
        this.container.removeChildren();

        // ------------------
        // --- IMAGE --------
        // ------------------
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

        const toDoAfterDeath = () => {
            this.player.reset()
            this.hearts.actualizeWithPlayer()
            this.coin.coinReset()
            this.shell.shellReset()
            this.distance.reset()
            this.score.reset()
        }

        this.player = new Player(this.container, this.getWidthScreen, this.getHeightScreen, toDoAfterDeath)
        this.hearts = new Hearts(this.container, this.getWidthScreen, this.getHeightScreen, this.player)
        this.player.hearts = this.hearts

        this.shell = new Shell(this.container, this.getWidthScreen, this.getHeightScreen)

        this.coin = new Coin(this.container, this.getWidthScreen, this.getHeightScreen)

        this.distance = new Distance(app, this.container, this.isGamePause)

        this.score = new Score(this.container)



        // ------------------
        // --- AUDIO --------
        // ------------------
        this.sounds = sounds
        setTimeout(() => {
            this.sounds.soundJump.volume = 1.0
            this.sounds.soundAou.volume = 1.0
            this.sounds.soundBip.volume = 1.0
            this.sounds.soundBop.volume = 1.0
            this.sounds.soundDududili.volume = 1.0
        }, 1000);

        // ------------------
        // --- EVENT --------
        // ------------------
        this.container.eventMode = "static"
        this.container.onpointerdown = () => {
            if (this.distance.onPointerDown()) {
                sounds.soundDududili.currentTime = 0
                sounds.soundDududili.play()
                return
            }
            if (this.distance.isOnUse) {
                return
            }
            this.player.jump(sounds)
        }

        // ------------------
        // --- LOOPS --------
        // ------------------
        const tickerRender = new Ticker()
        tickerRender.minFPS = 20
        tickerRender.maxFPS = 30
        tickerRender.add(() => {
            if (this.isGamePause.value) {
                return
            }
            this.backGroundSkies.action()
            this.backGroundGrounds.action()
            this.distance.action()
            this.player.playerAction()
            this.shell.shellAction()
            this.coin.coinAction()
            this.player.interactionBetweenPlayerAndShell(this.shell, this.sounds, this.score)
            this.player.interactionBetweenPlayerAndCoin(this.coin, this.sounds, this.score)
            this.render()
        })
        tickerRender.start()

        // ------------------

        const tickerAnimation = new Ticker()
        tickerAnimation.minFPS = 5
        tickerAnimation.maxFPS = 6
        tickerAnimation.add(() => {
            this.player.image.updateIndexSprite()
            this.shell.image.updateIndexSprite()
            this.coin.image.updateIndexSprite()
        })
        tickerAnimation.start()

        // ------------------

    }

    // ------------------------------------------

    private render() {

        this.backGroundSkies.render()
        this.backGroundGrounds.render()
        this.player.image.render()
        this.shell.image.render()
        this.coin.image.render()
        this.score.render()
        this.distance.render()
        this.hearts.render()

    }

    // ------------------------------------------

}