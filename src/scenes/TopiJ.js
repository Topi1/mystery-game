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

        /*this.topiText = this.add.text(60, 20, 'Topi Järvinen 2024', {
            fontSize: 12, color: '#dcdbdb',
            fontFamily: "Times New Roman"
            //stroke: '#000000', strokeThickness: 8,
            
        })
        this.topiText.depth = 3 */
        
        

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
            this.scene.start('MainMenu');
        }, [], this);
    

        /*this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        }); */
    }
}