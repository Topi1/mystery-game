import { Scene } from 'phaser';

export class WarningStart extends Scene
{
    constructor ()
    {
        super('Warning');
    }

    create ()
    {
        

        this.warningText = this.add.bitmapText(320, 60, "baseFont", "THIS GAME IS FOR ADULT AUDIENCE ", 32).setOrigin(0.5,0.5)
        this.warningText.setTint(0xff0000)

        this.warningInfo = this.add.bitmapText(330, 175, "baseFont", "  CONTAINS:\n\n- HORROR\n- STRONG LANGUAGE\n- ALCOHOL\n- TOBACCO\n- BLOOD ", 24).setOrigin(0.5,0.5)
        
        
        this.startText = this.add.bitmapText(320, 300, "baseFont", "GOT IT, START THE GAME", 32).setOrigin(0.5,0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('TopiJ'))
        this.startText.setTint(0x00ff00)
        this.startText.depth = 1

        this.startButton = this.add.rectangle(320,300, 300, 34, 0xffffff).setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('TopiJ'))
        
        



        this.startButton.on('pointerover', () => {this.startButton.setFillStyle(0x00ff00), this.startText.setTint(0xffffff)})

        this.startButton.on('pointerout', () => {this.startButton.setFillStyle(0xffffff), this.startText.setTint(0x00ff00)})

        this.startText.on('pointerover', () => {this.startButton.setFillStyle(0x00ff00), this.startText.setTint(0xffffff)})

        this.startText.on('pointerout', () => {this.startButton.setFillStyle(0xffffff), this.startText.setTint(0x00ff00)})

        

        

        /*this.input.once('pointerdown', () => {

            this.scene.start('TopiJ');

        });*/
    }
}