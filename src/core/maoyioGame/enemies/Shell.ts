export class Shell {

    public x = 2.5
    public y = 0.8
    public w = 0.1
    public h = 0.1
    public color = "green"
    public shellState: "movingLeft" | "movingRight" = "movingLeft"
    public shellSpeedX = 0.03
    public shellSpeedXMax = 0.05

    public shellAction() {
        if (this.x <= (0.0 - this.w)) {
            this.shellReset()
        }
        else {
            this.x -= this.shellSpeedX
        }
        // if (this.shellState === "movingLeft") {
        //     if (this.shell.x <= 0.0) {
        //         this.sounds.soundBip.currentTime = 0
        //         this.sounds.soundBip.play()
        //         this.shellState = "movingRight"
        //         this.score += 1
        //         if (this.shellSpeedX < this.shellSpeedXMax) {
        //             this.shellSpeedX += 0.001
        //         }
        //     }
        //     else {
        //         this.shell.x -= this.shellSpeedX
        //     }
        // }
        // else if (this.shellState === "movingRight") {
        //     if (this.shell.x > (0.99 - this.shell.w)) {
        //         this.sounds.soundBip.currentTime = 0
        //         this.sounds.soundBip.play()
        //         this.shellState = "movingLeft"
        //         this.score += 1
        //         if (this.shellSpeedX < this.shellSpeedXMax) {
        //             this.shellSpeedX += 0.001
        //         }
        //     }
        //     else {
        //         this.shell.x += this.shellSpeedX
        //     }
        // }
    }

    public shellReset() {
        this.x = 1.5 + Math.random() * 4
    }

}