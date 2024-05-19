import { Scene } from 'phaser';

export class WarningStart extends Scene
{
    constructor ()
    {
        super('Warning');
    }

    create ()
    {
        

        this.warningText = this.add.bitmapText(320, 60, "baseFont", "This game is for adult audience. ", 32).setOrigin(0.5,0.5)
        this.warningText.setTint(0xff0000)

        this.warningInfo = this.add.bitmapText(320, 180, "baseFont", "Includes:\n\n- horror\n- strong language\n- alcohol\n- blood ", 24).setOrigin(0.5,0.5)
        
        
        const button = this.add.bitmapText(320, 300, "baseFont", "GOT IT, START THE GAME", 32).setOrigin(0.5,0.5)
        .setInteractive({ useHandCursor: true })  // Makes the text use a hand cursor on hover
        .on('pointerdown', () => this.scene.start('TopiJ'));  // Changes to Scene2 on click

        //button.on('pointerover', () => button.setStyle({ fill: '#ff0'}));
        //button.on('pointerout', () => button.setStyle({ fill: '#0f0'}));

        

        /*this.input.once('pointerdown', () => {

            this.scene.start('TopiJ');

        });*/
    }
}