import { Scene } from 'phaser';
import SoundController from '../SoundController';

export class TopiJ extends Scene
{
    constructor ()
    {
        super('TopiJ');
    }

    create ()
    {
        //this.scene.start('IngameUI');
        //AUDIO
        this.soundManager = this.game.registry.get('soundManager');
        this.soundManager.playSound('introSong');

        this.topiText = this.add.bitmapText(80, 15, "baseFont", "Topi Järvinen 2024", 16).setOrigin(0.5,0.5)

        this.myLogo = this.add.sprite(320, 170, 'TJlogo').setOrigin(0.5,0.5)

        
        this.anims.create({
            key: 'logoAnim',
            frames: this.anims.generateFrameNames('TJlogo', {
                prefix: 'TopiLogo ',
                suffix: '.aseprite',
                start: 0,
                end: 24,
                zeroPad: 1 // Ensure the frame numbers are correctly formatted (if necessary)
            }),
            frameRate: 2.5,
            repeat: 0
        });

        this.time.delayedCall(800, () => {
            this.myLogo.anims.play("logoAnim");
        }, [], this);
        //this.myLogo.anims.play("logoAnim")

        this.time.delayedCall(14000, () => {
            this.scene.start('TitleScreen');
        }, [], this);
    

        

        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (this.escKey.isDown) {
            //this.soundManager.stopSound('introSong'); // Stop the intro song
            this.scene.start('TitleScreen'); // Change to the next scene
        }
    }
}