import { Assets, Container, Graphics, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";
import { Heart } from "../Heart";

type FN = () => number

type HeartImageLoaderInput = {
    heart: Heart,
    container: Container,
    getWidthScreen: FN,
    getHeightScreen: FN
}

export class HeartImageLoader {

    // ------------------------------------------

    public IDLE = 0
    public IDLE_FULL = 0
    public IDLE_EMPTY = 1

    // ------------------------------------------

    private PATH_ASSET_IMAGE: string = "./assets/images/heart-A0-64.png";
    private Z_INDEX = 10

    // ------------------------------------------

    private heart: Heart
    private container: Container
    private getWidthScreen: FN
    private getHeightScreen: FN

    // ------------------------------------------

    private sprite: Sprite = new Sprite();
    private graphics: Graphics = new Graphics();
    private textures: Texture<TextureSource<any>>[][] = [[]];

    // ------------------------------------------

    private indexIdle = 0

    // ------------------------------------------


    constructor(input: HeartImageLoaderInput) {

        this.heart = input.heart
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

                rectangle.x += 64
                const idle02 = this.getTextureFrom(texture, rectangle)

                this.textures[this.IDLE] = [idle01, idle02]

                this.sprite.texture = this.textures[this.IDLE][0]
                this.sprite.x = this.heart.x * this.getWidthScreen()
                this.sprite.y = this.heart.y * this.getHeightScreen()
                this.sprite.width = this.heart.w * this.getWidthScreen()
                this.sprite.height = this.heart.h * this.getHeightScreen()
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

    private updateGraphics() {
        this.graphics.clear()
        this.graphics.rect(
            this.heart.x * this.getWidthScreen(),
            this.heart.y * this.getHeightScreen(),
            this.heart.w * this.getWidthScreen(),
            this.heart.h * this.getHeightScreen()
        );
        this.graphics.fill(this.heart.color);
    }

    private updateSprite() {
        this.sprite.texture = this.textures[this.IDLE][this.indexIdle]
        this.sprite.x = this.heart.x * this.getWidthScreen()
        this.sprite.y = this.heart.y * this.getHeightScreen()
    }

    public render(isActive: boolean) {
        if (this.sprite && this.sprite.texture) {
            if (isActive) {
                this.indexIdle = this.IDLE_FULL
            }
            else {
                this.indexIdle = this.IDLE_EMPTY
            }
            this.updateSprite()
        }
        else {
            if (isActive) {
                this.heart.color = "red"
            }
            else {
                this.heart.color = "black"
            }
            this.updateGraphics()
        }
    }

    // ------------------------------------------

}