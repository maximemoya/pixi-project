import { Container } from "pixi.js"
import { Heart } from "./heart/Heart"
import { Player } from "../player/Player"

export class Hearts {

    public hearts: Heart[] = []

    private container: Container
    private getWidthScreen: () => number
    private getHeightScreen: () => number
    private player: Player

    constructor(container: Container, getWidthScreen: () => number, getHeightScreen: () => number, player: Player) {
        this.container = container
        this.getWidthScreen = getWidthScreen
        this.getHeightScreen = getHeightScreen
        this.player = player
        this.initWithPlayer()
    }

    public render() {
        for (let index = 0; index < this.hearts.length; index++) {
            this.hearts[index].render()
        }
    }

    private initWithPlayer() {
        for (let index = 0; index < this.player.healthMax; index++) {
            const position: { x: number, y: number } = { x: 0.74 + (index * 0.08), y: 0.02 }
            let isActive: boolean = true
            if (index + 1 > this.player.healthValue) {
                isActive = false
            }
            this.hearts.push(new Heart(this.container, this.getWidthScreen, this.getHeightScreen, position, isActive))
        }
    }

    public actualizeWithPlayer() {
        for (let index = 0; index < this.player.healthMax; index++) {
            let isActive: boolean = true
            if (index + 1 > this.player.healthValue) {
                isActive = false
            }
            this.hearts[index].isActive = isActive
        }
    }


}