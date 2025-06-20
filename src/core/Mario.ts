import { Application, Assets, Container, Graphics, Rectangle, Sprite, Text, Texture, Ticker } from "pixi.js"

export class Mario {

    // ------------------------------------------

    public sky = { x: 0.0, y: 0.0, w: 1.0, h: 0.9, color: "#acbebf" }
    public skyCell = new Graphics()

    // ------------------------------------------

    public ground = { x: 0.0, y: 0.9, w: 1.0, h: 0.1, color: "brown" }
    public groundCell = new Graphics();

    // ------------------------------------------

    public player = { x: 0.2, y: 0.7, w: 0.125, h: 0.2, color: "black" }
    public playerCell = new Graphics();
    public playerState: "onGround" | "jumping" | "fallingDown" = "onGround"
    public jumpMaxValue = 0.3
    public jumpStep = 0.04
    private jumpValue = 0.0
    private initialYPosBeforeJump = this.player.y

    // ------------------------------------------

    public spriteSheetMario: HTMLImageElement | null = null
    public spriteMario: Sprite | null = null
    private readonly spriteLocationMarioIdle1 = { x: 3, y: 9, w: 17, h: 31 }
    private readonly spriteLocationMarioIdle2 = { x: 23, y: 9, w: 17, h: 31 }
    private readonly spriteLocationMarioJump = { x: 63, y: 9, w: 17, h: 31 }
    public spriteMarioIdleTextureIndex = 0
    public spriteMarioIdleTextures: Texture[] = []
    public spriteMarioJumpTexture: Texture | null = null

    // ------------------------------------------

    public shell = { x: 2.5, y: 0.825, w: 0.1, h: 0.075, color: "green" }
    public shellCell = new Graphics();
    public shellState: "movingLeft" | "movingRight" = "movingLeft"
    public shellSpeedX = 0.03
    public shellSpeedXMax = 0.05

    // ------------------------------------------

    public spriteSheetKoopa: HTMLImageElement | null = null
    public spriteKoopa: Sprite | null = null
    private readonly spriteLocationKoopaMoving1 = { x: 1, y: 1, w: 16, h: 16 }
    private readonly spriteLocationKoopaMoving2 = { x: 18, y: 1, w: 16, h: 16 }
    private readonly spriteLocationKoopaMoving3 = { x: 35, y: 1, w: 16, h: 16 }
    private readonly spriteLocationKoopaMoving4 = { x: 52, y: 1, w: 16, h: 16 }
    public spriteKoopaMovingTextureIndex = 0
    public spriteKoopaMovingTextures: Texture[] = []

    // ------------------------------------------

    public coin = { x: 1.5, y: 0.5, w: 0.06, h: 0.06, color: "yellow" }
    public coinCell = new Graphics();
    public coinSpeedX = 0.03

    // ------------------------------------------

    public spriteSheetCoin: HTMLImageElement | null = null
    public spriteCoin: Sprite | null = null
    private readonly spriteLocationCoinIdle1 = { x: 2, y: 2, w: 16, h: 24 }
    private readonly spriteLocationCoinIdle2 = { x: 2, y: 30, w: 16, h: 24 }
    private readonly spriteLocationCoinIdle3 = { x: 2, y: 58, w: 16, h: 24 }
    private spriteCoinTextureIndex = 0
    private spriteCoinTextures: Texture[] = []

    // ------------------------------------------

    public container: Container | null = null

    // ------------------------------------------

    public previousScore = 0
    public score = 0
    public text: Text = new Text({
        text: "score: " + this.score,
        style: {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff, // white color
            align: 'center'
        }
    })

    // ------------------------------------------

    private sounds: { soundJump: HTMLAudioElement, soundBip: HTMLAudioElement, soundAou: HTMLAudioElement }

    // ------------------------------------------

