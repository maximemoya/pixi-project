import { Assets, Container, Graphics, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";
import { Shell } from "../Shell";

type FN = () => number

type ShellImageLoaderInput = {
    shell: Shell,
    container: Container,
    getWidthScreen: FN,
    getHeightScreen: FN
}

export class ShellImageLoader {

    // ------------------------------------------

    public IDLE = 0

    // ------------------------------------------

    private PATH_ASSET_IMAGE: string = "./assets/images/ennemi-A0-64.png";
    private Z_INDEX = 10

    // ------------------------------------------

    private shell: Shell
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


    constructor(input: ShellImageLoaderInput) {

        this.shell = input.shell
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

                rectangle.x += 64
                const idle03 = this.getTextureFrom(texture, rectangle)

                rectangle.x += 64
                const idle04 = this.getTextureFrom(texture, rectangle)

                this.textures.push([idle01, idle02, idle03, idle04])

                this.sprite.texture = this.textures[this.IDLE][0]
                this.sprite.x = this.shell.x * this.getWidthScreen()
                this.sprite.y = this.shell.y * this.getHeightScreen()
                this.sprite.width = this.shell.w * this.getWidthScreen()
                this.sprite.height = this.shell.h * this.getHeightScreen()
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
            this.shell.x * this.getWidthScreen(),
            this.shell.y * this.getHeightScreen(),
            this.shell.w * this.getWidthScreen(),
            this.shell.h * this.getHeightScreen()
        );
        this.graphics.fill(this.shell.color);
    }

    private updateSprite() {
        this.sprite.texture = this.textures[this.IDLE][this.indexIdle]
        this.sprite.x = this.shell.x * this.getWidthScreen()
        this.sprite.y = this.shell.y * this.getHeightScreen()
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