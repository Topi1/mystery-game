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

        this.warningInfo = this.add.bitmapText(320, 180, "baseFont", "CONTAINS:\n\n- HORROR\n- STRONG LANGUAGE\n- ALCOHOL\n- BLOOD ", 24).setOrigin(0.5,0.5)
        
        
        this.button = this.add.bitmapText(320, 300, "baseFont", "GOT IT, START THE GAME", 32).setOrigin(0.5,0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('TopiJ'))
        this.button.setTint(0x00ff00)



        //button.on('pointerover', () => button.setStyle({ fill: '#ff0'}));
        //button.on('pointerout', () => button.setStyle({ fill: '#0f0'}));

        

        /*this.input.once('pointerdown', () => {

            this.scene.start('TopiJ');

        });*/
    }
}