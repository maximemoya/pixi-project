import { Container } from "pixi.js"
import { Coin } from "../coin/Coin"
import { PlayerImageLoader } from "./image/PlayerImageLoader"
import { Shell } from "../enemies/shell/Shell"
import { Score } from "../ui/score/Score"

type Sounds = {
    soundJump: HTMLAudioElement,
    soundAou: HTMLAudioElement,
    soundBip: HTMLAudioElement,
    soundBop: HTMLAudioElement,
}

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

    public jump(sound: Sounds) {
        if (this.playerState === "onGround") {
            sound.soundJump.currentTime = 0
            sound.soundJump.play()
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

    private collide(position: { x: number, y: number, w: number, h: number }): boolean {
        return (this.x < position.x + position.w &&
            this.x + this.w > position.x &&
            this.y < position.y + position.h &&
            this.y + this.h > position.y)
    }

    public interactionBetweenPlayerAndShell(shell: Shell, sound: Sounds, score: Score) {

        if (
            this.color === "black" && this.playerState !== "fallingDown" && this.collide(shell)
        ) {
            this.color = "red"
            sound.soundAou.currentTime = 0
            sound.soundAou.play()
            score.decrease()
        }
        else if (this.playerState === "fallingDown" && this.collide(shell)) {
            sound.soundBop.currentTime = 0
            sound.soundBop.play()
            shell.shellReset()
        }
        else if (
            this.color === "red" && !this.collide(shell)
        ) {
            this.color = "black"
        }

    }

    public interactionBetweenPlayerAndCoin(coin: Coin, sound: Sounds, score: Score) {
        if (
            this.x < coin.x + coin.w &&
            this.x + this.w > coin.x &&
            this.y < coin.y + coin.h &&
            this.y + this.h > coin.y) {
            sound.soundBip.currentTime = 0
            sound.soundBip.play()
            score.increase()
            coin.coinReset()
        }
    }

    // -----------------------------------------

}