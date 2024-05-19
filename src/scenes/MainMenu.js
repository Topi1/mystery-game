import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.topiText = this.add.bitmapText(80, 15, "baseFont", "Topi Jarvinen 2024", 16).setOrigin(0.5,0.5)

        this.add.image(320, 170, 'logo2').setOrigin(0.5,0.5)

        this.add.text(512, 460, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.startText = this.add.bitmapText(320,320, "baseFont", "Press anywhere to start", 22).setOrigin(0.5,0.5)
        //this.startText.setTint(0xff0000)

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
