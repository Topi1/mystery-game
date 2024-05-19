import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //this.add.image(512, 384, 'background');

        this.add.image(320, 170, 'logo2').setOrigin(0.5,0.5)

        this.add.text(512, 460, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.startText = this.add.bitmapText(320,330, "baseFont", "Press anywhere to start", 22).setOrigin(0.5,0.5)
        //this.startText.setTint(0xff0000)

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
