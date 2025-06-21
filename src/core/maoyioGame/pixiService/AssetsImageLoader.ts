import { Assets, Rectangle, Sprite, Texture } from "pixi.js";

export class AssetsImageLoader {

    // ------------------------------------------

    public spriteSky: Sprite | null = null
    public spriteSky2: Sprite | null = null
    private readonly spriteLocationSky = { x: 0, y: 16, w: 256, h: 208 }

    // ------------------------------------------

    public spriteGround: Sprite | null = null
    public spriteGround2: Sprite | null = null
    private readonly spriteLocationGround = { x: 0, y: 224, w: 256, h: 32 }

    // ------------------------------------------

    public spriteMario: Sprite | null = null
    private readonly spriteLocationMarioIdle1 = { x: 3, y: 9, w: 17, h: 31 }
    private readonly spriteLocationMarioIdle2 = { x: 23, y: 9, w: 17, h: 31 }
    private readonly spriteLocationMarioJump = { x: 63, y: 9, w: 17, h: 31 }
    public spriteMarioIdleTextures: Texture[] = []
    public spriteMarioJumpTexture: Texture | null = null

    // ------------------------------------------

    public spriteKoopa: Sprite | null = null
    private readonly spriteLocationKoopaMoving1 = { x: 1, y: 1, w: 16, h: 16 }
    private readonly spriteLocationKoopaMoving2 = { x: 18, y: 1, w: 16, h: 16 }
    private readonly spriteLocationKoopaMoving3 = { x: 35, y: 1, w: 16, h: 16 }
    private readonly spriteLocationKoopaMoving4 = { x: 52, y: 1, w: 16, h: 16 }
    public spriteKoopaMovingTextures: Texture[] = []

    // ------------------------------------------

    public spriteCoin: Sprite | null = null
    private readonly spriteLocationCoinIdle1 = { x: 2, y: 2, w: 16, h: 24 }
    private readonly spriteLocationCoinIdle2 = { x: 2, y: 30, w: 16, h: 24 }
    private readonly spriteLocationCoinIdle3 = { x: 2, y: 58, w: 16, h: 24 }
    private spriteCoinTextureIndex = 0
    private spriteCoinTextures: Texture[] = []

    // ------------------------------------------

    private readonly getWidthScreen: () => number;
    private readonly getHeightScreen: () => number;

    // ------------------------------------------

    public isLoadingFinished = false

    // ------------------------------------------

