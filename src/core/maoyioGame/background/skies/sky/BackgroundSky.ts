import { Container } from "pixi.js"
import { BackgroundSkyImageLoader } from "./image/BackgroundSkyImageLoader"

export class BackgroundSky {

    public x: number
    public y: number
    public w: number
    public h: number
    public color: string = "#acbebf"

    public image: BackgroundSkyImageLoader

    // -----------------------------------------

    constructor(position: { x: number, y: number, w: number, h: number }, container: Container, getWidthScreen: () => number, getHeightScreen: () => number) {
        this.x = position.x
        this.y = position.y
        this.w = position.w
        this.h = position.h
        this.image = new BackgroundSkyImageLoader(
            {
                backgroundSky: this,
                container,
                getWidthScreen,
                getHeightScreen
            }
        )
    }

    // -----------------------------------------

}