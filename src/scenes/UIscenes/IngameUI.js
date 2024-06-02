import { Scene } from 'phaser';
import { PopupMenu } from './MenuPopup';

export class IngameUI extends Scene {
    constructor() {
        super({ key: 'IngameUI', active: true });
        
    }

    preload() {
        this.load.image("menuBG", "assets/UI/menuBG.png")
        this.load.spritesheet("inventoryIcon", "assets/UI/invIcon.png", {frameWidth: 48, frameHeight: 48})
        this.load.spritesheet("mainIcon", "assets/UI/menuIcon.png", {frameWidth: 48, frameHeight: 48})
        this.load.spritesheet("speakToIcon", "assets/UI/speakTo.png", {frameWidth: 48, frameHeight: 48})

        this.load.bitmapFont('baseFontUI', 'assets/fonts/baseFont_0.png', 'assets/fonts/baseFont.fnt')

        this.load.spritesheet("menuButton1", "assets/UI/menuBtn.png", {frameWidth: 132, frameHeight: 38})
    }

    create() {
        // Inventory Display Setup

        this.popupMenu = new PopupMenu(this, 300, 200)

        this.uiContainer = this.add.container(0, 0).setDepth(20);
        
        this.inventoryDisplay = new InventoryDisplay(this, 10, 10);
        this.uiContainer.add(this.inventoryDisplay);

        //BG
        this.menuBG = this.add.sprite(558,22,"menuBG")
        this.menuBG.alpha = 0.3
        
        this.menuBG.setInteractive().on("pointerover", () => {
            //this.menuBG.alpha = 0.6
        })
        .on("pointerout", () => {
            //this.menuBG.alpha = 0.2
        })

        /*this.bg = this.add.graphics()
        this.bg.fillStyle(0x1e3737);
        this.bg.alpha = 0.4
        this.bg.fillRect(530, 0, 200, 50);
        this.bg.depth = 21
        this.uiContainer.add(this.bg); */

        //Speak To Button
        this.speakButton = this.add.sprite(505, 22, "speakToIcon").setFrame(0)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.toggleInventory();
        })
        .on('pointerover', () => {this.speakToText.setVisible(true), this.speakButton.setFrame(1)})
        .on('pointerout', () => {this.speakToText.setVisible(false), this.speakButton.setFrame(0)});
        this.speakButton.depth = 21
        this.uiContainer.add(this.speakButton);
        
        this.speakToText = this.add.bitmapText(480,47,"baseFontUI","Speak to",16).setVisible(false)
        this.uiContainer.add(this.speakToText);


        //Inventory Button
        this.inventoryButton = this.add.sprite(555, 20, "inventoryIcon").setFrame(0)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.toggleInventory();
        })
        .on('pointerover', () => {this.inventoryText.setVisible(true), this.inventoryButton.setFrame(1)})
        .on('pointerout', () => {this.inventoryText.setVisible(false), this.inventoryButton.setFrame(0)});
        this.inventoryButton.depth = 21
        this.uiContainer.add(this.inventoryButton);
        
        this.inventoryText = this.add.bitmapText(525,47,"baseFontUI","Inventory",16).setVisible(false)
        this.uiContainer.add(this.inventoryText);

        // Menu Button
        this.mainButton = this.add.sprite(610, 20, "mainIcon").setFrame(0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.showMain();
                this.mainText.setVisible(false)
            })
            .on('pointerover', () => {this.mainText.setVisible(true), this.mainButton.setFrame(1)})
            .on('pointerout', () => {this.mainText.setVisible(false), this.mainButton.setFrame(0)});
        this.mainButton.depth = 21
            
        this.uiContainer.add(this.mainButton);

        this.mainText = this.add.bitmapText(593,47,"baseFontUI","Menu",16).setVisible(false)
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
        this.popupMenu.toggleVisibility()
        console.log('Main button clicked');
        
    }

    toggleUIInput(enable) {
        this.uiContainer.list.forEach(child => {
            if (child.input && child.setInteractive) {
                child.input.enabled = enable; // Only toggle input if it exists
            }
        });
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