    constructor(getWidthScreen: () => number, getHeightScreen: () => number) {

        this.getWidthScreen = getWidthScreen;
        this.getHeightScreen = getHeightScreen;

        (async () => {
            const promiseAsset1 = Assets.load("./assets/land-spritesheet-alpha.png").then(
                () => { }
            )
            await Promise.all([promiseAsset1]);
            this.isLoadingFinished = true
            console.log("finish: ", this.isLoadingFinished);

        })();

        // Assets.load("./assets/land-spritesheet-alpha.png").then(
        //     (texture) => {

        //         let rectangle = new Rectangle(
        //             this.spriteLocationSky.x,
        //             this.spriteLocationSky.y,
        //             this.spriteLocationSky.w,
        //             this.spriteLocationSky.h
        //         );
        //         const skyTexture = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         this.spriteSky = new Sprite(skyTexture);
        //         this.spriteSky.x = this.sky.x * this.getWidthScreen()
        //         this.spriteSky.y = this.sky.y * this.getHeightScreen()
        //         this.spriteSky.width = this.sky.w * this.getWidthScreen()
        //         this.spriteSky.height = this.sky.h * this.getHeightScreen()
        //         this.spriteSky.visible = true;
        //         this.spriteSky.zIndex = 5

        //         this.spriteSky2 = new Sprite(skyTexture);
        //         this.spriteSky2.x = this.sky2.x * this.getWidthScreen()
        //         this.spriteSky2.y = this.sky2.y * this.getHeightScreen()
        //         this.spriteSky2.width = this.sky2.w * this.getWidthScreen()
        //         this.spriteSky2.height = this.sky2.h * this.getHeightScreen()
        //         this.spriteSky2.visible = true;
        //         this.spriteSky2.zIndex = 5

        //         container.addChild(this.spriteSky)
        //         container.addChild(this.spriteSky2)
        //         container.removeChild(this.skyCell)

        //         rectangle = new Rectangle(
        //             this.spriteLocationGround.x,
        //             this.spriteLocationGround.y,
        //             this.spriteLocationGround.w,
        //             this.spriteLocationGround.h
        //         );
        //         const groundTexture = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         this.spriteGround = new Sprite(groundTexture);
        //         this.spriteGround.x = this.ground.x * this.getWidthScreen()
        //         this.spriteGround.y = this.ground.y * this.getHeightScreen()
        //         this.spriteGround.width = this.ground.w * this.getWidthScreen()
        //         this.spriteGround.height = this.ground.h * this.getHeightScreen()
        //         this.spriteGround.visible = true;
        //         this.spriteGround.zIndex = 6

        //         this.spriteGround2 = new Sprite(groundTexture);
        //         this.spriteGround2.x = this.ground2.x * this.getWidthScreen()
        //         this.spriteGround2.y = this.ground2.y * this.getHeightScreen()
        //         this.spriteGround2.width = this.ground2.w * this.getWidthScreen()
        //         this.spriteGround2.height = this.ground2.h * this.getHeightScreen()
        //         this.spriteGround2.visible = true;
        //         this.spriteGround2.zIndex = 6

        //         container.addChild(this.spriteGround)
        //         container.addChild(this.spriteGround2)
        //         container.removeChild(this.groundCell)

        //     }
        // )
        // Assets.load("./assets/mario-spritesheet-alpha.png").then(
        //     (texture) => {

        //         let rectangle = new Rectangle(
        //             this.spriteLocationMarioIdle1.x,
        //             this.spriteLocationMarioIdle1.y,
        //             this.spriteLocationMarioIdle1.w,
        //             this.spriteLocationMarioIdle1.h
        //         );
        //         this.spriteMarioIdleTextures[0] = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         rectangle = new Rectangle(
        //             this.spriteLocationMarioIdle2.x,
        //             this.spriteLocationMarioIdle2.y,
        //             this.spriteLocationMarioIdle2.w,
        //             this.spriteLocationMarioIdle2.h
        //         );
        //         this.spriteMarioIdleTextures[1] = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         rectangle = new Rectangle(
        //             this.spriteLocationMarioJump.x,
        //             this.spriteLocationMarioJump.y,
        //             this.spriteLocationMarioJump.w,
        //             this.spriteLocationMarioJump.h
        //         );
        //         this.spriteMarioJumpTexture = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         this.spriteMario = new Sprite(this.spriteMarioIdleTextures[0]);
        //         this.spriteMario.width = this.player.w * this.getWidthScreen()
        //         this.spriteMario.height = this.player.h * this.getHeightScreen()
        //         this.spriteMario.visible = true;
        //         this.spriteMario.zIndex = 9

        //         container.addChild(this.spriteMario)
        //         container.removeChild(this.playerCell)

        //     }
        // )
        // Assets.load("./assets/koopa-spritesheet-alpha.png").then(
        //     (texture) => {

        //         let rectangle = new Rectangle(
        //             this.spriteLocationKoopaMoving1.x,
        //             this.spriteLocationKoopaMoving1.y,
        //             this.spriteLocationKoopaMoving1.w,
        //             this.spriteLocationKoopaMoving1.h
        //         );
        //         this.spriteKoopaMovingTextures[0] = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         rectangle = new Rectangle(
        //             this.spriteLocationKoopaMoving2.x,
        //             this.spriteLocationKoopaMoving2.y,
        //             this.spriteLocationKoopaMoving2.w,
        //             this.spriteLocationKoopaMoving2.h
        //         );
        //         this.spriteKoopaMovingTextures[1] = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         rectangle = new Rectangle(
        //             this.spriteLocationKoopaMoving3.x,
        //             this.spriteLocationKoopaMoving3.y,
        //             this.spriteLocationKoopaMoving3.w,
        //             this.spriteLocationKoopaMoving3.h
        //         );
        //         this.spriteKoopaMovingTextures[2] = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         rectangle = new Rectangle(
        //             this.spriteLocationKoopaMoving4.x,
        //             this.spriteLocationKoopaMoving4.y,
        //             this.spriteLocationKoopaMoving4.w,
        //             this.spriteLocationKoopaMoving4.h
        //         );
        //         this.spriteKoopaMovingTextures[3] = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         this.spriteKoopa = new Sprite(this.spriteKoopaMovingTextures[0]);
        //         this.spriteKoopa.width = this.shell.w * this.getWidthScreen()
        //         this.spriteKoopa.height = this.shell.h * this.getHeightScreen()
        //         this.spriteKoopa.visible = true;
        //         this.spriteKoopa.zIndex = 10

        //         container.addChild(this.spriteKoopa)
        //         container.removeChild(this.shellCell)

        //     }
        // )
        // Assets.load("./assets/coin-spritesheet-alpha.png").then(
        //     (texture) => {

        //         let rectangle = new Rectangle(
        //             this.spriteLocationCoinIdle1.x,
        //             this.spriteLocationCoinIdle1.y,
        //             this.spriteLocationCoinIdle1.w,
        //             this.spriteLocationCoinIdle1.h
        //         );
        //         this.spriteCoinTextures[0] = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         rectangle = new Rectangle(
        //             this.spriteLocationCoinIdle2.x,
        //             this.spriteLocationCoinIdle2.y,
        //             this.spriteLocationCoinIdle2.w,
        //             this.spriteLocationCoinIdle2.h
        //         );
        //         this.spriteCoinTextures[1] = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         rectangle = new Rectangle(
        //             this.spriteLocationCoinIdle3.x,
        //             this.spriteLocationCoinIdle3.y,
        //             this.spriteLocationCoinIdle3.w,
        //             this.spriteLocationCoinIdle3.h
        //         );
        //         this.spriteCoinTextures[2] = new Texture({
        //             source: texture.source,
        //             frame: rectangle
        //         });

        //         this.spriteCoin = new Sprite(this.spriteCoinTextures[this.spriteCoinTextureIndex]);
        //         this.spriteCoin.width = this.coin.w * this.getWidthScreen()
        //         this.spriteCoin.height = this.coin.h * this.getHeightScreen()
        //         this.spriteCoin.visible = true;
        //         this.spriteCoin.zIndex = 8

        //         container.addChild(this.spriteCoin)
        //         container.removeChild(this.coinCell)

        //     }
        // )

    }

}