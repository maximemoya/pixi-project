import { Application, Container, FillGradient, Text } from "pixi.js"
import { TextService } from "../../pixiService/textService/TextService"

export class Distance {

    // ---------------------------------------------------

    private container: Container
    private isGamePause: { value: boolean }

    // ---------------------------------------------------

    public isOnUse = false

    // ---------------------------------------------------

    private distance = { value: 0 }
    private distanceTextContainer: Text = new Text({
        text: this.distance.value + " m",
        style: {
            fontFamily: 'Arial',
            fontSize: 32,
            fill: new FillGradient({
                end: { x: 1, y: 1 },
                colorStops: [
                    { offset: 0, color: 0xFFFF00 },
                    { offset: 1, color: 0x00FFFF }
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

    private textService: TextService
    private textContainer: Container

    // Message configuration array
    private messageConfig = [
        { triggerDistance: 5, message: "Bravo\nvous avez\nfait 5m" },
        { triggerDistance: 10, message: "attention\noù tu mets\ntes pieds !" },
        { triggerDistance: 15, message: "moi je mets\nles pieds\noù je veux !" },
        { triggerDistance: 20, message: "et c'est\nsouvent dans\nla gueule" },
        { triggerDistance: 25, message: "tu veux\nêtre\nmon ami ?" },
        { triggerDistance: 30, message: "on fait\nun\nmarathon ?" },
        { triggerDistance: 50, message: "la vie\nc'est comme\nune boite\nde chocolat" },
        { triggerDistance: 100, message: "tu connais\nles crevettes\nde booba ?" },
        { triggerDistance: 200, message: "un jour\nje suis allé\nau Vietnam." },
        { triggerDistance: 210, message: "mais c'était\npas comme\ndans les films" },
        { triggerDistance: 300, message: "j'ai joué dans\nla ligue de\nbaseball ^^" },
        { triggerDistance: 310, message: "on me disait\ntout le temps\n\"de courir\"" },
        { triggerDistance: 400, message: "j'aimais bien\ncourir :)" },
        { triggerDistance: 500, message: "je suis\nfatigué\non arrête ?" },
        { triggerDistance: 510, message: "je suis\nfatigué\nil faut arrêter" },
        { triggerDistance: 515, message: "je suis\nfatigué\nallé stop !" },
        { triggerDistance: 517, message: "j'ai\nmal\ns'il te plait !" },
        { triggerDistance: 519, message: "je ne me sens\npas bien du\ntout ..." },
        { triggerDistance: 522, message: "j'ai mal\naux pieds..." },
        { triggerDistance: 532, message: "je ne sens\nplus mes\npieds !" },
        { triggerDistance: 536, message: "allé\non continue !" },
        { triggerDistance: 540, message: "allé\ncourage !" },
        { triggerDistance: 600, message: "wow !\nc'est dingue\nça va mieux" },
        { triggerDistance: 610, message: "si tu es\nfatigué\ncontinue !" },
        { triggerDistance: 620, message: "on n'arrête\njamais\non se bat !" },
        { triggerDistance: 700, message: "700m déjà !\n" },
        { triggerDistance: 800, message: "800m\net toujours\nen vie !" },
        { triggerDistance: 900, message: "900m !\nbientôt\nle kilomètre !" },
        { triggerDistance: 1000, message: "1km !\nyouhou\non arrète ?" },
        { triggerDistance: 1050, message: "allé,\non arrète ?" },
        { triggerDistance: 1100, message: "je suis\nfatigué\non arrête ?" },
        { triggerDistance: 1210, message: "je suis\nfatigué\nil faut arrêter" },
        { triggerDistance: 1215, message: "je suis\nfatigué\nallé stop !" },
        { triggerDistance: 1217, message: "j'ai\nmal\ns'il te plait !" },
        { triggerDistance: 1219, message: "je ne me sens\npas bien du\ntout ..." },
        { triggerDistance: 1222, message: "j'ai mal\naux pieds..." },
        { triggerDistance: 1232, message: "je ne sens\nplus mes\npieds !" },
        { triggerDistance: 1235, message: "sérieusement\nmes pieds\nme font mal" },
        { triggerDistance: 1240, message: "pourquoi\non court ?" },
        { triggerDistance: 1250, message: "allé,\non arrète ?" },
        { triggerDistance: 1300, message: "allé\non continue !" },
        { triggerDistance: 1310, message: "allé\ncourage !" },
        { triggerDistance: 1330, message: "j'ai mal...\npitié !" },
        { triggerDistance: 1340, message: "je ne suis\npas content !" },
        { triggerDistance: 1350, message: "j'arrête\nde te parler\nvoila !" },
    ]

    // ---------------------------------------------------

    constructor(app: Application, container: Container, isGamePause: { value: boolean }) {

        this.container = container
        this.isGamePause = isGamePause

        this.distanceTextContainer.x = 25
        this.distanceTextContainer.y = 75
        this.distanceTextContainer.zIndex = 7
        this.container.addChild(this.distanceTextContainer)

        this.textService = new TextService(app);
        this.textContainer = this.textService.createContinuePopup("Appuyer\npour\ncommencer", this.container)
        this.isOnUse = true

    }

    // ---------------------------------------------------

    public action() {
        this.distance.value += 0.025
        const config = this.messageConfig.find(config =>
            this.distance.value >= config.triggerDistance
        )
        if (config) {
            this.textContainer = this.textService.createContinuePopup(config.message, this.container)
            this.isGamePause.value = true
            this.messageConfig.shift()
            setTimeout(() => {
                this.isOnUse = true
            }, 500);
        }
    }

    // ---------------------------------------------------

    public onPointerDown(): boolean {
        if (this.isOnUse) {
            this.textContainer.destroy(true)
            this.isGamePause.value = false
            setTimeout(() => {
                this.isOnUse = false
            }, 100);
            return true
        }
        return false
    }

    // ---------------------------------------------------

    public render() {
        this.distanceTextContainer.text = `${this.distance.value.toFixed(1)} m`
    }

    // ---------------------------------------------------

}