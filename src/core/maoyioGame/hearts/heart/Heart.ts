import { Container } from "pixi.js"
import { HeartImageLoader } from "./image/HeartImageLoader"

export class Heart {

    // -----------------------------------------

    public x: number
    public y: number
    public w = 0.08
    public h = 0.08
    public color = "red"

    public isActive: boolean

    public image: HeartImageLoader

    // -----------------------------------------

    constructor(container: Container, getWidthScreen: () => number, getHeightScreen: () => number, position: { x: number, y: number }, isActive: boolean) {
        this.x = position.x
        this.y = position.y
        this.isActive = isActive
        this.image = new HeartImageLoader(
            {
                heart: this,
                container,
                getWidthScreen,
                getHeightScreen
            }
        )
    }

    // -----------------------------------------

    public render() {
        this.image.render(this.isActive)
    }

    // -----------------------------------------

}