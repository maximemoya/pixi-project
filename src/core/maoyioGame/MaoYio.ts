import { Application, Assets, Container, Graphics, Rectangle, Sprite, Text, Texture, Ticker } from "pixi.js"
import { AssetsImageLoader } from "./pixiService/AssetsImageLoader"
import { Player } from "./player/Player"
import { Coin } from "./Coin/Coin"
import { Shell } from "./enemies/Shell"

type Sounds = { soundJump: HTMLAudioElement, soundBip: HTMLAudioElement, soundAou: HTMLAudioElement }

export class MaoYio {

    // ------------------------------------------

    public sky = { x: -0.5, y: 0.0, w: 1.5, h: 0.9, color: "#acbebf" }
    public sky2 = { x: 1.0, y: 0.0, w: 1.5, h: 0.9, color: "#acbebf" }
    public skyCell = new Graphics()

    // ------------------------------------------

    public spriteSky: Sprite | null = null
    public spriteSky2: Sprite | null = null
    private readonly spriteLocationSky = { x: 0, y: 16, w: 256, h: 208 }

    // ------------------------------------------

    public ground = { x: -0.5, y: 0.9, w: 1.5, h: 0.1, color: "brown" }
    public ground2 = { x: 1.0, y: 0.9, w: 1.5, h: 0.1, color: "brown" }
    public groundCell = new Graphics();

    // ------------------------------------------

    public spriteGround: Sprite | null = null
    public spriteGround2: Sprite | null = null
    private readonly spriteLocationGround = { x: 0, y: 224, w: 256, h: 32 }


    // ------------------------------------------

    public player: Player = new Player()
    public playerCell = new Graphics();

    // ------------------------------------------

    public spriteMario: Sprite | null = null
    private readonly spriteLocationMarioIdle1 = { x: 3, y: 9, w: 17, h: 31 }
    private readonly spriteLocationMarioIdle2 = { x: 23, y: 9, w: 17, h: 31 }
    private readonly spriteLocationMarioJump = { x: 63, y: 9, w: 17, h: 31 }
    public spriteMarioIdleTextureIndex = 0
    public spriteMarioIdleTextures: Texture[] = []
    public spriteMarioJumpTexture: Texture | null = null

    // ------------------------------------------

    public shell: Shell = new Shell()
    public shellCell = new Graphics();

    // ------------------------------------------

    public spriteKoopa: Sprite | null = null
    private readonly spriteLocationKoopaMoving1 = { x: 1, y: 1, w: 16, h: 16 }
    private readonly spriteLocationKoopaMoving2 = { x: 18, y: 1, w: 16, h: 16 }
    private readonly spriteLocationKoopaMoving3 = { x: 35, y: 1, w: 16, h: 16 }
    private readonly spriteLocationKoopaMoving4 = { x: 52, y: 1, w: 16, h: 16 }
    public spriteKoopaMovingTextureIndex = 0
    public spriteKoopaMovingTextures: Texture[] = []

    // ------------------------------------------

    public coin: Coin = new Coin()
    public coinCell = new Graphics();

    // ------------------------------------------

    public spriteCoin: Sprite | null = null
    private readonly spriteLocationCoinIdle1 = { x: 2, y: 2, w: 16, h: 24 }
    private readonly spriteLocationCoinIdle2 = { x: 2, y: 30, w: 16, h: 24 }
    private readonly spriteLocationCoinIdle3 = { x: 2, y: 58, w: 16, h: 24 }
    private spriteCoinTextureIndex = 0
    private spriteCoinTextures: Texture[] = []

    // ------------------------------------------

    public previousScore = 0
    public score = { value: 0 }
    public text: Text = new Text({
        text: "score: " + this.score.value,
        style: {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff, // white color
            align: 'center'
        }
    })

    // ------------------------------------------

    private readonly sounds: Sounds;
    private readonly getWidthScreen: () => number;
    private readonly getHeightScreen: () => number;

    // ------------------------------------------

