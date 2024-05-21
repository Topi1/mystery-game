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
        this.topiText.depth = 5

        //this.add.image(320, 170, 'logo2').setOrigin(0.5,0.5)
        this.bOpacity = this.add.image(320, 170, 'blackOpacity').setOrigin(0.5,0.5)
        this.bOpacity.depth = 4
        this.bOpacity.alpha = 0

        this.time.delayedCall(11500, () => {
            this.bOpacity.alpha = 100
        }, [], this)

        this.tweens.add({
            targets: this.bOpacity,
            alpha: 0,  
            duration: 3000,  
            ease: 'Linear',  
            delay: 13000,
        })

        this.upTitle = this.add.image(320, -40, 'upTitle').setOrigin(0.5,0.5)
        this.upTitle.depth = 1

        this.tweens.add({
            targets: this.upTitle,
            y: 170,
            duration: 1300,
            ease: "Power2",
            delay: 800,
           
        
        })

        this.downTitle = this.add.image(320, 420, 'downTitle').setOrigin(0.5,0.5)

        this.tweens.add({
            targets: this.downTitle,
            y: 170,
            duration: 1400,
            ease: "Power2",
            delay: 1100,
            
        })

        this.time.delayedCall(4000, () => {
            this.upTitle.destroy();
        }, [], this)

        this.time.delayedCall(4000, () => {
            this.downTitle.destroy();
        }, [], this)



        this.titleLogo = this.add.sprite(320, 170, 'TitleLogoAnim').setOrigin(0.5,0.5)
        this.titleLogo.depth = 3

        this.anims.create({
            key: 'titleAnim',
            frames: this.anims.generateFrameNames('TitleLogoAnim', {
                prefix: 'TitleLogoAnim ',
                suffix: '.aseprite',
                start: 0,
                end: 13,
                zeroPad: 1 // Ensure the frame numbers are correctly formatted (if necessary)
            }),
            frameRate: 2,
            repeat: 0
        });

        this.anims.create({
            key: 'titleHandAnim',
            frames: this.anims.generateFrameNames('TitleLogoAnim', {
                prefix: 'TitleLogoAnim ',
                suffix: '.aseprite',
                start: 15,
                end: 44,
                zeroPad: 1 // Ensure the frame numbers are correctly formatted (if necessary)
            }),
            frameRate: 5,
            repeat: -1
        })

        this.time.delayedCall(3000, () => {
            this.titleLogo.anims.play("titleAnim");
        }, [], this);
        

        this.titleLogo.on("animationcomplete", () => {
            if(this.titleLogo.anims.currentAnim.key === "titleAnim") {
                this.time.delayedCall(2000, () => {
                    this.titleLogo.anims.play("titleHandAnim");
                }, [], this);
            }
        }) 
        

        this.startText = this.add.bitmapText(320,320, "baseFont", "Press anywhere to start", 22).setOrigin(0.5,0.5)
        this.startText.depth = 5
        //this.startText.setTint(0xff0000)

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
