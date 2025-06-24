import { Assets, Graphics, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";

export abstract class AssetImageLoader {

    // ------------------------------------------

    public sprite: Sprite = new Sprite()

    protected pathAssetImage: string
    protected sizePerAsset: number
    protected horizontalCount: number
    protected verticalCount: number
    protected textures: Texture<TextureSource<any>>[][] = []

    // ------------------------------------------

    constructor(pathAsset: string, sizePerAsset: number, horizontalCount: number, verticalCount: number) {

        this.pathAssetImage = pathAsset
        this.sizePerAsset = sizePerAsset
        this.horizontalCount = horizontalCount
        this.verticalCount = verticalCount
        this.asynchroneLoading()

    }

    // ------------------------------------------

    protected setupTextures(texture: any) {
        let arrayBuffer: Texture<TextureSource<any>>[] = []
        let rectangle = new Rectangle();
        for (let vertical = 0; vertical < this.verticalCount; vertical++) {
            arrayBuffer = []
            for (let horizontal = 0; horizontal < this.horizontalCount; horizontal++) {
                rectangle = new Rectangle(
                    horizontal * this.sizePerAsset,
                    vertical * this.sizePerAsset,
                    this.sizePerAsset,
                    this.sizePerAsset
                );
                arrayBuffer.push(new Texture({
                    source: texture.source,
                    frame: rectangle
                }));
            }
            this.textures.push(arrayBuffer)
        }
    }

    protected async asynchroneLoading() {

        Assets.load(this.pathAssetImage).then(
            (texture) => {
                this.setupTextures(texture)
            }
        )

    }

    // ------------------------------------------

}
