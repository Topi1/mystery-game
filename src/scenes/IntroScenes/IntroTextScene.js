import { Scene } from "phaser";


export class IntroTextScene extends Scene {


    constructor ()
    {
        super('IntroTextScene');
    }


    create() {







        this.input.once('pointerdown', () => {
            this.time.delayedCall(2000, () => {
                this.scene.start('FerryScene')
            }, [], this)
        })
    }
}