    constructor(container: Container, sounds: Sounds, app: Application) {

        // TODO: AssetsImageLoader
        new AssetsImageLoader(this.getWidthScreen, this.getHeightScreen)

        this.getWidthScreen = () => { return app.screen.width }
        this.getHeightScreen = () => { return app.screen.height }

        container.eventMode = "static"
        container.removeChildren();
        container.onpointerdown = () => {
            this.player.jump(sounds.soundJump)
        }

        this.sounds = sounds
        setTimeout(() => {
            this.sounds.soundAou.volume = 1.0
            this.sounds.soundBip.volume = 1.0
            this.sounds.soundJump.volume = 1.0
        }, 1000);

        this.playerCell.visible = true;
        this.playerCell.zIndex = 9;
        container.addChild(this.playerCell);

        this.shellCell.visible = true;
        this.shellCell.zIndex = 10;
        container.addChild(this.shellCell);

        this.text.x = 25
        this.text.y = 25
        this.text.zIndex = 7

        this.skyCell.cacheAsTexture(true);
        this.skyCell.zIndex = 1
        this.skyCell.clear()
        this.skyCell.rect(this.sky.x * this.getWidthScreen(),
            this.sky.y * this.getHeightScreen(),
            this.sky.w * this.getWidthScreen(),
            this.sky.h * this.getHeightScreen()
        );
        this.skyCell.fill(this.sky.color);

        this.groundCell.cacheAsTexture(true);
        this.groundCell.zIndex = 1
        this.groundCell.clear()
        this.groundCell.rect(this.ground.x * this.getWidthScreen(),
            this.ground.y * this.getHeightScreen(),
            this.ground.w * this.getWidthScreen(),
            this.ground.h * this.getHeightScreen()
        );
        this.groundCell.fill(this.ground.color);

        container.addChild(this.skyCell, this.groundCell, this.text);

        Assets.load("./assets/land-spritesheet-alpha.png").then(
            (texture) => {

                let rectangle = new Rectangle(
                    this.spriteLocationSky.x,
                    this.spriteLocationSky.y,
                    this.spriteLocationSky.w,
                    this.spriteLocationSky.h
                );
                const skyTexture = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                this.spriteSky = new Sprite(skyTexture);
                this.spriteSky.x = this.sky.x * this.getWidthScreen()
                this.spriteSky.y = this.sky.y * this.getHeightScreen()
                this.spriteSky.width = this.sky.w * this.getWidthScreen()
                this.spriteSky.height = this.sky.h * this.getHeightScreen()
                this.spriteSky.visible = true;
                this.spriteSky.zIndex = 5

                this.spriteSky2 = new Sprite(skyTexture);
                this.spriteSky2.x = this.sky2.x * this.getWidthScreen()
                this.spriteSky2.y = this.sky2.y * this.getHeightScreen()
                this.spriteSky2.width = this.sky2.w * this.getWidthScreen()
                this.spriteSky2.height = this.sky2.h * this.getHeightScreen()
                this.spriteSky2.visible = true;
                this.spriteSky2.zIndex = 5

                container.addChild(this.spriteSky)
                container.addChild(this.spriteSky2)
                container.removeChild(this.skyCell)

                rectangle = new Rectangle(
                    this.spriteLocationGround.x,
                    this.spriteLocationGround.y,
                    this.spriteLocationGround.w,
                    this.spriteLocationGround.h
                );
                const groundTexture = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                this.spriteGround = new Sprite(groundTexture);
                this.spriteGround.x = this.ground.x * this.getWidthScreen()
                this.spriteGround.y = this.ground.y * this.getHeightScreen()
                this.spriteGround.width = this.ground.w * this.getWidthScreen()
                this.spriteGround.height = this.ground.h * this.getHeightScreen()
                this.spriteGround.visible = true;
                this.spriteGround.zIndex = 6

                this.spriteGround2 = new Sprite(groundTexture);
                this.spriteGround2.x = this.ground2.x * this.getWidthScreen()
                this.spriteGround2.y = this.ground2.y * this.getHeightScreen()
                this.spriteGround2.width = this.ground2.w * this.getWidthScreen()
                this.spriteGround2.height = this.ground2.h * this.getHeightScreen()
                this.spriteGround2.visible = true;
                this.spriteGround2.zIndex = 6

                container.addChild(this.spriteGround)
                container.addChild(this.spriteGround2)
                container.removeChild(this.groundCell)

            }
        )
        Assets.load("./assets/mario-spritesheet-alpha.png").then(
            (texture) => {

                let rectangle = new Rectangle(
                    this.spriteLocationMarioIdle1.x,
                    this.spriteLocationMarioIdle1.y,
                    this.spriteLocationMarioIdle1.w,
                    this.spriteLocationMarioIdle1.h
                );
                this.spriteMarioIdleTextures[0] = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                rectangle = new Rectangle(
                    this.spriteLocationMarioIdle2.x,
                    this.spriteLocationMarioIdle2.y,
                    this.spriteLocationMarioIdle2.w,
                    this.spriteLocationMarioIdle2.h
                );
                this.spriteMarioIdleTextures[1] = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                rectangle = new Rectangle(
                    this.spriteLocationMarioJump.x,
                    this.spriteLocationMarioJump.y,
                    this.spriteLocationMarioJump.w,
                    this.spriteLocationMarioJump.h
                );
                this.spriteMarioJumpTexture = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                this.spriteMario = new Sprite(this.spriteMarioIdleTextures[0]);
                this.spriteMario.width = this.player.w * this.getWidthScreen()
                this.spriteMario.height = this.player.h * this.getHeightScreen()
                this.spriteMario.visible = true;
                this.spriteMario.zIndex = 9

                container.addChild(this.spriteMario)
                container.removeChild(this.playerCell)

            }
        )
        Assets.load("./assets/koopa-spritesheet-alpha.png").then(
            (texture) => {

                let rectangle = new Rectangle(
                    this.spriteLocationKoopaMoving1.x,
                    this.spriteLocationKoopaMoving1.y,
                    this.spriteLocationKoopaMoving1.w,
                    this.spriteLocationKoopaMoving1.h
                );
                this.spriteKoopaMovingTextures[0] = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                rectangle = new Rectangle(
                    this.spriteLocationKoopaMoving2.x,
                    this.spriteLocationKoopaMoving2.y,
                    this.spriteLocationKoopaMoving2.w,
                    this.spriteLocationKoopaMoving2.h
                );
                this.spriteKoopaMovingTextures[1] = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                rectangle = new Rectangle(
                    this.spriteLocationKoopaMoving3.x,
                    this.spriteLocationKoopaMoving3.y,
                    this.spriteLocationKoopaMoving3.w,
                    this.spriteLocationKoopaMoving3.h
                );
                this.spriteKoopaMovingTextures[2] = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                rectangle = new Rectangle(
                    this.spriteLocationKoopaMoving4.x,
                    this.spriteLocationKoopaMoving4.y,
                    this.spriteLocationKoopaMoving4.w,
                    this.spriteLocationKoopaMoving4.h
                );
                this.spriteKoopaMovingTextures[3] = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                this.spriteKoopa = new Sprite(this.spriteKoopaMovingTextures[0]);
                this.spriteKoopa.width = this.shell.w * this.getWidthScreen()
                this.spriteKoopa.height = this.shell.h * this.getHeightScreen()
                this.spriteKoopa.visible = true;
                this.spriteKoopa.zIndex = 10

                container.addChild(this.spriteKoopa)
                container.removeChild(this.shellCell)

            }
        )
        Assets.load("./assets/coin-spritesheet-alpha.png").then(
            (texture) => {

                let rectangle = new Rectangle(
                    this.spriteLocationCoinIdle1.x,
                    this.spriteLocationCoinIdle1.y,
                    this.spriteLocationCoinIdle1.w,
                    this.spriteLocationCoinIdle1.h
                );
                this.spriteCoinTextures[0] = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                rectangle = new Rectangle(
                    this.spriteLocationCoinIdle2.x,
                    this.spriteLocationCoinIdle2.y,
                    this.spriteLocationCoinIdle2.w,
                    this.spriteLocationCoinIdle2.h
                );
                this.spriteCoinTextures[1] = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                rectangle = new Rectangle(
                    this.spriteLocationCoinIdle3.x,
                    this.spriteLocationCoinIdle3.y,
                    this.spriteLocationCoinIdle3.w,
                    this.spriteLocationCoinIdle3.h
                );
                this.spriteCoinTextures[2] = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                this.spriteCoin = new Sprite(this.spriteCoinTextures[this.spriteCoinTextureIndex]);
                this.spriteCoin.width = this.coin.w * this.getWidthScreen()
                this.spriteCoin.height = this.coin.h * this.getHeightScreen()
                this.spriteCoin.visible = true;
                this.spriteCoin.zIndex = 8

                container.addChild(this.spriteCoin)
                container.removeChild(this.coinCell)

            }
        )

        const tickerRender = new Ticker()
        tickerRender.minFPS = 20
        tickerRender.maxFPS = 30
        tickerRender.add(() => {
            this.landAction()
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

            // mario
            if (this.spriteMarioIdleTextureIndex + 1 < this.spriteMarioIdleTextures.length) {
                this.spriteMarioIdleTextureIndex++
            }
            else {
                this.spriteMarioIdleTextureIndex = 0
            }

            // koopa
            if (this.spriteKoopaMovingTextureIndex + 1 < this.spriteKoopaMovingTextures.length) {
                this.spriteKoopaMovingTextureIndex++
            }
            else {
                this.spriteKoopaMovingTextureIndex = 0
            }

            // coin
            if (this.spriteCoinTextureIndex + 1 < this.spriteCoinTextures.length) {
                this.spriteCoinTextureIndex++
            }
            else {
                this.spriteCoinTextureIndex = 0
            }

        })
        tickerAnimation.start()

    }

