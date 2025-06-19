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

    public score = 0

    // ------------------------------------------

    private sounds: { soundJump: HTMLAudioElement, soundBip: HTMLAudioElement, soundAou: HTMLAudioElement }

    // ------------------------------------------

    public spriteSheetMario: HTMLImageElement | null = null
    public spriteMario: Sprite | null = null
    private readonly spriteLocationIdle = { x: 1.5, y: 66.5, w: 15, h: 31 }
    private readonly spriteLocationJump = { x: 60.5, y: 66.5, w: 15, h: 31 }
    private spriteLocationMarioActual = this.spriteLocationIdle
    private marioTexture: any | null = null

    public spriteSheetKoopa: HTMLImageElement | null = null
    public spriteKoopa: Sprite | null = null
    private spriteLocationKoopaActual = { x: 408.5, y: 229.5, w: 15, h: 15 }
    private koopaTexture: any | null = null

    // ------------------------------------------

    constructor(_container: { value: Container }, app: Application, sounds: { soundJump: HTMLAudioElement, soundBip: HTMLAudioElement, soundAou: HTMLAudioElement }) {

        Assets.load("./assets/mario-spritesheet.png").then(
            (texture) => {
                this.marioTexture = texture
                const rectangle = new Rectangle(
                    this.spriteLocationMarioActual.x,
                    this.spriteLocationMarioActual.y,
                    this.spriteLocationMarioActual.w,
                    this.spriteLocationMarioActual.h
                );
                const croppedTexture = new Texture({
                    source: texture.source,
                    frame: rectangle
                });
                this.spriteMario = new Sprite(croppedTexture);
            }
        )
        Assets.load("./assets/koopa-spritesheet-v1.png").then(
            (texture) => {
                this.koopaTexture = texture
                const rectangle = new Rectangle(
                    this.spriteLocationKoopaActual.x,
                    this.spriteLocationKoopaActual.y,
                    this.spriteLocationKoopaActual.w,
                    this.spriteLocationKoopaActual.h
                );
                const croppedTexture = new Texture({
                    source: texture.source,
                    frame: rectangle
                });
                this.spriteKoopa = new Sprite(croppedTexture);
            }
        )

        this.container = _container.value
        this.container.eventMode = "static"
        this.container.onpointerdown = () => {
            this.jump()
        }
        app.ticker.maxFPS = 30
        app.ticker.add(() => {
            this.squareAction()
            this.cubeAction()
            this.interactionBetweenSquareAndCube()
            this.render(app)
        })
        this.sounds = sounds

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
                this.spriteLocationMarioActual = this.spriteLocationIdle
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
            this.spriteLocationMarioActual = this.spriteLocationJump
        }
    }

    // ------------------------------------------

    private cubeAction() {
        if (this.cubeState === "movingLeft") {
            if (this.cube.x <= 0.0) {
                if (this.sounds.soundBip) {
                    this.sounds.soundBip.volume = 1.0
                    this.sounds.soundBip.currentTime = 0
                    this.sounds.soundBip.play()
                }
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
                if (this.sounds.soundBip) {
                    this.sounds.soundBip.volume = 1.0
                    this.sounds.soundBip.currentTime = 0
                    this.sounds.soundBip.play()
                }
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
            if (this.sounds.soundAou) {
                this.sounds.soundAou.volume = 1.0
                this.sounds.soundAou.currentTime = 0
                this.sounds.soundAou.play()
            }
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

        this.skyCell.rect(this.sky.x * app.screen.width,
            this.sky.y * app.screen.height,
            this.sky.w * app.screen.width,
            this.sky.h * app.screen.height
        );
        this.skyCell.fill(this.sky.color);
        this.container.addChild(this.skyCell);

        this.groundCell.rect(this.ground.x * app.screen.width,
            this.ground.y * app.screen.height,
            this.ground.w * app.screen.width,
            this.ground.h * app.screen.height
        );
        this.groundCell.fill(this.ground.color);
        this.container.addChild(this.groundCell);

        if (this.spriteMario) {
            const rectangle = new Rectangle(
                this.spriteLocationMarioActual.x,
                this.spriteLocationMarioActual.y,
                this.spriteLocationMarioActual.w,
                this.spriteLocationMarioActual.h
            );
            const croppedTexture = new Texture({
                source: this.marioTexture.source,
                frame: rectangle
            });
            this.spriteMario.texture = croppedTexture;
            this.spriteMario.x = this.square.x * app.screen.width
            this.spriteMario.y = this.square.y * app.screen.height
            this.spriteMario.width = this.square.w * app.screen.width
            this.spriteMario.height = this.square.h * app.screen.height
            this.container.addChild(this.spriteMario);
        }
        else {
            this.squareCell.clear()
            this.squareCell.rect(this.square.x * app.screen.width,
                this.square.y * app.screen.height,
                this.square.w * app.screen.width,
                this.square.h * app.screen.height
            );
            this.squareCell.fill(this.square.color);
            this.container.addChild(this.squareCell);
        }

        if (this.spriteKoopa) {
            const rectangle = new Rectangle(
                this.spriteLocationKoopaActual.x,
                this.spriteLocationKoopaActual.y,
                this.spriteLocationKoopaActual.w,
                this.spriteLocationKoopaActual.h
            );
            const croppedTexture = new Texture({
                source: this.koopaTexture.source,
                frame: rectangle
            });
            this.spriteKoopa.texture = croppedTexture;
            this.spriteKoopa.x = this.cube.x * app.screen.width
            this.spriteKoopa.y = this.cube.y * app.screen.height
            this.spriteKoopa.width = this.cube.w * app.screen.width
            this.spriteKoopa.height = this.cube.h * app.screen.height
            this.container.addChild(this.spriteKoopa);
        }
        else {
            this.cubeCell.clear()
            this.cubeCell.rect(this.cube.x * app.screen.width,
                this.cube.y * app.screen.height,
                this.cube.w * app.screen.width,
                this.cube.h * app.screen.height
            );
            this.cubeCell.fill(this.cube.color);
            this.container.addChild(this.cubeCell);
        }

        const text = new Text({
            text: "score: " + this.score,
            style: {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xffffff, // white color
                align: 'center'
            }
        })
        text.x = 25
        text.y = 25
        this.container.addChild(text)

    }

}