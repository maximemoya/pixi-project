import { Application, Assets, Container, Graphics, Rectangle, Sprite, Text, Texture } from "pixi.js"

export class Mario {

    // ------------------------------------------

    public square = { x: 0.4375, y: 0.7, w: 0.125, h: 0.2, color: "black" }
    public squareCell = new Graphics();
    public squareState: "onGround" | "jumping" | "fallingDown" = "onGround"
    public jumpMaxValue = 0.3
    public jumpStep = 0.04
    private jumpValue = 0.0
    private initialYPosBeforeJump = this.square.y

    // ------------------------------------------

    public cube = { x: 0.95, y: 0.825, w: 0.1, h: 0.075, color: "green" }
    public cubeCell = new Graphics();
    public cubeState: "movingLeft" | "movingRight" = "movingLeft"
    public cubeSpeedX = 0.03
    public cubeSpeedXMax = 0.05

    // ------------------------------------------

    public sky = { x: 0.0, y: 0.0, w: 1.0, h: 0.9, color: "#acbebf" }
    public skyCell = new Graphics()
    public ground = { x: 0.0, y: 0.9, w: 1.0, h: 0.1, color: "brown" }
    public groundCell = new Graphics();

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

    public spriteSheetMario: HTMLImageElement | null = null
    public spriteMario: Sprite | null = null
    private readonly spriteLocationIdle = { x: 1.5, y: 66.5, w: 15, h: 31 }
    private readonly spriteLocationJump = { x: 60.5, y: 66.5, w: 15, h: 31 }
    public marioIdleTexture: Texture | null = null
    public marioJumpTexture: Texture | null = null

    // ------------------------------------------

    public spriteSheetKoopa: HTMLImageElement | null = null
    public spriteKoopa: Sprite | null = null
    private readonly spriteLocationKoopaIdle = { x: 408.5, y: 229.5, w: 15, h: 15 }

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

        this.squareCell.visible = true;
        this.squareCell.zIndex = 9;
        this.container.addChild(this.squareCell);

        this.cubeCell.visible = true;
        this.cubeCell.zIndex = 10;
        this.container.addChild(this.cubeCell);

        this.text.x = 25
        this.text.y = 25
        this.text.zIndex = 2

        this.skyCell.cacheAsBitmap = true;
        this.skyCell.zIndex = 1
        this.skyCell.clear()
        this.skyCell.rect(this.sky.x * app.screen.width,
            this.sky.y * app.screen.height,
            this.sky.w * app.screen.width,
            this.sky.h * app.screen.height
        );
        this.skyCell.fill(this.sky.color);

        this.groundCell.cacheAsBitmap = true;
        this.groundCell.zIndex = 1
        this.groundCell.clear()
        this.groundCell.rect(this.ground.x * app.screen.width,
            this.ground.y * app.screen.height,
            this.ground.w * app.screen.width,
            this.ground.h * app.screen.height
        );
        this.groundCell.fill(this.ground.color);

        this.container.addChild(this.skyCell, this.groundCell, this.text);

        Assets.load("./assets/mario-spritesheet.png").then(
            (texture) => {

                let rectangle = new Rectangle(
                    this.spriteLocationIdle.x,
                    this.spriteLocationIdle.y,
                    this.spriteLocationIdle.w,
                    this.spriteLocationIdle.h
                );
                this.marioIdleTexture = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                rectangle = new Rectangle(
                    this.spriteLocationJump.x,
                    this.spriteLocationJump.y,
                    this.spriteLocationJump.w,
                    this.spriteLocationJump.h
                );
                this.marioJumpTexture = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                this.spriteMario = new Sprite(this.marioIdleTexture);
                this.spriteMario.width = this.square.w * app.screen.width
                this.spriteMario.height = this.square.h * app.screen.height
                this.spriteMario.visible = true;
                this.spriteMario.zIndex = 9

                this.container.addChild(this.spriteMario)
                this.container.removeChild(this.squareCell)

            }
        )
        Assets.load("./assets/koopa-spritesheet-v1.png").then(
            (texture) => {

                const rectangle = new Rectangle(
                    this.spriteLocationKoopaIdle.x,
                    this.spriteLocationKoopaIdle.y,
                    this.spriteLocationKoopaIdle.w,
                    this.spriteLocationKoopaIdle.h
                );
                const croppedTexture = new Texture({
                    source: texture.source,
                    frame: rectangle
                });

                this.spriteKoopa = new Sprite(croppedTexture);
                this.spriteKoopa.width = this.cube.w * app.screen.width
                this.spriteKoopa.height = this.cube.h * app.screen.height
                this.spriteKoopa.visible = true;
                this.spriteKoopa.zIndex = 10

                this.container.addChild(this.spriteKoopa)
                this.container.removeChild(this.cubeCell)

            }
        )

