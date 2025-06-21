export class Coin {

    public x = 1.5
    public y = 0.5
    public w = 0.06
    public h = 0.06
    public color = "yellow"
    public coinSpeedX = 0.03

    constructor() {

    }

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

}