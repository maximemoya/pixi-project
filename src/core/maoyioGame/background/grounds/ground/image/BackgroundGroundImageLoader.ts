import { Assets, Container, Graphics, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";
import { BackgroundGround } from "../BackgroundGround";

type FN = () => number

type BackgroundGroundImageLoaderInput = {
    backgroundGround: BackgroundGround,
    container: Container,
    getWidthScreen: FN,
    getHeightScreen: FN
}

export class BackgroundGroundImageLoader {

    private PATH_ASSET_IMAGE: string = "./assets/images/ground-A0-256.png";
    private Z_INDEX = 2

    private backgroundGround: BackgroundGround
    private container: Container
    private getWidthScreen: FN
    private getHeightScreen: FN

    private sprite: Sprite = new Sprite();
    private graphics: Graphics = new Graphics();
    private textures: Texture<TextureSource<any>>[][] = [[]];

    // ------------------------------------------

    constructor(input: BackgroundGroundImageLoaderInput) {

        this.backgroundGround = input.backgroundGround
        this.container = input.container
        this.getWidthScreen = input.getWidthScreen
        this.getHeightScreen = input.getHeightScreen

        this.graphics.cacheAsTexture(true);
        this.graphics.zIndex = this.Z_INDEX
        this.graphics.clear()
        this.graphics.rect(this.backgroundGround.x * this.getWidthScreen(),
            this.backgroundGround.y * this.getHeightScreen(),
            this.backgroundGround.w * this.getWidthScreen(),
            this.backgroundGround.h * this.getHeightScreen()
        );
        this.graphics.fill(this.backgroundGround.color);
        this.container.addChild(this.graphics);

        Assets.load(this.PATH_ASSET_IMAGE).then(
            (texture) => {
                let rectangle = new Rectangle(
                    0, 0, 256, 32
                )
                const idle01 = this.getTextureFrom(texture, rectangle)

                this.textures[0] = [idle01]

                this.sprite.texture = this.textures[0][0]
                this.sprite.x = this.backgroundGround.x * this.getWidthScreen()
                this.sprite.y = this.backgroundGround.y * this.getHeightScreen()
                this.sprite.width = this.backgroundGround.w * this.getWidthScreen()
                this.sprite.height = this.backgroundGround.h * this.getHeightScreen()
                this.sprite.zIndex = this.Z_INDEX
                this.sprite.visible = true;

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
            this.backgroundGround.x * this.getWidthScreen(),
            this.backgroundGround.y * this.getHeightScreen(),
            this.backgroundGround.w * this.getWidthScreen(),
            this.backgroundGround.h * this.getHeightScreen()
        );
        this.graphics.fill(this.backgroundGround.color);
    }

    private updateSprite() {
        this.sprite.x = this.backgroundGround.x * this.getWidthScreen()
        this.sprite.y = this.backgroundGround.y * this.getHeightScreen()
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