import { Scene } from 'phaser';

export class FlashWarning extends Scene
{
    constructor ()
    {
        super('FlashWarning');
    }

    create ()
    {
        this.warningText = this.add.bitmapText(335, 120, "baseFont", "WARNING:\n\nThis game contains flashing lights and images\nthat may cause discomfort or seizures for \nthose with photosensitive epilepsy.\nViewer discretion is advised.", 22).setOrigin(0.5,0.5)
        this.warningText.setTint(0xd9e051)

        this.time.delayedCall(3000, () => {
            this.scene.start('TopiJ');
        }, [], this);
    }
}
