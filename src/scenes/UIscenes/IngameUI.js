import { Scene } from 'phaser';

export class IngameUI extends Scene {
    constructor() {
        super({ key: 'IngameUI', active: true });
        
    }

    preload() {
        this.load.image("inventoryIcon", "assets/UI/inventoryIcon.png")
        this.load.image("mainIcon", "assets/UI/mainIcon2.png")

        this.load.bitmapFont('baseFontUI', 'assets/fonts/baseFont_0.png', 'assets/fonts/baseFont.fnt')
    }

    create() {
        // Inventory Display Setup
        this.uiContainer = this.add.container(0, 0).setDepth(20);
        
        this.inventoryDisplay = new InventoryDisplay(this, 10, 10);
        this.uiContainer.add(this.inventoryDisplay);

        //BG
        this.bg = this.add.graphics()
        this.bg.fillStyle(0x1e3737);
        this.bg.alpha = 0.4
        this.bg.fillRect(530, 0, 200, 50);
        this.bg.depth = 21
        this.uiContainer.add(this.bg);

        //Inventory Button
        this.inventoryButton = this.add.sprite(560, 20, "inventoryIcon").setFrame(0)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.toggleInventory();
        })
        .on('pointerover', () => this.inventoryText.setVisible(true))
        .on('pointerout', () => this.inventoryText.setVisible(false));
        this.uiContainer.add(this.inventoryButton);
        
        this.inventoryText = this.add.bitmapText(530,50,"baseFontUI","Inventory",16).setVisible(false)
        this.uiContainer.add(this.inventoryText);

        // Settings Button
        this.mainButton = this.add.sprite(610, 20, "mainIcon").setFrame(0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.showSettings();
            })
            .on('pointerover', () => this.mainText.setVisible(true))
            .on('pointerout', () => this.mainText.setVisible(false));
            
        this.uiContainer.add(this.mainButton);

        this.mainText = this.add.bitmapText(595,50,"baseFontUI","Menu",16).setVisible(false)
        this.uiContainer.add(this.mainText);
          

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


    showMain() {
        // Code to display settings, could toggle visibility of a settings panel
        console.log('Main button clicked');
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