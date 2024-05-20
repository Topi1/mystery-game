import { Scene } from 'phaser';

export class TopiJ extends Scene
{
    constructor ()
    {
        super('TopiJ');
    }

    create ()
    {
        //AUDIO
        this.introSong = this.sound.add("introSong")
        this.introSong.play()

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

        this.myLogo.anims.play("logoAnim")

        this.time.delayedCall(12300, () => {
            this.scene.start('TitleScreen');
        }, [], this);
    

        /*this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        }); */
    }
}