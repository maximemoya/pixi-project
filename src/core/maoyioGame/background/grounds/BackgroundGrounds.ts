import { BackgroundGround } from "./ground/BackgroundGround"

export class BackgroundGrounds {

    public backgroundGround01: BackgroundGround
    public backgroundGround02: BackgroundGround

    // -----------------------------------------

    constructor(backgroundGround01: BackgroundGround, backgroundGround02: BackgroundGround) {
        this.backgroundGround01 = backgroundGround01
        this.backgroundGround02 = backgroundGround02
    }

    // -----------------------------------------

    public action() {
        this.backgroundGround01.x -= 0.01
        this.backgroundGround02.x -= 0.01
        if (this.backgroundGround01.x < -this.backgroundGround01.w) {
            this.backgroundGround01.x = this.backgroundGround02.x + this.backgroundGround02.w
        }
        if (this.backgroundGround02.x < -this.backgroundGround02.w) {
            this.backgroundGround02.x = this.backgroundGround01.x + this.backgroundGround01.w
        }
    }

    public render() {
        this.backgroundGround01.image.render()
        this.backgroundGround02.image.render()
    }

}