    // ------------------------------------------

    private landAction() {
        this.ground.x -= 0.01
        this.ground2.x -= 0.01
        if (this.ground.x < -this.ground.w) {
            this.ground.x = this.ground2.x + this.ground2.w
        }
        if (this.ground2.x < -this.ground2.w) {
            this.ground2.x = this.ground.x + this.ground.w
        }
        this.sky.x -= 0.005
        this.sky2.x -= 0.005
        if (this.sky.x < -this.sky.w) {
            this.sky.x = this.sky2.x + this.sky2.w
        }
        if (this.sky2.x < -this.sky2.w) {
            this.sky2.x = this.sky.x + this.sky.w
        }
    }

    // ------------------------------------------

    private render() {

        if (this.spriteSky && this.spriteSky2) {

            this.spriteSky.x = this.sky.x * this.getWidthScreen()
            this.spriteSky.y = this.sky.y * this.getHeightScreen()

            this.spriteSky2.x = this.sky2.x * this.getWidthScreen()
            this.spriteSky2.y = this.sky2.y * this.getHeightScreen()

        }

        if (this.spriteGround && this.spriteGround2) {

            this.spriteGround.x = this.ground.x * this.getWidthScreen()
            this.spriteGround.y = this.ground.y * this.getHeightScreen()

            this.spriteGround2.x = this.ground2.x * this.getWidthScreen()
            this.spriteGround2.y = this.ground2.y * this.getHeightScreen()

        }

        if (this.spriteMario) {
            if (this.player.playerState === "onGround") {
                this.spriteMario.texture = this.spriteMarioIdleTextures[this.spriteMarioIdleTextureIndex];
            }
            else if (this.player.playerState === "jumping" || this.player.playerState === "fallingDown") {
                this.spriteMario.texture = this.spriteMarioJumpTexture;
            }
            this.spriteMario.x = this.player.x * this.getWidthScreen()
            this.spriteMario.y = this.player.y * this.getHeightScreen()
        }
        else {
            this.playerCell.clear()
            this.playerCell.rect(
                this.player.x * this.getWidthScreen(),
                this.player.y * this.getHeightScreen(),
                this.player.w * this.getWidthScreen(),
                this.player.h * this.getHeightScreen()
            );
            this.playerCell.fill(this.player.color);
        }

        if (this.spriteKoopa) {
            this.spriteKoopa.texture = this.spriteKoopaMovingTextures[this.spriteCoinTextureIndex]
            this.spriteKoopa.x = this.shell.x * this.getWidthScreen()
            this.spriteKoopa.y = this.shell.y * this.getHeightScreen()
        }
        else {
            this.shellCell.clear()
            this.shellCell.rect(
                this.shell.x * this.getWidthScreen(),
                this.shell.y * this.getHeightScreen(),
                this.shell.w * this.getWidthScreen(),
                this.shell.h * this.getHeightScreen()
            );
            this.shellCell.fill(this.shell.color);
        }

        if (this.spriteCoin) {
            this.spriteCoin.texture = this.spriteCoinTextures[this.spriteCoinTextureIndex]
            this.spriteCoin.x = this.coin.x * this.getWidthScreen()
            this.spriteCoin.y = this.coin.y * this.getHeightScreen()
        }
        else {
            this.coinCell.clear()
            this.coinCell.rect(
                this.coin.x * this.getWidthScreen(),
                this.coin.y * this.getHeightScreen(),
                this.coin.w * this.getWidthScreen(),
                this.coin.h * this.getHeightScreen()
            );
            this.coinCell.fill(this.coin.color);
        }

        if (this.previousScore !== this.score.value) {
            this.previousScore = this.score.value
            this.text.text = `score: ${this.score.value}`
        }

    }

    // ------------------------------------------

}