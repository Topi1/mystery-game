import { Scene } from 'phaser';

export class TopiJ extends Scene
{
    constructor ()
    {
        super('TopiJ');
    }

    create ()
    {
        

        this.myLogo = this.add.sprite(320, 170, 'TJlogo').setOrigin(0.5,0.5)

        this.anims.create({
            key: 'logoAnim',
            frames: this.anims.generateFrameNames('TJlogo', {
                prefix: 'TJGamesLogo ',
                suffix: '.aseprite',
                start: 0,
                end: 4,
                zeroPad: 1 // Ensure the frame numbers are correctly formatted (if necessary)
            }),
            frameRate: 0.8,
            repeat: 0
        });

        this.myLogo.anims.play("logoAnim")

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}