import { Container } from "pixi.js"
import { BackgroundGroundImageLoader } from "./image/BackgroundGroundImageLoader"

export class BackgroundGround {

    public x: number
    public y: number
    public w: number
    public h: number
    public color: string = "brown"

    public image: BackgroundGroundImageLoader

    // -----------------------------------------

    constructor(position: { x: number, y: number, w: number, h: number }, container: Container, getWidthScreen: () => number, getHeightScreen: () => number) {
        this.x = position.x
        this.y = position.y
        this.w = position.w
        this.h = position.h
        this.image = new BackgroundGroundImageLoader(
            {
                backgroundGround: this,
                container,
                getWidthScreen,
                getHeightScreen
            }
        )
    }

    // -----------------------------------------

}