import { BackgroundSky } from "./sky/BackgroundSky"

export class BackgroundSkies {

    public backgroundSky01: BackgroundSky
    public backgroundSky02: BackgroundSky

    // -----------------------------------------

    constructor(backgroundSky01: BackgroundSky, backgroundSky02: BackgroundSky) {
        this.backgroundSky01 = backgroundSky01
        this.backgroundSky02 = backgroundSky02
    }

    // -----------------------------------------

    public action() {
        this.backgroundSky01.x -= 0.005
        this.backgroundSky02.x -= 0.005
        if (this.backgroundSky01.x < -this.backgroundSky01.w) {
            this.backgroundSky01.x = this.backgroundSky02.x + this.backgroundSky02.w
        }
        if (this.backgroundSky02.x < -this.backgroundSky02.w) {
            this.backgroundSky02.x = this.backgroundSky01.x + this.backgroundSky01.w
        }
    }

    public render() {
        this.backgroundSky01.image.render()
        this.backgroundSky02.image.render()
    }

}