import Phaser from "phaser";

export class ExitGamePopup extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.scene.add.existing(this);
        
        this.createInputBlocker()
        this.createPopup();
        this.setVisible(false);

        this.depth = 40
    }

    createPopup(){
        const bg = this.scene.add.graphics();
        bg.fillStyle(0x1e3737, 0.5);
        bg.fillRect(-150, -100, 300, 200);
        this.add(bg);

        const settingsText = this.scene.add.bitmapText(0, -80, "baseFontUI", "Quit Game", 32).setOrigin(0.5);
        this.add(settingsText);

        const sureText = this.scene.add.bitmapText(0, -35, "baseFontUI", "Are you sure you want to quit?\nAll the unsaved progress will be lost.", 16).setOrigin(0.5);
        this.add(sureText);

        const closeButton = this.scene.add.text(120, -100, 'X', {
            font: '34px Arial',
            fill: '#FF0000'
        }).setInteractive({ useHandCursor: true });
        closeButton.on('pointerdown', () => {
            this.setVisible(false)
        })
        this.add(closeButton);

        this.yesButton = this.scene.add.rectangle(0,50, 100, 34, 0x1e3737).setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.toggleVisibility()
            this.scene.events.emit('toggle_menu');
            this.scene.hideUI()
            this.scene.events.emit('quit_requested');
            //this.scene.scene.start("TitleScreen")
        })
        this.add(this.yesButton)

        this.yesText = this.scene.add.bitmapText(0, 0, "baseFontUI", "YES", 32)
        Phaser.Display.Align.In.Center(this.yesText, this.yesButton);
        this.add(this.yesText)
    }

    createInputBlocker() {
        // Create an invisible background for input blocking
        this.inputBlocker = this.scene.add.rectangle(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height, 0x000000, 0.0)
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