    constructor(_container: { value: Container }, app: Application, sounds: { soundJump: HTMLAudioElement, soundBip: HTMLAudioElement, soundAou: HTMLAudioElement }) {

        this.container = _container.value
        this.container.eventMode = "static"
        this.container.removeChildren();
        this.container.onpointerdown = () => {
            this.jump()
        }

        this.sounds = sounds
        setTimeout(() => {
            this.sounds.soundAou.volume = 1.0
            this.sounds.soundBip.volume = 1.0
            this.sounds.soundJump.volume = 1.0
        }, 1000);

        this.playerCell.visible = true;
        this.playerCell.zIndex = 9;
        this.container.addChild(this.playerCell);

        this.shellCell.visible = true;
        this.shellCell.zIndex = 10;
        this.container.addChild(this.shellCell);

        this.text.x = 25
        this.text.y = 25
        this.text.zIndex = 2

        this.skyCell.cacheAsTexture(true);
        this.skyCell.zIndex = 1
        this.skyCell.clear()
        this.skyCell.rect(this.sky.x * app.screen.width,
            this.sky.y * app.screen.height,
            this.sky.w * app.screen.width,
            this.sky.h * app.screen.height
        );
        this.skyCell.fill(this.sky.color);

        this.groundCell.cacheAsTexture(true);
        this.groundCell.zIndex = 1
        this.groundCell.clear()
        this.groundCell.rect(this.ground.x * app.screen.width,
            this.ground.y * app.screen.height,
            this.ground.w * app.screen.width,
            this.ground.h * app.screen.height
        );
        this.groundCell.fill(this.ground.color);

        this.container.addChild(this.skyCell, this.groundCell, this.text);

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
                this.spriteMario.width = this.player.w * app.screen.width
                this.spriteMario.height = this.player.h * app.screen.height
                this.spriteMario.visible = true;
                this.spriteMario.zIndex = 9

                this.container.addChild(this.spriteMario)
                this.container.removeChild(this.playerCell)

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
                this.spriteKoopa.width = this.shell.w * app.screen.width
                this.spriteKoopa.height = this.shell.h * app.screen.height
                this.spriteKoopa.visible = true;
                this.spriteKoopa.zIndex = 10

                this.container.addChild(this.spriteKoopa)
                this.container.removeChild(this.shellCell)

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
                // this.spriteCoin.tint = 0xA3E2FB
                // this.spriteCoin.alpha = 0.8
                this.spriteCoin.width = this.coin.w * app.screen.width
                this.spriteCoin.height = this.coin.h * app.screen.height
                this.spriteCoin.visible = true;
                this.spriteCoin.zIndex = 8

                this.container.addChild(this.spriteCoin)
                this.container.removeChild(this.coinCell)

            }
        )

        const ticker = new Ticker()
        ticker.minFPS = 20
        ticker.maxFPS = 30
        ticker.add(() => {
            this.playerAction()
            this.shellAction()
            this.coinAction()
            this.interactionBetweenPlayerAndShell()
            this.interactionBetweenPlayerAndCoin()
            this.render(app)
        })
        ticker.start()

        const ticker2 = new Ticker()
        ticker2.minFPS = 5
        ticker2.maxFPS = 6
        ticker2.add(() => {

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
        ticker2.start()

        // app.ticker.minFPS = 20
        // app.ticker.maxFPS = 30
        // app.ticker.add(() => {
        //     this.squareAction()
        //     this.cubeAction()
        //     this.interactionBetweenSquareAndCube()
        //     this.render(app)
        // })

    }

    // ------------------------------------------

    private playerAction() {
        if (this.playerState === "jumping") {
            if (this.jumpValue < this.jumpMaxValue) {
                this.jumpValue += this.jumpStep
            }
            else {
                this.jumpValue = this.jumpMaxValue
                this.playerState = "fallingDown"
            }
            this.updatePlayerPosition()
        }
        else if (this.playerState === "fallingDown") {
            if (this.jumpValue > this.jumpStep) {
                this.jumpValue -= this.jumpStep
            }
            else {
                this.jumpValue = 0.0
                this.playerState = "onGround"
            }
            this.updatePlayerPosition()
        }
    }

    private updatePlayerPosition() {
        this.player.y = this.initialYPosBeforeJump - this.jumpValue
    }

    public jump() {
        if (this.playerState === "onGround") {
            this.sounds.soundJump.currentTime = 0
            this.sounds.soundJump.play()
            this.initialYPosBeforeJump = this.player.y
            this.playerState = "jumping"
        }
    }

    // ------------------------------------------

    private shellAction() {
        if (this.shell.x <= (0.0 - this.shell.w)) {
            this.shellReset()
        }
        else {
            this.shell.x -= this.shellSpeedX
        }
        // if (this.shellState === "movingLeft") {
        //     if (this.shell.x <= 0.0) {
        //         this.sounds.soundBip.currentTime = 0
        //         this.sounds.soundBip.play()
        //         this.shellState = "movingRight"
        //         this.score += 1
        //         if (this.shellSpeedX < this.shellSpeedXMax) {
        //             this.shellSpeedX += 0.001
        //         }
        //     }
        //     else {
        //         this.shell.x -= this.shellSpeedX
        //     }
        // }
        // else if (this.shellState === "movingRight") {
        //     if (this.shell.x > (0.99 - this.shell.w)) {
        //         this.sounds.soundBip.currentTime = 0
        //         this.sounds.soundBip.play()
        //         this.shellState = "movingLeft"
        //         this.score += 1
        //         if (this.shellSpeedX < this.shellSpeedXMax) {
        //             this.shellSpeedX += 0.001
        //         }
        //     }
        //     else {
        //         this.shell.x += this.shellSpeedX
        //     }
        // }
    }

    private shellReset() {
        this.shell.x = 1.5 + Math.random() * 4
    }

    // ------------------------------------------

    private interactionBetweenPlayerAndShell() {
        if (this.player.color === "black" &&
            this.player.x < this.shell.x + this.shell.w &&
            this.player.x + this.player.w > this.shell.x &&
            this.player.y < this.shell.y + this.shell.h &&
            this.player.y + this.player.h > this.shell.y) {
            this.sounds.soundAou.currentTime = 0
            this.sounds.soundAou.play()
            this.player.color = "red"
            if (this.score > 0) {
                this.score -= 1
            }
        }
        else if (this.player.color !== "black" &&
            (this.player.x > this.shell.x + this.shell.w ||
                this.player.x + this.player.w < this.shell.x ||
                this.player.y > this.shell.y + this.shell.h ||
                this.player.y + this.player.h < this.shell.y)
        ) {
            this.player.color = "black"
        }
    }

    // ------------------------------------------

    private coinAction() {
        if (this.coin.x <= (0.0 - this.coin.w)) {
            this.coinReset()
        }
        else {
            this.coin.x -= this.coinSpeedX
        }
    }

    private coinReset() {
        this.coin.x = 2 + Math.random() * 6
    }

    // ------------------------------------------

    private interactionBetweenPlayerAndCoin() {
        if (
            this.player.x < this.coin.x + this.coin.w &&
            this.player.x + this.player.w > this.coin.x &&
            this.player.y < this.coin.y + this.coin.h &&
            this.player.y + this.player.h > this.coin.y) {
            this.sounds.soundBip.currentTime = 0
            this.sounds.soundBip.play()
            this.score += 1
            this.coinReset()
        }
    }

    // ------------------------------------------

    public render(app: Application) {

        if (!this.container) {
            return
        }

        if (this.spriteMario) {
            if (this.playerState === "onGround") {
                this.spriteMario.texture = this.spriteMarioIdleTextures[this.spriteMarioIdleTextureIndex];
            }
            else if (this.playerState === "jumping" || this.playerState === "fallingDown") {
                this.spriteMario.texture = this.spriteMarioJumpTexture;
            }
            this.spriteMario.x = this.player.x * app.screen.width
            this.spriteMario.y = this.player.y * app.screen.height
        }
        else {
            this.playerCell.clear()
            this.playerCell.rect(
                this.player.x * app.screen.width,
                this.player.y * app.screen.height,
                this.player.w * app.screen.width,
                this.player.h * app.screen.height
            );
            this.playerCell.fill(this.player.color);
        }

        if (this.spriteKoopa) {
            this.spriteKoopa.texture = this.spriteKoopaMovingTextures[this.spriteCoinTextureIndex]
            this.spriteKoopa.x = this.shell.x * app.screen.width
            this.spriteKoopa.y = this.shell.y * app.screen.height
        }
        else {
            this.shellCell.clear()
            this.shellCell.rect(
                this.shell.x * app.screen.width,
                this.shell.y * app.screen.height,
                this.shell.w * app.screen.width,
                this.shell.h * app.screen.height
            );
            this.shellCell.fill(this.shell.color);
        }

        if (this.spriteCoin) {
            this.spriteCoin.texture = this.spriteCoinTextures[this.spriteCoinTextureIndex]
            this.spriteCoin.x = this.coin.x * app.screen.width
            this.spriteCoin.y = this.coin.y * app.screen.height
        }
        else {
            this.coinCell.clear()
            this.coinCell.rect(
                this.coin.x * app.screen.width,
                this.coin.y * app.screen.height,
                this.coin.w * app.screen.width,
                this.coin.h * app.screen.height
            );
            this.coinCell.fill(this.coin.color);
        }

        if (this.previousScore !== this.score) {
            this.previousScore = this.score
            this.text.text = `score: ${this.score}`
        }

    }

}