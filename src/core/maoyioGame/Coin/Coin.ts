import { Container } from "pixi.js"
import { CoinImageLoader } from "./image/CoinImageLoader"

export class Coin {

    // -----------------------------------------

    public x = 1.5
    public y = 0.5
    public w = 0.06
    public h = 0.06
    public color = "yellow"
    public coinSpeedX = 0.03

    public image: CoinImageLoader

    // -----------------------------------------

    constructor(container: Container, getWidthScreen: () => number, getHeightScreen: () => number) {
        this.image = new CoinImageLoader(
            {
                coin: this,
                container,
                getWidthScreen,
                getHeightScreen
            }
        )
    }

    // -----------------------------------------

    public coinAction() {
        if (this.x <= (0.0 - this.w)) {
            this.coinReset()
        }
        else {
            this.x -= this.coinSpeedX
        }
    }

    public coinReset() {
        this.x = 2 + Math.random() * 6
    }

    // -----------------------------------------

}