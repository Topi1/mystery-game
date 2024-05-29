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
        

        /*this.topijText = this.add.bitmapText(150, 100, "baseFont", "Topi Järvinen 2024", 32).setOrigin(0.5,0.5)
        this.topijText.setTint(0xff0000)
        this.topijText.depth = 5*/

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
            delay: 15000,
            onComplete: () => {
                this.time.delayedCall(2000, () => {
                    this.soundManager.stopSound('ferrySound');
                    this.scene.start('Game')
                }, [], this)
            }
        });

        this.ferryTitle = this.add.sprite(320, 160, 'scalableTitle').setOrigin(0.5,0.5)
        this.ferryTitle.alpha = 0

        this.tweens.add({
            targets: this.ferryTitle,
            alpha: 0.3,
            duration: 4000, 
            ease: 'Cubic.easeOut', 
            delay: 4500,
            onComplete: () => {
                this.tweens.add({
                    targets: this.ferryTitle,
                    alpha: 0,
                    duration: 2000, 
                    ease: 'Cubic.easeOut', 
                    
                });
            }
        });

        
        

        
    }

   

}

