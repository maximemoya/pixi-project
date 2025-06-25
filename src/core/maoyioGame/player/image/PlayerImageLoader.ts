import { Assets, Container, Graphics, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";
import { Player } from "../Player";

type FN = () => number

type PlayerImageLoaderInput = {
    player: Player,
    container: Container,
    getWidthScreen: FN,
    getHeightScreen: FN
}

export class PlayerImageLoader {

    // ------------------------------------------

    public IDLE = 0
    public JUMP = 1

    // ------------------------------------------

    private PATH_ASSET_IMAGE: string = "./assets/images/main-character-A0-64.png";
    private Z_INDEX = 9

    // ------------------------------------------

    private player: Player
    private container: Container
    private getWidthScreen: FN
    private getHeightScreen: FN

    // ------------------------------------------

    private sprite: Sprite = new Sprite();
    private graphics: Graphics = new Graphics();
    private textures: Texture<TextureSource<any>>[][] = [];

    // ------------------------------------------

    private indexIdle = 0

    // ------------------------------------------


    constructor(input: PlayerImageLoaderInput) {

        this.player = input.player
        this.container = input.container
        this.getWidthScreen = input.getWidthScreen
        this.getHeightScreen = input.getHeightScreen

        this.graphics.visible = true;
        this.graphics.zIndex = this.Z_INDEX;
        this.container.addChild(this.graphics);

        Assets.load(this.PATH_ASSET_IMAGE).then(
            (texture) => {
                let rectangle = new Rectangle(
                    0, 0, 64, 64
                )
                const idle01 = this.getTextureFrom(texture, rectangle)

                rectangle.x = 64
                const idle02 = this.getTextureFrom(texture, rectangle)

                rectangle.x = 128
                const jump01 = this.getTextureFrom(texture, rectangle)

                this.textures.push([idle01, idle02])
                this.textures.push([jump01])

                this.sprite.texture = this.textures[this.IDLE][0]
                this.sprite.x = this.player.x * this.getWidthScreen()
                this.sprite.y = this.player.y * this.getHeightScreen()
                this.sprite.width = this.player.w * this.getWidthScreen()
                this.sprite.height = this.player.h * this.getHeightScreen()
                this.sprite.visible = true;
                this.sprite.zIndex = this.Z_INDEX

                this.container.addChild(this.sprite)

                this.graphics.visible = false
                this.container.removeChild(this.graphics)
            }
        )

    }

    private getTextureFrom(texture: any, rectangle: Rectangle): Texture {
        return new Texture(
            {
                source: texture.source,
                frame: rectangle
            }
        )
    }

    // ------------------------------------------

    public updateIndexSprite() {
        if (this.indexIdle + 1 < this.textures[this.IDLE].length) {
            this.indexIdle++
        }
        else {
            this.indexIdle = 0
        }
    }

    private updateGraphics() {
        this.graphics.clear()
        this.graphics.rect(
            this.player.x * this.getWidthScreen(),
            this.player.y * this.getHeightScreen(),
            this.player.w * this.getWidthScreen(),
            this.player.h * this.getHeightScreen()
        );
        this.graphics.fill(this.player.color);
    }

    private updateSprite() {
        if (this.player.playerState === "onGround") {
            this.sprite.texture = this.textures[this.IDLE][this.indexIdle];
        }
        else if (this.player.playerState === "jumping" || this.player.playerState === "fallingDown") {
            this.sprite.texture = this.textures[this.JUMP][0];
        }
        this.sprite.x = this.player.x * this.getWidthScreen()
        this.sprite.y = this.player.y * this.getHeightScreen()
    }

    public render() {
        if (this.sprite && this.sprite.texture) {
            this.updateSprite()
        }
        else {
            this.updateGraphics()
        }
    }

    // ------------------------------------------

}