import { Container } from "pixi.js"
import { Coin } from "../coin/Coin"
import { PlayerImageLoader } from "./PlayerImageLoader"

export class Player {

    // -----------------------------------------

    public x = 0.2
    public y = 0.6
    public w = 0.2
    public h = 0.3
    public color = "black"
    public playerState: "onGround" | "jumping" | "fallingDown" = "onGround"
    public jumpMaxValue = 0.35
    public jumpStep = 0.035
    private jumpValue = 0.0
    private initialYPosBeforeJump = this.y

    public image: PlayerImageLoader

    // -----------------------------------------

    constructor(container: Container, getWidthScreen: () => number, getHeightScreen: () => number) {
        this.image = new PlayerImageLoader(
            {
                player: this,
                container,
                getWidthScreen,
                getHeightScreen
            }
        )
    }

    // -----------------------------------------

    public jump(soundJump: HTMLAudioElement) {
        if (this.playerState === "onGround") {
            soundJump.currentTime = 0
            soundJump.play()
            this.initialYPosBeforeJump = this.y
            this.playerState = "jumping"
        }
    }

    public playerAction() {
        if (this.playerState === "jumping") {
            if (this.jumpValue < this.jumpMaxValue) {
                this.jumpValue += this.jumpStep
            }
            else {
                this.jumpValue = this.jumpMaxValue
                this.playerState = "fallingDown"
            }
            this.updatePlayerPosition()
        }
        else if (this.playerState === "fallingDown") {
            if (this.jumpValue > this.jumpStep) {
                this.jumpValue -= this.jumpStep
            }
            else {
                this.jumpValue = 0.0
                this.playerState = "onGround"
            }
            this.updatePlayerPosition()
        }
    }

    private updatePlayerPosition() {
        this.y = this.initialYPosBeforeJump - this.jumpValue
    }

    // -----------------------------------------

    public interactionBetweenPlayerAndShell(shell: { x: number, y: number, w: number, h: number }, soundAou: HTMLAudioElement, score: { value }) {
        if (this.color === "black" &&
            this.x < shell.x + shell.w &&
            this.x + this.w > shell.x &&
            this.y < shell.y + shell.h &&
            this.y + this.h > shell.y) {
            soundAou.currentTime = 0
            soundAou.play()
            this.color = "red"
            if (score.value > 0) {
                score.value -= 1
            }
        }
        else if (this.color !== "black" &&
            (this.x > shell.x + shell.w ||
                this.x + this.w < shell.x ||
                this.y > shell.y + shell.h ||
                this.y + this.h < shell.y)
        ) {
            this.color = "black"
        }
    }

    public interactionBetweenPlayerAndCoin(coin: Coin, soundBip: HTMLAudioElement, score: { value }) {
        if (
            this.x < coin.x + coin.w &&
            this.x + this.w > coin.x &&
            this.y < coin.y + coin.h &&
            this.y + this.h > coin.y) {
            soundBip.currentTime = 0
            soundBip.play()
            score.value += 1
            coin.coinReset()
        }
    }

    // -----------------------------------------

}