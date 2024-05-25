import Phaser from "phaser";

export class SettingsPopup extends Phaser.GameObjects.Container {
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

        const settingsText = this.scene.add.bitmapText(0, -80, "baseFont", "Settings", 32).setOrigin(0.5);
        this.add(settingsText);

        const closeButton = this.scene.add.text(120, -100, 'X', {
            font: '34px Arial',
            fill: '#FF0000'
        }).setInteractive({ useHandCursor: true });
        closeButton.on('pointerdown', () => {
            this.setVisible(false)
        })
        this.add(closeButton);

        //this.createVolumeSlider()
        this.createMuteButton()
        this.createFullscreenButton()
    }

    createVolumeSlider() {
        const width = 200;  // Width of the slider
        const height = 20;  // Height of the slider bar
    
        // Create the slider bar
        const bar = this.scene.add.graphics();
        bar.fillStyle(0x888888, 1);
        bar.fillRect(-width / 2, -height / 2, width, height);
        this.add(bar);

            // Create the draggable handle
        const handle = this.scene.add.graphics();
        handle.fillStyle(0xffff00, 1);
        handle.fillRect(-10, -height, 20, height * 2);
        this.add(handle);

        // Enable input on the handle
        handle.setInteractive({ draggable: true });

        // Handle dragging
        handle.on('drag', (pointer, dragX, dragY) => {
            // Constrain the handle to the slider bar
            handle.x = Phaser.Math.Clamp(dragX, -width / 2, width / 2);
            // Update volume based on handle position
            const volume = (handle.x + width / 2) / width;
            this.scene.game.sound.setVolume(volume);
        });
    }

    createMuteButton() {
        const buttonText = this.scene.add.bitmapText(0, 15, "baseFont", "Mute", 24).setOrigin(0.5,0.5)
        buttonText.setInteractive({ useHandCursor: true });
        buttonText.on('pointerdown', () => {
            const isMuted = this.scene.game.sound.mute;
            this.scene.game.sound.setMute(!isMuted);
            buttonText.setText(isMuted ? 'Mute' : 'Unmute');  // Update button text
        });
        this.add(buttonText);
    }

    createFullscreenButton() {
        const fullScreenButton = this.scene.add.bitmapText(0, -15, "baseFont", "Fullscreen[ON]", 24).setOrigin(0.5,0.5)
        fullScreenButton.setInteractive({ useHandCursor: true })
        fullScreenButton.on("pointerup", () => {
            if(this.scene.scale.isFullscreen) {
                this.scene.scale.stopFullscreen()
                fullScreenButton.setText("Fullscreen [ON]")
            } else {
                this.scene.scale.startFullscreen()
                fullScreenButton.setText("Fullscreen [OFF]")
            }
        })
        this.add(fullScreenButton);
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
        this.inputBlocker.visible = this.visible; // Show or hide the input blocker with the popup
    }
}