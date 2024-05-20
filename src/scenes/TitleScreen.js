import { Scene } from 'phaser';

export class TitleScreen extends Scene
{
    constructor ()
    {
        super('TitleScreen');
    }

    create ()
    {
        this.topiText = this.add.bitmapText(80, 15, "baseFont", "Topi Järvinen 2024", 16).setOrigin(0.5,0.5)

        //this.add.image(320, 170, 'logo2').setOrigin(0.5,0.5)

        this.titleLogo = this.add.sprite(320, 170, 'TitleLogo').setOrigin(0.5,0.5)

        this.anims.create({
            key: 'titleAnim',
            frames: this.anims.generateFrameNames('TitleLogo', {
                prefix: 'TitleLogo ',
                suffix: '.aseprite',
                start: 0,
                end: 11,
                zeroPad: 1 // Ensure the frame numbers are correctly formatted (if necessary)
            }),
            frameRate: 2,
            repeat: 0
        });

        this.anims.create({
            key: 'titleHandAnim',
            frames: this.anims.generateFrameNames('TitleLogo', {
                prefix: 'TitleLogo ',
                suffix: '.aseprite',
                start: 12,
                end: 18,
                zeroPad: 1 // Ensure the frame numbers are correctly formatted (if necessary)
            }),
            frameRate: 2,
            repeat: -1
        });

        
        this.titleLogo.anims.play("titleAnim")

        this.titleLogo.on("animationcomplete", () => {
            if(this.titleLogo.anims.currentAnim.key === "titleAnim") {
                this.titleLogo.play("titleHandAnim")
            }
        })
        

        this.startText = this.add.bitmapText(320,320, "baseFont", "Press anywhere to start", 22).setOrigin(0.5,0.5)
        //this.startText.setTint(0xff0000)

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
