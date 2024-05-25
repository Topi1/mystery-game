import Phaser from "phaser";

export class HowToPlayPopup extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.scene.add.existing(this);
        
        this.createInputBlocker()
        this.createPopup();
        this.setVisible(false);
    }

    createPopup(){
        const bg = this.scene.add.graphics();
        bg.fillStyle(0x1e3737, 0.8);
        bg.fillRect(-150, -100, 300, 200);
        this.add(bg);

        const settingsText = this.scene.add.bitmapText(0, -80, "baseFont", "How To Play", 32).setOrigin(0.5);
        this.add(settingsText);

        const closeButton = this.scene.add.text(120, -100, 'X', {
            font: '34px Arial',
            fill: '#FF0000'
        }).setInteractive({ useHandCursor: true });
        closeButton.on('pointerdown', () => {
            this.setVisible(false)
        })
        this.add(closeButton);
    }

    createInputBlocker() {
        // Create an invisible background for input blocking
        this.inputBlocker = this.scene.add.rectangle(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height, 0x000000, 0.5)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', (pointer, localX, localY, event) => {
                // Stop the event from propagating to lower layers
                event.stopPropagation();
            });
        this.inputBlocker.visible = false; // Initially hidden
        this.add(this.inputBlocker); // Add it to the container to keep depth management easy
    }


    toggleVisibility() {
        this.setVisible(!this.visible);
        this.inputBlocker.visible = this.visible;
    }
}