import { Scene } from 'phaser';

export class IngameUI extends Scene {
    constructor() {
        super({ key: 'IngameUI', active: true });
        
    }

    preload() {
        this.load.image("inventoryIcon", "assets/UI/inventoryIcon.png")
    }

    create() {
        // Inventory Display Setup
        this.uiContainer = this.add.container(0, 0).setDepth(20);
        
        this.inventoryDisplay = new InventoryDisplay(this, 10, 10);
        this.uiContainer.add(this.inventoryDisplay);

        //Inventory Button
        this.inventoryButton = this.add.sprite(520, 20, "inventoryIcon").setFrame(0)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.toggleInventory();
        });
        this.uiContainer.add(this.inventoryButton);  

        // Settings Button
        this.settingsButton = this.add.text(550, 10, 'Settings', { fontSize: '16px', fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.showSettings();
            });
        this.uiContainer.add(this.settingsButton);
          

            // Listen for updates from game scenes
        this.game.events.on('updateInventory', items => {
            this.inventoryDisplay.updateInventory(items);
        }, this);


        this.registry.events.on('changedata-showUI', (parent, value) => {
            if (value) {
                this.showUI();
            } else {
                this.hideUI();
            }
        });

        this.hideUI()
    }

    showUI() {
        this.uiContainer.setVisible(true);
    }
    
    hideUI() {
        this.uiContainer.setVisible(false);
    }

    toggleInventory() {
        // Toggle the visibility of the inventory display
        this.inventoryDisplay.setVisible(!this.inventoryDisplay.visible);
        console.log('Inventory toggled');
    }


    showSettings() {
        // Code to display settings, could toggle visibility of a settings panel
        console.log('Settings button clicked');
    }


}


export class InventoryDisplay extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.itemsDisplay = [];
    }

    updateInventory(items) {
        this.removeAll(true); // Clear current display
        items.forEach((item, index) => {
            const icon = this.scene.add.sprite(50 * index, 0, item.iconTexture);
            this.add(icon);
        });
    }
}