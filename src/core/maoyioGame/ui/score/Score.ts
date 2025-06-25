import { Container, FillGradient, Text } from "pixi.js"

export class Score {

    // ---------------------------------------------------

    public value = 0
    private previousScore = this.value
    private scoreTextContainer: Text = new Text({
        text: this.value + " $",
        style: {
            fontFamily: 'Arial',
            fontSize: 32,
            fill: new FillGradient({
                end: { x: 1, y: 1 },
                colorStops: [
                    { offset: 0, color: 0x44FF22 },
                    { offset: 1, color: 0x11AA44 }
                ]
            }),
            stroke: { color: '#4a1850', width: 5 },
            dropShadow: {
                color: '#000000',
                blur: 4,
                distance: 6
            },
            align: 'center'
        },
    })

    // ---------------------------------------------------

    constructor(container: Container) {
        this.scoreTextContainer.x = 25
        this.scoreTextContainer.y = 25
        this.scoreTextContainer.zIndex = 7
        container.addChild(this.scoreTextContainer);
    }

    // ---------------------------------------------------

    public render() {
        if (this.previousScore !== this.value) {
            this.previousScore = this.value
            this.scoreTextContainer.text = `${this.value} $`
        }
    }

    // ---------------------------------------------------

}