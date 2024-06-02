import Phaser from "phaser";

export class PopupMenu extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);

        this.createMenuItems();
        this.setVisible(false);  // Initially hidden
    }



    createMenuItems() {
        // Background for the menu
        let bg = this.scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.8 } });
        bg.fillRect(0, 0, 150, 100);
        this.add(bg);

        // Example button
        let settingsButton = this.scene.add.text(10, 10, 'Settings', { font: '16px Arial', fill: '#FFFFFF' })
            .setInteractive()
            .on('pointerdown', () => this.onSettingsClicked());
        this.add(settingsButton);
    }

    onSettingsClicked() {
        console.log('Settings clicked');
        // Handle settings logic here
    }

    toggleVisibility() {
        this.setVisible(!this.visible);
    }

}