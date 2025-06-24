import { Assets, Container, Rectangle, Sprite, Texture } from "pixi.js";

export class SellerImageLoader {

    // ------------------------------------------

    public sprite: Sprite

    // ------------------------------------------

    private readonly PATH = "./assets/seller-A0-alpha-64.png"

    // ------------------------------------------

    private readonly location_idle_01 = { x: 0, y: 0, w: 64, h: 64 }
    private readonly location_idle_02 = { x: 64, y: 0, w: 64, h: 64 }
    private readonly location_idle_03 = { x: 128, y: 0, w: 64, h: 64 }

    private readonly location_talk_01 = { x: 0, y: 64, w: 64, h: 64 }
    private readonly location_talk_02 = { x: 64, y: 64, w: 64, h: 64 }
    private readonly location_talk_03 = { x: 128, y: 64, w: 64, h: 64 }

    private readonly location_idle_to_talk_01 = { x: 0, y: 128, w: 64, h: 64 }
    private readonly location_idle_to_talk_02 = { x: 64, y: 128, w: 64, h: 64 }
    private readonly location_idle_to_talk_03 = { x: 128, y: 128, w: 64, h: 64 }

    // ------------------------------------------

    private texture_idle_01: Texture = new Texture()
    private texture_idle_02: Texture = new Texture()
    private texture_idle_03: Texture = new Texture()

    private texture_talk_01: Texture
    private texture_talk_02: Texture
    private texture_talk_03: Texture

    private texture_idle_to_talk_01: Texture
    private texture_idle_to_talk_02: Texture
    private texture_idle_to_talk_03: Texture

    // ------------------------------------------

    private idles = []
    private idlesIndex = 0

    private talks = []
    private talksIndex = 0
    private talkIndexAscending = true

    private idleToTalks = []
    private idleToTalksIndex = 0
    private idleToTalkIndexAscending = true

    // ------------------------------------------

    private state: "idle" | "talk" | "idle_to_talk" = "idle"

    // ------------------------------------------

    private readonly getWidthScreen: () => number;
    private readonly getHeightScreen: () => number;

    // ------------------------------------------

    constructor(getWidthScreen: () => number, getHeightScreen: () => number, container: Container) {

        this.sprite = new Sprite();
        this.sprite.x = 0.0 * getWidthScreen()
        this.sprite.y = 0.7 * getHeightScreen()
        this.sprite.width = 0.2 * getWidthScreen()
        this.sprite.height = 0.2 * getHeightScreen()
        this.sprite.visible = true;
        this.sprite.zIndex = 20

        container.addChild(this.sprite)

        this.getWidthScreen = getWidthScreen;
        this.getHeightScreen = getHeightScreen;

        (async () => {
            Assets.load(this.PATH).then(
                (texture) => {

                    let rectangle = new Rectangle(
                        this.location_idle_01.x,
                        this.location_idle_01.y,
                        this.location_idle_01.w,
                        this.location_idle_01.h
                    );
                    this.texture_idle_01 = new Texture({
                        source: texture.source,
                        frame: rectangle
                    });

                    rectangle = new Rectangle(
                        this.location_idle_02.x,
                        this.location_idle_02.y,
                        this.location_idle_02.w,
                        this.location_idle_02.h
                    );
                    this.texture_idle_02 = new Texture({
                        source: texture.source,
                        frame: rectangle
                    });

                    rectangle = new Rectangle(
                        this.location_idle_03.x,
                        this.location_idle_03.y,
                        this.location_idle_03.w,
                        this.location_idle_03.h
                    );
                    this.texture_idle_03 = new Texture({
                        source: texture.source,
                        frame: rectangle
                    });

                    this.sprite.texture = this.texture_idle_01
                    this.idles = [this.texture_idle_01, this.texture_idle_02, this.texture_idle_03]

                    rectangle = new Rectangle(
                        this.location_talk_01.x,
                        this.location_talk_01.y,
                        this.location_talk_01.w,
                        this.location_talk_01.h
                    );
                    this.texture_talk_01 = new Texture({
                        source: texture.source,
                        frame: rectangle
                    });

                    rectangle = new Rectangle(
                        this.location_talk_02.x,
                        this.location_talk_02.y,
                        this.location_talk_02.w,
                        this.location_talk_02.h
                    );
                    this.texture_talk_02 = new Texture({
                        source: texture.source,
                        frame: rectangle
                    });

                    rectangle = new Rectangle(
                        this.location_talk_03.x,
                        this.location_talk_03.y,
                        this.location_talk_03.w,
                        this.location_talk_03.h
                    );
                    this.texture_talk_03 = new Texture({
                        source: texture.source,
                        frame: rectangle
                    });

                    this.talks = [this.texture_talk_01, this.texture_talk_02, this.texture_talk_03]

                    rectangle = new Rectangle(
                        this.location_idle_to_talk_01.x,
                        this.location_idle_to_talk_01.y,
                        this.location_idle_to_talk_01.w,
                        this.location_idle_to_talk_01.h
                    );
                    this.texture_idle_to_talk_01 = new Texture({
                        source: texture.source,
                        frame: rectangle
                    });

                    rectangle = new Rectangle(
                        this.location_idle_to_talk_02.x,
                        this.location_idle_to_talk_02.y,
                        this.location_idle_to_talk_02.w,
                        this.location_idle_to_talk_02.h
                    );
                    this.texture_idle_to_talk_02 = new Texture({
                        source: texture.source,
                        frame: rectangle
                    });

                    rectangle = new Rectangle(
                        this.location_idle_to_talk_03.x,
                        this.location_idle_to_talk_03.y,
                        this.location_idle_to_talk_03.w,
                        this.location_idle_to_talk_03.h
                    );
                    this.texture_idle_to_talk_03 = new Texture({
                        source: texture.source,
                        frame: rectangle
                    });

                    this.idleToTalks = [this.texture_idle_to_talk_01, this.texture_idle_to_talk_02, this.texture_idle_to_talk_03]

                }
            )

        })();

    }

    // ------------------------------------------

    animate() {
        if (this.state === "idle") {
            this.sprite.texture = this.idles[this.idlesIndex]
            this.idlesIndex++
            if (this.idlesIndex >= this.idles.length) {
                this.idlesIndex = 0
                this.state = "idle_to_talk"
                this.idleToTalkIndexAscending = true
            }
        }
        else if (this.state === "talk") {
            this.sprite.texture = this.talks[this.talksIndex]
            if (this.talkIndexAscending) {
                this.talksIndex++
            }
            else {
                this.talksIndex--
            }

            if (this.talksIndex >= this.talks.length - 1) {
                this.talkIndexAscending = false
            }
            else if (this.talksIndex <= 0) {
                this.talkIndexAscending = true
                this.state = "idle_to_talk"
                this.idleToTalkIndexAscending = false
            }
        }
        else if (this.state === "idle_to_talk") {
            this.sprite.texture = this.idleToTalks[this.idleToTalksIndex]
            if (this.idleToTalkIndexAscending) {
                this.idleToTalksIndex++
            }
            else {
                this.idleToTalksIndex--
            }

            if (this.idleToTalksIndex >= this.idleToTalks.length - 1) {
                this.idleToTalkIndexAscending = false
                this.state = "talk"
            }
            else if (this.idleToTalksIndex <= 0) {
                this.idleToTalkIndexAscending = true
                this.state = "idle"
            }
        }

    }

}