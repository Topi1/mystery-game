import { Scene } from "phaser";
import SoundController from "../SoundController";

export class FerryScene extends Scene {

    constructor() {
        super("FerryScene")
    }


    create() {

        this.soundManager = new SoundController(this);
        
        this.soundManager.addSounds();
        this.soundManager.playSound('ferrySound');

        this.blackOverlay = this.add.graphics({ fillStyle: { color: 0x000000 } });
        this.blackOverlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.blackOverlay.depth = 6

        this.ferryVid = this.add.video(320,170,"ferryVid").setOrigin(0.5,0.5)

        this.time.delayedCall(2000, () => {
            this.ferryVid.play(true)
        }, [], this)

        this.tweens.add({
            targets: this.blackOverlay,
            alpha: 0,
            duration: 1800, 
            ease: 'Cubic.easeOut', 
            delay: 3000,
            onComplete: () => {
                //this.blackOverlay.destroy();
            }
        });
        this.tweens.add({
            targets: this.blackOverlay,
            alpha: 1,
            duration: 1800, 
            ease: 'Cubic.easeOut', 
            delay: 14000,
            onComplete: () => {
                this.soundManager.stopSound('ferrySound');
            }
        });

        

        
        //this.ferryVid.setLoop(true)

        
    }

   

}

