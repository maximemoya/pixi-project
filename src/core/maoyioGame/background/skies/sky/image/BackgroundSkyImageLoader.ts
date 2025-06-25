import { Assets, Container, Graphics, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";
import { BackgroundSky } from "../BackgroundSky";

type FN = () => number

type BackgroundSkyImageLoaderInput = {
    backgroundSky: BackgroundSky,
    container: Container,
    getWidthScreen: FN,
    getHeightScreen: FN
}

export class BackgroundSkyImageLoader {

    private PATH_ASSET_IMAGE: string = "./assets/images/sky-A0-256.png";
    private Z_INDEX = 1

    private backgroundSky: BackgroundSky
    private container: Container
    private getWidthScreen: FN
    private getHeightScreen: FN

    private sprite: Sprite = new Sprite();
    private graphics: Graphics = new Graphics();
    private textures: Texture<TextureSource<any>>[][] = [];

    // ------------------------------------------

    constructor(input: BackgroundSkyImageLoaderInput) {

        this.backgroundSky = input.backgroundSky
        this.container = input.container
        this.getWidthScreen = input.getWidthScreen
        this.getHeightScreen = input.getHeightScreen

        this.graphics.cacheAsTexture(true);
        this.graphics.zIndex = this.Z_INDEX
        this.graphics.clear()
        this.graphics.rect(this.backgroundSky.x * this.getWidthScreen(),
            this.backgroundSky.y * this.getHeightScreen(),
            this.backgroundSky.w * this.getWidthScreen(),
            this.backgroundSky.h * this.getHeightScreen()
        );
        this.graphics.fill(this.backgroundSky.color);
        this.container.addChild(this.graphics);

        Assets.load(this.PATH_ASSET_IMAGE).then(
            (texture) => {
                let rectangle = new Rectangle(
                    0, 0, 256, 230
                )
                const idle01 = this.getTextureFrom(texture, rectangle)

                this.textures.push([idle01])

                this.sprite.texture = this.textures[0][0]
                this.sprite.x = this.backgroundSky.x * this.getWidthScreen()
                this.sprite.y = this.backgroundSky.y * this.getHeightScreen()
                this.sprite.width = this.backgroundSky.w * this.getWidthScreen()
                this.sprite.height = this.backgroundSky.h * this.getHeightScreen()
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
            this.backgroundSky.x * this.getWidthScreen(),
            this.backgroundSky.y * this.getHeightScreen(),
            this.backgroundSky.w * this.getWidthScreen(),
            this.backgroundSky.h * this.getHeightScreen()
        );
        this.graphics.fill(this.backgroundSky.color);
    }

    private updateSprite() {
        this.sprite.x = this.backgroundSky.x * this.getWidthScreen()
        this.sprite.y = this.backgroundSky.y * this.getHeightScreen()
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