        app.ticker.minFPS = 20
        app.ticker.maxFPS = 30
        app.ticker.add(() => {
            this.squareAction()
            this.cubeAction()
            this.interactionBetweenSquareAndCube()
            this.render(app)
        })

    }

    // ------------------------------------------

    private squareAction() {
        if (this.squareState === "jumping") {
            if (this.jumpValue < this.jumpMaxValue) {
                this.jumpValue += this.jumpStep
            }
            else {
                this.jumpValue = this.jumpMaxValue
                this.squareState = "fallingDown"
            }
            this.updatePosition()
        }
        else if (this.squareState === "fallingDown") {
            if (this.jumpValue > this.jumpStep) {
                this.jumpValue -= this.jumpStep
            }
            else {
                this.jumpValue = 0.0
                this.squareState = "onGround"
            }
            this.updatePosition()
        }
    }

    private updatePosition() {
        this.square.y = this.initialYPosBeforeJump - this.jumpValue
    }

    public jump() {
        if (this.squareState === "onGround") {
            this.sounds.soundJump.currentTime = 0
            this.sounds.soundJump.play()
            this.initialYPosBeforeJump = this.square.y
            this.squareState = "jumping"
        }
    }

    // ------------------------------------------

    private cubeAction() {
        if (this.cubeState === "movingLeft") {
            if (this.cube.x <= 0.0) {
                this.sounds.soundBip.currentTime = 0
                this.sounds.soundBip.play()
                this.cubeState = "movingRight"
                this.score += 1
                if (this.cubeSpeedX < this.cubeSpeedXMax) {
                    this.cubeSpeedX += 0.001
                }
            }
            else {
                this.cube.x -= this.cubeSpeedX
            }
        }
        else if (this.cubeState === "movingRight") {
            if (this.cube.x > (0.99 - this.cube.w)) {
                this.sounds.soundBip.currentTime = 0
                this.sounds.soundBip.play()
                this.cubeState = "movingLeft"
                this.score += 1
                if (this.cubeSpeedX < this.cubeSpeedXMax) {
                    this.cubeSpeedX += 0.001
                }
            }
            else {
                this.cube.x += this.cubeSpeedX
            }
        }
    }

    // ------------------------------------------

    private interactionBetweenSquareAndCube() {
        if (this.square.color === "black" &&
            this.square.x < this.cube.x + this.cube.w &&
            this.square.x + this.square.w > this.cube.x &&
            this.square.y < this.cube.y + this.cube.h &&
            this.square.y + this.square.h > this.cube.y) {
            this.sounds.soundAou.currentTime = 0
            this.sounds.soundAou.play()
            this.square.color = "red"
            this.score -= 1
        }
        else if (this.square.color !== "black" &&
            (this.square.x > this.cube.x + this.cube.w ||
                this.square.x + this.square.w < this.cube.x ||
                this.square.y > this.cube.y + this.cube.h ||
                this.square.y + this.square.h < this.cube.y)
        ) {
            this.square.color = "black"
        }
    }

    // ------------------------------------------

    public render(app: Application) {

        if (!this.container) {
            return
        }

        if (this.spriteMario) {
            if (this.squareState === "onGround") {
                this.spriteMario.texture = this.marioIdleTexture;
            }
            else if (this.squareState === "jumping" || this.squareState === "fallingDown") {
                this.spriteMario.texture = this.marioJumpTexture;
            }
            this.spriteMario.x = this.square.x * app.screen.width
            this.spriteMario.y = this.square.y * app.screen.height
        }
        else {
            this.squareCell.clear()
            this.squareCell.rect(
                this.square.x * app.screen.width,
                this.square.y * app.screen.height,
                this.square.w * app.screen.width,
                this.square.h * app.screen.height
            );
            this.squareCell.fill(this.square.color);
        }

        if (this.spriteKoopa) {
            this.spriteKoopa.x = this.cube.x * app.screen.width
            this.spriteKoopa.y = this.cube.y * app.screen.height
        }
        else {
            this.cubeCell.clear()
            this.cubeCell.rect(
                this.cube.x * app.screen.width,
                this.cube.y * app.screen.height,
                this.cube.w * app.screen.width,
                this.cube.h * app.screen.height
            );
            this.cubeCell.fill(this.cube.color);
        }

        if (this.previousScore !== this.score) {
            this.previousScore = this.score
            this.text.text = `score: ${this.score}`
        }

    }

}