import { Assets, Container, Graphics, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";
import { Coin } from "../Coin";

type FN = () => number

type CoinImageLoaderInput = {
    coin: Coin,
    container: Container,
    getWidthScreen: FN,
    getHeightScreen: FN
}

export class CoinImageLoader {

    // ------------------------------------------

    public IDLE = 0

    // ------------------------------------------

    private PATH_ASSET_IMAGE: string = "./assets/images/coin-spritesheet-alpha.png";
    private Z_INDEX = 10

    // ------------------------------------------

    private coin: Coin
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


    constructor(input: CoinImageLoaderInput) {

        this.coin = input.coin
        this.container = input.container
        this.getWidthScreen = input.getWidthScreen
        this.getHeightScreen = input.getHeightScreen

        this.graphics.visible = true;
        this.graphics.zIndex = this.Z_INDEX;
        this.container.addChild(this.graphics);

        Assets.load(this.PATH_ASSET_IMAGE).then(
            (texture) => {

                let rectangle = new Rectangle(
                    2, 2, 16, 24
                )
                const idle01 = this.getTextureFrom(texture, rectangle)

                rectangle.y = 30
                const idle02 = this.getTextureFrom(texture, rectangle)

                rectangle.y = 58
                const idle03 = this.getTextureFrom(texture, rectangle)

                this.textures[this.IDLE] = [idle01, idle02, idle03]

                this.sprite.texture = this.textures[this.IDLE][0]
                this.sprite.x = this.coin.x * this.getWidthScreen()
                this.sprite.y = this.coin.y * this.getHeightScreen()
                this.sprite.width = this.coin.w * this.getWidthScreen()
                this.sprite.height = this.coin.h * this.getHeightScreen()
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
            this.coin.x * this.getWidthScreen(),
            this.coin.y * this.getHeightScreen(),
            this.coin.w * this.getWidthScreen(),
            this.coin.h * this.getHeightScreen()
        );
        this.graphics.fill(this.coin.color);
    }

    private updateSprite() {
        this.sprite.texture = this.textures[this.IDLE][this.indexIdle]
        this.sprite.x = this.coin.x * this.getWidthScreen()
        this.sprite.y = this.coin.y * this.getHeightScreen()
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