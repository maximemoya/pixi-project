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
    //  { triggerDistance: 00, message: "BravoBravoB\nBravoBravoB\nBravoBravoB\nBravoBravoB" },

    private messageConfig = [
        { triggerDistance: 5, message: "Bravo\non a\nfait 5m !" },
        { triggerDistance: 10, message: "attention\noù tu mets\ntes pieds !" },
        { triggerDistance: 15, message: "moi je mets\nles pieds\noù je veux !" },
        { triggerDistance: 18, message: "et c'est\nsouvent dans\nla gueule" },
        { triggerDistance: 23, message: "tu veux\nêtre\nmon ami ?" },
        { triggerDistance: 26, message: "la vie\nc'est comme\nune boite\nde chocolat" },
        { triggerDistance: 30, message: "tu connais\nles crevettes\nde booba ?" },

        { triggerDistance: 35, message: "un jour\nje suis allé\nau Vietnam." },
        { triggerDistance: 40, message: "j'ai mangé\ndes nems !" },
        { triggerDistance: 45, message: "et après\nje me suis\dit !" },
        { triggerDistance: 50, message: "mais qui\na mangé le\ndernier nem?" },
        { triggerDistance: 55, message: "encore\naujourd'hui\nj'ai pas\nla réponse" },

        { triggerDistance: 60, message: "c'est\ncomme\nl'histoire\ndu clignotant" },
        { triggerDistance: 63, message: "tu la\nconnais ?" },
        { triggerDistance: 67, message: "je ne confie\npas ma vie à\nune ampoule\nqui clignote !" },
        { triggerDistance: 70, message: "marche\narrière sans\nconducteur\net pof !" },
        { triggerDistance: 75, message: "et l'autre\nqui te dit\nc'est bon\nça va" },
        { triggerDistance: 77, message: "c'est que\nde la\ncarrosserie !" },
        { triggerDistance: 80, message: "c'était\ntellement\nmarrant" },
        { triggerDistance: 85, message: "et la\nconduite\nsans clé\n XD" },

        { triggerDistance: 90, message: "Georgé ?" },
        { triggerDistance: 95, message: "ça va ?\ntu tiens\nle coup ?" },
        { triggerDistance: 100, message: "wow déjà\n100m\nfélicitation!" },
        { triggerDistance: 105, message: "j'aime bien\ncourir\navec toi" },

        { triggerDistance: 115, message: "je fatigue\nun peu" },
        { triggerDistance: 120, message: "on fait\nune pause ?" },
        { triggerDistance: 123, message: "j'ai mal\naux pieds" },
        { triggerDistance: 125, message: "il fait\nchaud ..." },
        { triggerDistance: 130, message: "pourquoi\non court\nencore ?" },
        { triggerDistance: 135, message: "on s'arrête ?" },
        { triggerDistance: 140, message: "allé\non s'arrête ?" },
        { triggerDistance: 145, message: "j'ai\nmal\ns'il te plait !" },
        { triggerDistance: 150, message: "je suis\nfatigué\npitié !" },
        { triggerDistance: 155, message: "je me sens\npas bien du\ntout ..." },
        { triggerDistance: 160, message: "j'ai mal\naux pieds..." },
        { triggerDistance: 165, message: "je ne sens\nplus mes\npieds !" },

        { triggerDistance: 170, message: "déjà 170m !\non approche\ndes 200m !\ngénial !" },
        { triggerDistance: 175, message: "wow !\nc'est dingue\nça va mieux" },
        { triggerDistance: 180, message: "wow !\n180m\nça avance !" },

        { triggerDistance: 185, message: "si y'en a\nqui n'en\npeuvent plus" },
        { triggerDistance: 188, message: "si y'en a\nqui sont\ntrop fatigués" },
        { triggerDistance: 191, message: "je serai\nderrière\ndans la P4" },
        { triggerDistance: 195, message: "et ceux\nqui veulent\nabandonner" },
        { triggerDistance: 198, message: "je leur\nroule\ndessus !" },
        { triggerDistance: 200, message: "200m\nyouhouu !" },



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